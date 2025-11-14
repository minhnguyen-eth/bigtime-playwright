import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../BasePage";

export class EvaluationCriteriaPage extends BasePage {
    readonly EVALUATION_CRITERIA_BUTTON: Locator;
    readonly EVALUATION_CRITERIA_NAME_INPUT: Locator;
    readonly EVALUATION_CRITERIA_NAME_DROPDOWN: Locator;
    readonly EVALUATION_TYPE_OPTION: Locator;
    readonly EVALUATION_NAME_INPUT_SEARCH: Locator;
    readonly RESULT_SEARCH_BY_NAME: Locator;
    readonly REQUIRED_CRITERIA_NAME: Locator;
    readonly REQUIRED_EVALUATION_TYPE_NAME: Locator;

    constructor(page: Page) {
        super(page);
        this.REQUIRED_EVALUATION_TYPE_NAME = page.locator("//div[contains(text(),'Nhập tên loại đánh giá')]");
        this.REQUIRED_CRITERIA_NAME = page.locator("//div[contains(text(),'Nhập tên tiêu chí')]");
        this.RESULT_SEARCH_BY_NAME = page.locator("//tbody/tr[@id='row-0']/td[2]/span[1]");
        this.EVALUATION_NAME_INPUT_SEARCH = page.locator("//div[1]/div/div/div/div[3]/div/input");
        this.EVALUATION_CRITERIA_BUTTON = page.locator("//div[contains(text(),'Tiêu chí đánh giá')]");
        this.EVALUATION_CRITERIA_NAME_INPUT = page.locator("//div/div[1]/div/div[1]/div/div[4]/div/input");
        this.EVALUATION_CRITERIA_NAME_DROPDOWN = page.locator("//i[@title='Open']");
        this.EVALUATION_TYPE_OPTION = page.locator("//div/div[1]/div[1]/div[2]/div[2]/div[1]");
    }

    async getRequiredEvaluationTypeName() {
        await this.safeVerifyToHaveText(this.REQUIRED_EVALUATION_TYPE_NAME, "Nhập tên loại đánh giá");
    }

    async getRequiredCriteriaName() {
        await expect(this.REQUIRED_CRITERIA_NAME).toBeVisible();
        const text = await this.REQUIRED_CRITERIA_NAME.textContent();
        console.log("🔍 Required criteria name text found:", text);
        return text;
    }

    async verifyResultSearchByName() {
        await this.safeVerifyTextContains(this.RESULT_SEARCH_BY_NAME, "Automation test");
    }

    async searchEvaluationCriteriaName(evaluationCriteriaName: string) {
        await this.safeFill(this.EVALUATION_NAME_INPUT_SEARCH, evaluationCriteriaName);
    }

    async editEvaluationCriteriaName(evaluationCriteriaName: string) {
        await this.safeFill(this.EVALUATION_NAME_INPUT_SEARCH, evaluationCriteriaName);
    }

    async clickEvaluationTypeOption() {
        await this.safeClick(this.EVALUATION_TYPE_OPTION);
    }

    async clickEvaluationCriteriaNameDropDown() {
        await this.safeClick(this.EVALUATION_CRITERIA_NAME_DROPDOWN);
    }

    async clickEvaluationCriteria() {
        await this.safeClick(this.EVALUATION_CRITERIA_BUTTON);
    }

    async setEvaluationCriteriaName(evaluationCriteriaName: string) {
        await this.safeFill(this.EVALUATION_CRITERIA_NAME_INPUT, evaluationCriteriaName);
    }
}
