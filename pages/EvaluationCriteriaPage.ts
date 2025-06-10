import { Locator, Page, expect } from "@playwright/test";


export class EvaluationCriteriaPage {
    private page: Page;
    readonly  evaluationCriteria_Button: Locator;
    readonly  add_Button: Locator;
    readonly  evaluationCriteriaName_Input: Locator;
    readonly  save_Button: Locator;
    readonly  description_Input: Locator;
    readonly  evaluationCriteriaName_DropDown: Locator;
    readonly  evaluationType_Option: Locator;
    readonly  toastAddSuccessful: Locator;
    readonly  toastDeleteSuccessful: Locator;
    readonly  edit_Button: Locator;
    readonly  toastEditSuccessful: Locator;
    readonly  delete_Button: Locator;
    readonly  OK_Button: Locator;
    readonly  evaluationName_inputSearch: Locator;
    readonly  search_Button: Locator;
    readonly  rusult_SearchByName: Locator;
    readonly  status_Search_Button: Locator;
    readonly  activity_Status: Locator;
    readonly  lock_Status: Locator;
    readonly  result_SearchByStatus: Locator;
    readonly  delete_Search: Locator;


    constructor(page: Page) {
        this.page = page;
        this.delete_Search = page.locator("//span[.=' Xóa']");
        this.result_SearchByStatus = page.locator("//tr[@id='row-0']//span[@class='custom-size'][contains(text(),'Hoạt động')]");
        this.lock_Status = page.locator("//div[contains(text(),'Khóa')]");
        this.activity_Status = page.locator("//div[contains(text(),'Hoạt động')]");
        this.status_Search_Button = page.locator("//div[@class='v-field v-field--appended v-field--center-affix v-field--variant-outlined v-theme--lightColor7 v-locale--is-ltr']//div[@class='v-field__input']");
        this.rusult_SearchByName = page.locator("//tbody/tr[@id='row-0']/td[2]/span[1]");
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

    async clickDeleteSearch() {
        await this.delete_Search.click();
    }

    async verifyResultSearchByStatus(text: string) {
        await expect(this.result_SearchByStatus).toHaveText(text);
        console.log("Kết quả tìm kiếm: " + text);
    }

    async clickStatusDropDown() {
        await this.status_Search_Button.click();
    }

    async selectStatus(status: string) {
        if (status == "Hoạt động") {
            await this.activity_Status.click();
        } else if (status == "Khóa") {
            await this.lock_Status.click();
        }
    }

   async verifyResultSearchByName() {
    await expect(this.rusult_SearchByName).toContainText('Automation test');
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


    async clickEvaluationCriteriaNameDropDown() {
        await this.evaluationCriteriaName_DropDown.click();
    }

    async clickEvaluationCriteria() {
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




