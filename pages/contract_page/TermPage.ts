import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class TermPage extends BasePage {
    readonly termButton: Locator;
    readonly nameInput: Locator;
    readonly contentInput: Locator;
    readonly validateContent: Locator;
    readonly validateName: Locator;
    readonly validateMaxLengthName: Locator;
    readonly validateNameDuplicate: Locator;

    constructor(page: Page) {
        super(page);
        this.validateNameDuplicate = page.locator("//li[contains(text(),'Tiêu đề đã tồn tại.')]");
        this.validateMaxLengthName = page.locator("//div[contains(text(),'Không nhập quá 255 kí tự.')]");
        this.validateName = page.locator("//div[contains(text(),'Nhập tiêu đề')]");
        this.validateContent = page.locator("//div[contains(text(),'Nhập nội dung')]");
        this.contentInput = page.getByRole('textbox', {name: 'Nội dung ※'})
        this.nameInput = page.getByRole('textbox', { name: 'Tiêu đề ※' });
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
