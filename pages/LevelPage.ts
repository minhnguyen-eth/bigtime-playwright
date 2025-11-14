import { Locator, Page } from 'playwright/test';
import { BasePage } from './BasePage';

export class LevelPage extends BasePage {

    readonly LEVEL_BUTTON: Locator;
    readonly LEVEL_NAME: Locator;
    readonly LEVEL_CODE: Locator;
    readonly VALIDATE_NAME: Locator;
    readonly VALIDATE_CODE: Locator;
    readonly VALIDATE_CODE_EXIST: Locator;
    readonly SEARCH_BY_NAME: Locator;
    readonly SEARCH_BY_CODE: Locator;
    readonly SEARCH_BY_NAME_RESULT: Locator;
    readonly SEARCH_BY_CODE_RESULT: Locator;

    constructor(page: Page) {
        super(page);
        this.SEARCH_BY_CODE = page.getByRole('textbox', { name: 'Mã cấp bậc' });
        this.SEARCH_BY_NAME = page.getByRole('textbox', { name: 'Tên cấp bậc' });
        this.SEARCH_BY_CODE_RESULT = page.locator("//tr[@id='row-0']/td[3]//span[contains(text(),'Fresher')]");
        this.SEARCH_BY_NAME_RESULT = page.locator("//tr[@id='row-0']/td[2]//span[contains(text(),'Fresher')]");
        this.VALIDATE_CODE = page.locator("//div[contains(text(),'Nhập mã cấp bậc')]");
        this.VALIDATE_CODE_EXIST = page.locator("//li[contains(text(),'Mã cấp bậc đã tồn tại.')]");
        this.VALIDATE_NAME = page.locator("//div[contains(text(),'Nhập tên cấp bậc')]");
        this.LEVEL_CODE = page.getByRole('textbox', { name: 'Mã cấp bậc ※' });
        this.LEVEL_NAME = page.getByRole('textbox', { name: 'Tên cấp bậc ※' });
        this.LEVEL_BUTTON = page.locator("//div[contains(text(),'Cấp bậc')]");
    }

    // VERIFY
    async expectSearchByNameResult() {
        await this.safeVerifyToHaveText(this.SEARCH_BY_NAME_RESULT, "Fresher");
    }

    async expectSearchByCodeResult() {
        await this.safeVerifyToHaveText(this.SEARCH_BY_CODE_RESULT, "Fresher");
    }

    async expectValidateCodeRequired() {
        await this.safeVerifyToHaveText(this.VALIDATE_CODE, "Nhập mã cấp bậc");
    }

    async expectValidateCodeExist() {
        await this.safeVerifyToHaveText(this.VALIDATE_CODE_EXIST, "Mã cấp bậc đã tồn tại.");
    }

    async expectValidateNameRequired() {
        await this.safeVerifyToHaveText(this.VALIDATE_NAME, "Nhập tên cấp bậc");
    }

    // FILL
    async fillSearchByName(name: string) {
        await this.safeFill(this.SEARCH_BY_NAME, name);
    }

    async fillSearchByCode(code: string) {
        await this.safeFill(this.SEARCH_BY_CODE, code);
    }

    async fillCode(code: string) {
        await this.safeFill(this.LEVEL_CODE, code);
    }

    async fillLevelName(level: string) {
        await this.safeFill(this.LEVEL_NAME, level);
    }

    // CLICK
    async clickLevel() {
        await this.safeClick(this.LEVEL_BUTTON);
    }
}
