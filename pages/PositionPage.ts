import { Locator, Page } from 'playwright/test';
import { BasePage } from './BasePage';

export class PositionPage extends BasePage {
    readonly POSITIONS_BUTTON: Locator;
    readonly NAME_INPUT: Locator;
    readonly MSG_NAME_REQUIRED: Locator;
    readonly NAME_INPUT_SEARCH: Locator;
    readonly SEARCH_NAME_RESULT: Locator;

    constructor(page: Page) {
        super(page);
        this.SEARCH_NAME_RESULT = page.locator("//tr[@id='row-0']//span[contains(text(),'Project Manager')]");
        this.NAME_INPUT_SEARCH = page.getByRole('textbox', { name: 'Tên chức vụ' });
        this.MSG_NAME_REQUIRED = page.locator("//div[contains(text(),'Nhập tên chức vụ')]");
        this.NAME_INPUT = page.getByRole('textbox', { name: 'Tên chức vụ' }).first();
        this.POSITIONS_BUTTON = page.locator("//div[contains(text(),'Chức vụ')]");
    }

    async checkSearchNameResult() {
        await this.safeVerifyToHaveText(this.SEARCH_NAME_RESULT, "Project Manager");
    }

    async checkMsgNameRequired() {
        await this.safeVerifyToHaveText(this.MSG_NAME_REQUIRED, "Nhập tên chức vụ");
    }

    async inputNameSearch(name: string) {
        await this.safeFill(this.NAME_INPUT_SEARCH, name);
    }

    async inputName(name: string) {
        await this.safeFill(this.NAME_INPUT, name);
    }

    async clickPositions() {
        await this.safeClick(this.POSITIONS_BUTTON);
    }
}
