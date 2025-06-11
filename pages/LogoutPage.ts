import { Page, Locator, expect } from '@playwright/test';

export class LogoutPage {
    readonly page: Page;
    readonly logoutButton: Locator;
    readonly logoutConfirmButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoutButton = this.page.locator('//div[contains(text(),"Đăng xuất")]');
        this.logoutConfirmButton = this.page.locator('//span[normalize-space()="Có"]');
    }

    async logout() {
        await this.logoutButton.click();
        await this.logoutConfirmButton.click();
    }
}
