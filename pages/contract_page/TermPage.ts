import { Page, Locator } from 'playwright';

export class TermPage {
    readonly page: Page;
    readonly termButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.termButton = page.locator("//div[contains(.,'Điều khoản')]");
    }

    async clickOnTerm() {
        await this.termButton.click();
    }
}

