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

    constructor(page: Page) {
        this.page = page;
        // All locators initialization remains unchanged
        // (as in user's provided code above)
    }

    async verifyAnnualLeaveAlreadyExist(expectedValue: string) {
        await expect(this.annualLeaveAlreadyExist).toBeVisible();
        const value = await this.annualLeaveAlreadyExist.textContent();
        expect(value?.trim()).toBe(expectedValue);
        return value;
    }

    async verifyResultYear(expectedValue: string) {
        await expect(this.resultYear).toBeVisible();
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
        await expect(this.searchByName).toBeVisible();
        await this.searchByName.fill('Nguyễn Văn Minh');
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
        await expect(this.leaveManagementButton).toBeVisible();
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

    async getToastAdd(toast: string) {
        await expect(this.toastAddSuccess).toBeVisible();
        await expect(this.toastAddSuccess).toHaveText(toast);
        return this.toastAddSuccess.textContent();
    }

    async getToastBrowsed(toast: string) {
        await expect(this.toastBrowsedSuccess).toBeVisible();
        await expect(this.toastBrowsedSuccess).toHaveText(toast);
        return this.toastBrowsedSuccess.textContent();
    }

    async getToastConfirm(toast: string) {
        await expect(this.toastConfirmSuccess).toBeVisible();
        await expect(this.toastConfirmSuccess).toHaveText(toast);
        return this.toastConfirmSuccess.textContent();
    }
}
