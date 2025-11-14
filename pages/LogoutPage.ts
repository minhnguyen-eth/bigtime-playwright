import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LogoutPage extends BasePage {
    readonly LOGOUT_BUTTON: Locator;
    readonly LOGOUT_CONFIRM_BUTTON: Locator;

    constructor(page: Page) {
        super(page);
        this.LOGOUT_BUTTON = page.getByRole('button', { name: 'Đăng xuất' });
        this.LOGOUT_CONFIRM_BUTTON = page.getByRole('button', { name: 'Có' });
    }

    async logout() {
        await this.safeClick(this.LOGOUT_BUTTON);
        await this.safeClick(this.LOGOUT_CONFIRM_BUTTON);
        await this.page.waitForTimeout(1200);
    }
}
