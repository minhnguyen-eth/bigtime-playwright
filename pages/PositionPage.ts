import { Locator, Page, expect } from 'playwright/test';

export class PositionPage {
    readonly page: Page;
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
        this.page = page;
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
        await expect(this.searchNameResult).toBeVisible();
        await expect(this.searchNameResult).toHaveText("Project manager");
    }

    async inputNameSearch(name: string) {
        await this.nameInputSearch.fill(name);
    }

    async checkNameExistError() {
        await expect(this.nameExistError).toBeVisible();
        await expect(this.nameExistError).toHaveText("Tên đã tồn tại.");
    }

    async clickLockStatus() {
        await this.lockStatus.click();
    }

    async checkMsgNameRequired() {
        await expect(this.msgNameRequired).toBeVisible();
        await expect(this.msgNameRequired).toHaveText("Nhập tên chức vụ");
    }

    async inputName(name: string) {
        await this.nameInput.fill(name);
    }
    async inputNote(note: string) {
        await this.noteInput.fill(note);
    }

    async clickPositions() {
        await this.positionsButton.click();
    }

    async clickSatatusDropdown() {
        await this.statusDropdown.click();
    }
}