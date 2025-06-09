import { Locator, Page, expect } from '@playwright/test';

export class LeaveManagementPage {

    private page: Page;

    // Buttons & Inputs
    private toastAddSuccess: Locator;
    private toastCancelSuccess: Locator;
    private leaveManagementButton: Locator;
    private addButton: Locator;
    private leaveTypeDropDown: Locator;
    private anualLeave: Locator;
    private startDate: Locator;
    private endDate: Locator;
    private reason: Locator;
    private todayButton: Locator;
    private chosseButton: Locator;
    private searchButton: Locator;
    private saveButton: Locator;
    private cancelButton: Locator;
    private addEmployeeAndPart: Locator;
    private departmentAndTeam: Locator;
    private departmentIT: Locator;
    private saveDepartmentAndTeam: Locator;
    private searchByName: Locator;
    private selectAEmployee: Locator;
    private saveEmployee: Locator;
    private iconAction: Locator;
    private comfirmButton: Locator;
    private OkButton: Locator;
    private toastConfirmSuccess: Locator;
    private logoutButton: Locator;
    private logoutConfirmButton: Locator;
    private browsed: Locator;
    private toastBrowsedSuccess: Locator;
    private addEmployee: Locator;




    constructor(page: Page) {
        this.page = page;

        this.addEmployee = page.locator("div[class='v-slide-group__content'] div span[class='v-btn__content']")
        this.browsed = page.locator("//span[contains(text(),'Duyệt')]")
        this.logoutButton = page.locator('//div[contains(text(),"Đăng xuất")]');
        this.logoutConfirmButton = page.locator('//span[normalize-space()="Có"]');
        this.OkButton = page.locator("//span[normalize-space()='Có']")
        this.comfirmButton = page.locator("//span[contains(text(),'Xác nhận')]")
        this.iconAction = page.locator("//i[@class='mdi mdi-format-list-group mdi v-icon notranslate v-theme--lightColor7 v-icon--size-default']")
        this.saveEmployee = page.locator("//span[contains(normalize-space(),'Lưu')]")
        this.selectAEmployee = page.locator("//td[@class='v-data-table__td v-data-table-column--no-padding v-data-table-column--align-start v-data-table__td--select-row']")
        this.searchByName = page.locator("//div[1]/div/div/div/div[4]/div/input")
        this.saveDepartmentAndTeam = page.locator("//button[@type='submit']//span[@class='v-btn__content']")
        this.departmentIT = page.locator("//div[text()='Bộ phận IT']")
        this.departmentAndTeam = page.locator("//span[.='Bộ phận/Nhóm']")
        this.addEmployeeAndPart = page.locator("//button[@class='v-btn v-btn--elevated v-theme--lightColor7 bg-primary v-btn--density-default rounded-lg v-btn--size-x-small v-btn--variant-elevated']")
        this.leaveManagementButton = page.locator("//div[contains(text(),'Quản lý nghỉ phép năm')]")
        this.cancelButton = page.locator("//span[.=' Hủy']")
        this.saveButton = page.locator("//span[contains(normalize-space(),'Lưu')]")
        this.chosseButton = page.locator("//button[contains(text(),'Chọn')]")
        this.todayButton = page.locator("//div[@class='dp__cell_inner dp__pointer dp__today dp__date_hover']")
        this.reason = page.locator("//div/div[2]/div/div[5]/div/div/div/div[4]/textarea")
        this.endDate = page.locator("//div[2]/div/div[4]/div/div/div/div/div[1]/div/div/div[3]/input")
        this.startDate = page.locator("//div[2]/div/div[2]/div/div[3]/div/div/div/div/div[1]/div/div/div[3]/input")
        this.anualLeave = page.locator("//div[contains(text(),'Nghỉ theo phép năm')]")
        this.leaveTypeDropDown = page.locator("//div[@class='v-col-md-4 v-col-12']//div[@class='v-field__input']")
        this.addButton = page.locator("//span[normalize-space()='Thêm']")
        this.searchButton = page.locator("//span[.=' Tìm kiếm']")

        // Toasts
        this.toastAddSuccess = page.locator('//div[contains(text(),"Thêm thành công")]');
        this.toastBrowsedSuccess = page.locator('//div[contains(text(),"Đã duyệt thành công")]');
        this.toastCancelSuccess = page.locator('//div[contains(text(),"Hủy thành công")]');
        this.toastConfirmSuccess = page.locator('//div[contains(text(),"Xác nhận thành công")]');


    }



    async clickAddEmployee() {
        await this.addEmployee.click();
    }

    async clickBrowsed() {
        await this.browsed.click();
    }

   async Logout() {
        await this.logoutButton.click();
        await this.logoutConfirmButton.click();
    }


    async clickOkButton() {
        await this.OkButton.click();
    }

    async clickComfirmButton() {
        await this.comfirmButton.click();
    }

    async clickIconAction() {
        await this.iconAction.click();
    }

    async clickSaveEmployee() {
        await this.saveEmployee.nth(1).click();
    }


    async clickSelectAEmployee() {
        await this.selectAEmployee.click();
    }

    async fillSearchByName(name: string) {
        await this.searchByName.fill(name);
        await this.searchByName.press('Enter');
    }

    async clickSaveDepartmentAndTeam() {
        await this.saveDepartmentAndTeam.click();
    }

    async clickDepartmentIT() {
        await this.departmentIT.click();
    }

    async clickDepartmentAndTeam() {
        await this.departmentAndTeam.click();
    }

    async clickAddEmployeeAndPart() {
        await this.addEmployeeAndPart.click();
    }

    async clickLeaveManagementButton() {
        await this.leaveManagementButton.click();
    }


    async clickCancelButton() {
        await this.cancelButton.click();
    }

    async clickSaveButton() {
        await this.saveButton.first().click();
    }



    async clickAddButton() {
        await this.addButton.click();
    }


    async clickSearchButton() {
        await this.searchButton.click();
    }


    async getToastAdd(toast: string) {
        await expect(this.toastAddSuccess).toHaveText(toast);
        return this.toastAddSuccess.textContent();
    }

    async getToastBrowsed(toast: string) {
        await expect(this.toastBrowsedSuccess).toHaveText(toast);
        return this.toastBrowsedSuccess.textContent();
    }

    async getToastConfirm(toast: string) {
        await expect(this.toastConfirmSuccess).toHaveText(toast);
        return this.toastConfirmSuccess.textContent();
    }


}
