import { Page, Locator, expect } from '@playwright/test';
import Config from '../utils/configUtils';

export class LogoutPage {
    readonly page: Page;
    readonly logoutButton: Locator;
    readonly logoutConfirmButton: Locator;



    constructor(page: Page) {
        this.page = page;
        this.logoutButton = page.locator('//div[contains(text(),"Đăng xuất")]');
        this.logoutConfirmButton = page.locator('//span[normalize-space()="Có"]');

    }

    async logout() {
        await this.logoutButton.click();
        await this.logoutConfirmButton.click();
    }
}
