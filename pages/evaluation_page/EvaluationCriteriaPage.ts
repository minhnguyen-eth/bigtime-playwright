import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../BasePage";

export class EvaluationCriteriaPage extends BasePage {
    readonly evaluationCriteria_Button: Locator;
    readonly evaluationCriteriaName_Input: Locator;
    readonly evaluationCriteriaName_DropDown: Locator;
    readonly evaluationType_Option: Locator;
    readonly evaluationName_inputSearch: Locator;
    readonly resultSearchByName: Locator;
    readonly requiredCriteriaName: Locator;
    readonly requiredEvaluationTypeName: Locator;

    constructor(page: Page) {
        super(page);
        this.requiredEvaluationTypeName = page.locator("//div[contains(text(),'Nhập tên loại đánh giá')]");
        this.requiredCriteriaName = page.locator("//div[contains(text(),'Nhập tên tiêu chí')]");
        this.resultSearchByName = page.locator("//tbody/tr[@id='row-0']/td[2]/span[1]");
        this.evaluationName_inputSearch = page.locator("//div[1]/div/div/div/div[3]/div/input");
        this.evaluationCriteria_Button = page.locator("//div[contains(text(),'Tiêu chí đánh giá')]");
        this.evaluationCriteriaName_Input = page.locator("//div/div[1]/div/div[1]/div/div[4]/div/input");
        this.evaluationCriteriaName_DropDown = page.locator("//i[@title='Open']");
        this.evaluationType_Option = page.locator("//div/div[1]/div[1]/div[2]/div[2]/div[1]");
    }

    async getRequiredEvaluationTypeName() {
        await this.safeVerifyToHaveText(this.requiredEvaluationTypeName, "Nhập tên loại đánh giá");
    }

    async getRequiredCriteriaName() {
        await expect(this.requiredCriteriaName).toBeVisible();
        const text = await this.requiredCriteriaName.textContent();
        console.log("🔍 Required criteria name text found:", text);
        return text;
    }

    async verifyResultSearchByName() {
        await this.safeVerifyTextContains(this.resultSearchByName, "Automation test");
    }

    async searchEvaluationCriteriaName(evaluationCriteriaName: string) {
        await this.safeFill(this.evaluationName_inputSearch, evaluationCriteriaName);
    }

    async editEvaluationCriteriaName(evaluationCriteriaName: string) {
        await this.safeFill(this.evaluationName_inputSearch, evaluationCriteriaName);
    }

    async clickEvaluationTypeOption() {
        await this.safeClick(this.evaluationType_Option);
    }

    async clickEvaluationCriteriaNameDropDown() {
        await this.safeClick(this.evaluationCriteriaName_DropDown);
    }

    async clickEvaluationCriteria() {
        await this.safeClick(this.evaluationCriteria_Button);
    }

    async setEvaluationCriteriaName(evaluationCriteriaName: string) {
        await this.safeFill(this.evaluationCriteriaName_Input, evaluationCriteriaName);
    }
}
