import { Page, Locator, expect } from "@playwright/test";
import { SafeActions } from "./SafeActions";

export class BasePage extends SafeActions {

    // Buttons 
    readonly searchButton: Locator;
    readonly addButton: Locator;
    readonly clearSearchButton: Locator;
    readonly editRow0Button: Locator;
    readonly deleteRow0Button: Locator;
    readonly saveButton: Locator;
    readonly cancelButton: Locator;
    readonly yesButton: Locator;
    readonly noButton: Locator;
    readonly sendButton: Locator;
    readonly browseButton: Locator;
    readonly rejectButton: Locator;
    readonly confirmButton: Locator;
    readonly chosseButton: Locator;
    readonly editButton: Locator;
    readonly deleteButton: Locator;
    readonly adminButton: Locator;
    readonly timeKeepingManagementButton: Locator;
    readonly salaryButton: Locator;
    readonly settingButton: Locator;

    // Inputs / Textareas
    readonly reasonInput: Locator;
    readonly noteInput: Locator;
    readonly descriptionInput: Locator;
    readonly textareaInput: Locator;

    // Status Indicators / Labels
    readonly browsedStatus: Locator;
    readonly lockStatusRow0: Locator;
    readonly activityStatusRow0: Locator;
    readonly lockStatus: Locator;
    readonly activityStatus: Locator;

    // Dropdowns 
    readonly dropdownStatusSearch: Locator;
    readonly statusDropDownInForm: Locator;

    // Others
    readonly todayDatePicker: Locator;
    readonly iconAction: Locator;
    readonly row0: Locator;


    constructor(page: Page) {
        super(page);
        this.statusDropDownInForm = page.getByRole('combobox').filter({ hasText: 'Trạng thái ※' }).locator('i');
        this.noteInput = page.getByRole('textbox', { name: 'Ghi chú' });
        this.row0 = page.locator("//tr[@id='row-0']");
        this.lockStatus = page.locator("//div[contains(text(),'Khóa')]");
        this.activityStatus = page.locator("//div[contains(text(),'Hoạt động')]");
        this.dropdownStatusSearch = page.getByRole('combobox').filter({ hasText: 'Trạng thái' }).locator('i')
        this.activityStatusRow0 = page.locator("//tr[@id='row-0']//span[@class='custom-size'][contains(text(),'Hoạt động')]");
        this.lockStatusRow0 = page.locator("//tr[@id='row-0']//span[@class='custom-size'][normalize-space()='Khóa']");
        this.adminButton = page.locator("//span[normalize-space()='Quản lý']");
        this.timeKeepingManagementButton = page.locator("//span[normalize-space()='Quản lý chấm công']");
        this.salaryButton = page.locator("//span[normalize-space()='Lương']");
        this.settingButton = page.locator("//span[normalize-space()='Cài đặt']");
        this.iconAction = page.locator("//tr[@id='row-0']//i[contains(@class, 'mdi mdi-format-list-group ')]");
        this.todayDatePicker = page.locator("//div[contains(@class, 'dp__cell_inner') and contains(@class, 'dp__pointer') and contains(@class, 'dp__today')]");
        this.deleteButton = page.locator("//span[contains(text(),'Xóa')]");
        this.editButton = page.locator("//span[contains(text(),'Sửa')]");
        this.reasonInput = page.getByRole('textbox', { name: 'Lý do' });
        this.chosseButton = page.getByRole('button', { name: 'Chọn' });
        this.confirmButton = page.getByRole('button', { name: 'Xác nhận' });
        this.rejectButton = page.getByRole('button', { name: 'Từ chối' });
        this.browsedStatus = page.locator("//tr[@id='row-0']//div[text()='Đã duyệt']");
        this.browseButton = page.getByRole('button', { name: 'Duyệt' });
        this.sendButton = page.getByRole('button', { name: 'Gửi' });
        this.noButton = page.locator("//span[normalize-space()='Không']");
        this.yesButton = page.locator("//span[normalize-space()='Có']");
        this.cancelButton = page.getByRole('button', { name: 'Hủy' });
        this.saveButton = page.locator("//span[normalize-space()='Lưu']");
        this.deleteRow0Button = page.locator("//tr[@id='row-0']//span[contains(text(),'Xóa')]");
        this.editRow0Button = page.locator("//tr[@id='row-0']//span[contains(text(),'Sửa')]");
        this.clearSearchButton = page.locator("//span[normalize-space()='Xóa']").first();
        this.addButton = page.locator("//span[normalize-space()='Thêm']");
        this.searchButton = page.locator("//span[contains(normalize-space(),'Tìm kiếm')]");
        this.descriptionInput = page.getByRole('textbox', { name: 'Mô tả' });
        this.textareaInput = page.locator("//textarea");
    }

    async fillTextarea(text: string) {
        await this.safeFill(this.textareaInput, text);
    }

    async clickRow0() {
        await this.safeClick(this.row0);
    }

    async clickLockStatus() {
        await this.safeClick(this.lockStatus);
    }

    async clickActivityStatus() {
        await this.safeClick(this.activityStatus);
    }

    async clickDropdownStatusSearch() {
        await this.safeClick(this.dropdownStatusSearch);
    }


    async clickDropdownStatusSearchNth1() {
        await this.safeClick(this.dropdownStatusSearch, { nth: 1 });
    }

    async verifyActivityStatusRow0() {
        await this.safeVerifyToHaveText(this.activityStatusRow0, 'Hoạt động');
    }

    async verifyLockStatusRow0() {
        await this.safeVerifyToHaveText(this.lockStatusRow0, 'Khóa');
    }

    async clickNoButton() {
        await this.safeClick(this.noButton);
    }

    async clickAdmin() {
        await this.safeClick(this.adminButton);
    }

    async clickTimeKeepingManagement() {
        await this.safeClick(this.timeKeepingManagementButton);
    }

    async clickSalary() {
        await this.safeClick(this.salaryButton);
    }

    async clickSetting() {
        await this.safeClick(this.settingButton);
    }

    async clickIconAction() {
        await this.safeClick(this.iconAction);
    }

    async clicktodayDatePicker() {
        await this.safeClick(this.todayDatePicker);
        await this.safeClick(this.chosseButton);
    }

    async clickDelete() {
        await this.safeClick(this.deleteButton);
        await this.safeClick(this.yesButton);
    }

    async clickDeleteFirst() {
        await this.safeClick(this.deleteButton, { first: true });
        await this.safeClick(this.yesButton);
    }

    async clickEdit() {
        await this.safeClick(this.editButton);
    }

    async clickEditNth1() {
        await this.safeClick(this.editButton, { nth: 1 });
    }

    async fillReasonAndClickYes(reason: string) {
        await this.safeFill(this.reasonInput, reason);
        await this.safeClick(this.yesButton);
    }

    async fillReason(reason: string) {
        await this.safeFill(this.reasonInput, reason);
    }

    async verifyBrowsedStatus() {
        await this.safeVerifyToHaveText(this.browsedStatus, 'Đã duyệt');
    }

    async clickChoose() {
        await this.safeClick(this.chosseButton);
    }

    async clickConfirm() {
        await this.safeClick(this.confirmButton);
        await this.safeClick(this.yesButton);
    }

    async clickConfirmPaysheet() {
        await this.safeClick(this.confirmButton);
    }

    async clickReject() {
        await this.safeClick(this.rejectButton);
    }

    async clickBrowse() {
        await this.safeClick(this.browseButton);
        await this.safeClick(this.yesButton);
    }

    async clickSendAndClickYes() {
        await this.safeClick(this.sendButton);
        await this.safeClick(this.yesButton);
    }

    async clickSend() {
        await this.safeClick(this.sendButton);
    }

    async clickYes() {
        await this.safeClick(this.yesButton);
    }

    async clickNo() {
        await this.safeClick(this.noButton);
    }

    async clickCancel() {
        await this.safeClick(this.cancelButton);
    }

    async clickCancelNth1() {
        await this.safeClick(this.cancelButton, { nth: 1 });
    }

    async clickSave() {
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(700);
        await this.safeClick(this.saveButton);
    }

    async clickSaveNth1() {
        await this.safeClick(this.saveButton, { nth: 1 });
    }

    async clickDeleteRow0() {
        await this.safeClick(this.deleteRow0Button);
        await this.safeClick(this.yesButton);
    }

    async clickEditRow0() {
        await this.safeClick(this.editRow0Button);
    }

    async clickClearSearch() {
        await this.safeClick(this.clearSearchButton);
    }

    async clickAdd() {
        await this.safeClick(this.addButton);
    }

     async clickAddNth1() {
        await this.safeClick(this.addButton, { nth: 1 });
    }

    async clickSearch() {
        await this.safeClick(this.searchButton);
    }

    async fillNote(note: string) {
        await this.safeFill(this.noteInput, note);
    }

    async fillDescription(description: string) {
        await this.safeFill(this.descriptionInput, description);
    }

    async clickDropdownStatusInForm() {
        await this.safeClick(this.statusDropDownInForm);
    }

    async clickDropdownStatusInFormNth1() {
        await this.safeClick(this.statusDropDownInForm, { nth: 1 });
    }
}
