import { Locator, Page, expect } from '@playwright/test';

export class RegisnationPage {
    readonly page: Page;
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

    constructor(page: Page) {
        this.page = page;

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
        this.Day09 = page.locator("//div[@class='dp__cell_inner dp__pointer dp__date_hover'][normalize-space()='9']");
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
    }


    async clickDay16() {
        await this.Day16.click();
    }

    async Logout() {
        await this.logoutButton.click();
        await this.logoutConfirmButton.click();
    }
    async clickDay06() {
        await this.Day06.click();
    }

    async clickEndDate() {
        await this.endDate.click();
    }

    async clickStartDate() {
        await this.startDate.click();
    }

    async clickExportButton() {
        await this.exportButton.click();
    }

    async getVerifyNewStatusOption() {
        await expect(this.verifyNewStatusOption).toBeVisible();
        const value = await this.verifyNewStatusOption.textContent();
        console.log("🔍 New status option value found:", value);
        return value;
    }

    async getVerifyCancelStatusOption() {
        await expect(this.verifyCancelStatusOption).toBeVisible();
        const value = await this.verifyCancelStatusOption.textContent();
        console.log("🔍 Cancel status option value found:", value);
        return value;
    }

    async getVerifyRejectStatusOption() {
        await expect(this.verifyRejectStatusOption).toBeVisible();
        const value = await this.verifyRejectStatusOption.textContent();
        console.log("🔍 Reject status option value found:", value);
        return value;
    }

    async getVerifySubmittedButton() {
        await expect(this.verifySubmittedButton).toBeVisible();
        const value = await this.verifySubmittedButton.textContent();
        console.log("🔍 Submitted button value found:", value);
        return value;
    }

    async getVerifyBrowseStatusOption() {
        await expect(this.verifyBrowseStatusOption).toBeVisible();
        const value = await this.verifyBrowseStatusOption.textContent();
        console.log("🔍 Browse status option value found:", value);
        return value;
    }

    async getVerifyNotificationOfLeave() {
        await expect(this.verifyNotificationOfLeave).toBeVisible();
        const value = await this.verifyNotificationOfLeave.textContent();
        console.log("🔍 Notification of leave value found:", value);
        return value;
    }

    async clickChosseButton() {
        await this.chosseButton.click();
    }

    async clickClearSearchButton() {
        await this.clearSearchButton.click();
    }

    async clickStatusDropDown() {
        await this.statusDropDown.click();
    }

    async clickNewStatusOption() {
        await this.newStatusOption.click();
    }
    async clickBrowsedStatusOption() {
        await this.browsedStatusOption.click();
    }
    async clickRejectStatusOption() {
        await this.rejectStatusOption.click();
    }
    async clickCancelStatusOption() {
        await this.cancelStatusOption.click();
    }
    async clickSubmittedButton() {
        await this.submittedButton.click();
    }

    async clickNotificaOfLeave() {
        await this.notificaOfLeave.click();
    }

    async clickDay09() {
        await this.Day09.click();
    }

    async getVerifyEmployeeNameSearch() {
        await expect(this.verifyEmployeeNameSearch).toBeVisible();
        const value = await this.verifyEmployeeNameSearch.textContent();
        console.log("🔍 Employee name value found:", value);
        return value;
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }

    async searchEmployeeName(employeeName: string) {
        await this.employeeNameSearch.fill(employeeName);
    }
    async clickBrowseButton() {
        await this.browseButton.click();
    }

    async clickSendButton() {
        await this.sendButton.click();
    }

    async clickOkButton() {
        await this.okButton.click();
    }

    async clickRow0() {
        await this.row0.click();
    }

    async clickRegisnationButton() {
        await this.regisnationButton.click();
    }

    async clickSaveButton() {
        await this.saveButton.click();
    }

    async fillReason(reason: string) {
        await this.reasonInput.fill(reason);
    }

    async clickAddButton() {
        await this.addButton.click();
    }
}

