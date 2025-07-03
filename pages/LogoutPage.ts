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

        await this.page.waitForSelector('//div[contains(text(),"Đăng xuất")]', { state: 'visible' });
        await this.logoutButton.click();

        await this.page.waitForSelector('//span[normalize-space()="Có"]', { state: 'visible' });
        await this.logoutConfirmButton.click();

        await this.page.waitForTimeout(1200);
    }
}
