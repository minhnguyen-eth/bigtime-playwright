import { Locator, Page, expect } from '@playwright/test';

export class LeaveApplicationPage {
    readonly page: Page;
    readonly toastAddSuccess: Locator;
    readonly toastCancelSuccess: Locator;
    readonly toastExportSuccess: Locator;
    readonly searchButton: Locator;
    readonly leaveApplicationButton: Locator;
    readonly addButton: Locator;
    readonly leaveTypeDropDown: Locator;
    readonly anualLeave: Locator;
    readonly startDate: Locator;
    readonly endDate: Locator;
    readonly reason: Locator;
    readonly todayButton: Locator;
    readonly chosseButton: Locator;
    readonly numberOfDaysOff: Locator;
    readonly saveButton: Locator;
    readonly cancelButton: Locator;
    readonly logoutButton: Locator;
    readonly logoutConfirmButton: Locator;
    readonly sendButton: Locator;
    readonly OKButton: Locator;
    readonly detailLeaveApplicationButton: Locator;
    readonly toastSendSuccess: Locator;
    readonly browsedButton: Locator;
    readonly toastBrowsedSuccess: Locator;

    constructor(page: Page) {
        this.page = page;
        this.browsedButton = page.locator("//span[contains(text(),'Duyệt')]")
        this.detailLeaveApplicationButton = page.locator("//tr[@id='row-0']")
        this.OKButton = page.locator("//span[normalize-space()='Có']")
        this.sendButton = page.locator("//span[contains(text(),'Gửi')]")
        this.logoutButton = page.locator('//div[contains(text(),"Đăng xuất")]');
        this.logoutConfirmButton = page.locator('//span[normalize-space()="Có"]');
        this.cancelButton = page.locator("//span[.=' Hủy']")
        this.saveButton = page.locator("//span[.=' Lưu']")
        this.numberOfDaysOff = page.locator("//div/div[2]/div/div[7]/div/div/div/div[3]/div/input")
        this.chosseButton = page.locator("//button[contains(text(),'Chọn')]")
        this.todayButton = page.locator("//div[@class='dp__cell_inner dp__pointer dp__today dp__date_hover']")
        this.reason = page.locator("//div/div[2]/div/div[5]/div/div/div/div[4]/textarea")
        this.endDate = page.locator("//div[2]/div/div[4]/div/div/div/div/div[1]/div/div/div[3]/input")
        this.startDate = page.locator("//div[2]/div/div[2]/div/div[3]/div/div/div/div/div[1]/div/div/div[3]/input")
        this.anualLeave = page.locator("//div[contains(text(),'Nghỉ theo phép năm')]")
        this.leaveTypeDropDown = page.locator("//div[@class='v-col-md-4 v-col-12']//div[@class='v-field__input']")
        this.addButton = page.locator("//span[normalize-space()='Thêm']")
        this.leaveApplicationButton = page.locator("//div[contains(text(),'Đơn nghỉ phép')]")
        this.searchButton = page.locator("//span[.=' Tìm kiếm']")

        // Toasts
        this.toastAddSuccess = page.locator('//div[contains(text(),"Thêm thành công")]');
        this.toastSendSuccess = page.locator('//div[contains(text(),"Gửi duyệt thành công")]');
        this.toastCancelSuccess = page.locator('//div[contains(text(),"Hủy thành công")]');
        this.toastExportSuccess = page.locator('//div[contains(text(),"Xuất thành công")]');
        this.toastBrowsedSuccess = page.locator('//div[contains(text(),"Phê duyệt thành công")]');
    }

    async clickBrowsedButton() {
        await this.browsedButton.click();
    }

    async clickDetailLeaveApplicationButton() {
        await this.detailLeaveApplicationButton.click();
    }

    async clickOKButton() {
        await this.OKButton.click();
    }

    async clickSendButton() {
        await this.sendButton.click();
    }

    async clickCancelButton() {
        await this.cancelButton.click();
    }

    async clickSaveButton() {
        await this.saveButton.click();
    }

    async fillNumberOfDaysOff(numberOfDaysOff: string) {
        await this.numberOfDaysOff.fill(numberOfDaysOff);
    }

    async clickChosseButton() {
        await this.chosseButton.click();
    }

    async clickTodayButton() {
        await this.todayButton.click();
    }

    async fillReason(reason: string) {
        await this.reason.fill(reason);
    }

    async clickEndDate() {
        await this.endDate.click();
    }

    async clickStartDate() {
        await this.startDate.click();
    }

    async clickAnualLeave() {
        await this.anualLeave.click();
    }

    async clickLeaveTypeDropDown() {
        await this.leaveTypeDropDown.click();
    }

    async clickAddButton() {
        await this.addButton.click();
    }

    async clickLeaveApplicationButton() {
        await this.leaveApplicationButton.click();
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }

    async getToastExport() {
        await expect(this.toastExportSuccess).toBeVisible();
        return this.toastExportSuccess.textContent();
    }

    async getToastCancel() {
        await expect(this.toastCancelSuccess).toBeVisible();
        return this.toastCancelSuccess.textContent();
    }

    async getToastSend(toast: string) {
        await expect(this.toastSendSuccess).toHaveText(toast);
        return this.toastSendSuccess.textContent();
    }
    async getToastBrowsedSuccess(toast: string) {
        await expect(this.toastBrowsedSuccess).toHaveText(toast);
        return this.toastBrowsedSuccess.textContent();
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
