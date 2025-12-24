import { Locator, Page, expect } from 'playwright/test';
import { BasePage } from '../BasePage';

export class OvertimeTicketPage extends BasePage {

    // Check in/out
    readonly CHECK_IN_OUT_BUTTON: Locator;
    readonly CHECK_IN_BUTTON: Locator;
    readonly CONFIRM_CHECK_IN_BUTTON: Locator;

    // Check in/out history
    readonly CHECK_IN_OUT_HISTORY_BUTTON: Locator;

    // Overtime ticket
    readonly OVERTIME_TICKET_BUTTON: Locator;
    readonly OVERTIME_TICKET_DAY_BUTTON: Locator;
    readonly START_TIME: Locator;
    readonly END_TIME: Locator;
    readonly OPEN_HOUR: Locator;
    readonly HOUR_17: Locator;
    readonly HOUR_18: Locator;
    readonly HOUR_19: Locator;
    readonly TOAST_SEND_SUCCESS: Locator;
    readonly NEW_STATUS_INFO: Locator;
    readonly REASON_INFO: Locator;
    readonly WORKING_TIME_INFO: Locator;
    readonly EMPLOYEE_NAME_INFO: Locator;
    readonly CANCEL_STATUS_INFO: Locator;
    readonly OPEN_MINUTE: Locator;
    readonly MINUTE_10: Locator;
    readonly PENDING_STATUS_INFO: Locator;
    readonly TOAST_BROWSE_SUCCESS: Locator;
    readonly BROWSED_STATUS_INFO: Locator;
    readonly REJECT_STATUS_INFO: Locator;
    readonly DROPDOWN_STATUS: Locator;
    readonly SELECT_PENDING_STATUS: Locator;
    readonly SELECT_NEW_STATUS: Locator;
    readonly VALIDATE_DATE_REQUIRED: Locator;
    readonly VALIDATE_WHEN_USER_CHOOSE_WRONG_TIME: Locator;
    readonly VERIFY_TIME: (time: string) => Locator;

    constructor(page: Page) {
        super(page);
        this.VERIFY_TIME = (time: string) => page.getByRole('cell', { name: time, exact: true });
        this.CANCEL_STATUS_INFO = page.locator("//div[contains(@class, 'text-body-2') and contains(text(), 'Hủy')]");
        this.HOUR_19 = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='19']");
        this.VALIDATE_WHEN_USER_CHOOSE_WRONG_TIME = page.locator("//li[contains(text(),'Đã chấm công ra lúc')]");
        this.VALIDATE_DATE_REQUIRED = page.locator("//div[contains(text(),'Nhập ngày tăng ca')]");
        this.SELECT_NEW_STATUS = page.locator("//div[contains(text(),'Mới')]");
        this.SELECT_PENDING_STATUS = page.locator("//div[contains(text(),'Chờ duyệt')]");
        this.DROPDOWN_STATUS = page.getByRole('combobox').filter({ hasText: 'Trạng thái ※' }).locator('i');
        this.REJECT_STATUS_INFO = page.locator("//div[contains(@class, 'text-body-2') and contains(text(), 'Từ chối')]");
        this.BROWSED_STATUS_INFO = page.locator("//div[contains(text(),'Đã duyệt')]");
        this.TOAST_BROWSE_SUCCESS = page.locator("//div[contains(text(),'Phê duyệt thành công')]");
        this.PENDING_STATUS_INFO = page.locator("//div[contains(text(),'Chờ duyệt')]");
        this.MINUTE_10 = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='10']");
        this.OPEN_MINUTE = page.locator("//button[@aria-label='Open minutes overlay']");
        this.EMPLOYEE_NAME_INFO = page.locator("//tr[@id='row-0']//span[contains(text(),'BAT810 - Nguyễn Văn Minh')]");
        this.WORKING_TIME_INFO = page.locator("//div[normalize-space()='01:00']");
        this.REASON_INFO = page.locator("//div[contains(text(),'Automation test')]");
        this.NEW_STATUS_INFO = page.locator("//div[contains(text(),'Mới')]");
        this.TOAST_SEND_SUCCESS = page.locator("//div[contains(text(),'Gửi thành công')]");
        this.HOUR_18 = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='18']");
        this.HOUR_17 = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='17']");
        this.OPEN_HOUR = page.locator("//button[@aria-label='Open hours overlay']");
        this.END_TIME = page.getByRole('textbox', { name: 'Giờ kết thúc ※' });
        this.START_TIME = page.getByRole('textbox', { name: 'Giờ bắt đầu ※' });
        this.OVERTIME_TICKET_DAY_BUTTON = page.getByRole('textbox', { name: 'Ngày tăng ca ※' });
        this.OVERTIME_TICKET_BUTTON = page.locator("//div[contains(text(),'Phiếu tăng ca')]");
        this.CHECK_IN_OUT_HISTORY_BUTTON = page.locator("//div[@class='v-list-item-title'][contains(text(),'Lịch sử điểm danh')]");
        this.CONFIRM_CHECK_IN_BUTTON = page.locator("//span[.='Đồng ý']");
        this.CHECK_IN_BUTTON = page.locator("//span[@class='v-btn__content']//p[contains(text(),'Điểm danh')]");
        this.CHECK_IN_OUT_BUTTON = page.locator("//a[@href='/checkin-out']");
    }

    async verifyCancelStatus() {
        await this.safeVerifyTextContains(this.CANCEL_STATUS_INFO, "Hủy");
    }

    async clickHour19() {
        await this.safeClick(this.HOUR_19);
    }

    async verifyValidateWhenUserChooseWrongTime() {
        await this.safeVerifyTextContains(this.VALIDATE_WHEN_USER_CHOOSE_WRONG_TIME, "Đã chấm công ra lúc");
    }

    async verifyValidateDateRequired() {
        await this.safeVerifyTextContains(this.VALIDATE_DATE_REQUIRED, "Nhập ngày tăng ca");
    }

    async clickSelectNewStatus() {
        await this.safeClick(this.SELECT_NEW_STATUS);
    }

    async clickSelectPendingStatus() {
        await this.safeClick(this.SELECT_PENDING_STATUS);
    }

    async verifyRejectStatus() {
        await this.safeVerifyTextContains(this.REJECT_STATUS_INFO, "Từ chối");
    }

    async getToastBrowseSuccess() {
        await this.safeVerifyTextContains(this.TOAST_BROWSE_SUCCESS, "Phê duyệt thành công");
    }

    async clickMinute10() {
        await this.safeClick(this.MINUTE_10);
        await this.clickChoose();
    }

    async verifyPendingStatus() {
        await this.safeVerifyTextContains(this.PENDING_STATUS_INFO, "Chờ duyệt");
    }

    async clickOpenMinute() {
        await this.safeClick(this.OPEN_MINUTE);
    }

    async verifyEmployeeName() {
        await this.safeVerifyTextContains(this.EMPLOYEE_NAME_INFO, "BAT810 - Nguyễn Văn Minh");
    }

    async verifyTotalOvertime(expectedTime: string) {
        await this.safeVerifyTextContains(
            this.VERIFY_TIME(expectedTime),
            expectedTime
        );
    }

    async verifyEndTime(expectedTime: string) {
        await this.safeVerifyTextContains(
            this.VERIFY_TIME(expectedTime),
            expectedTime
        );
    }

    async verifyStartTime(expectedTime: string) {
        await this.safeVerifyTextContains(
            this.VERIFY_TIME(expectedTime),
            expectedTime
        );
    }


    async verifyReason() {
        await this.safeVerifyTextContains(this.REASON_INFO, "Automation test");
    }

    async verifyNewStatus() {
        await this.safeVerifyTextContains(this.NEW_STATUS_INFO, "Mới");
    }

    async getToastSendSuccess() {
        await this.safeVerifyTextContains(this.TOAST_SEND_SUCCESS, "Gửi thành công");
    }

    async clickHour18() {
        await this.safeClick(this.HOUR_18);
    }

    async clickHour17() {
        await this.safeClick(this.HOUR_17);
    }

    async clickOpenHour() {
        await this.safeClick(this.OPEN_HOUR);
    }

    async clickEndTime() {
        await this.safeClick(this.END_TIME);
    }

    async clickStartTime() {
        await this.safeClick(this.START_TIME);
    }

    async clickOvertimeTicketDayButton() {
        await this.safeClick(this.OVERTIME_TICKET_DAY_BUTTON);
    }

    async clickOvertimeTicketButton() {
        await this.safeClick(this.OVERTIME_TICKET_BUTTON);
    }

    async clickCheckInOutHistoryButton() {
        await this.safeClick(this.CHECK_IN_OUT_HISTORY_BUTTON);
    }

    async clickConfirmCheckInButton() {
        await this.safeClick(this.CONFIRM_CHECK_IN_BUTTON);
    }

    async clickCheckInOutButton() {
        await this.safeClick(this.CHECK_IN_OUT_BUTTON);
    }

    async clickCheckInButton() {
        await this.safeClick(this.CHECK_IN_BUTTON);
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
        await this.verifyStartTime('17:00');
        await this.verifyEndTime('18:00');
        await this.verifyTotalOvertime('01:00');
        await this.verifyNewStatus();
        await this.verifyEmployeeName();
    }

    async verifyOvertimeTicketPendingStatus() {
        await this.verifyReason();
        await this.verifyStartTime('17:00');
        await this.verifyEndTime('18:00');
        await this.verifyTotalOvertime('01:00');
        await this.verifyPendingStatus();
        await this.verifyEmployeeName();
    }

    async verifyOvertimeTicketBrowsedStatus() {
        await this.verifyReason();
        await this.verifyStartTime('17:00');
        await this.verifyEndTime('18:00');
        await this.verifyTotalOvertime('01:00');
        await this.verifyBrowsedStatus();
        await this.verifyEmployeeName();
    }

    async verifyOvertimeTicketRejectStatus() {
        await this.verifyReason();
        await this.verifyStartTime('17:00');
        await this.verifyEndTime('18:00');
        await this.verifyTotalOvertime('01:00');
        await this.verifyRejectStatus();
        await this.verifyEmployeeName();
    }

    async verifyOvertimeTicketCancelStatus() {
        await this.verifyReason();
        await this.verifyStartTime('17:00');
        await this.verifyEndTime('18:00');
        await this.verifyTotalOvertime('01:00');
        await this.verifyCancelStatus();
        await this.verifyEmployeeName();
    }

    async verifyBrowsedStatus() {
        await this.safeVerifyTextContains(this.BROWSED_STATUS_INFO, "Đã duyệt");
    }
}