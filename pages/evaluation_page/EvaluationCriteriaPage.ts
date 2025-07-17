import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../BasePage";

export class EvaluationCriteriaPage extends BasePage {
    readonly evaluationCriteria_Button: Locator;
    readonly evaluationCriteriaName_Input: Locator;
    readonly evaluationCriteriaName_DropDown: Locator;
    readonly evaluationType_Option: Locator;
    readonly evaluationName_inputSearch: Locator;
    readonly rusult_SearchByName: Locator;
    readonly result_SearchByStatus: Locator;
    readonly verifyLockStatusSearch: Locator;
    readonly verifyActivityStatus: Locator;
    readonly verifyLockStatus: Locator;
    readonly requiredCriteriaName: Locator;
    readonly requiredEvaluationTypeName: Locator;

    constructor(page: Page) {
        super(page);
        this.requiredEvaluationTypeName = page.locator("//div[contains(text(),'Nhập tên loại đánh giá')]");
        this.requiredCriteriaName = page.locator("//div[contains(text(),'Nhập tên tiêu chí')]");
        this.rusult_SearchByName = page.locator("//tbody/tr[@id='row-0']/td[2]/span[1]");
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

    async getVerifyLockStatus() {
        await this.safeVerifyToHaveText(this.verifyLockStatus, "Khóa");
    }


    async clickLockStatus() {
        await this.safeClick(this.lock_Status);
    }

    async getVerifyActivityStatus() {
        await this.safeVerifyToHaveText(this.verifyActivityStatus, "Hoạt động");
    }

    async getVerifyLockStatusSearch() {
        await this.safeVerifyToHaveText(this.verifyLockStatusSearch, "Khóa");
    }

    async selectStatus(status: string) {
        if (status == "Hoạt động") {
            await this.activity_Status.click();
        } else if (status == "Khóa") {
            await this.lock_Status.click();
        }
    }

    async verifyResultSearchByName() {
        await this.safeVerifyTextContains(this.rusult_SearchByName, "Automation test");
    }

    async searchEvaluationCriteriaName(evaluationCriteriaName: string) {
        await this.safeFill(this.evaluationName_inputSearch, evaluationCriteriaName);
    }

    async editEvaluationCriteriaName(evaluationCriteriaName: string) {
        await this.safeFill(this.evaluationName_inputSearch, evaluationCriteriaName);
    }

    async editDescription(description: string) {
        await this.safeFill(this.evaluationName_inputSearch, description);
        console.log("Edited description : " + description);
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




