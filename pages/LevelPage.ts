import { Locator, Page, expect } from 'playwright/test';

export class LevelPage {
    readonly page: Page;
    readonly levelButton: Locator
    readonly levelName: Locator
    readonly levelCode: Locator
    readonly noteInput: Locator
    readonly validateName: Locator
    readonly validateCode: Locator
    readonly validateCodeExist: Locator
    readonly searchByName: Locator
    readonly searchByCode: Locator
    readonly searchByNameResult: Locator
    readonly searchByCodeResult: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchByCode = page.locator("//form/div/div[2]/div/div/div/div[3]/div/input");
        this.searchByCodeResult = page.locator("//tr[@id='row-0']/td[3]//span[contains(text(),'Fresher')]");
        this.searchByNameResult = page.locator("//tr[@id='row-0']/td[2]//span[contains(text(),'Fresher')]");
        this.searchByName = page.locator("//form/div/div[1]/div/div/div/div[3]/div/input");
        this.validateCode = page.locator("//div[contains(text(),'Nhập mã cấp bậc')]");
        this.validateCodeExist = page.locator("//li[contains(text(),'Mã cấp bậc đã tồn tại.')]");
        this.validateName = page.locator("//div[contains(text(),'Nhập tên cấp bậc')]");
        this.noteInput = page.locator("//textarea");
        this.levelCode = page.locator("//div[2]/div/div/div/div[4]/div/input");
        this.levelName = page.locator("//div[1]/div/div/div/div[4]/div/input");
        this.levelButton = page.locator("//div[contains(text(),'Cấp bậc')]");
    }

    async expectSearchByNameResult() {
        await expect(this.searchByNameResult).toBeVisible();
        await expect(this.searchByNameResult).toHaveText("Fresher");
    }

    async expectSearchByCodeResult() {
        await expect(this.searchByCodeResult).toBeVisible();
        await expect(this.searchByCodeResult).toHaveText("Fresher");
    }

    async fillSearchByName(name: string) {
        await this.searchByName.fill(name);
    }

    async fillSearchByCode(code: string) {
        await this.searchByCode.fill(code);
    }

    async expectValidateCodeRequired() {
        await expect(this.validateCode).toBeVisible();
        await expect(this.validateCode).toHaveText("Nhập mã cấp bậc");
    }

    async expectValidateCodeExist() {
        await expect(this.validateCodeExist).toBeVisible();
        await expect(this.validateCodeExist).toHaveText("Mã cấp bậc đã tồn tại.");
    }

    async expectValidateNameRequired() {
        await expect(this.validateName).toBeVisible();
        await expect(this.validateName).toHaveText("Nhập tên cấp bậc");
    }

    async fillNote(note: string) {
        await this.noteInput.fill(note);
    }

    async fillCode(code: string) {
        await this.levelCode.fill(code);
    }

    async fillLevelName(level: string) {
        await this.levelName.fill(level);
    }

    async clickLevel() {
        await this.levelButton.click();
    }
}
