import { Locator, Page, expect } from 'playwright/test';
import { BasePage } from '../BasePage';

export class MonthlyCheckinPage extends BasePage {

    readonly EXPORT_BUTTON: Locator;
    readonly FISRT_CHECKBOX: Locator;
    readonly SECOND_CHECKBOX: Locator;
    readonly MONTHLY_CHECKIN_BUTTON: Locator;
    readonly HISTORY_EDIT_BUTTON: Locator;
    readonly HISTORY_LINK_BUTTON: Locator;
    readonly TIME_DOPDOWN: Locator;
    readonly SUBMIT_CHECKDAY_BUTTON: Locator;
    readonly SEARCH_BY_NAME_INPUT: Locator;
    readonly NOT_APPROVED_STATUS: Locator;
    readonly APPROVED_STATUS: Locator;
    readonly MONTHLY_APPROVAL_BUTTON: Locator;
    readonly MONTHLY_CLOSING: Locator;
    readonly CANCEL_MONTHLY_CLOSING_BUTTON: Locator;
    readonly CLOSE_FORM_BUTTON: Locator;

    // Toast
    readonly TOAST_MONTHLY_APPROVAL_SUCCESS: Locator;
    readonly TOAST_MONTHLY_CLOSING_SUCCESS: Locator;

    constructor(page: Page) {
        super(page);
        this.CLOSE_FORM_BUTTON = page.getByRole('dialog').filter({ hasText: 'Thông tin lịch sử' }).locator('i').first();
        this.CANCEL_MONTHLY_CLOSING_BUTTON = page.locator("//span[contains(text(),'Hủy xác nhận')]");
        this.TOAST_MONTHLY_CLOSING_SUCCESS = page.getByText('Xác nhận công tháng thành công');
        this.MONTHLY_CLOSING = page.locator("//span[contains(text(),'Xác nhận công tháng')]");
        this.TOAST_MONTHLY_APPROVAL_SUCCESS = page.getByText('Phê duyệt công tháng thành công');
        this.MONTHLY_APPROVAL_BUTTON = page.getByText('Phê duyệt công tháng')
        this.APPROVED_STATUS = page.getByText('Đã phê duyệt', { exact: true })
        this.NOT_APPROVED_STATUS = page.getByText('Chưa phê duyệt', { exact: true });
        this.SEARCH_BY_NAME_INPUT = page.getByRole('textbox', { name: 'Tên nhân viên' });
        this.SUBMIT_CHECKDAY_BUTTON = page.getByText('Chưa xác nhận', { exact: true }).first();
        this.TIME_DOPDOWN = page.getByRole('textbox', { name: 'Thời gian ※' });
        this.HISTORY_LINK_BUTTON = page.locator("//div[@class='v-list-item-title'][contains(text(),'Lịch sử điểm danh')]");
        this.HISTORY_EDIT_BUTTON = page.locator("(//span[.=' Lịch sử'])[11]"); // day is 11
        this.FISRT_CHECKBOX = page.locator("(//input[@type='checkbox'])[1]");
        this.SECOND_CHECKBOX = page.locator("(//input[@type='checkbox'])[2]");
        this.MONTHLY_CHECKIN_BUTTON = page.locator("//div[@class='v-list-item-title'][contains(text(),'Chấm công tháng')]");
        this.EXPORT_BUTTON = page.getByRole('button', { name: 'Xuất dữ liệu' });
    }

    async clickCloseFormButton() {
        await this.safeClick(this.CLOSE_FORM_BUTTON);
    }

    async clickCancelMonthlyClosingButton() {
        await this.safeClick(this.CANCEL_MONTHLY_CLOSING_BUTTON);
    }

    async checkToastMonthlyClosingSuccess() {
        await this.safeVerifyToHaveText(this.TOAST_MONTHLY_CLOSING_SUCCESS, 'Xác nhận công tháng thành công');
    }

    async clickMonthlyClosing() {
        await this.safeClick(this.MONTHLY_CLOSING);
        await this.clickYes();
    }

    async checkToastMonthlyApprovalSuccess() {
        await this.safeVerifyToHaveText(this.TOAST_MONTHLY_APPROVAL_SUCCESS, 'Phê duyệt công tháng thành công');
    }

    async clickMonthlyApprovalButton() {
        await this.safeClick(this.MONTHLY_APPROVAL_BUTTON);
        await this.clickYes();
    }

    async clickApprovedStatus() {
        await this.safeClick(this.APPROVED_STATUS);
    }

    async clickNotApprovedStatus() {
        await this.safeClick(this.NOT_APPROVED_STATUS);
    }

    async searchByNameInput(name: string) {
        await this.safeFill(this.SEARCH_BY_NAME_INPUT, name);
    }

    async clickSubmitCheckdayButton() {
        await this.safeClick(this.SUBMIT_CHECKDAY_BUTTON);
    }

    async selectTimeDropdown() {
        await this.safeClick(this.TIME_DOPDOWN);
    }

    async clickHistoryLinkButton() {
        await this.safeClick(this.HISTORY_LINK_BUTTON);
    }

    async clickHistoryEditButton() {
        await this.safeClick(this.HISTORY_EDIT_BUTTON);
    }

    async clickSecondCheckbox() {
        await this.safeClick(this.SECOND_CHECKBOX);
    }

    async clickMonthlyCheckinButton() {
        await this.safeClick(this.MONTHLY_CHECKIN_BUTTON);
    }

    async clickExportButton() {
        await this.safeClick(this.EXPORT_BUTTON);
    }

    async clickFirstCheckbox() {
        await this.safeClick(this.FISRT_CHECKBOX);
    }
}
