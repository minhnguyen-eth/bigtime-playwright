import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class TermPage extends BasePage {
    readonly TERM_BUTTON: Locator;
    readonly NAME_INPUT: Locator;
    readonly CONTENT_INPUT: Locator;
    readonly VALIDATE_CONTENT: Locator;
    readonly VALIDATE_NAME: Locator;
    readonly VALIDATE_MAX_LENGTH_NAME: Locator;
    readonly VALIDATE_NAME_DUPLICATE: Locator;

    constructor(page: Page) {
        super(page);
        this.VALIDATE_NAME_DUPLICATE = page.locator("//li[contains(text(),'Tiêu đề đã tồn tại.')]");
        this.VALIDATE_MAX_LENGTH_NAME = page.locator("//div[contains(text(),'Không nhập quá 255 kí tự.')]");
        this.VALIDATE_NAME = page.locator("//div[contains(text(),'Nhập tiêu đề')]");
        this.VALIDATE_CONTENT = page.locator("//div[contains(text(),'Nhập nội dung')]");
        this.CONTENT_INPUT = page.getByRole('textbox', {name: 'Nội dung ※'});
        this.NAME_INPUT = page.getByRole('textbox', { name: 'Tiêu đề ※' });
        this.TERM_BUTTON = page.locator("//div[contains(text(),'Điều khoản')]");
    }

    async validateNameDuplicateError() {
        await this.safeVerifyToHaveText(this.VALIDATE_NAME_DUPLICATE, 'Tiêu đề đã tồn tại.');
    }

    async validateMaxLengthNameError() {
        await this.safeVerifyToHaveText(this.VALIDATE_MAX_LENGTH_NAME, 'Không nhập quá 255 kí tự.');
    }

    async validateNameError() {
        await this.safeVerifyToHaveText(this.VALIDATE_NAME, 'Nhập tiêu đề');
    }

    async validateContentError() {
        await this.safeVerifyToHaveText(this.VALIDATE_CONTENT, 'Nhập nội dung');
    }

    async fillName(name: string) {
        await this.safeFill(this.NAME_INPUT, name);
    }

    async fillContent(content: string) {
        await this.safeFill(this.CONTENT_INPUT, content);
    }

    async clickTerm() {
        await this.safeClick(this.TERM_BUTTON);  
    }
}
