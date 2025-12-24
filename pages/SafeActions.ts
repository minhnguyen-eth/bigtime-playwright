import { expect, Locator, Page } from "@playwright/test";
const DEBUG = process.env.DEBUG === 'true';

function logDebug(...args: any[]) {
    if (DEBUG) {
        console.log('[DEBUG]', ...args);
    }
}

export class SafeActions {
    constructor(protected page: Page) { }

    private async isLocatorReady(locator: Locator, timeout: number): Promise<void> {
        await locator.waitFor({ state: 'attached', timeout });
        await locator.waitFor({ state: 'visible', timeout });

        const handle = await locator.elementHandle({ timeout });
        if (!handle) throw new Error("Element not found for checking 'enabled' state.");

        await this.page.waitForFunction(
            (el: SVGElement | HTMLElement) => el instanceof HTMLElement && !el.hasAttribute('disabled'),
            handle,
            { timeout }
        );
    }

    async waitForPageReady(timeout: number = 30000) {
        await this.page.waitForLoadState('networkidle', { timeout });
    }

    async safeClick(
        locator: Locator,
        options?: {
            force?: boolean;
            timeout?: number;
            first?: boolean;
            nth?: number;
        }
    ): Promise<void> {
        const timeout = options?.timeout ?? 30000;

        if (this.page.isClosed()) {
            logDebug("safeClick: Page is already closed before click.");
            return;
        }

        try {
            await this.page.waitForLoadState('domcontentloaded', { timeout });
            await this.waitForOverlayToDisappear(undefined, timeout);

            if (this.page.isClosed()) {
                logDebug("safeClick: Page closed during overlay wait.");
                return;
            }

            if (options?.first) {
                locator = locator.first();
            } else if (typeof options?.nth === 'number') {
                locator = locator.nth(options.nth);
            }

            await locator.waitFor({ state: 'attached', timeout });
            await locator.waitFor({ state: 'visible', timeout });
            await expect(locator).toBeEnabled({ timeout });

            await this.page.waitForTimeout(100); // ổn định layout

            logDebug('Clicking element...');
            await locator.click({ force: options?.force ?? false, timeout });
        } catch (error) {
            console.error("safeClick error:", (error as Error).message);
            throw error;
        }
    }

    async waitForOverlayToDisappear(selector: string = '.overlay', timeout: number = 30000): Promise<void> {
        const overlay = this.page.locator(selector);
        try {
            await overlay.waitFor({ state: 'hidden', timeout });
            // console.log('Overlay đã biến mất.');
        } catch (e) {
            const overlayCount = await overlay.count();
            if (overlayCount === 0) {
                // console.log('Không tìm thấy overlay. Bỏ qua.');
                return;
            }
            await this.page.screenshot({ path: 'overlay-blocking-click.png', fullPage: true });
            throw new Error(`Một số overlay không biến mất sau ${timeout}ms: ${(e as Error).message}`);
        }
    }

    async safeClickFirst(locator: Locator, options?: { force?: boolean; timeout?: number }) {
        const timeout = options?.timeout ?? 30000; // Increased default timeout to 30s
        await this.waitForPageReady(timeout);
        const first = locator.first();
        await expect(first).toBeVisible({ timeout });
        await expect(first).toBeEnabled({ timeout });
        await first.click({ force: options?.force ?? false, timeout });
    }

    async safeFill(locator: Locator, value: string, timeout = 30000) {
        try {
            await expect(locator).toBeVisible({ timeout });
            await expect(locator).toBeEnabled({ timeout });
            await locator.fill(value, { timeout });

            logDebug(`Filled "${value.length > 50 ? value.slice(0, 50) + '...' : value}"`);
        } catch (error) {
            console.error(`Failed to fill "${value}" within ${timeout}ms`);
            throw error;
        }
    }

    async safeType(locator: Locator, value: string, delayMs: number = 100, timeout: number = 30000) {
        await locator.waitFor({ state: 'visible', timeout });
        await locator.type(value, { delay: delayMs, timeout });
    }

    async waitForElementToDisappear(locator: Locator, timeout: number = 30000) {
        await locator.waitFor({ state: 'detached', timeout });
    }

    async safeVerifyToHaveText(locator: Locator, expectedText: string, timeout: number = 20000) {
        await locator.waitFor({ state: 'visible', timeout });
        await expect(locator).toHaveText(expectedText, { timeout });
    }

    async safeVerifyTextContains(locator: Locator, expectedText: string, timeout: number = 20000) {
        await locator.waitFor({ state: 'visible', timeout });
        await expect(locator).toHaveText(new RegExp(expectedText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), { timeout });

    }

    async getFirstVisibleText(locator: Locator, label: string) {
        const first = locator.first();
        await first.waitFor({ state: 'visible' });
        const text = await first.textContent();
        console.log(`🔍 ${label}:`, text);
        return text;
    }

    async safeVerifyToHaveValue(locator: Locator, expectedValue: string, timeout: number = 5000) {
        await locator.waitFor({ state: 'visible', timeout });
        await expect(locator).toHaveValue(expectedValue, { timeout });
    }

    /**
     * Safely check a checkbox or radio button
     * @param locator - The checkbox/radio locator
     * @param options - Optional configuration
     */
    async safeCheckbox(
        locator: Locator,
        options?: {
            force?: boolean;
            timeout?: number;
            skipIfChecked?: boolean;
        }
    ): Promise<void> {
        const timeout = options?.timeout ?? 30000;
        const skipIfChecked = options?.skipIfChecked ?? true;

        try {
            await this.page.waitForLoadState('domcontentloaded', { timeout });
            await this.waitForOverlayToDisappear(undefined, timeout);

            await locator.waitFor({ state: 'attached', timeout });
            await locator.waitFor({ state: 'visible', timeout });
            await expect(locator).toBeEnabled({ timeout });

            // Check if already checked
            if (skipIfChecked) {
                const isChecked = await locator.isChecked();
                if (isChecked) {
                    logDebug('Checkbox is already checked, skipping...');
                    return;
                }
            }

            await this.page.waitForTimeout(100); // Stabilize layout
            logDebug('Checking checkbox...');
            await locator.check({ force: options?.force ?? false, timeout });

            // Verify it's checked
            await expect(locator).toBeChecked({ timeout: 5000 });
        } catch (error) {
            console.error("safeCheckbox error:", (error as Error).message);
            throw error;
        }
    }

    /**
     * Safely uncheck a checkbox
     * @param locator - The checkbox locator
     * @param options - Optional configuration
     */
    async safeUncheck(
        locator: Locator,
        options?: {
            force?: boolean;
            timeout?: number;
            skipIfUnchecked?: boolean;
        }
    ): Promise<void> {
        const timeout = options?.timeout ?? 30000;
        const skipIfUnchecked = options?.skipIfUnchecked ?? true;

        try {
            await this.page.waitForLoadState('domcontentloaded', { timeout });
            await this.waitForOverlayToDisappear(undefined, timeout);

            await locator.waitFor({ state: 'attached', timeout });
            await locator.waitFor({ state: 'visible', timeout });
            await expect(locator).toBeEnabled({ timeout });

            // Check if already unchecked
            if (skipIfUnchecked) {
                const isChecked = await locator.isChecked();
                if (!isChecked) {
                    logDebug('Checkbox is already unchecked, skipping...');
                    return;
                }
            }

            await this.page.waitForTimeout(100); // Stabilize layout
            logDebug('Unchecking checkbox...');
            await locator.uncheck({ force: options?.force ?? false, timeout });

            // Verify it's unchecked
            await expect(locator).not.toBeChecked({ timeout: 5000 });
        } catch (error) {
            console.error("safeUncheck error:", (error as Error).message);
            throw error;
        }
    }
}
