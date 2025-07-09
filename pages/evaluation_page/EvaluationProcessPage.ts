import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";


export class EvaluationProcessPage extends BasePage {
    readonly evaluationProcessButton: Locator;
    readonly employyeEvaluationInput: Locator;
    readonly employeeEvaluationOption: Locator;
    readonly evaluationTypeDropDown: Locator;
    readonly evaluationTypeOption1: Locator;
    readonly evaluationTypeOption2: Locator;
    readonly startTime: Locator;
    readonly endTime: Locator;
    readonly evaluationForm: Locator;
    readonly departmentForm: Locator;
    readonly cancelButton: Locator;
    readonly iconAction: Locator;
    readonly evaluationButton: Locator;
    readonly listEvaluationButton: Locator;
    readonly waitEvaluationStatus: Locator;

    constructor(page: Page) {
        super(page);
        this.waitEvaluationStatus = page.locator("//div[normalize-space()='Chờ đánh giá']");
        this.listEvaluationButton = page.locator("//div[@class='v-list-item-title'][contains(text(),'Danh sách đánh giá')]");
        this.evaluationButton = page.locator("//span[normalize-space()='Đánh giá']");
        this.iconAction = page.locator("//tr[@id='row-0']//i[@class='mdi mdi-format-list-group mdi v-icon notranslate v-theme--lightColor7 v-icon--size-default']");
        this.cancelButton = page.locator("//span[contains(normalize-space(),'Hủy')]");
        this.departmentForm = page.locator("//div[@role='option']//div[@class='v-list-item-title'][contains(text(),'Bộ phận')]");
        this.evaluationForm = page.locator("//div[@class='v-input v-input--horizontal v-input--center-affix v-input--density-compact v-theme--lightColor7 v-locale--is-ltr v-input--dirty v-text-field v-select v-select--single v-select--selected custom-select']//div[@class='v-field__input']");
        this.endTime = page.locator("//div[4]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.startTime = page.locator("//div[3]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.evaluationTypeOption1 = page.locator("//div[text()='Đánh giá chuyên cần']");
        this.evaluationTypeOption2 = page.locator("//div[text()='Đánh giá đạo đức']");
        this.evaluationTypeDropDown = page.locator("//div[2]/div/div[2]/div/div/div/div[3]/div/input");
        this.employeeEvaluationOption = page.locator("//div[@role='option']//div[@class='v-list-item-title']");
        this.employyeEvaluationInput = page.locator("//div[2]/div/div[1]/div/div[1]/div/div[3]/div/input");
        this.evaluationProcessButton = page.locator("//div[contains(text(),'Quy trình đánh giá')]");
    
    }

    async getWaitEvaluationStatus() {
        await this.safeVerifyToHaveText(this.waitEvaluationStatus, "Chờ đánh giá");
    }

    async clickListEvaluationButton() {
        await this.safeClick(this.listEvaluationButton);
    }

    async clickEvaluationButton() {
        await this.safeClick(this.evaluationButton);
    }

    async clickEvaluationTypeOption2() {
        await this.safeClick(this.evaluationTypeOption2);
    }

    async clickIconAction() {
        await this.safeClick(this.iconAction);
    }

    async clickEvaluationTypeOption1() {
        await this.safeClick(this.evaluationTypeOption1);
    }

    async clickEndTime() {
        await this.safeClick(this.endTime);
    }

    async clickStartTime() {
        await this.safeClick(this.startTime);
    }

    async clickEvaluationForm() {
        await this.safeClick(this.evaluationForm);
    }

    async clickDepartmentForm() {
        await this.safeClick(this.departmentForm);
    }

    async clickEmployeeEvaluationOption() {
        await this.safeClick(this.employeeEvaluationOption);
    }

    async clickEvaluationTypeDropDown() {
        await this.safeClick(this.evaluationTypeDropDown);
    }

    async fillEmployeeEvaluationInput(Text: string) {
        await this.safeFill(this.employyeEvaluationInput, Text);
    }

    async clickEvaluationProcessButton() {
        await this.safeClick(this.evaluationProcessButton);
    }
}




