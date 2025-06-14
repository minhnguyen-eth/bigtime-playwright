import { expect, Locator, Page } from "@playwright/test";


export class RewardEmployeePage {

    readonly addButton: Locator;

    constructor(public page: Page) {
        this.addButton = page.locator("//button[text()='Add']");
    }
    async clickOnAddButton() {
        await this.addButton.click();
    }
}
