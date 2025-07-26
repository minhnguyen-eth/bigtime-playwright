import { Locator, Page } from 'playwright/test';
import { BasePage } from './BasePage';

export class PositionPage extends BasePage {
    readonly positionsButton: Locator;
    readonly nameInput: Locator;
    readonly msgNameRequired: Locator;
    readonly nameExistError: Locator;
    readonly nameInputSearch: Locator;
    readonly searchNameResult: Locator;

    constructor(page: Page) {
        super(page);
        this.searchNameResult = page.locator("//tr[@id='row-0']//span[contains(text(),'Project Manager')]");
        this.nameInputSearch =  page.getByRole('textbox', { name: 'Tên chức vụ' })
        this.msgNameRequired = page.locator("//div[contains(text(),'Nhập tên chức vụ')]");
        this.nameInput =  page.getByRole('textbox', { name: 'Tên chức vụ' }).first();
        this.positionsButton = page.locator("//div[contains(text(),'Chức vụ')]");
    }

    async checkSearchNameResult() {
        await this.safeVerifyToHaveText(this.searchNameResult, "Project Manager");
    }

    async checkMsgNameRequired() {
        await this.safeVerifyToHaveText(this.msgNameRequired, "Nhập tên chức vụ");
    }

    async inputNameSearch(name: string) {
        await this.safeFill(this.nameInputSearch, name);
    }

    async inputName(name: string) {
        await this.safeFill(this.nameInput, name);
    }

    async clickPositions() {
        await this.safeClick(this.positionsButton);
    }
}
