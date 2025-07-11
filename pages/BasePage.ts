import { ElementHandle, Page, Locator, expect } from "@playwright/test";

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
    readonly validateMaxlenght255Charactor: Locator
    readonly validateMaxlenght500Charactor: Locator

    constructor(page: Page) {
        this.page = page;
        this.validateMaxlenght500Charactor = page.locator("//div[contains(text(),'Không nhập quá 500 kí tự.')]");
        this.validateMaxlenght255Charactor = page.locator("//div[contains(text(),'Không nhập quá 255 kí tự.')]");
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
        this.cancelButton = page.getByRole('button', { name: 'Hủy' })
        this.saveButton = page.locator("//span[normalize-space()='Lưu']");//span[contains(normalize-space(),'Lưu')]
        this.deleteRow0Button = page.locator("//tr[@id='row-0']//span[contains(text(),'Xóa')]");
        this.editRow0Button = page.locator("//tr[@id='row-0']//span[contains(text(),'Sửa')]");
        this.clearSearchButton = page.locator('form').getByRole('button', { name: 'Xóa' })
        this.addButton = page.locator("//span[normalize-space()='Thêm']");
        this.searchButton = page.locator("//span[contains(normalize-space(),'Tìm kiếm')]");
    }

    // BasePage.ts

    // BasePage.ts

    /**
     * Chờ page đã hoàn toàn load network (xong API, tài nguyên)
     * Gọi 1 lần ở đầu mỗi test hoặc sau navigation
     */
    async waitForPageReady(timeout: number = 30000) {
        // Chờ tất cả network request xong, DOM sẵn sàng
        await this.page.waitForLoadState('networkidle', { timeout });
    }

    /**
     * Click một element
     */
    async safeClick(locator: Locator, options?: { force?: boolean; timeout?: number }): Promise<void> {
        const timeout = options?.timeout ?? 30000; // Increased default timeout to 30s

        if (this.page.isClosed()) {
            console.warn("safeClick: Page is already closed before click.");
            return;
        }

        try {
            await this.page.waitForLoadState('domcontentloaded', { timeout }); // Use the increased timeout
            await this.waitForOverlayToDisappear(undefined, timeout);

            if (this.page.isClosed()) {
                console.warn("safeClick: Page closed during overlay wait.");
                return;
            }

            await locator.waitFor({ state: 'attached', timeout }); // Use the increased timeout
            await locator.waitFor({ state: 'visible', timeout }); // Use the increased timeout

            const elementHandle = await locator.elementHandle({ timeout });
            if (!elementHandle) {
                throw new Error("Element not found for checking 'enabled' state.");
            }

            await this.page.waitForFunction(
                (el: SVGElement | HTMLElement) => el instanceof HTMLElement && !el.hasAttribute('disabled'),
                elementHandle,
                { timeout }
            );

            if (this.page.isClosed()) {
                console.warn("safeClick: Page closed before actual click.");
                return;
            }

            await locator.click({ force: options?.force ?? false, timeout });
        } catch (error) {
            if (!this.page.isClosed()) {
                try {
                    await this.page.screenshot({ path: 'safeClick-error.png', fullPage: true });
                } catch {
                    console.warn("Không thể chụp ảnh lỗi vì page đã đóng.");
                }
            }
            console.error("safeClick error:", (error as Error).message);
            throw error;
        }
    }

    async waitForOverlayToDisappear(selector: string = '.overlay', timeout: number = 30000): Promise<void> {
        const overlay = this.page.locator(selector);
        try {
            await overlay.waitFor({ state: 'hidden', timeout });
            // console.log('Overlay đã biến mất.');
        } catch (e) {
            const overlayCount = await overlay.count();
            if (overlayCount === 0) {
                // console.log('Không tìm thấy overlay. Bỏ qua.');
                return;
            }
            await this.page.screenshot({ path: 'overlay-blocking-click.png', fullPage: true });
            throw new Error(`Một số overlay không biến mất sau ${timeout}ms: ${(e as Error).message}`);
        }
    }

    async safeClickFirst(locator: Locator, options?: { force?: boolean; timeout?: number }) {
        const timeout = options?.timeout ?? 30000; // Increased default timeout to 30s
        await this.waitForPageReady(timeout);
        const first = locator.first();
        await expect(first).toBeVisible({ timeout });
        await expect(first).toBeEnabled({ timeout });
        await first.click({ force: options?.force ?? false, timeout });
    }

    /**
     * Fill input
     */
    async safeFill(locator: Locator, value: string, timeout: number = 30000) {
        await locator.waitFor({ state: 'visible', timeout });
        await locator.fill(value, { timeout });
    }

    /**
     * Type từng ký tự
     */
    async safeType(locator: Locator, value: string, delayMs: number = 100, timeout: number = 30000) {
        await locator.waitFor({ state: 'visible', timeout });
        await locator.type(value, { delay: delayMs, timeout });
    }

    /**
     * Đợi element biến mất
     */
    async waitForElementToDisappear(locator: Locator, timeout: number = 30000) {
        await locator.waitFor({ state: 'detached', timeout });
    }

    /**
     * Verify text chính xác
     */
    async safeVerifyToHaveText(locator: Locator, expectedText: string, timeout: number = 10000) {
        await locator.waitFor({ state: 'visible', timeout });
        await expect(locator).toHaveText(expectedText, { timeout });
    }

    /**
     * Verify chứa substring
     */
    async safeVerifyTextContains(locator: Locator, expectedText: string, timeout: number = 10000) {
        await locator.waitFor({ state: 'visible', timeout });
        await expect(locator).toHaveText(new RegExp(expectedText), { timeout });
    }

    /**
     * Lấy text đầu tiên
     */
    async getFirstVisibleText(locator: Locator, label: string) {
        const first = locator.first();
        await first.waitFor({ state: 'visible' });
        const text = await first.textContent();
        console.log(`🔍 ${label}:`, text);
        return text;
    }

    /**
     * Verify input/select value
     */
    async safeVerifyToHaveValue(locator: Locator, expectedValue: string, timeout: number = 5000) {
        await locator.waitFor({ state: 'visible', timeout });
        await expect(locator).toHaveValue(expectedValue, { timeout });
    }

    async verifyMaxlenght255Charactor() {
        await this.safeVerifyToHaveText(this.validateMaxlenght255Charactor, 'Không nhập quá 255 kí tự.');
    }

    async verifyMaxlenght500Charactor() {
        await this.safeVerifyToHaveText(this.validateMaxlenght500Charactor, 'Không nhập quá 500 kí tự.');
    }

    async expectNameExist() {
        await this.safeVerifyToHaveText(this.validationNameExist, 'Tên đã tồn tại.');
    }

    async clickIconStatusDropdown() {
        await this.safeClick(this.iconStatusDropdown);
    }

    async verifyNoExistData() {
        await this.safeVerifyToHaveText(this.noExistData, 'Không có dữ liệu');
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
        await this.safeClick(this.Admin_Button);
    }

    async clickTimeKeepingManagement() {
        await this.safeClick(this.TimeKeepingManagement_Button);
    }

    async clickSalary() {
        await this.safeClick(this.Salary_Button);
    }

    async clickSetting() {
        await this.safeClick(this.Setting_Button);
    }

    async clickIconAction() {
        await this.safeClick(this.iconAction);
    }

    async verifyRequiredFillReason() {
        await this.safeVerifyToHaveText(this.requiredFillReason, 'Nhập lý do');
    }

    async clickTodayDatePicker() {
        await this.safeClick(this.toDayDatePicker);
        await this.safeClick(this.chosseButton);
    }

    async clickDelete() {
        await this.safeClick(this.deleteButton);
        await this.safeClick(this.yesButton);
    }

    async clickEdit() {
        await this.page.waitForLoadState('networkidle');
        await this.safeClick(this.editButton);
    }

    async fillReason(reason: string) {
        await this.safeFill(this.reasonInput, reason);
        await this.safeClick(this.yesButton);
    }

    async verifyBrowsedStatus() {
        await this.page.waitForLoadState('networkidle');
        await this.safeVerifyToHaveText(this.browsedStatus, 'Đã duyệt');
    }

    async clickChoose() {
        await this.safeClick(this.chosseButton);
    }

    async clickConfirm() {
        await this.safeClick(this.confirmButton);
        await this.safeClick(this.yesButton);
    }

    async clickReject() {
        await this.safeClick(this.rejectButton);
    }

    async clickBrowse() {
        await this.safeClick(this.browseButton);
        await this.safeClick(this.yesButton);
    }

    async clickSend() {
        await this.safeClick(this.sendButton);
        await this.safeClick(this.yesButton);
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

    async clickSave() {
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForLoadState('load');
        await this.safeClick(this.saveButton);
    }

    async clickDeleteRow0() {
        await this.safeClick(this.deleteRow0Button);
        await this.safeClick(this.yesButton);
    }

    async clickEditRow0() {
        await this.page.waitForLoadState('load');
        await this.safeClick(this.editRow0Button);
    }

    async clickClearSearch() {
        await this.safeClick(this.clearSearchButton);
    }

    async clickAdd() {
        await this.page.waitForLoadState('networkidle');
        await this.safeClick(this.addButton);
    }

    async clickSearch() {
        await this.safeClick(this.searchButton);
    }
}