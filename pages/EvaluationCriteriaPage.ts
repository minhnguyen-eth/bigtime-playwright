import { Locator, Page, expect } from "@playwright/test";


export class EvaluationCriteriaPage {
    private page: Page;
    private evaluationCriteria_Button: Locator;
    private add_Button: Locator;
    private evaluationCriteriaName_Input: Locator;
    private save_Button: Locator;
    private description_Input: Locator;
    private evaluationCriteriaName_DropDown: Locator;
    private evaluationType_Option: Locator;
    private toastAddSuccessful: Locator;
    private toastDeleteSuccessful: Locator;
    private edit_Button: Locator;
    private toastEditSuccessful: Locator;
    private delete_Button: Locator;
    private OK_Button: Locator;
    private evaluationName_inputSearch: Locator;
    private search_Button: Locator;


    constructor(page: Page) {
        this.page = page;
        this.search_Button = page.locator("//span[.=' Tìm kiếm']");
        this.evaluationName_inputSearch = page.locator("//div[1]/div/div/div/div[3]/div/input");
        this.OK_Button = page.locator("//span[normalize-space()='Có']");
        this.delete_Button = page.locator("//tr[@id='row-0']//span[contains(text(),'Xóa')]");
        this.toastEditSuccessful = page.locator("//div[contains(text(),'Cập nhật thành công')]");
        this.edit_Button = page.locator("//tr[@id='row-0']//span[contains(text(),'Sửa')]");
        this.toastDeleteSuccessful = page.locator("//div[contains(text(),'Xóa thành công')]");
        this.toastAddSuccessful = page.locator("//div[contains(text(),'Thêm thành công')]");
        this.evaluationCriteria_Button = page.locator("//div[contains(text(),'Tiêu chí đánh giá')]");
        this.add_Button = page.locator("//span[normalize-space()='Thêm']");
        this.evaluationCriteriaName_Input = page.locator("//div/div[1]/div/div[1]/div/div[4]/div/input");
        this.description_Input = page.locator("//div/div[2]/div/div/div/div[3]/textarea");
        this.save_Button = page.locator("//span[normalize-space()='Lưu']");
        this.evaluationCriteriaName_DropDown = page.locator("//i[@title='Open']");
        this.evaluationType_Option = page.locator("//div/div[1]/div[1]/div[2]/div[2]/div[1]");

    }

    async clickSearchButton() {
        await this.search_Button.click();
    }

    async searchEvaluationCriteriaName(evaluationCriteriaName: string) {
        await this.evaluationName_inputSearch.fill(evaluationCriteriaName);
    }

    async clickOKButton() {
        await this.OK_Button.click();
    }

    async clickDelete() {
        await this.delete_Button.click();
    }

    async editEvaluationCriteriaName(evaluationCriteriaName: string) {
        await this.evaluationCriteriaName_Input.clear();
        await this.evaluationCriteriaName_Input.fill(evaluationCriteriaName);
        console.log("Đã sửa tên tiêu chí đánh giá: " + evaluationCriteriaName);
    }

    async editDescription(description: string) {
        await this.description_Input.clear();
        await this.description_Input.fill(description);
        console.log("Đã sửa mô tả: " + description);
    }

    async clickEditButton() {
        await this.edit_Button.click();
    }
    async verifyToastEditSuccessfull(text: string) {
        await expect(this.toastEditSuccessful).toHaveText(text);
    }

    async verifyToastAddSuccessfull(text: string) {
        await expect(this.toastAddSuccessful).toHaveText(text);
        console.log("Đã thêm thành công: " + text);
    }
    async verifyToastDeleteSuccessfull(text: string) {
        await expect(this.toastDeleteSuccessful).toHaveText(text);
        console.log("Đã xóa thành công: " + text);
    }

    async clickEvaluationTypeOption() {
    await this.evaluationType_Option.click();
}

    async setDescription(description: string) {
        await this.description_Input.fill(description);
    }

    async clickEvaluationCriteria() {
        await this.evaluationCriteria_Button.click();
    }

    async clickEvaluationCriteriaNameDropDown() {
        await this.evaluationCriteriaName_DropDown.click();
    }

    async clickEvaluationType() {
        await this.evaluationCriteria_Button.click();
    }
    async clickAddButton() {
        await this.add_Button.click();
    }

    async setEvaluationCriteriaName(evaluationCriteriaName: string) {
        await this.evaluationCriteriaName_Input.fill(evaluationCriteriaName);
    }

    async clickSave() {
        await this.save_Button.click();
    }

   

}




