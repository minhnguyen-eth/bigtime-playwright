import { Locator, Page } from 'playwright';

export class RegisnationPage {
    private page: Page;

    readonly addButton: Locator;
    readonly reasonInput: Locator;
    readonly saveButton: Locator;
    readonly regisnationButton: Locator;
    readonly row0: Locator;
    readonly sendButton: Locator;
    readonly okButton: Locator;



    constructor(page: Page) {
        this.page = page;


        this.okButton = page.locator("//span[normalize-space()='Có']");
        this.sendButton = page.locator("//span[contains(normalize-space(),'Gửi')]");
        this.row0 = page.locator("//tr[@id='row-0']");
        this.addButton = page.locator("//button[text()='Add']");
        this.reasonInput = page.locator("//input[@id='reason']");
        this.saveButton = page.locator("//button[text()='Save']");
        this.regisnationButton = page.locator("//div[contains(text(),'Đơn thôi việc')]");

    }

    async clickSendButton() {
        await this.sendButton.click();
    }

    async clickOkButton() {
        await this.okButton.click();
    }

    async clickRow0() {
        await this.row0.click();
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

