import { Locator, Page, expect } from 'playwright/test';
import { BasePage } from '../BasePage';

export class OvertimeTicketPage extends BasePage {

    // Check in/out
    readonly checkInOutButton: Locator;
    readonly checkInButton: Locator;
    readonly confirmCheckInButton: Locator;

    // Check in/out history
    readonly checkInOutHistoryButton: Locator;

    // Overtime ticket
    readonly overtimeTicketButton: Locator;
    readonly overtimeTicketDayButton: Locator;
    readonly startTime: Locator;
    readonly endTime: Locator;
    readonly openHour: Locator;
    readonly hour17: Locator;
    readonly hour18: Locator;
    readonly hour19: Locator;
    
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
    readonly validateWhenUserChosseWrongTime: Locator;

    constructor(page: Page) {
        super(page);
        this.cancelStatusInfo = page.locator("//div[contains(@class, 'text-body-2') and contains(text(), 'Hủy')]");
        this.hour19 = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='19']");
        this.validateWhenUserChosseWrongTime = page.locator("//li[contains(text(),'Thời gian tăng ca phải nằm trong khung giờ đã chấm')]");
        this.validateDateRequired = page.locator("//div[contains(text(),'Nhập ngày tăng ca')]");
        this.selectNewStatus = page.locator("//div[contains(text(),'Mới')]");
        this.selectPendingStatus = page.locator("//div[contains(text(),'Chờ duyệt')]");
        this.dropdownStatus = page.getByRole('combobox').filter({ hasText: 'Trạng thái ※' }).locator('i');
        this.rejectStatusInfo = page.locator("//div[contains(@class, 'text-body-2') and contains(text(), 'Từ chối')]");
        this.browsedStatusInfo = page.locator("//div[contains(text(),'Đã duyệt')]");
        this.toastBrowseSuccess = page.locator("//div[contains(text(),'Phê duyệt thành công')]");
        this.pendingStatusInfo = page.locator("//div[contains(text(),'Chờ duyệt')]");
        this.minute10 = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='10']");
        this.openMinute = page.locator("//button[@aria-label='Open minutes overlay']");
        this.employeeNameInfo = page.locator("//tr[@id='row-0']//span[contains(text(),'BAT810 - Nguyễn Văn Minh')]");
        this.workingTimeInfo = page.locator("//div[normalize-space()='01:00']");
        this.endTimeInfo = page.locator("//div[normalize-space()='18:00']");
        this.startTimeInfo = page.locator("//div[normalize-space()='17:00']");
        this.reasonInfo = page.locator("//div[contains(text(),'Automation test')]");
        this.newStatusInfo = page.locator("//div[contains(text(),'Mới')]");
        this.toastSendSuccess = page.locator("//div[contains(text(),'Gửi thành công')]");
        this.hour18 = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='18']");
        this.hour17 = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='17']");
        this.openHour = page.locator("//button[@aria-label='Open hours overlay']");
        this.endTime = page.getByRole('textbox', { name: 'Giờ kết thúc ※' });
        this.startTime = page.getByRole('textbox', { name: 'Giờ bắt đầu ※' });
        this.overtimeTicketDayButton = page.getByRole('textbox', { name: 'Ngày tăng ca ※' });
        this.overtimeTicketButton = page.locator("//div[contains(text(),'Phiếu tăng ca')]");
        this.checkInOutHistoryButton = page.locator("//div[@class='v-list-item-title'][contains(text(),'Lịch sử điểm danh')]");
        this.confirmCheckInButton = page.locator("//span[.='Đồng ý']");
        this.checkInButton = page.locator("//span[@class='v-btn__content']//p[contains(text(),'Điểm danh')]");
        this.checkInOutButton = page.locator("//a[@href='/checkin-out']");
    }

    async verifyCancelStatus() {
        await this.safeVerifyTextContains(this.cancelStatusInfo, "Hủy");
    }

    async clickHour19() {
        await this.safeClick(this.hour19);
    }

    async verifyValidateWhenUserChosseWrongTime() {
        await this.safeVerifyTextContains(this.validateWhenUserChosseWrongTime, "Thời gian tăng ca phải nằm trong khung giờ đã chấm");
    }

    async verifyValidateDateRequired() {
        await this.safeVerifyTextContains(this.validateDateRequired, "Nhập ngày tăng ca");
    }

    async clickSelectNewStatus() {
        await this.safeClick(this.selectNewStatus);
    }

    async clickSelectPendingStatus() {
        await this.safeClick(this.selectPendingStatus);
    }

    async verifyRejectStatus() {
        await this.safeVerifyTextContains(this.rejectStatusInfo, "Từ chối");
    }

    async getToastBrowseSuccess() {
        await this.safeVerifyTextContains(this.toastBrowseSuccess, "Phê duyệt thành công")
    }

    async clickMinute10() {
        await this.safeClick(this.minute10);
        await this.safeClick(this.chosseButton);
    }

    async verifyPendingStatus() {
        await this.safeVerifyTextContains(this.pendingStatusInfo, "Chờ duyệt");
    }

    async clickOpenMinute() {
        await this.safeClick(this.openMinute);
    }

    async verifyEmployeeName() {
        await this.safeVerifyTextContains(this.employeeNameInfo, "BAT810 - Nguyễn Văn Minh");
    }

    async verifyWorkingTime() {
        await this.safeVerifyTextContains(this.workingTimeInfo, "01:00");
    }

    async verifyEndTime() {
        await this.safeVerifyTextContains(this.endTimeInfo, "18:00");
    }

    async verifyStartTime() {
        await this.safeVerifyTextContains(this.startTimeInfo, "17:00");
    }

    async verifyReason() {
        await this.safeVerifyTextContains(this.reasonInfo, "Automation test");
    }

    async verifyNewStatus() {
        await this.safeVerifyTextContains(this.newStatusInfo, "Mới");
    }

    async getToastSendSuccess() {
        await this.safeVerifyTextContains(this.toastSendSuccess, "Gửi thành công");
    }

    async clickHour18() {
        await this.safeClick(this.hour18);
    }

    async clickHour17() {
        await this.safeClick(this.hour17);
    }
    async clickOpenHour() {
        await this.safeClick(this.openHour);
    }

    async clickEndTime() {
        await this.safeClick(this.endTime);
    }

    async clickStartTime() {
        await this.safeClick(this.startTime);
    }

    async clickOvertimeTicketDayButton() {
        await this.safeClick(this.overtimeTicketDayButton);
    }

    async clickOvertimeTicketButton() {
        await this.safeClick(this.overtimeTicketButton);
    }

    async clickCheckInOutHistoryButton() {
        await this.safeClick(this.checkInOutHistoryButton);
    }

    async clickConfirmCheckInButton() {
        await this.safeClick(this.confirmCheckInButton);
    }

    async clickCheckInOutButton() {
        await this.safeClick(this.checkInOutButton);
    }

    async clickCheckInButton() {
        await this.safeClick(this.checkInButton);
    }

    // Functions for testing
    async setOverTimeTicket() {
        await this.clickStartTime();
        await this.clickOpenHour();
        await this.clickHour17();
        await this.clickChoose();
        await this.clickEndTime();
        await this.clickOpenHour();
        await this.clickHour18();
        await this.clickChoose();
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
