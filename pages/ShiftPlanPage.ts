import { Locator, Page, expect } from '@playwright/test';

export class ShiftPlanPage {

    readonly page: Page;
    readonly  toastAddSuccess: Locator;
    readonly  toastCancelSuccess: Locator;
    readonly  toastExportSuccess: Locator;
    readonly  searchButton: Locator;
    readonly  shiftPlanButton: Locator;
    readonly  addButton: Locator;
    readonly  shiftPlanNameInput: Locator;
    readonly  workShiftInput: Locator;
    readonly  startDateInput: Locator;
    readonly  endDateInput: Locator;
    readonly  saveButton: Locator;
    readonly  departmentButton: Locator;
    readonly  addDepartmentButton: Locator;
    readonly  departmentDropDown: Locator;
    readonly  departmentOption: Locator;
    readonly  saveDepartmentButton: Locator;
    readonly  saveWorkShiftButton: Locator;
    readonly  Day1Button: Locator;
    readonly  Day31Button: Locator;
    readonly  chosseButton: Locator;
    readonly  workShiftOption: Locator;
    readonly  searchEmployeeInput: Locator;
    readonly  employeeCheckbox: Locator;
    readonly  saveEmployeeButton: Locator;
    readonly  requiredFieldNameShift: Locator;
    readonly  requiredFieldNameWorkShift: Locator;
    readonly  logoutButton: Locator;
    readonly  logoutConfirmButton: Locator;
    readonly  editButton: Locator;
    readonly  deleteButton: Locator;
    readonly  chosseMonthButton: Locator;
    readonly  Month07Button: Locator;
    readonly  okButton: Locator;
    readonly  getToastDeleteSuccess: Locator;
    readonly  chooseMonthSearch: Locator;

    constructor(page: Page) {
        this.page = page;
        this.chooseMonthSearch = page.locator("//div/div[1]/div/div/div/div/div[1]/div/div/div[3]/input")
        this.okButton = page.locator("//span[normalize-space()='Có']")
        this.Month07Button = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='Thg 7']")
        this.chosseMonthButton = page.locator("button[aria-label='Open months overlay']")
        this.deleteButton = page.locator("//tr[@id='row-0']//span[contains(text(),'Xóa')]")
        this.editButton = page.locator("//span[contains(text(),'Sửa')]")
        this.logoutButton = page.locator('//div[contains(text(),"Đăng xuất")]');
        this.logoutConfirmButton = page.locator('//span[normalize-space()="Có"]');
        this.requiredFieldNameWorkShift = page.locator("//div[contains(text(),'Nhập ca làm việc')]")
        this.requiredFieldNameShift = page.locator("//div[contains(text(),'Nhập tên bảng phân ca')]")
        this.saveEmployeeButton = page.locator("//body/div[@class='v-overlay-container']/div[@role='dialog']/div[@class='v-overlay__content']/div[@class='v-card v-theme--lightColor7 v-card--density-default rounded-lg v-card--variant-elevated']/div[@class='v-card-actions justify-center']/button[1]/span[3]")
        this.employeeCheckbox = page.locator("//td[1]/div/div/div/input")
        this.searchEmployeeInput = page.locator("//div[3]/div[1]/div/div/div[2]/div/div/div/div[4]/div/input")
        this.saveButton = page.locator("//button[@class='v-btn v-btn--slim v-theme--lightColor7 bg-primary v-btn--density-default rounded-lg v-btn--size-small v-btn--variant-flat']//span[@class='v-btn__content']")
        this.workShiftOption = page.locator("//div[text()='Ca ngày']")
        this.chosseButton = page.locator("//button[contains(text(),'Chọn')]")
        this.Day31Button = page.locator("//div[@class='dp__cell_inner dp__pointer dp__date_hover'][normalize-space()='31']")
        this.Day1Button = page.locator("//div[@class='dp__cell_inner dp__pointer dp__date_hover'][normalize-space()='1']")
        this.saveWorkShiftButton = page.locator("button[class='v-btn v-btn--slim v-theme--lightColor7 bg-primary v-btn--density-default rounded-lg v-btn--size-small v-btn--variant-flat']")
        this.saveDepartmentButton = page.locator("//div[@class='v-overlay__content']/div[@class='v-card v-theme--lightColor7 v-card--density-default rounded-lg v-card--variant-elevated']/div[@class='v-card-actions justify-center']/button[1]/span[3]")
        this.departmentOption = page.locator("//div[text()='Bộ phận IT']")
        this.departmentDropDown = page.locator("//div[@class='v-input v-input--horizontal v-input--center-affix v-input--density-compact v-theme--lightColor7 v-locale--is-ltr v-text-field v-autocomplete v-autocomplete--single autocomplete-full-width autocomplete-fixed-height py-2']//i[@title='Open']")
        this.addDepartmentButton = page.locator("//button[@class='v-btn v-theme--lightColor7 text-blue v-btn--density-default rounded-lg v-btn--size-small v-btn--variant-outlined']//span[@class='v-btn__content'][normalize-space()='Thêm']")
        this.departmentButton = page.locator("//div[@class='v-overlay-container']//button[@value='1']//span[1]")
        this.endDateInput = page.locator("//div[6]/div/div/div/div/div[1]/div/div/div[3]/input")
        this.startDateInput = page.locator("//div[5]/div/div/div/div/div[1]/div/div/div[3]/input")
        this.workShiftInput = page.locator("//div[3]/div/div/div[2]/div[1]/div[3]/div/div/div/div[3]/div/input")
        this.shiftPlanNameInput = page.locator("//div[3]/div/div/div[2]/div[1]/div[2]/div/div/div/div[3]/div/input")
        this.addButton = page.locator("//span[normalize-space()='Thêm']")
        this.shiftPlanButton = page.locator("//div[contains(text(),'Phân ca nhanh')]")
        this.searchButton = page.locator("//span[contains(normalize-space(),'Tìm kiếm')]")

        // Toasts
        this.toastAddSuccess = page.locator('//div[contains(text(),"Thêm thành công")]');
        this.toastCancelSuccess = page.locator('//div[contains(text(),"Hủy thành công")]');
        this.getToastDeleteSuccess = page.locator('//div[contains(text(),"Xóa thành công")]');
    }

    async clickChooseMonthSearch(){
        await this.chooseMonthSearch.click()
    }

    async getToastDelete(text: string) {
        await expect(this.getToastDeleteSuccess).toHaveText(text);
        return this.getToastDeleteSuccess.textContent();
    }

    async clickOkButton() {
        await this.okButton.click();
    }

    async clickMonth07Button() {
        await this.Month07Button.click();
    }

    async clickChosseMonthButton() {
        await this.chosseMonthButton.click();
    }

    async clickDeleteButton() {
        await this.deleteButton.click();
    }

    async clickEditButton() {
        await this.editButton.click();
    }

    async clickSaveEmployeeButton() {
        await this.saveEmployeeButton.click();
    }

    async clickEmployeeCheckbox() {
        await this.employeeCheckbox.click();
    }

    async fillSearchEmployeeInput(employeeName: string) {
        await this.searchEmployeeInput.fill(employeeName);
        await this.page.keyboard.press('Enter');
    }

    async clickWorkShiftOption() {
        await this.workShiftOption.click();
    }

    async clickChosseButton() {
        await this.chosseButton.click();
    }

    async clickDay31Button() {
        await this.Day31Button.click();
    }

    async clickDay1Button() {
        await this.Day1Button.click();
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }

    async clickShiftPlanButton() {
        await this.shiftPlanButton.click();
    }

    async clickAddButton() {
        await this.addButton.click();
    } 

    async fillShiftPlanNameInput(shiftPlanName: string) {
        await this.shiftPlanNameInput.fill(shiftPlanName);
    }

    async clickWorkShift() {
        await this.workShiftInput.click();

    }

    async clickStartDateInput() {
        await this.startDateInput.click();
    }

    async clickEndDateInput() {
        await this.endDateInput.click();
    }

    async clickSaveButton() {
        await this.saveButton.nth(0).click();

    }

    async clickDepartmentButton() {
        await this.departmentButton.click();
    }

    async clickAddDepartmentButton() {
        await this.addDepartmentButton.click();
    }

    async clickDepartmentDropDown() {
        await this.departmentDropDown.click();
    }

    async clickDepartmentOption() {
        await this.departmentOption.click();
    }
    async clickSaveDepartmentButton() {
        await this.saveDepartmentButton.click();
    }

    async clickSaveWorkShiftButton() {
        await this.saveWorkShiftButton.click();
    }


    async getRequiredFieldNameShift(text: string) {
        await expect(this.requiredFieldNameShift).toHaveText(text);
        return this.requiredFieldNameShift.textContent();
    }

    async getRequiredFieldNameWorkShift(text: string) {
        await expect(this.requiredFieldNameWorkShift).toHaveText(text);
        return this.requiredFieldNameWorkShift.textContent();
    }

    async getToastExport() {
        await expect(this.toastExportSuccess).toBeVisible();
        return this.toastExportSuccess.textContent();
    }

    async getToastCancel() {
        await expect(this.toastCancelSuccess).toBeVisible();
        return this.toastCancelSuccess.textContent();
    }

    async getToastAdd(toast: string) {
        await expect(this.toastAddSuccess).toHaveText(toast);
        return this.toastAddSuccess.textContent();
    }

    async Logout() {
        await this.logoutButton.click();
        await this.logoutConfirmButton.click();
    }
}
