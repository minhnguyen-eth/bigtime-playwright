import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisnationPage extends BasePage {
    readonly regisnationButton: Locator;
    readonly employeeNameSearch: Locator;
    readonly verifyEmployeeNameSearch: Locator;
    readonly notificaOfLeave: Locator;
    readonly Day09: Locator;
    readonly Day06: Locator;
    readonly newStatusOption: Locator;
    readonly submittedButton: Locator;
    readonly browsedStatusOption: Locator;
    readonly rejectStatusOption: Locator;
    readonly cancelStatusOption: Locator;
    readonly verifyNotificationOfLeave: Locator;
    readonly verifyBrowseStatusOption: Locator;
    readonly verifyRejectStatusOption: Locator;
    readonly verifyCancelStatusOption: Locator;
    readonly verifySubmittedButton: Locator;
    readonly verifyNewStatusOption: Locator;
    readonly exportButton: Locator;
    readonly startDate: Locator;
    readonly endDate: Locator;
    readonly Day16: Locator;
    readonly monthButton: Locator;
    readonly month06Button: Locator;

    constructor(page: Page) {
        super(page);
        this.month06Button = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='Thg 6']");
        this.monthButton = page.locator("button[aria-label='Open months overlay']");
        this.Day16 = page.locator("//div[@class='dp__cell_inner dp__pointer dp__date_hover'][normalize-space()='16']");
        this.Day06 = page.locator("//div[@class='dp__cell_inner dp__pointer dp__date_hover'][normalize-space()='6']");
        this.endDate = page.getByRole('textbox', { name: 'Đến ngày ※' })
        this.startDate = page.getByRole('textbox', { name: 'Ngày bắt đầu ※' })
        this.exportButton = page.locator("//span[contains(normalize-space(),'Xuất dữ liệu')]");
        this.verifyNewStatusOption = page.locator("//tr[@id='row-0']//div[text()='Tạo mới']");
        this.verifyCancelStatusOption = page.locator("//tr[@id='row-0']//div[text()='Hủy']");
        this.verifyRejectStatusOption = page.locator("//tr[@id='row-0']//div[text()='Từ chối']");
        this.verifySubmittedButton = page.locator("//tr[@id='row-0']//div[text()='Đã gửi']");
        this.verifyBrowseStatusOption = page.locator("//tr[@id='row-0']//div[text()='Đã duyệt']");
        this.verifyNotificationOfLeave = page.locator("//td[normalize-space()='16-06-2025']");
        this.rejectStatusOption = page.locator("//div[contains(text(),'Từ chối')]");
        this.browsedStatusOption = page.locator("//div[contains(text(),'Đã duyệt')]");
        this.cancelStatusOption = page.locator("//div[contains(text(),'Hủy')]");
        this.submittedButton = page.locator("//div[contains(text(),'Đã gửi')]");
        this.newStatusOption = page.locator("//div[contains(text(),'Tạo mới')]");
        this.Day09 = page.locator("//div[contains(@class, 'dp__cell_inner') and normalize-space()='9']");
        this.notificaOfLeave = page.locator("//form/div/div[2]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.verifyEmployeeNameSearch = page.locator("//tr[@id='row-0']//span[contains(text(),'BAT810 - Nguyễn Văn Minh')]");
        this.employeeNameSearch = page.locator('//form/div/div[1]/div/div/div/div[3]/div/input');
        this.regisnationButton = page.locator("//div[contains(text(),'Đơn thôi việc')]");
    }

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

    async clickClearSearchButton() {
        await this.safeClick(this.clearSearchButton);
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

    async clickRegisnationButton() {
        await this.safeClick(this.regisnationButton);
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
