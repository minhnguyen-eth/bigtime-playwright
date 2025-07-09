import { Locator, Page, expect } from 'playwright/test';
import { BasePage } from './BasePage';

export class PositionPage extends BasePage {
   
    readonly positionsButton: Locator;
    readonly nameInput: Locator;
    readonly noteInput: Locator;
    readonly msgNameRequired: Locator;
    readonly statusDropdown: Locator;
    readonly lockStatus: Locator;
    readonly nameExistError: Locator;
    readonly nameInputSearch: Locator;
    readonly searchNameResult: Locator;

    constructor(page: Page) {
        super(page);
        this.searchNameResult = page.locator("//tbody/tr[@id='row-0']/td[2]//span[.='Project manager']");
        this.nameInputSearch = page.locator("//form/div/div[1]/div/div/div/div[3]/div/input");
        this.nameExistError = page.locator("//li[contains(text(),'Tên đã tồn tại.')]");
        this.lockStatus = page.locator("//div[contains(text(),'Khóa')]");
        this.statusDropdown = page.locator("//i[@class='mdi-book-lock-open-outline mdi v-icon notranslate v-theme--lightColor7 v-icon--size-default']");
        this.msgNameRequired = page.locator("//div[contains(text(),'Nhập tên chức vụ')]");
        this.noteInput = page.locator("//textarea");
        this.nameInput = page.locator("//div/div[1]/div/div/div/div[4]/div/input");
        this.positionsButton = page.locator("//div[contains(text(),'Chức vụ')]");
    }

    async checkSearchNameResult() {
        await this.safeVerifyToHaveText(this.searchNameResult, "Project manager");
    }

    async checkNameExistError() {
        await this.safeVerifyToHaveText(this.nameExistError, "Tên đã tồn tại.");
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

    async inputNote(note: string) {
        await this.safeFill(this.noteInput, note);
    }

    async clickLockStatus() {
        await this.safeClick(this.lockStatus);
    }

    async clickPositions() {
        await this.safeClick(this.positionsButton);
    }

    async clickSatatusDropdown() {
        await this.safeClick(this.statusDropdown);
    }
}