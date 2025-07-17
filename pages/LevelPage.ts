import { Locator, Page } from 'playwright/test';
import { BasePage } from './BasePage';

export class LevelPage extends BasePage {
    readonly levelButton: Locator
    readonly levelName: Locator
    readonly levelCode: Locator
    readonly validateName: Locator
    readonly validateCode: Locator
    readonly validateCodeExist: Locator
    readonly searchByName: Locator
    readonly searchByCode: Locator
    readonly searchByNameResult: Locator
    readonly searchByCodeResult: Locator;

    constructor(page: Page) {
        super(page);
        this.searchByCode = page.getByRole('textbox', { name: 'Mã cấp bậc' });
        this.searchByName = page.getByRole('textbox', { name: 'Tên cấp bậc' });
        this.searchByCodeResult = page.locator("//tr[@id='row-0']/td[3]//span[contains(text(),'Fresher')]");
        this.searchByNameResult = page.locator("//tr[@id='row-0']/td[2]//span[contains(text(),'Fresher')]");
        this.validateCode = page.locator("//div[contains(text(),'Nhập mã cấp bậc')]");
        this.validateCodeExist = page.locator("//li[contains(text(),'Mã cấp bậc đã tồn tại.')]");
        this.validateName = page.locator("//div[contains(text(),'Nhập tên cấp bậc')]");
        this.levelCode = page.getByRole('textbox', { name: 'Mã cấp bậc ※' });
        this.levelName = page.getByRole('textbox', { name: 'Tên cấp bậc ※' });
        this.levelButton = page.locator("//div[contains(text(),'Cấp bậc')]");
    }

    // VERIFY
    async expectSearchByNameResult() {
        await this.safeVerifyToHaveText(this.searchByNameResult, "Fresher");
    }

    async expectSearchByCodeResult() {
        await this.safeVerifyToHaveText(this.searchByCodeResult, "Fresher");
    }

    async expectValidateCodeRequired() {
        await this.safeVerifyToHaveText(this.validateCode, "Nhập mã cấp bậc");
    }

    async expectValidateCodeExist() {
        await this.safeVerifyToHaveText(this.validateCodeExist, "Mã cấp bậc đã tồn tại.");
    }

    async expectValidateNameRequired() {
        await this.safeVerifyToHaveText(this.validateName, "Nhập tên cấp bậc");
    }

    // FILL
    async fillSearchByName(name: string) {
        await this.safeFill(this.searchByName, name);
    }

    async fillSearchByCode(code: string) {
        await this.safeFill(this.searchByCode, code);
    }

    async fillCode(code: string) {
        await this.safeFill(this.levelCode, code);
    }

    async fillLevelName(level: string) {
        await this.safeFill(this.levelName, level);
    }

    // CLICK
    async clickLevel() {
        await this.safeClick(this.levelButton);
    }
}
