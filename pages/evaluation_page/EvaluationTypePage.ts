import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../BasePage";

export class EvaluationTypePage extends BasePage {
    readonly evaluationTypeButton: Locator;
    readonly evaluationTypeNameInput: Locator;
    readonly searchEvaluationTypeInput: Locator;
    readonly exptectedSearchEvaluationTypeName: Locator;
    readonly desciptionInput: Locator;
   
    constructor(page: Page) {
        super(page);
        this.desciptionInput = page.getByRole('textbox', { name: 'Mô tả chi tiết' })
        this.evaluationTypeButton = page.locator("//div[contains(text(),'Phân loại đánh giá')]");
        this.evaluationTypeNameInput = page.getByRole('textbox', { name: 'Tên loại đánh giá ※' })
        this.searchEvaluationTypeInput = page.getByRole('textbox', { name: 'Tên loại đánh giá ' })
        this.exptectedSearchEvaluationTypeName = page.locator("//tr[@id='row-0']//span[contains(text(),'Đánh giá chuyên cần')]");
    }

    async expectSearchEvaluationTypeName(SearchName: string) {
        await this.safeVerifyToHaveText(this.exptectedSearchEvaluationTypeName, SearchName);
    }

    async setSerachEvaluationTypeName(name: string) {
        await this.safeFill(this.searchEvaluationTypeInput, name);
    }

    async clickEvaluationType() {
        await this.safeClick(this.evaluationTypeButton);
    }

    async setEvaluationTypeName(name: string) {
        await this.safeFill(this.evaluationTypeNameInput, name);
    }
}
