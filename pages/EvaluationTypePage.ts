import { Locator, Page, expect } from "@playwright/test";

export class EvaluationTypePage {
    readonly page: Page;
    readonly evaluationTypeButton: Locator;
    readonly addButton: Locator;
    readonly evaluationTypeNameInput: Locator;
    readonly saveButton: Locator;
    readonly messageSuccess: Locator;
    readonly searchButton: Locator;
    readonly searchEvaluationTypeInput: Locator;
    readonly exptectedSearchEvaluationTypeName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.evaluationTypeButton = page.locator("//div[contains(text(),'Phân loại đánh giá')]");
        this.addButton = page.locator("//span[normalize-space()='Thêm']");
        this.evaluationTypeNameInput = page.locator("//div/div[1]/div/div[1]/div/div[4]/div/input");
        this.saveButton = page.locator("//span[.=' Lưu']");
        this.messageSuccess = page.locator("//div[contains(text(),'Thêm thành công')]")
        this.searchEvaluationTypeInput = page.locator("//div/div[1]/div/div/div/div[3]/div/input");
        this.searchButton = page.locator("//span[.=' Tìm kiếm']");
        this.exptectedSearchEvaluationTypeName = page.locator("//tr[@id='row-0']//span[contains(text(),'Đánh giá chuyên cần')]");
    }
    async expectSearchEvaluationTypeName(SearchName: string) {
        await expect(this.exptectedSearchEvaluationTypeName).toHaveText(SearchName);
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }

    async setSerachEvaluationTypeName(name: string) {
        await this.searchEvaluationTypeInput.fill(name);
        await expect(this.searchEvaluationTypeInput).toHaveValue(name);
    }

    async expectMessageSuccess() {
        await expect(this.messageSuccess).toHaveText('Thêm thành công');
    }

    async clickEvaluationType() {
        await this.evaluationTypeButton.click();
    }

    async clickAdd() {
        await this.addButton.click();
    }

    async setEvaluationTypeName(name: string) {
        await this.evaluationTypeNameInput.fill(name);
    }

    async clickSave() {
        await this.saveButton.click();
    }
}




