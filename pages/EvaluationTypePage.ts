import { Locator, Page, expect } from "@playwright/test";
import { Config } from "../utils/configUtils";


export class EvaluationTypePage {
    private page: Page;
    private evaluationTypeButton: Locator;
    private addButton: Locator;
    private evaluationTypeNameInput: Locator;
    private saveButton: Locator;
    private messageSuccess: Locator;

    constructor(page: Page) {
        this.page = page;
        this.evaluationTypeButton = page.locator("//div[contains(text(),'Phân loại đánh giá')]");
        this.addButton = page.locator("//span[normalize-space()='Thêm']");
        this.evaluationTypeNameInput = page.locator("//div/div[1]/div/div[1]/div/div[4]/div/input");
        this.saveButton = page.locator("//span[.=' Lưu']");
        this.messageSuccess = page.locator("//div[contains(text(),'Thêm thành công')]")
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
        await expect(this.evaluationTypeNameInput).toHaveValue(name);
    }


    async clickSave() {
        await this.saveButton.click();
    }


}




