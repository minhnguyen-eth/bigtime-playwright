import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../BasePage";

export class TermPage extends BasePage {
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
        super(page);
        this.validateNameDuplicate = page.locator("//li[contains(text(),'Tiêu đề đã tồn tại.')]");
        this.validateMaxLengthName = page.locator("//div[contains(text(),'Không nhập quá 255 kí tự.')]");
        this.lockStatus = page.locator("//div[contains(text(),'Khóa')]");
        this.dropdownStatus = page.locator("(//div[contains(@class, 'v-field') and contains(@class, 'v-field--active')]//i[contains(@class, 'mdi-menu-down')])[3]");
        this.validateName = page.locator("//div[contains(text(),'Nhập tiêu đề')]");
        this.validateContent = page.locator("//div[contains(text(),'Nhập nội dung')]");
        this.contentInput = page.locator("//div[2]/div/div[2]/div/div/div/div[3]/textarea");
        this.nameInput = page.locator("//div[2]/div/div[1]/div/div[1]/div/div[3]/div/input");
        this.termButton = page.locator("//div[contains(text(),'Điều khoản')]");
    }

    async validateNameDuplicateError() {
        await this.safeVerifyToHaveText(this.validateNameDuplicate, 'Tiêu đề đã tồn tại.');
    }

    async validateMaxLengthNameError() {
        await this.safeVerifyToHaveText(this.validateMaxLengthName, 'Không nhập quá 255 kí tự.');
    }

    async validateNameError() {
        await this.safeVerifyToHaveText(this.validateName, 'Nhập tiêu đề');
    }

    async validateContentError() {
        await this.safeVerifyToHaveText(this.validateContent, 'Nhập nội dung');
    }

    async clickLockStatus() {
        await this.safeClick(this.lockStatus);
    }

    async clickDropdownStatus() {
        await this.safeClick(this.dropdownStatus);
    }

    async fillName(name: string) {
        await this.safeFill(this.nameInput, name);
    }

    async fillContent(content: string) {
        await this.safeFill(this.contentInput, content);
    }

    async clickTerm() {
        await this.safeClick(this.termButton);  
    }
}
