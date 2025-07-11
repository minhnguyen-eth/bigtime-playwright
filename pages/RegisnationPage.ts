import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisnationPage extends BasePage {

    readonly addButton: Locator;
    readonly reasonInput: Locator;
    readonly saveButton: Locator;
    readonly regisnationButton: Locator;
    readonly row0: Locator;
    readonly sendButton: Locator;
    readonly okButton: Locator;
    readonly browseButton: Locator;
    readonly employeeNameSearch: Locator;
    readonly searchButton: Locator;
    readonly verifyEmployeeNameSearch: Locator;
    readonly notificaOfLeave: Locator;
    readonly Day09: Locator;
    readonly Day06: Locator;
    readonly statusDropDown: Locator;
    readonly newStatusOption: Locator;
    readonly submittedButton: Locator;
    readonly browsedStatusOption: Locator;
    readonly rejectStatusOption: Locator;
    readonly cancelStatusOption: Locator;
    readonly clearSearchButton: Locator;
    readonly chosseButton: Locator;
    readonly verifyNotificationOfLeave: Locator;
    readonly verifyBrowseStatusOption: Locator;
    readonly verifyRejectStatusOption: Locator;
    readonly verifyCancelStatusOption: Locator;
    readonly verifySubmittedButton: Locator;
    readonly verifyNewStatusOption: Locator;
    readonly exportButton: Locator;
    readonly startDate: Locator;
    readonly endDate: Locator;
    readonly logoutButton: Locator;
    readonly logoutConfirmButton: Locator;
    readonly Day16: Locator;
    readonly monthButton: Locator;
    readonly month06Button: Locator;
    readonly cancelButton: Locator;


    constructor(page: Page) {
        super(page);
        this.cancelButton = page.locator("//span[contains(text(),'Hủy')]");
        this.month06Button = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='Thg 6']");
        this.monthButton = page.locator("button[aria-label='Open months overlay']");
        this.Day16 = page.locator("//div[@class='dp__cell_inner dp__pointer dp__date_hover'][normalize-space()='16']");
        this.logoutButton = page.locator('//div[contains(text(),"Đăng xuất")]');
        this.logoutConfirmButton = page.locator('//span[normalize-space()="Có"]');
        this.Day06 = page.locator("//div[@class='dp__cell_inner dp__pointer dp__date_hover'][normalize-space()='6']");
        this.endDate = page.locator("//div[3]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.startDate = page.locator("//div[3]/div/div[2]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.exportButton = page.locator("//span[contains(normalize-space(),'Xuất dữ liệu')]");
        this.verifyNewStatusOption = page.locator("//tr[@id='row-0']//div[text()='Tạo mới']");
        this.verifyCancelStatusOption = page.locator("//tr[@id='row-0']//div[text()='Hủy']");
        this.verifyRejectStatusOption = page.locator("//tr[@id='row-0']//div[text()='Từ chối']");
        this.verifySubmittedButton = page.locator("//tr[@id='row-0']//div[text()='Đã gửi']");
        this.verifyBrowseStatusOption = page.locator("//tr[@id='row-0']//div[text()='Đã duyệt']");
        this.verifyNotificationOfLeave = page.locator("//td[normalize-space()='16-06-2025']");
        this.chosseButton = page.locator("//button[contains(text(),'Chọn')]");
        this.clearSearchButton = page.locator("//span[normalize-space()='Xóa']");
        this.rejectStatusOption = page.locator("//div[contains(text(),'Từ chối')]");
        this.browsedStatusOption = page.locator("//div[contains(text(),'Đã duyệt')]");
        this.cancelStatusOption = page.locator("//div[contains(text(),'Hủy')]");
        this.submittedButton = page.locator("//div[contains(text(),'Đã gửi')]");
        this.newStatusOption = page.locator("//div[contains(text(),'Tạo mới')]");
        this.statusDropDown = page.locator("//div[@class='v-field v-field--appended v-field--center-affix v-field--variant-outlined v-theme--lightColor7 v-locale--is-ltr']");
        this.Day09 = page.locator("//div[contains(@class, 'dp__cell_inner') and normalize-space()='9']");
        this.notificaOfLeave = page.locator("//form/div/div[2]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.verifyEmployeeNameSearch = page.locator("//tr[@id='row-0']//span[contains(text(),'BAT810 - Nguyễn Văn Minh')]");
        this.searchButton = page.locator("//span[contains(normalize-space(),'Tìm kiếm')]");
        this.employeeNameSearch = page.locator('//form/div/div[1]/div/div/div/div[3]/div/input');
        this.browseButton = page.locator("//span[contains(text(),'Duyệt')]");
        this.okButton = page.locator("//span[normalize-space()='Có']");
        this.sendButton = page.locator("//span[contains(normalize-space(),'Gửi')]");
        this.row0 = page.locator("//tr[@id='row-0']");
        this.addButton = page.locator("//span[normalize-space()='Thêm']");
        this.reasonInput = page.locator("//div[2]/div/div[1]/div/div/div/div[3]/textarea");
        this.saveButton = page.locator("//span[contains(normalize-space(),'Lưu')]");
        this.regisnationButton = page.locator("//div[contains(text(),'Đơn thôi việc')]");
    }// CLICK



    async clickCancelButton() {
        await this.safeClick(this.cancelButton);
    }

    async clickMonth06Button() {
        await this.safeClick(this.month06Button);
    }

    async clickMonthButton() {
        await this.safeClick(this.monthButton);
    }

    async clickDay16() {
        await this.safeClick(this.Day16);
    }

    async Logout() {
        await this.safeClick(this.logoutButton);
        await this.safeClick(this.logoutConfirmButton);
    }

    async clickDay06() {
        await this.safeClick(this.Day06);
    }

    async clickEndDate() {
        await this.safeClick(this.endDate);
    }

    async clickStartDate() {
        await this.safeClick(this.startDate);
    }

    async clickExportButton() {
        await this.safeClick(this.exportButton);
    }

    async clickChosseButton() {
        await this.safeClick(this.chosseButton);
    }

    async clickClearSearchButton() {
        await this.safeClick(this.clearSearchButton);
    }

    async clickStatusDropDown() {
        await this.safeClick(this.statusDropDown);
    }

    async clickNewStatusOption() {
        await this.safeClick(this.newStatusOption);
    }

    async clickBrowsedStatusOption() {
        await this.safeClick(this.browsedStatusOption);
    }

    async clickRejectStatusOption() {
        await this.safeClick(this.rejectStatusOption);
    }

    async clickCancelStatusOption() {
        await this.safeClick(this.cancelStatusOption);
    }

    async clickSubmittedButton() {
        await this.safeClick(this.submittedButton);
    }

    async clickNotificaOfLeave() {
        await this.safeClick(this.notificaOfLeave);
    }

    async clickDay09() {
        await this.safeClick(this.Day09);
    }

    async clickSearchButton() {
        await this.safeClick(this.searchButton);
    }

    async clickBrowseButton() {
        await this.safeClick(this.browseButton);
    }

    async clickSendButton() {
        await this.safeClick(this.sendButton);
    }

    async clickOkButton() {
        await this.safeClick(this.okButton);
    }

    async clickRow0() {
        await this.safeClick(this.row0);
    }

    async clickRegisnationButton() {
        await this.safeClick(this.regisnationButton);
    }

    async clickSaveButton() {
        await this.safeClick(this.saveButton);
    }

    async clickAddButton() {
        await this.safeClick(this.addButton);
    }

    // FILL
    async fillReason(reason: string) {
        await this.safeFill(this.reasonInput, reason);
    }

    async clearReason() {
        await this.reasonInput.clear();
    }

    async searchEmployeeName(employeeName: string) {
        await this.safeFill(this.employeeNameSearch, employeeName);
    }

    // VERIFY
    async getVerifyNewStatusOption() {
        await this.safeVerifyToHaveText(this.verifyNewStatusOption, "Tạo mới");
    }

    async getVerifyCancelStatusOption() {
        await this.safeVerifyToHaveText(this.verifyCancelStatusOption, "Hủy");
    }

    async getVerifyRejectStatusOption() {
        await this.safeVerifyToHaveText(this.verifyRejectStatusOption, "Từ chối");
    }

    async getVerifySubmittedButton() {
        await this.safeVerifyToHaveText(this.verifySubmittedButton, "Đã gửi");
    }

    async getVerifyBrowseStatusOption() {
        await this.safeVerifyToHaveText(this.verifyBrowseStatusOption, "Đã duyệt");
    }

    async getVerifyNotificationOfLeave() {
        await this.safeVerifyToHaveText(this.verifyNotificationOfLeave, "16-06-2025");
    }

    async getVerifyEmployeeNameSearch() {
        await expect(this.verifyEmployeeNameSearch).toBeVisible();
        const value = await this.verifyEmployeeNameSearch.textContent();
        console.log("🔍 Employee name value found:", value);
        return value;
    }

}

