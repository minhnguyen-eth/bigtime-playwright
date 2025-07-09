import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LogoutPage extends BasePage {
    readonly logoutButton: Locator;
    readonly logoutConfirmButton: Locator;

    constructor(page: Page) {
        super(page);
        this.logoutButton = this.page.locator('//div[contains(text(),"Đăng xuất")]');
        this.logoutConfirmButton = this.page.locator('//span[normalize-space()="Có"]');
    }

    async logout() {
        await this.safeClick(this.logoutButton);
        await this.safeClick(this.logoutConfirmButton);
        await this.page.waitForTimeout(1200);
    }
}
