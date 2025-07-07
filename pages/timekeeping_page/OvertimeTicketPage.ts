import { Locator, Page, expect } from 'playwright/test';

export class OvertimeTicketPage {
    readonly page: Page;

    // Check in/out
    readonly checkInOutButton: Locator;
    readonly checkInButton: Locator;
    readonly confirmCheckInButton: Locator;

    // Check in/out history
    readonly checkInOutHistoryButton: Locator;

    // Overtime ticket
    readonly overtimeTicketButton: Locator;
    readonly overtimeTicketDayButton: Locator;
    readonly reasonInput: Locator;
    readonly startTime: Locator;
    readonly endTime: Locator;
    readonly openHour: Locator;
    readonly hour17: Locator;
    readonly hour18: Locator;
    readonly hour19: Locator;
    readonly chosseButton: Locator;
    readonly toastSendSuccess: Locator;
    readonly newStatusInfo: Locator;
    readonly reasonInfo: Locator;
    readonly startTimeInfo: Locator;
    readonly endTimeInfo: Locator;
    readonly workingTimeInfo: Locator;
    readonly employeeNameInfo: Locator;
    readonly cancelStatusInfo: Locator;
    readonly openMinute: Locator;
    readonly minute10: Locator;
    readonly pendingStatusInfo: Locator;
    readonly toastBrowseSuccess: Locator;
    readonly browsedStatusInfo: Locator;
    readonly rejectStatusInfo: Locator;
    readonly dropdownStatus: Locator;
    readonly selectPendingStatus: Locator;
    readonly selectNewStatus: Locator;
    readonly validateDateRequired: Locator;
    readonly validateReasonRequired: Locator;
    readonly validateWhenUserChosseWrongTime: Locator;

    constructor(page: Page) {
        this.page = page;

        this.cancelStatusInfo = page.locator("//div[contains(@class, 'text-body-2') and contains(text(), 'Hủy')]");
        this.hour19 = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='19']");
        this.validateWhenUserChosseWrongTime = page.locator("//li[contains(text(),'Thời gian tăng ca phải nằm trong khung giờ đã chấm')]");
        this.validateReasonRequired = page.locator("//div[contains(text(),'Nhập lý do')]");
        this.validateDateRequired = page.locator("//div[contains(text(),'Nhập ngày tăng ca')]");
        this.selectNewStatus = page.locator("//div[contains(text(),'Mới')]");
        this.selectPendingStatus = page.locator("//div[contains(text(),'Chờ duyệt')]");
        this.dropdownStatus = page.locator("//div[@class='v-input v-input--horizontal v-input--center-affix v-input--density-compact v-theme--lightColor7 v-locale--is-ltr v-input--dirty v-text-field v-select v-select--single v-select--selected custom-select']//i[@class='mdi-menu-down mdi v-icon notranslate v-theme--lightColor7 v-icon--size-default v-select__menu-icon']");
        this.rejectStatusInfo = page.locator("//div[contains(@class, 'text-body-2') and contains(text(), 'Từ chối')]");
        this.browsedStatusInfo = page.locator("//div[contains(text(),'Đã duyệt')]");
        this.toastBrowseSuccess = page.locator("//div[contains(text(),'Phê duyệt thành công')]");
        this.pendingStatusInfo = page.locator("//div[contains(text(),'Chờ duyệt')]");
        this.minute10 = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='10']");
        this.openMinute = page.locator("//button[@aria-label='Open minutes overlay']");
        this.employeeNameInfo = page.locator("//div[contains(text(),'BAT810 - Nguyễn Văn Minh')]");
        this.workingTimeInfo = page.locator("//div[normalize-space()='01:00']");
        this.endTimeInfo = page.locator("//div[normalize-space()='18:00']");
        this.startTimeInfo = page.locator("//div[normalize-space()='17:00']");
        this.reasonInfo = page.locator("//div[contains(text(),'Automation test')]");
        this.newStatusInfo = page.locator("//div[contains(text(),'Mới')]");
        this.toastSendSuccess = page.locator("//div[contains(text(),'Gửi thành công')]");
        this.hour18 = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='18']");
        this.chosseButton = page.locator("//button[contains(text(),'Chọn')]");
        this.hour17 = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='17']");
        this.openHour = page.locator("//button[@aria-label='Open hours overlay']");
        this.endTime = page.locator("//div[4]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.startTime = page.locator("//div[3]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.reasonInput = page.locator("//textarea");
        this.overtimeTicketDayButton = page.locator("//div[2]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.overtimeTicketButton = page.locator("//div[contains(text(),'Phiếu tăng ca')]");
        this.checkInOutHistoryButton = page.locator("//div[@class='v-list-item-title'][contains(text(),'Lịch sử điểm danh')]");
        this.confirmCheckInButton = page.locator("//span[.='Đồng ý']");
        this.checkInButton = page.locator("//span[@class='v-btn__content']//p[contains(text(),'Điểm danh')]");
        this.checkInOutButton = page.locator("//div[contains(text(),'Điểm danh')]");
    }

    async verifyCancelStatus() {
        await expect(this.cancelStatusInfo).toContainText('Hủy');
        return this.cancelStatusInfo.textContent();
    }

    async clickHour19() {
        await this.hour19.click();
    }

    async verifyValidateWhenUserChosseWrongTime() {
        await expect(this.validateWhenUserChosseWrongTime).toContainText('Thời gian tăng ca phải nằm trong khung giờ đã chấm');
        return this.validateWhenUserChosseWrongTime.textContent();
    }

    async verifyValidateReasonRequired() {
        await expect(this.validateReasonRequired).toContainText('Nhập lý do');
        return this.validateReasonRequired.textContent();
    }

    async verifyValidateDateRequired() {
        await expect(this.validateDateRequired).toContainText('Nhập ngày tăng ca');
        return this.validateDateRequired.textContent();
    }

    async clickSelectNewStatus() {
        await this.selectNewStatus.click();
    }

    async clickDropdownStatus() {
        await this.dropdownStatus.click();
    }

    async clickSelectPendingStatus() {
        await this.selectPendingStatus.click();
    }

    async verifyRejectStatus() {
        await expect(this.rejectStatusInfo).toContainText('Từ chối');
        return this.rejectStatusInfo.textContent();
    }

    async verifyBrowsedStatus() {
        await expect(this.browsedStatusInfo).toContainText('Đã duyệt');
        return this.browsedStatusInfo.textContent();
    }

    async getToastBrowseSuccess() {
        await expect(this.toastBrowseSuccess).toContainText('Phê duyệt thành công');
        return this.toastBrowseSuccess.textContent();
    }

    async clickMinute10() {
        await this.minute10.click();
        await this.chosseButton.click();
    }

    async verifyPendingStatus() {
        await expect(this.pendingStatusInfo).toContainText('Chờ duyệt');
        return this.pendingStatusInfo.textContent();
    }

    async clickOpenMinute() {
        await this.openMinute.click();
    }

    async verifyEmployeeName() {
        await expect(this.employeeNameInfo).toContainText('BAT810 - Nguyễn Văn Minh');
        return this.employeeNameInfo.textContent();
    }

    async verifyWorkingTime() {
        await expect(this.workingTimeInfo).toContainText('01:00');
        return this.workingTimeInfo.textContent();
    }

    async verifyEndTime() {
        await expect(this.endTimeInfo).toContainText('18:00');
        return this.endTimeInfo.textContent();
    }

    async verifyStartTime() {
        await expect(this.startTimeInfo).toContainText('17:00');
        return this.startTimeInfo.textContent();
    }

    async verifyReason() {
        await expect(this.reasonInfo).toContainText('Automation test');
        return this.reasonInfo.textContent();
    }

    async verifyNewStatus() {
        await expect(this.newStatusInfo).toContainText('Mới');
        return this.newStatusInfo.textContent();
    }

    async getToastSendSuccess() {
        await expect(this.toastSendSuccess).toContainText('Gửi thành công');
        return this.toastSendSuccess.textContent();
    }

    async clickHour18() {
        await this.hour18.click();
    }

    async clickHour17() {
        await this.hour17.click();
    }
    async clickOpenHour() {
        await this.openHour.click();
    }

    async clickChosseButton() {
        await this.chosseButton.click();
    }

    async clickEndTime() {
        await this.endTime.click();
    }

    async clickStartTime() {
        await this.startTime.click();
    }

    async fillReason(reason: string) {
        await this.reasonInput.fill(reason);
    }

    async clickOvertimeTicketDayButton() {
        await this.overtimeTicketDayButton.click();
    }

    async clickOvertimeTicketButton() {
        await this.overtimeTicketButton.click();
    }

    async clickCheckInOutHistoryButton() {
        await this.checkInOutHistoryButton.click();
    }

    async clickConfirmCheckInButton() {
        await this.confirmCheckInButton.click();
    }

    async clickCheckInOutButton() {
        await this.checkInOutButton.click();
    }

    async clickCheckInButton() {
        await this.checkInButton.click();
    }


    // Functions for testing
    async setOverTimeTicket() {
        await this.clickStartTime();
        await this.clickOpenHour();
        await this.clickHour17();
        await this.clickChosseButton();
        await this.clickEndTime();
        await this.clickOpenHour();
        await this.clickHour18();
        await this.clickChosseButton();
    }

    async verifyOvertimeTicketNewStatus() {
        await this.verifyReason();
        await this.verifyStartTime();
        await this.verifyEndTime();
        await this.verifyWorkingTime();
        await this.verifyNewStatus();
        await this.verifyEmployeeName();
    }

     async verifyOvertimeTicketPendingStatus() {
        await this.verifyReason();
        await this.verifyStartTime();
        await this.verifyEndTime();
        await this.verifyWorkingTime();
        await this.verifyPendingStatus();
        await this.verifyEmployeeName();
    }

     async verifyOvertimeTicketBrowsedStatus() {
        await this.verifyReason();
        await this.verifyStartTime();
        await this.verifyEndTime();
        await this.verifyWorkingTime();
        await this.verifyBrowsedStatus();
        await this.verifyEmployeeName();
    }

    async verifyOvertimeTicketRejectStatus() {
        await this.verifyReason();
        await this.verifyStartTime();
        await this.verifyEndTime();
        await this.verifyWorkingTime();
        await this.verifyRejectStatus();
        await this.verifyEmployeeName();
    }

    async verifyOvertimeTicketCancelStatus() {
        await this.verifyReason();
        await this.verifyStartTime();
        await this.verifyEndTime();
        await this.verifyWorkingTime();
        await this.verifyCancelStatus();
        await this.verifyEmployeeName();
    }
}
