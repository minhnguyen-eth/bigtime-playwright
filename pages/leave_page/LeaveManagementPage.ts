import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class LeaveManagementPage extends BasePage {

    readonly toastAddSuccess: Locator;
    readonly toastCancelSuccess: Locator;
    readonly leaveManagementButton: Locator;
    readonly addButton: Locator;
    readonly leaveTypeDropDown: Locator;
    readonly anualLeave: Locator;
    readonly reason: Locator;
    readonly todayButton: Locator;
    readonly chosseButton: Locator;
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
    readonly searchByEmployeeName: Locator;
    readonly searchByEmployeeNameResult: Locator;
    readonly comboBoxStatus: Locator;
    readonly searchPendingButton: Locator;
    readonly searchRejectButton: Locator;
    readonly searchBrowsedButton: Locator;
    readonly searchNewButton: Locator;
    readonly searchByNewResult: Locator;
    readonly searchByPendingResult: Locator;
    readonly searchByRejectResult: Locator;
    readonly searchByBrowsedResult: Locator;
    readonly comboBoxStatusFormAdd: Locator;

    constructor(page: Page) {
        super(page);
        this.comboBoxStatusFormAdd = page.getByRole('combobox').filter({ hasText: 'Trạng thái ※MớiTrạng thái ※' })
        this.searchNewButton = page.getByRole('option', { name: 'Mới' })
        this.searchByNewResult = page.locator('#row-0').getByRole('cell', { name: 'Mới' })
        this.searchBrowsedButton = page.getByRole('option', { name: 'Đã duyệt' })
        this.searchByBrowsedResult = page.locator('#row-0').getByRole('cell', { name: 'Đã duyệt' })
        this.searchByRejectResult = page.locator('#row-0').getByRole('cell', { name: 'Từ chối' })
        this.searchRejectButton = page.getByRole('option', { name: 'Từ chối' })
        this.searchByPendingResult = page.locator('#row-0').getByRole('cell', { name: 'Chờ duyệt' })
        this.searchPendingButton = page.getByRole('option', { name: 'Chờ duyệt' })
        this.comboBoxStatus = page.getByRole('combobox').filter({ hasText: 'Trạng thái' })
        this.searchByYear = page.getByRole('spinbutton', { name: 'Năm Năm' })
        this.searchByEmployeeNameResult = page.locator('#row-0').getByRole('cell', { name: 'Nguyễn Văn Minh' })
        this.searchByEmployeeName = page.getByRole('textbox', { name: 'Tên nhân viên Tên nhân viên' })
        this.annualLeaveAlreadyExist = page.locator("//li[contains(text(),'Nghỉ phép năm đã tồn tại.')]")
        this.resultYear = page.locator("//tr[@id='row-0']//td[3]")
        this.resultEmployee = page.locator("//tr[@id='row-0']//span[contains(text(),'Nguyễn Văn Minh')]")
        this.searchEmpployee = page.locator("//form/div/div[1]/div/div/div/div[3]/div/input")
        this.checkStatusApproved = page.locator("//tr[@id='row-0']//div[contains(.,'Đã duyệt')]")
        this.checkStatusWaitingForApproval = page.locator("//tr[@id='row-0']//div[contains(.,'Chờ duyệt')]")
        this.checkStatusNew = page.locator("//tr[@id='row-0']//div[contains(.,'Mới')]")
        this.departmentOption = page.locator("//div[text()='Bộ phận IT']")
        this.waitingForApproval = page.locator("//div[contains(text(),'Chờ duyệt')]")
        this.addEmployee = page.locator("div[class='v-slide-group__content'] div span[class='v-btn__content']")
        this.browsed = page.locator("//span[contains(text(),'Duyệt')]")
        this.logoutButton = page.locator('//div[contains(text(),"Đăng xuất")]');
        this.logoutConfirmButton = page.locator('//span[normalize-space()="Có"]');
        this.OkButton = page.locator("//span[normalize-space()='Có']")
        this.comfirmButton = page.locator("//span[contains(text(),'Xác nhận')]")
        this.iconActionRow0 = page.locator("//tr[@id='row-0']//i[contains(@class, 'mdi-format-list-group')]")
        this.iconActionRow1 = page.locator("//tr[@id='row-1']//i[contains(@class, 'mdi-format-list-group')]")
        this.iconActionRow2 = page.locator("//tr[@id='row-2']//i[contains(@class, 'mdi-format-list-group')]")
        this.saveEmployee = page.locator("//span[contains(normalize-space(),'Lưu')]")
        this.selectAEmployee = page.locator("//td[contains(@class, 'v-data-table__td') and contains(@class, 'v-data-table__td--select-row')]")
        this.searchByName = page.locator("//div[1]/div/div/div/div[4]/div/input")
        this.saveDepartmentAndTeam = page.locator("//button[@type='submit']//span[@class='v-btn__content']")
        this.departmentIT = page.locator("//div[text()='Bộ phận IT']")
        this.departmentAndTeam = page.locator("//span[.='Bộ phận/Nhóm']")
        this.AddDepatment = page.locator("(//button[contains(@class, 'v-btn') and .//span[normalize-space()='Thêm']])[2]")
        this.leaveManagementButton = page.locator("//div[contains(text(),'Quản lý nghỉ phép năm')]")
        this.cancelButton = page.locator("//span[.=' Hủy']")
        this.saveButton = page.locator("//span[contains(normalize-space(),'Lưu')]")
        this.chosseButton = page.locator("//button[contains(text(),'Chọn')]")
        this.todayButton = page.locator("//div[@class='dp__cell_inner dp__pointer dp__today dp__date_hover']")
        this.reason = page.locator("//div/div[2]/div/div[5]/div/div/div/div[4]/textarea")
        this.anualLeave = page.locator("//div[contains(text(),'Nghỉ theo phép năm')]")
        this.leaveTypeDropDown = page.locator("//div[@class='v-col-md-4 v-col-12']//div[@class='v-field__input']")
        this.addButton = page.locator("//span[normalize-space()='Thêm']")
    }

    async clickComboBoxStatusFormAdd() {
        await this.safeClick(this.comboBoxStatusFormAdd);
    }

    async clickSearchNewButton() {
        await this.safeClick(this.searchNewButton);
    }

    async expectSearchByNewResult() {
        await this.safeVerifyTextContains(this.searchByNewResult, 'Mới');
    }

    async clickSearchBrowsedButton() {
        await this.safeClick(this.searchBrowsedButton);
    }

    async expectSearchByBrowsedResult() {
        await this.safeVerifyTextContains(this.searchByBrowsedResult, 'Đã duyệt');
    }

    async expectSearchByRejectResult() {
        await this.safeVerifyTextContains(this.searchByRejectResult, 'Từ chối');
    }

    async clickSearchRejectButton() {
        await this.safeClick(this.searchRejectButton);
    }

    async expectSearchByPendingResult() {
        await this.safeVerifyTextContains(this.searchByPendingResult, 'Chờ duyệt');
    }

    async clicksearchPendingButton() {
        await this.safeClick(this.searchPendingButton);
    }

    async clickComboBoxStatus() {
        await this.safeClick(this.comboBoxStatus);
    }

    async expectNameExist() {
        await this.safeVerifyTextContains(this.searchByEmployeeNameResult, 'Nguyễn Văn Minh');
    }

    async fillSearchByEmployeeName() {
        await this.safeFill(this.searchByEmployeeName, 'Minh');
    }

    async verifyAnnualLeaveAlreadyExist(expectedValue: string) {
        await this.safeVerifyTextContains(this.annualLeaveAlreadyExist, expectedValue);
    }

    async verifyResultYear(expectedValue: string) {
        await this.safeVerifyTextContains(this.resultYear, expectedValue);
    }

    async fillSearchByYear(year: string) {
        await this.safeFill(this.searchByYear, year);
    }

    async verifyResultEmployee(expectedValue: string) {
        await this.safeVerifyToHaveText(this.resultEmployee, expectedValue);
    }

    async fillSearchEmpployee(name: string) {
        await this.safeFill(this.searchEmpployee, name);
    }

    async clickIconActionRow1() {
        await this.safeClick(this.iconActionRow1);
    }

    async clickIconActionRow2() {
        await this.safeClick(this.iconActionRow2);
    }

    async verifyStatusApproved(expectedValue: string) {
        await this.safeVerifyTextContains(this.checkStatusApproved, expectedValue);
    }

    async verifyStatusWaitingForApproval(expectedValue: string) {
        await this.safeVerifyTextContains(this.checkStatusWaitingForApproval, expectedValue);
    }

    async verifyStatusNew(expectedValue: string) {
        await this.safeVerifyTextContains(this.checkStatusNew, expectedValue);
    }

    async clickDepartmentOption() {
        await this.safeClick(this.departmentOption);
    }

    async clickWaitingForApproval() {
        await this.safeClick(this.waitingForApproval);
    }

    async clickAddEmployee() {
        await this.safeClick(this.addEmployee);
    }

    async clickBrowsed() {
        await this.safeClick(this.browsed);
    }

    async clickOkButton() {
        await this.safeClick(this.OkButton);
    }

    async clickComfirmButton() {
        await this.safeClick(this.comfirmButton);
    }

    async clickIconActionRow0() {
        await this.safeClick(this.iconActionRow0);
    }

    async clickSaveEmployee() {
        await this.page.waitForLoadState('load');
        await expect(this.saveEmployee.nth(1)).toBeVisible();
        await this.saveEmployee.nth(1).click();
    }

    async clickSelectAEmployee() {
        await this.page.waitForLoadState('load');
        await this.page.waitForTimeout(2000);
        await this.selectAEmployee.click();
    }


    async fillSearchByName() {
        await this.page.waitForTimeout(1500);
        await this.searchByName.fill('Minh');
    }

    async clickSaveDepartmentAndTeam() {
        await this.safeClick(this.saveDepartmentAndTeam);
    }

    async clickDepartmentIT() {
        await this.safeClick(this.departmentIT);
    }

    async clickDepartmentAndTeam() {
        await this.safeClick(this.departmentAndTeam);
    }

    async clickAddDepatment() {
        await this.safeClick(this.AddDepatment);
    }

    async clickLeaveManagementButton() {
        await this.safeClick(this.leaveManagementButton);
    }

    async clickCancelButton() {
        await this.safeClick(this.cancelButton);
    }

    async clickSaveButton() {
        await this.safeClickFirst(this.saveButton);
    }

    async clickAddButton() {
        await this.safeClick(this.addButton);
    }
}
