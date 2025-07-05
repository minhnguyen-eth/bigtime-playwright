import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
    readonly page: Page;
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
    readonly browsedStatus: Locator;
    readonly rejectButton: Locator;
    readonly confirmButton: Locator;
    readonly chosseButton: Locator;
    readonly reasonInput: Locator;
    readonly editButton: Locator;
    readonly deleteButton: Locator;
    readonly toDayDatePicker: Locator;
    readonly iconAction: Locator;
    readonly Admin_Button: Locator;
    readonly TimeKeepingManagement_Button: Locator;
    readonly Salary_Button: Locator;
    readonly Setting_Button: Locator;
    readonly lockStatusRow0: Locator;
    readonly activityStatusRow0: Locator;
    readonly dropdownStatusSearch: Locator;
    readonly lockStatus: Locator;
    readonly activityStatus: Locator;
    readonly row0: Locator;
    readonly noExistData: Locator;
    readonly iconStatusDropdown: Locator;
    readonly validationNameExist: Locator;


    // Validatation
    readonly requiredFillReason: Locator;

    constructor(page: Page) {
        this.page = page;
        this.validationNameExist = page.locator("//li[contains(text(),'Tên đã tồn tại.')]");
        this.iconStatusDropdown = page.locator("//i[@class='mdi-book-lock-open-outline mdi v-icon notranslate v-theme--lightColor7 v-icon--size-default']");
        this.noExistData = page.locator("//td[.='Không có dữ liệu']");
        this.row0 = page.locator("//tr[@id='row-0']");
        this.lockStatus = page.locator("//div[contains(text(),'Khóa')]");
        this.activityStatus = page.locator("//div[contains(text(),'Hoạt động')]");
        this.dropdownStatusSearch = page.locator("//div[@class='v-field v-field--appended v-field--center-affix v-field--variant-outlined v-theme--lightColor7 v-locale--is-ltr']//i[@class='mdi-menu-down mdi v-icon notranslate v-theme--lightColor7 v-icon--size-default v-select__menu-icon']");
        this.activityStatusRow0 = page.locator("//tr[@id='row-0']//span[@class='custom-size'][contains(text(),'Hoạt động')]");
        this.lockStatusRow0 = page.locator("//tr[@id='row-0']//span[@class='custom-size'][normalize-space()='Khóa']");
        this.Admin_Button = page.locator("//span[normalize-space()='Quản lý']");
        this.TimeKeepingManagement_Button = page.locator("//span[normalize-space()='Quản lý chấm công']");
        this.Salary_Button = page.locator("//span[normalize-space()='Lương']");
        this.Setting_Button = page.locator("//span[normalize-space()='Cài đặt']");
        this.iconAction = page.locator("//tr[@id='row-0']//i[@class='mdi mdi-format-list-group mdi v-icon notranslate v-theme--lightColor7 v-icon--size-default']");
        this.requiredFillReason = page.locator("//div[contains(text(),'Nhập lý do')]");
        this.toDayDatePicker = page.locator("//div[@class='dp__cell_inner dp__pointer dp__today dp__date_hover']");
        this.deleteButton = page.locator("//span[contains(text(),'Xóa')]");
        this.editButton = page.locator("//span[contains(text(),'Sửa')]");
        this.reasonInput = page.locator("//textarea");
        this.chosseButton = page.locator("//button[contains(text(),'Chọn')]");
        this.confirmButton = page.locator("//span[contains(text(),'Xác nhận')]");
        this.rejectButton = page.locator("//span[contains(text(),'Từ chối')]");
        this.browsedStatus = page.locator("//tr[@id='row-0']//div[text()='Đã duyệt']");
        this.browseButton = page.locator("//span[contains(text(),'Duyệt')]");
        this.sendButton = page.locator("//span[contains(text(),'Gửi')]");
        this.noButton = page.locator("//span[normalize-space()='Không']");
        this.yesButton = page.locator("//span[normalize-space()='Có']");
        this.cancelButton = page.locator("//span[contains(text(),'Hủy')]");
        this.saveButton = page.locator("//span[normalize-space()='Lưu']");//span[contains(normalize-space(),'Lưu')]
        this.deleteRow0Button = page.locator("//tr[@id='row-0']//span[contains(text(),'Xóa')]");
        this.editRow0Button = page.locator("//tr[@id='row-0']//span[contains(text(),'Sửa')]");
        this.clearSearchButton = page.locator("//span[.=' Xóa']");
        this.addButton = page.locator("//span[normalize-space()='Thêm']");
        this.searchButton = page.locator("//span[contains(normalize-space(),'Tìm kiếm')]");
       
    }

    async expectNameExist() {
        await expect(this.validationNameExist).toBeVisible();
        await expect(this.validationNameExist).toHaveText('Tên đã tồn tại.');
    }

    async clickIconStatusDropdown() {
        await this.iconStatusDropdown.click();
    }

    async verifyNoExistData() {
        await expect(this.noExistData).toBeVisible();
        await expect(this.noExistData).toHaveText('Không có dữ liệu');
    }

    async clickRow0() {
        await this.row0.click();
    }

    async clickLockStatus() {
        await this.lockStatus.click();
    }

    async clickActivityStatus() {
        await this.activityStatus.click();
    }

    async clickDropdownStatusSearch() {
        await this.dropdownStatusSearch.click();
    }

    async verifyActivityStatusRow0() {
        await expect(this.activityStatusRow0).toBeVisible();
        await expect(this.activityStatusRow0).toHaveText('Hoạt động');
    }

    async verifyLockStatusRow0() {
        await expect(this.lockStatusRow0).toBeVisible();
        await expect(this.lockStatusRow0).toHaveText('Khóa');
    }

    async clickNoButton() {
        await this.noButton.click();
    }

    async clickAdmin() {
        await this.Admin_Button.click();
    }

    async clickTimeKeepingManagement() {
        await this.TimeKeepingManagement_Button.click();
    }

    async clickSalary() {
        await this.Salary_Button.click();
    }

    async clickSetting() {
        await this.Setting_Button.click();
    }

    async clickIconAction() {
        await this.iconAction.click();
    }

    async verifyRequiredFillReason() {
        await expect(this.requiredFillReason).toBeVisible();
        await expect(this.requiredFillReason).toHaveText('Nhập lý do');
    }

    async clickTodayDatePicker() {
        await this.toDayDatePicker.click();
        await this.chosseButton.click();
    }

    async clickDelete() {
        await this.deleteButton.click();
        await this.yesButton.click();
    }

    async clickEdit() {
        await this.page.waitForLoadState('networkidle');
        await this.editButton.click();
    }

    async fillReason(reason: string) {
        await this.reasonInput.fill(reason);
        await this.yesButton.click();
    }

    async verifyBrowsedStatus() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.browsedStatus).toHaveText('Đã duyệt');
    }

    async clickChoose() {
        await this.chosseButton.click();
    }

    async clickConfirm() {
        await this.confirmButton.click();
        await this.yesButton.click();
    }

    async clickReject() {
        await this.rejectButton.click();
    }

    async clickBrowse() {
        await this.browseButton.click();
        await this.yesButton.click();
    }

    async clickSend() {
        await this.sendButton.click();
        await this.yesButton.click();
    }

    async clickYes() {
        await this.yesButton.click();

    }

    async clickNo() {
        await this.noButton.click();
    }

    async clickCancel() {
        await this.cancelButton.click();
    }

    async clickSave() {
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForLoadState('load');
        await this.saveButton.click();
    }

    async clickDeleteRow0() {
        await this.deleteRow0Button.click();
        await this.yesButton.click();
    }

    async clickEditRow0() {
        await this.page.waitForLoadState('load');
        await this.editRow0Button.click();
    }

    async clickClearSearch() {
        await this.clearSearchButton.click();
    }

    async clickAdd() {
        await this.page.waitForLoadState('networkidle');
        await this.addButton.click();
    }

    async clickSearch() {
        await this.searchButton.click();
    }

}