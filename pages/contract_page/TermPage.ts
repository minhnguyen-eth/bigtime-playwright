import { Locator, Page, expect } from "@playwright/test";

export class TermPage {
    readonly page: Page;
    readonly termButton: Locator;
    readonly nameInput: Locator;
    readonly contentInput: Locator;
    readonly validateContent: Locator;
    readonly validateName: Locator;
    readonly validateMaxLengthName: Locator;
    readonly validateNameDuplicate: Locator;
    readonly dropdownStatus: Locator;
    readonly lockStatus: Locator;

    constructor(page: Page) {
        this.page = page;
        this.validateNameDuplicate = page.locator("//li[contains(text(),'Tiêu đề đã tồn tại.')]");
        this.validateMaxLengthName = page.locator("//div[contains(text(),'Không nhập quá 255 kí tự.')]");
        this.lockStatus = page.locator("//div[contains(text(),'Khóa')]");
        this.dropdownStatus = page.locator("//div[@class='v-field v-field--active v-field--appended v-field--center-affix v-field--dirty v-field--prepended v-field--variant-outlined v-theme--lightColor7 v-locale--is-ltr']//i[@class='mdi-menu-down mdi v-icon notranslate v-theme--lightColor7 v-icon--size-default v-select__menu-icon']");
        this.validateName = page.locator("//div[contains(text(),'Nhập tiêu đề')]");
        this.validateContent = page.locator("//div[contains(text(),'Nhập nội dung')]");
        this.contentInput = page.locator("//div[2]/div/div[2]/div/div/div/div[3]/textarea");
        this.nameInput = page.locator("//div[2]/div/div[1]/div/div[1]/div/div[3]/div/input");
        this.termButton = page.locator("//div[contains(text(),'Điều khoản')]");
    }

    async validateNameDuplicateError() {
        await expect(this.validateNameDuplicate).toBeVisible();
        await expect(this.validateNameDuplicate).toHaveText('Tiêu đề đã tồn tại.');
    }

    async validateMaxLengthNameError() {
        await expect(this.validateMaxLengthName).toBeVisible();
        await expect(this.validateMaxLengthName).toHaveText('Không nhập quá 255 kí tự.');
    }

    async validateNameError() {
        await expect(this.validateName).toBeVisible();
        await expect(this.validateName).toHaveText('Nhập tiêu đề');
    }

    async validateContentError() {
        await expect(this.validateContent).toBeVisible();
        await expect(this.validateContent).toHaveText('Nhập nội dung');
    }

    async clickLockStatus() {
        await this.lockStatus.click();
    }

    async clickDropdownStatus() {
        await this.dropdownStatus.click();
    }

    async fillName(name: string) {
        await this.nameInput.fill(name);
    }

    async fillContent(content: string) {
        await this.contentInput.fill(content);
    }

    async clickTerm() {
        await this.termButton.click();
    }
}

