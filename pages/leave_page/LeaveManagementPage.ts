import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class LeaveManagementPage extends BasePage {

    readonly LEAVE_MANAGEMENT_BUTTON: Locator;
    readonly LEAVE_TYPE_DROPDOWN: Locator;
    readonly ANNUAL_LEAVE: Locator;
    readonly ADD_DEPARTMENT: Locator;
    readonly DEPARTMENT_AND_TEAM: Locator;
    readonly DEPARTMENT_IT: Locator;
    readonly SAVE_DEPARTMENT_AND_TEAM: Locator;
    readonly SEARCH_BY_NAME: Locator;
    readonly SELECT_AN_EMPLOYEE: Locator;
    readonly SAVE_EMPLOYEE: Locator;
    readonly ICON_ACTION_ROW0: Locator;
    readonly ICON_ACTION_ROW1: Locator;
    readonly ICON_ACTION_ROW2: Locator;
    readonly ADD_EMPLOYEE: Locator;
    readonly WAITING_FOR_APPROVAL: Locator;
    readonly DEPARTMENT_OPTION: Locator;
    readonly CHECK_STATUS_NEW: Locator;
    readonly CHECK_STATUS_WAITING_FOR_APPROVAL: Locator;
    readonly CHECK_STATUS_APPROVED: Locator;
    readonly SEARCH_EMPLOYEE: Locator;
    readonly RESULT_EMPLOYEE: Locator;
    readonly SEARCH_BY_YEAR: Locator;
    readonly ANNUAL_LEAVE_ALREADY_EXIST: Locator;
    readonly SEARCH_BY_EMPLOYEE_NAME: Locator;
    readonly SEARCH_BY_EMPLOYEE_NAME_RESULT: Locator;
    readonly COMBOBOX_STATUS: Locator;
    readonly SEARCH_PENDING_BUTTON: Locator;
    readonly SEARCH_REJECT_BUTTON: Locator;
    readonly SEARCH_BROWSED_BUTTON: Locator;
    readonly SEARCH_NEW_BUTTON: Locator;
    readonly SEARCH_BY_NEW_RESULT: Locator;
    readonly SEARCH_BY_PENDING_RESULT: Locator;
    readonly SEARCH_BY_REJECT_RESULT: Locator;
    readonly SEARCH_BY_BROWSED_RESULT: Locator;
    readonly COMBOBOX_STATUS_FORM_ADD: Locator;

    constructor(page: Page) {
        super(page);
        this.COMBOBOX_STATUS_FORM_ADD = page.getByRole('combobox').filter({ hasText: 'Trạng thái ※MớiTrạng thái ※' });
        this.SEARCH_NEW_BUTTON = page.getByRole('option', { name: 'Mới' });
        this.SEARCH_BY_NEW_RESULT = page.locator('#row-0').getByRole('cell', { name: 'Mới' });
        this.SEARCH_BROWSED_BUTTON = page.getByRole('option', { name: 'Đã duyệt' });
        this.SEARCH_BY_BROWSED_RESULT = page.locator('#row-0').getByRole('cell', { name: 'Đã duyệt' });
        this.SEARCH_BY_REJECT_RESULT = page.locator('#row-0').getByRole('cell', { name: 'Từ chối' });
        this.SEARCH_REJECT_BUTTON = page.getByRole('option', { name: 'Từ chối' });
        this.SEARCH_BY_PENDING_RESULT = page.locator('#row-0').getByRole('cell', { name: 'Chờ duyệt' });
        this.SEARCH_PENDING_BUTTON = page.getByRole('option', { name: 'Chờ duyệt' });
        this.COMBOBOX_STATUS = page.getByRole('combobox').filter({ hasText: 'Trạng thái' });
        this.SEARCH_BY_YEAR = page.getByRole('spinbutton', { name: 'Năm Năm' });
        this.SEARCH_BY_EMPLOYEE_NAME_RESULT = page.locator('#row-0').getByRole('cell', { name: 'Nguyễn Văn Minh' });
        this.SEARCH_BY_EMPLOYEE_NAME = page.getByRole('textbox', { name: 'Tên nhân viên Tên nhân viên' });
        this.ANNUAL_LEAVE_ALREADY_EXIST = page.locator("//li[contains(text(),'Nghỉ phép năm đã tồn tại.')]");
        this.RESULT_EMPLOYEE = page.locator("//tr[@id='row-0']//span[contains(text(),'Nguyễn Văn Minh')]");
        this.SEARCH_EMPLOYEE = page.locator("//form/div/div[1]/div/div/div/div[3]/div/input");
        this.CHECK_STATUS_APPROVED = page.locator("//tr[@id='row-0']//div[contains(.,'Đã duyệt')]");
        this.CHECK_STATUS_WAITING_FOR_APPROVAL = page.locator("//tr[@id='row-0']//div[contains(.,'Chờ duyệt')]");
        this.CHECK_STATUS_NEW = page.locator("//tr[@id='row-0']//div[contains(.,'Mới')]");
        this.DEPARTMENT_OPTION = page.locator("//div[text()='Bộ phận IT']");
        this.WAITING_FOR_APPROVAL = page.locator("//div[contains(text(),'Chờ duyệt')]");
        this.ADD_EMPLOYEE = page.locator("div[class='v-slide-group__content'] div span[class='v-btn__content']");
        this.ICON_ACTION_ROW0 = page.getByRole('button', { name: 'Thao tác' }).first();
        this.ICON_ACTION_ROW1 = page.getByRole('button', { name: 'Thao tác' }).nth(1);
        this.ICON_ACTION_ROW2 = page.getByRole('button', { name: 'Thao tác' }).nth(2);
        this.SAVE_EMPLOYEE = page.locator("//span[contains(normalize-space(),'Lưu')]");
        this.SELECT_AN_EMPLOYEE = page.locator("(//input[@type='checkbox'])[2]");
        this.SEARCH_BY_NAME = page.locator("//div[1]/div/div/div/div[4]/div/input");
        this.SAVE_DEPARTMENT_AND_TEAM = page.locator("//button[@type='submit']//span[@class='v-btn__content']");
        this.DEPARTMENT_IT = page.locator("//div[text()='Bộ phận IT']");
        this.DEPARTMENT_AND_TEAM = page.locator("//span[.='Bộ phận/Nhóm']");
        this.ADD_DEPARTMENT = page.locator("(//button[contains(@class, 'v-btn') and .//span[normalize-space()='Thêm']])[2]");
        this.LEAVE_MANAGEMENT_BUTTON = page.locator("//div[contains(text(),'Quản lý ngày phép năm')]");
        this.ANNUAL_LEAVE = page.locator("//div[contains(text(),'Nghỉ theo phép năm')]");
        this.LEAVE_TYPE_DROPDOWN = page.locator("//div[@class='v-col-md-4 v-col-12']//div[@class='v-field__input']");
    }

    async clickComboBoxStatusFormAdd() { await this.safeClick(this.COMBOBOX_STATUS_FORM_ADD); }
    async clickSearchNewButton() { await this.safeClick(this.SEARCH_NEW_BUTTON); }
    async expectSearchByNewResult() { await this.safeVerifyTextContains(this.SEARCH_BY_NEW_RESULT, 'Mới'); }
    async clickSearchBrowsedButton() { await this.safeClick(this.SEARCH_BROWSED_BUTTON); }
    async expectSearchByBrowsedResult() { await this.safeVerifyTextContains(this.SEARCH_BY_BROWSED_RESULT, 'Đã duyệt'); }
    async expectSearchByRejectResult() { await this.safeVerifyTextContains(this.SEARCH_BY_REJECT_RESULT, 'Từ chối'); }
    async clickSearchRejectButton() { await this.safeClick(this.SEARCH_REJECT_BUTTON); }
    async expectSearchByPendingResult() { await this.safeVerifyTextContains(this.SEARCH_BY_PENDING_RESULT, 'Chờ duyệt'); }
    async clickSearchPendingButton() { await this.safeClick(this.SEARCH_PENDING_BUTTON); }
    async clickComboBoxStatus() { await this.safeClick(this.COMBOBOX_STATUS); }

    async expectNameExist() {
        await this.safeVerifyTextContains(this.SEARCH_BY_EMPLOYEE_NAME_RESULT, 'Nguyễn Văn Minh');
    }

    async fillSearchByEmployeeName() {
        await this.safeFill(this.SEARCH_BY_EMPLOYEE_NAME, 'Minh');
    }

    async verifyAnnualLeaveAlreadyExist(expectedValue: string) {
        await this.safeVerifyTextContains(this.ANNUAL_LEAVE_ALREADY_EXIST, expectedValue);
    }
    async verifyResultYear(expectedValue: string) {
        const locator = this.page.locator(`//td[normalize-space()='${expectedValue}']`).first();
        await this.safeVerifyToHaveText(locator, expectedValue);
    }

    async fillSearchByYear(year: string) { await this.safeFill(this.SEARCH_BY_YEAR, year); }
    async verifyResultEmployee(expectedValue: string) { await this.safeVerifyToHaveText(this.RESULT_EMPLOYEE, expectedValue); }
    async fillSearchEmployee(name: string) { await this.safeFill(this.SEARCH_EMPLOYEE, name); }
    async clickIconActionRow1() { await this.safeClick(this.ICON_ACTION_ROW1); }
    async clickIconActionRow2() { await this.safeClick(this.ICON_ACTION_ROW2); }
    async verifyStatusApproved(expectedValue: string) { await this.safeVerifyTextContains(this.CHECK_STATUS_APPROVED, expectedValue); }
    async verifyStatusWaitingForApproval(expectedValue: string) { await this.safeVerifyTextContains(this.CHECK_STATUS_WAITING_FOR_APPROVAL, expectedValue); }
    async verifyStatusNew(expectedValue: string) { await this.safeVerifyTextContains(this.CHECK_STATUS_NEW, expectedValue); }
    async clickDepartmentOption() { await this.safeClick(this.DEPARTMENT_OPTION); }
    async clickWaitingForApproval() { await this.safeClick(this.WAITING_FOR_APPROVAL); }
    async clickAddEmployee() { await this.safeClick(this.ADD_EMPLOYEE); }
    async clickIconActionRow0() { await this.safeClick(this.ICON_ACTION_ROW0); }
    async clickSaveEmployee() {
        await this.page.waitForLoadState('load');
        await expect(this.SAVE_EMPLOYEE.nth(1)).toBeVisible();
        await this.SAVE_EMPLOYEE.nth(1).click();
        await this.page.waitForTimeout(1000);
    }
    async clickSelectAnEmployee() {
        await this.page.waitForLoadState('load');
        await this.page.waitForTimeout(1000);
        await this.SELECT_AN_EMPLOYEE.click();
    }
    async fillSearchByName() {
        await this.page.waitForTimeout(1000);
        await this.SEARCH_BY_NAME.fill('Nguyễn Văn Minh');
    }
    async clickSaveDepartmentAndTeam() {
        await this.safeClick(this.SAVE_DEPARTMENT_AND_TEAM);
        await this.page.waitForTimeout(1000);
    }
    async clickDepartmentIT() { await this.safeClick(this.DEPARTMENT_IT); }
    async clickDepartmentAndTeam() { await this.safeClick(this.DEPARTMENT_AND_TEAM); }
    async clickAddDepartment() { await this.safeClick(this.ADD_DEPARTMENT); }
    async clickLeaveManagementButton() { await this.safeClick(this.LEAVE_MANAGEMENT_BUTTON); }
}
