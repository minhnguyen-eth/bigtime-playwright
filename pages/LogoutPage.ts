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
        // Wait for the logout button to be visible and clickable
        await this.page.waitForSelector('//div[contains(text(),"Đăng xuất")]', { state: 'visible' });
        await this.logoutButton.click();

        // Wait for the confirmation button to be visible and clickable
        await this.page.waitForSelector('//span[normalize-space()="Có"]', { state: 'visible' });
        await this.logoutConfirmButton.click();

    }
}
