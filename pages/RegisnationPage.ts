import { Locator, Page } from 'playwright';

export class RegisnationPage {
    private page: Page;

    readonly addButton: Locator;
    readonly reasonInput: Locator;
    readonly saveButton: Locator;
    readonly regisnationButton: Locator;



    constructor(page: Page) {
        this.page = page;
        this.addButton = page.locator("//button[text()='Add']");
        this.reasonInput = page.locator("//input[@id='reason']");
        this.saveButton = page.locator("//button[text()='Save']");
        this.regisnationButton = page.locator("//button[text()='Regisnation']");

    }

    async clickRegisnationButton() {
        await this.regisnationButton.click();
    }


    async clickSaveButton() {
        await this.addButton.click();
    }

    async fillReason(reason: string) {
        await this.reasonInput.fill(reason);
    }

    async clickAddButton() {
        await this.addButton.click();
    }
}

