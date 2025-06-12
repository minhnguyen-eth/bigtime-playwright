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
    readonly anualLeave: Locator;
    readonly regularLeave: Locator;
    readonly specialLeave: Locator;
    readonly socialInsuranceLeave: Locator;
    readonly maternityLeave: Locator;

    // verify type of leave
    readonly verifySpecialLeave: Locator;
    readonly verifyMaternityLeave: Locator;
    readonly verifySocialInsuranceLeave: Locator;
    readonly verifyRegularLeave: Locator;
    readonly verifyAnualLeave: Locator;

    constructor(page: Page) {
        this.page = page;

        this.verifySpecialLeave = page.locator("//div[normalize-space()='Nghỉ đặc biệt']")
        this.verifyMaternityLeave = page.locator("//div[normalize-space()='Nghỉ phụ sản']")
        this.verifySocialInsuranceLeave = page.locator("//div[normalize-space()='Nghỉ bảo hiểm xã hội']")
        this.verifyRegularLeave = page.locator("//div[normalize-space()='Nghỉ thường']")
        this.verifyAnualLeave = page.locator("//div[normalize-space()='Nghỉ theo phép năm']")

        this.specialLeave = page.locator("//div[contains(text(),'Nghỉ đặc biệt')]")
        this.maternityLeave = page.locator("//div[contains(text(),'Nghỉ phụ sản')]")
        this.socialInsuranceLeave = page.locator("//div[contains(text(),'Nghỉ bảo hiểm xã hội')]")
        this.regularLeave = page.locator("//div[contains(text(),'Nghỉ thường')]")
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

    async clickSpecialLeave() {
        await this.specialLeave.click();
    }

    async clickMaternityLeave() {
        await this.maternityLeave.click();
    }

    async clickSocialInsuranceLeave() {
        await this.socialInsuranceLeave.click();
    }

    async clickRegularLeave() {
        await this.regularLeave.click();
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

    async getVerifySpecialLeave() {
        await expect(this.verifySpecialLeave).toBeVisible();
        const text = await this.verifySpecialLeave.textContent();
        console.log("🔍 Special leave text found:", text);
        return text;
    }



    async getVerifyMaternityLeave() {
        await expect(this.verifyMaternityLeave).toBeVisible();
        const text = await this.verifyMaternityLeave.textContent();
        console.log("🔍 Maternity leave text found:", text);
        return text;
    }

    async getVerifySocialInsuranceLeave() {
        await expect(this.verifySocialInsuranceLeave).toBeVisible();
        const text = await this.verifySocialInsuranceLeave.textContent();
        console.log("🔍 Social insurance leave text found:", text);
        return text;
    }

    async getVerifyRegularLeave() {
        await expect(this.verifyRegularLeave).toBeVisible();
        const text = await this.verifyRegularLeave.textContent();
        console.log("🔍 Regular leave text found:", text);
        return text;
    }

    async getVerifyAnualLeave() {
        await expect(this.verifyAnualLeave).toBeVisible();
        const text = await this.verifyAnualLeave.textContent();
        console.log("🔍 Anual leave text found:", text);
        return text;
    }

}
