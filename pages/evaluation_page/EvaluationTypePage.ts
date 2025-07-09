import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../BasePage";

export class EvaluationTypePage extends BasePage {
    readonly evaluationTypeButton: Locator;
    readonly evaluationTypeNameInput: Locator;
    readonly messageSuccess: Locator;
    readonly searchButton: Locator;
    readonly searchEvaluationTypeInput: Locator;
    readonly exptectedSearchEvaluationTypeName: Locator;
    readonly desciptionInput: Locator;
    readonly statusDropdown: Locator;
    readonly lockStatus: Locator;

    constructor(page: Page) {
        super(page);
        this.lockStatus = page.locator("//div[contains(text(),'Khóa')]");
        this.statusDropdown = page.locator("//div[2]/div/div[2]/div/div/div/div[4]/div");
        this.desciptionInput = page.locator("//div[2]/div/div[3]/div/div/div/div[3]/textarea");
        this.evaluationTypeButton = page.locator("//div[contains(text(),'Phân loại đánh giá')]");
        this.evaluationTypeNameInput = page.locator("//div/div[1]/div/div[1]/div/div[4]/div/input");
        this.messageSuccess = page.locator("//div[contains(text(),'Thêm thành công')]")
        this.searchEvaluationTypeInput = page.locator("//div/div[1]/div/div/div/div[3]/div/input");
        this.searchButton = page.locator("//span[.=' Tìm kiếm']");
        this.exptectedSearchEvaluationTypeName = page.locator("//tr[@id='row-0']//span[contains(text(),'Đánh giá chuyên cần')]");
    }

    async clickLockStatus() {
        await this.safeClick(this.lockStatus);
    }

    async clickStatusDropdown() {
        await this.safeClick(this.statusDropdown);
    }

    async fillDescription(description: string) {
        await this.safeFill(this.desciptionInput, description);
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




