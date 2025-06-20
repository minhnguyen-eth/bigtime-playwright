import { Locator, Page, expect } from '@playwright/test';

export class LeaveManagementPage {
    readonly page: Page;
    readonly toastAddSuccess: Locator;
    readonly toastCancelSuccess: Locator;
    readonly leaveManagementButton: Locator;
    readonly addButton: Locator;
    readonly leaveTypeDropDown: Locator;
    readonly anualLeave: Locator;
    readonly startDate: Locator;
    readonly endDate: Locator;
    readonly reason: Locator;
    readonly todayButton: Locator;
    readonly chosseButton: Locator;
    readonly searchButton: Locator;
    readonly saveButton: Locator;
    readonly cancelButton: Locator;
    readonly AddDepatment: Locator;
    readonly departmentAndTeam: Locator;
    readonly departmentIT: Locator;
    readonly saveDepartmentAndTeam: Locator;
    readonly searchByName: Locator;
    readonly selectAEmployee: Locator;
    readonly saveEmployee: Locator;
    readonly iconActionRow0: Locator;
    readonly iconActionRow1: Locator;
    readonly iconActionRow2: Locator;
    readonly comfirmButton: Locator;
    readonly OkButton: Locator;
    readonly toastConfirmSuccess: Locator;
    readonly logoutButton: Locator;
    readonly logoutConfirmButton: Locator;
    readonly browsed: Locator;
    readonly toastBrowsedSuccess: Locator;
    readonly addEmployee: Locator;
    readonly statusDropDown: Locator;
    readonly waitingForApproval: Locator;
    readonly departmentOption: Locator;
    readonly checkStatusNew: Locator;
    readonly checkStatusWaitingForApproval: Locator;
    readonly checkStatusApproved: Locator;
    readonly searchEmpployee: Locator;
    readonly resultEmployee: Locator;
    readonly searchByYear: Locator;
    readonly resultYear: Locator;
    readonly annualLeaveAlreadyExist: Locator;
    readonly clearSearchButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.annualLeaveAlreadyExist = page.locator("//li[contains(text(),'Nghỉ phép năm đã tồn tại.')]")
        this.resultYear = page.locator("//tr[@id='row-0']//td[3]")
        this.searchByYear = page.locator("//form/div/div[2]/div/div/div/div[3]/div/input")
        this.resultEmployee = page.locator("//tr[@id='row-0']//span[contains(text(),'Nguyễn Văn Minh')]")
        this.searchEmpployee = page.locator("//form/div/div[1]/div/div/div/div[3]/div/input")
        this.checkStatusApproved = page.locator("//tr[@id='row-0']//div[contains(.,'Đã duyệt')]")
        this.checkStatusWaitingForApproval = page.locator("//tr[@id='row-0']//div[contains(.,'Chờ duyệt')]")
        this.checkStatusNew = page.locator("//tr[@id='row-0']//div[contains(.,'Mới')]")
        this.departmentOption = page.locator("//div[text()='Bộ phận IT']")
        this.waitingForApproval = page.locator("//div[contains(text(),'Chờ duyệt')]")
        this.statusDropDown = page.locator("//div[@class='v-field v-field--active v-field--appended v-field--center-affix v-field--dirty v-field--variant-outlined v-theme--lightColor7 v-locale--is-ltr']")
        this.addEmployee = page.locator("div[class='v-slide-group__content'] div span[class='v-btn__content']")
        this.browsed = page.locator("//span[contains(text(),'Duyệt')]")
        this.logoutButton = page.locator('//div[contains(text(),"Đăng xuất")]');
        this.logoutConfirmButton = page.locator('//span[normalize-space()="Có"]');
        this.OkButton = page.locator("//span[normalize-space()='Có']")
        this.comfirmButton = page.locator("//span[contains(text(),'Xác nhận')]")
        this.iconActionRow0 = page.locator("//tr[@id='row-0']//i[@class='mdi mdi-format-list-group mdi v-icon notranslate v-theme--lightColor7 v-icon--size-default']")
        this.iconActionRow1 = page.locator("//tr[@id='row-1']//i[@class='mdi mdi-format-list-group mdi v-icon notranslate v-theme--lightColor7 v-icon--size-default']")
        this.iconActionRow2 = page.locator("//tr[@id='row-2']//i[@class='mdi mdi-format-list-group mdi v-icon notranslate v-theme--lightColor7 v-icon--size-default']")
        this.saveEmployee = page.locator("//span[contains(normalize-space(),'Lưu')]")
        this.selectAEmployee = page.locator("//td[@class='v-data-table__td v-data-table-column--no-padding v-data-table-column--align-start v-data-table__td--select-row']")
        this.searchByName = page.locator("//div[1]/div/div/div/div[4]/div/input")
        this.saveDepartmentAndTeam = page.locator("//button[@type='submit']//span[@class='v-btn__content']")
        this.departmentIT = page.locator("//div[text()='Bộ phận IT']")
        this.departmentAndTeam = page.locator("//span[.='Bộ phận/Nhóm']")
        this.AddDepatment = page.locator("//button[@class='v-btn v-btn--elevated v-theme--lightColor7 bg-primary v-btn--density-default rounded-lg v-btn--size-x-small v-btn--variant-elevated']//span[@class='v-btn__content'][normalize-space()='Thêm']")
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
        this.clearSearchButton = page.locator("//span[normalize-space()='Xóa']")
    }

    async clickClearSearchButton() {
        await expect(this.clearSearchButton).toBeVisible();
        await this.clearSearchButton.click();
    }

    async verifyAnnualLeaveAlreadyExist(expectedValue: string) {
        await expect(this.annualLeaveAlreadyExist).toBeVisible();
        const value = await this.annualLeaveAlreadyExist.textContent();
        expect(value?.trim()).toBe(expectedValue);
        return value;
    }

    async verifyResultYear(expectedValue: string) {
        const value = await this.resultYear.textContent();
        expect(value?.trim()).toBe(expectedValue);
        return value;
    }

    async fillSearchByYear(year: string) {
        await expect(this.searchByYear).toBeVisible();
        await this.searchByYear.fill(year);
    }

    async verifyResultEmployee(expectedValue: string) {
        await expect(this.resultEmployee).toBeVisible();
        const value = await this.resultEmployee.textContent();
        expect(value?.trim()).toBe(expectedValue);
        return value;
    }

    async fillSearchEmpployee(name: string) {
        await expect(this.searchEmpployee).toBeVisible();
        await this.searchEmpployee.fill(name);
    }

    async clickIconActionRow1() {
        await expect(this.iconActionRow1).toBeVisible();
        await this.iconActionRow1.click();
    }

    async clickIconActionRow2() {
        await expect(this.iconActionRow2).toBeVisible();
        await this.iconActionRow2.click();
    }

    async verifyStatusApproved(expectedValue: string) {
        await expect(this.checkStatusApproved).toBeVisible();
        const value = await this.checkStatusApproved.textContent();
        expect(value?.trim()).toBe(expectedValue);
        return value;
    }

    async verifyStatusWaitingForApproval(expectedValue: string) {
        await expect(this.checkStatusWaitingForApproval).toBeVisible();
        const value = await this.checkStatusWaitingForApproval.textContent();
        expect(value?.trim()).toBe(expectedValue);
        return value;
    }

    async verifyStatusNew(expectedValue: string) {
        await expect(this.checkStatusNew).toBeVisible();
        const value = await this.checkStatusNew.textContent();
        expect(value?.trim()).toBe(expectedValue);
        return value;
    }

    // Sample wait for other click/fill methods:

    async clickDepartmentOption() {
        await expect(this.departmentOption).toBeVisible();
        await this.departmentOption.click();
    }

    async clickWaitingForApproval() {
        await expect(this.waitingForApproval).toBeVisible();
        await this.waitingForApproval.click();
    }

    async clickStatusDropDown() {
        await expect(this.statusDropDown).toBeVisible();
        await this.statusDropDown.click();
    }

    async clickAddEmployee() {
        await expect(this.addEmployee).toBeVisible();
        await this.addEmployee.click();
    }

    async clickBrowsed() {
        await expect(this.browsed).toBeVisible();
        await this.browsed.click();
    }

    async Logout() {
        await expect(this.logoutButton).toBeVisible();
        await this.logoutButton.click();
        await expect(this.logoutConfirmButton).toBeVisible();
        await this.logoutConfirmButton.click();
    }

    async clickOkButton() {
        await expect(this.OkButton).toBeVisible();
        await this.OkButton.click();
    }

    async clickComfirmButton() {
        await expect(this.comfirmButton).toBeVisible();
        await this.comfirmButton.click();
    }

    async clickIconActionRow0() {
        await expect(this.iconActionRow0).toBeVisible();
        await this.iconActionRow0.click();
    }

    async clickSaveEmployee() {
        await expect(this.saveEmployee.nth(1)).toBeVisible();
        await this.saveEmployee.nth(1).click();
    }

    async clickSelectAEmployee() {
        await expect(this.selectAEmployee).toBeVisible();
        await this.selectAEmployee.click();
    }

    async fillSearchByName() {
        await this.page.waitForTimeout(1000);
        await expect(this.searchByName).toBeVisible();
        await this.searchByName.fill('Minh');
        await this.page.keyboard.press('Enter');
    }

    async clickSaveDepartmentAndTeam() {
        await expect(this.saveDepartmentAndTeam).toBeVisible();
        await this.saveDepartmentAndTeam.click();
    }

    async clickDepartmentIT() {
        await expect(this.departmentIT).toBeVisible();
        await this.departmentIT.click();
    }

    async clickDepartmentAndTeam() {
        await expect(this.departmentAndTeam).toBeVisible();
        await this.departmentAndTeam.click();
    }

    async clickAddDepatment() {
        await expect(this.AddDepatment).toBeVisible();
        await this.AddDepatment.click();
    }

    async clickLeaveManagementButton() {
        await this.leaveManagementButton.click();
    }

    async clickCancelButton() {
        await expect(this.cancelButton).toBeVisible();
        await this.cancelButton.click();
    }

    async clickSaveButton() {
        await expect(this.saveButton.first()).toBeVisible();
        await this.saveButton.first().click();
    }

    async clickAddButton() {
        await expect(this.addButton.first()).toBeVisible();
        await this.addButton.first().click();
    }

    async clickSearchButton() {
        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
    }


    async getToastConfirm(toast: string) {
        await expect(this.toastConfirmSuccess).toBeVisible();
        await expect(this.toastConfirmSuccess).toHaveText(toast);
        return this.toastConfirmSuccess.textContent();
    }
}
