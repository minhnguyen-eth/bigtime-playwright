import { Page, Locator, expect } from "@playwright/test";
import { SafeActions } from "./SafeActions";

export class BasePage extends SafeActions {

    // Buttons 
    readonly SEARCH_BUTTON: Locator;
    readonly ADD_BUTTON: Locator;
    readonly CLEAR_SEARCH_BUTTON: Locator;
    readonly EDIT_ROW0_BUTTON: Locator;
    readonly DELETE_ROW0_BUTTON: Locator;
    readonly SAVE_BUTTON: Locator;
    readonly CANCEL_BUTTON: Locator;
    readonly YES_BUTTON: Locator;
    readonly NO_BUTTON: Locator;
    readonly SEND_BUTTON: Locator;
    readonly BROWSE_BUTTON: Locator;
    readonly REJECT_BUTTON: Locator;
    readonly CONFIRM_BUTTON: Locator;
    readonly CHOSSE_BUTTON: Locator;
    readonly EDIT_BUTTON: Locator;
    readonly DELETE_BUTTON: Locator;
    readonly ADMIN_BUTTON: Locator;
    readonly TIMEKEEPING_MANAGEMENT_BUTTON: Locator;
    readonly SALARY_BUTTON: Locator;
    readonly SETTING_BUTTON: Locator;

    // Inputs / Textareas
    readonly REASON_INPUT: Locator;
    readonly NOTE_INPUT: Locator;
    readonly DESCRIPTION_INPUT: Locator;
    readonly TEXTAREA_INPUT: Locator;

    // Status Indicators / Labels
    readonly BROWSED_STATUS: Locator;
    readonly LOCK_STATUS_ROW0: Locator;
    readonly ACTIVITY_STATUS_ROW0: Locator;
    readonly LOCK_STATUS: Locator;
    readonly ACTIVITY_STATUS: Locator;

    // Dropdowns 
    readonly DROPDOWN_STATUS_SEARCH: Locator;
    readonly STATUS_DROPDOWN_IN_FORM: Locator;

    // Others
    readonly TODAY_DATE_PICKER: Locator;
    readonly ICON_ACTION: Locator;
    readonly ROW0: Locator;

    // HOUR PICKER
    readonly OPEN_MINUTES_OVERLAY_BUTTON: Locator;
    readonly OPEN_HOURS_OVERLAY_BUTTON: Locator;

    // DATE PICKER
    readonly OPEN_YEAR_OVERLAY_BUTTON: Locator;
    readonly OPEN_MONTH_OVERLAY_BUTTON: Locator;

    // MONTH PICKER FILTER
    readonly CHOOSE_MONTH_FILTER: Locator;

    // CHECKBOX
    readonly FISRT_CHECKBOX: Locator;
    readonly SECOND_CHECKBOX: Locator;

    constructor(page: Page) {
        super(page);
        // CHECKBOX
        this.FISRT_CHECKBOX = page.locator("(//input[@type='checkbox'])[1]");
        this.SECOND_CHECKBOX = page.locator("(//input[@type='checkbox'])[2]");

        // DATE PICKER
        this.OPEN_YEAR_OVERLAY_BUTTON = page.getByRole('button', { name: 'Open years overlay' });
        this.OPEN_MONTH_OVERLAY_BUTTON = page.getByRole('button', { name: 'Open months overlay' });
        this.CHOOSE_MONTH_FILTER = page.getByRole('textbox', { name: 'Chọn tháng' });

        // HOUR PICKER
        this.OPEN_HOURS_OVERLAY_BUTTON = page.getByRole('button', { name: 'Open hours overlay' });
        this.OPEN_MINUTES_OVERLAY_BUTTON = page.getByRole('button', { name: 'Open minutes overlay' });

        // Dropdowns
        this.STATUS_DROPDOWN_IN_FORM = page.getByRole('combobox').filter({ hasText: 'Trạng thái' }).locator('i');
        this.DROPDOWN_STATUS_SEARCH = page.getByRole('combobox').filter({ hasText: 'Trạng thái' }).locator('i');

        // Inputs / Textarea
        this.NOTE_INPUT = page.getByRole('textbox', { name: 'Ghi chú' });
        this.REASON_INPUT = page.getByRole('textbox', { name: 'Lý do' });
        this.DESCRIPTION_INPUT = page.getByRole('textbox', { name: 'Mô tả' });
        this.TEXTAREA_INPUT = page.locator("//textarea[1]");

        // Row & statuses
        this.ROW0 = page.locator("//tr[@id='row-0']");
        this.LOCK_STATUS = page.locator("//div[contains(text(),'Khóa')]");
        this.ACTIVITY_STATUS = page.locator("//div[contains(text(),'Hoạt động')]");
        this.ACTIVITY_STATUS_ROW0 = page.locator("//tr[@id='row-0']//span[@class='custom-size'][contains(text(),'Hoạt động')]");
        this.LOCK_STATUS_ROW0 = page.locator("//tr[@id='row-0']//span[@class='custom-size'][normalize-space()='Khóa']");
        this.BROWSED_STATUS = page.locator("//tr[@id='row-0']//div[text()='Đã duyệt']");

        // Main Buttons
        this.ADMIN_BUTTON = page.getByRole('heading', { name: 'Quản lý' });
        this.TIMEKEEPING_MANAGEMENT_BUTTON = page.getByRole('heading', { name: 'Chấm công' });
        this.SALARY_BUTTON = page.getByRole('heading', { name: 'Lương' });
        this.SETTING_BUTTON = page.getByRole('heading', { name: 'Cài đặt' });

        // Others
        this.ICON_ACTION = page.locator('#row-0').getByRole('cell', { name: '󰇙 Thao tác' });
        this.TODAY_DATE_PICKER = page.locator("div.dp__cell_inner.dp__pointer.dp__today");

        // Common Buttons
        this.DELETE_BUTTON = page.locator("//span[contains(text(),'Xóa')]");
        this.EDIT_BUTTON = page.locator("//span[contains(text(),'Sửa')]");
        this.CHOSSE_BUTTON = page.getByRole('button', { name: 'Chọn' });
        this.CONFIRM_BUTTON = page.getByRole('button', { name: 'Xác nhận' });
        this.REJECT_BUTTON = page.getByRole('button', { name: 'Từ chối' });
        this.BROWSE_BUTTON = page.getByRole('button', { name: 'Duyệt' });
        this.SEND_BUTTON = page.getByRole('button', { name: 'Gửi' });
        this.NO_BUTTON = page.locator("//span[normalize-space()='Không']");
        this.YES_BUTTON = page.locator("//span[normalize-space()='Có']");
        this.CANCEL_BUTTON = page.getByRole('button', { name: 'Hủy' });
        this.SAVE_BUTTON = page.locator("//span[normalize-space()='Lưu']");

        // Row buttons
        this.DELETE_ROW0_BUTTON = page.locator("//tr[@id='row-0']//span[contains(text(),'Xóa')]");
        this.EDIT_ROW0_BUTTON = page.locator("//tr[@id='row-0']//span[contains(text(),'Sửa')]");

        // Search buttons
        this.CLEAR_SEARCH_BUTTON = page.locator("//span[normalize-space()='Xóa']").first();
        this.ADD_BUTTON = page.locator("//span[normalize-space()='Thêm']");
        this.SEARCH_BUTTON = page.locator("//span[contains(normalize-space(),'Tìm kiếm')]");
    }

    async clickFirstCheckbox() { await this.safeClick(this.FISRT_CHECKBOX); }
    
    async clickSecondCheckbox() { await this.safeClick(this.SECOND_CHECKBOX); }

    async clickOpenYearOverlayButton() { await this.safeClick(this.OPEN_YEAR_OVERLAY_BUTTON); }
    async clickOpenMonthOverlayButton() { await this.safeClick(this.OPEN_MONTH_OVERLAY_BUTTON); }

    async clickChosseMonthPicker(month: number) {
        const locator = this.page.locator(`//div[text()='Thg ${month}']`);
        await this.safeClick(locator);
        await this.clickChoose();
    }

    async clickChooseMonthFilter() { await this.safeClick(this.CHOOSE_MONTH_FILTER); }

    async verifyTotalReceived(amount: string) {
        const locator = this.page.locator(`(//td[@class='text-right'][contains(text(),'${amount} đ')])[3]`);
        await this.safeVerifyTextContains(locator, amount);
    }

    async chosseHourPicker(hour: string) {
        await this.safeClick(this.page.getByRole('gridcell', { name: `${hour}` }));
    }

    async chosseMinutePicker(minute: string) {
        await this.safeClick(this.page.getByText(`${minute}`, { exact: true }));
    }

    async clickOpenHoursOverlayButton() { await this.safeClick(this.OPEN_HOURS_OVERLAY_BUTTON); }
    async clickOpenMinutesOverlayButton() { await this.safeClick(this.OPEN_MINUTES_OVERLAY_BUTTON); }

    async fillTextarea(text: string) { await this.safeFill(this.TEXTAREA_INPUT, text); }

    async clickRow0() { await this.safeClick(this.ROW0); }
    async clickLockStatus() { await this.safeClick(this.LOCK_STATUS); }
    async clickActivityStatus() { await this.safeClick(this.ACTIVITY_STATUS); }

    async clickDropdownStatusSearch() { await this.safeClick(this.DROPDOWN_STATUS_SEARCH); }
    async clickDropdownStatusSearchNth1() { await this.safeClick(this.DROPDOWN_STATUS_SEARCH, { nth: 1 }); }

    async verifyActivityStatusRow0() { await this.safeVerifyToHaveText(this.ACTIVITY_STATUS_ROW0, 'Hoạt động'); }
    async verifyLockStatusRow0() { await this.safeVerifyToHaveText(this.LOCK_STATUS_ROW0, 'Khóa'); }

    async clickNoButton() { await this.safeClick(this.NO_BUTTON); }
    async clickAdmin() { await this.safeClick(this.ADMIN_BUTTON); }
    async clickTimeKeepingManagement() { await this.safeClick(this.TIMEKEEPING_MANAGEMENT_BUTTON); }
    async clickSalary() { await this.safeClick(this.SALARY_BUTTON); }
    async clickSetting() { await this.safeClick(this.SETTING_BUTTON); }
    async clickIconAction() { await this.safeClick(this.ICON_ACTION); }

    async clickTodayDatePicker() {
        await this.safeClick(this.TODAY_DATE_PICKER);
        await this.safeClick(this.CHOSSE_BUTTON);
    }

    async clickDelete() {
        await this.safeClick(this.DELETE_BUTTON);
        await this.safeClick(this.YES_BUTTON);
    }

    async clickDeleteFirst() {
        await this.safeClick(this.DELETE_BUTTON, { first: true });
        await this.safeClick(this.YES_BUTTON);
    }

    async clickEdit() { await this.safeClick(this.EDIT_BUTTON); }
    async clickEditNth1() { await this.safeClick(this.EDIT_BUTTON, { nth: 1 }); }

    async fillReasonAndClickYes(reason: string) {
        await this.safeFill(this.REASON_INPUT, reason);
        await this.safeClick(this.YES_BUTTON);
    }

    async fillReason(reason: string) { await this.safeFill(this.REASON_INPUT, reason); }

    async verifyBrowsedStatus() { await this.safeVerifyToHaveText(this.BROWSED_STATUS, 'Đã duyệt'); }

    async clickChoose() { await this.safeClick(this.CHOSSE_BUTTON); }

    async clickConfirm() {
        await this.safeClick(this.CONFIRM_BUTTON);
        await this.safeClick(this.YES_BUTTON);
    }

    async clickConfirmPaysheet() { await this.safeClick(this.CONFIRM_BUTTON); }
    async clickReject() { await this.safeClick(this.REJECT_BUTTON); }

    async clickBrowse() {
        await this.safeClick(this.BROWSE_BUTTON);
        await this.safeClick(this.YES_BUTTON);
    }

    async clickSendAndClickYes() {
        await this.safeClick(this.SEND_BUTTON);
        await this.safeClick(this.YES_BUTTON);
    }

    async clickSend() { await this.safeClick(this.SEND_BUTTON); }
    async clickYes() { await this.safeClick(this.YES_BUTTON); }
    async clickNo() { await this.safeClick(this.NO_BUTTON); }

    async clickCancel() { await this.safeClick(this.CANCEL_BUTTON); }
    async clickCancelNth1() { await this.safeClick(this.CANCEL_BUTTON, { nth: 1 }); }

    async clickSave() {
        await this.page.waitForTimeout(700);
        await this.safeClick(this.SAVE_BUTTON);
    }

    async clickSaveNth1() { await this.safeClick(this.SAVE_BUTTON, { nth: 1 }); }

    async clickDeleteRow0() {
        await this.safeClick(this.DELETE_ROW0_BUTTON);
        await this.safeClick(this.YES_BUTTON);
    }

    async clickEditRow0() { await this.safeClick(this.EDIT_ROW0_BUTTON); }

    async clickClearSearch() { await this.safeClick(this.CLEAR_SEARCH_BUTTON); }

    async clickAdd() { await this.safeClick(this.ADD_BUTTON); }
    async clickAddNth1() { await this.safeClick(this.ADD_BUTTON, { nth: 1 }); }

    async clickSearch() { await this.safeClick(this.SEARCH_BUTTON); }

    async fillNote(note: string) { await this.safeFill(this.NOTE_INPUT, note); }
    async fillDescription(description: string) { await this.safeFill(this.DESCRIPTION_INPUT, description); }

    async clickDropdownStatusInForm() { await this.safeClick(this.STATUS_DROPDOWN_IN_FORM); }
    async clickDropdownStatusInFormNth1() { await this.safeClick(this.STATUS_DROPDOWN_IN_FORM, { nth: 1 }); }
}
