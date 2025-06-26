import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
    readonly page: Page;
    readonly searchButton: Locator;
    readonly addButton: Locator;
    readonly clearSearchButton: Locator;
    readonly editButton: Locator;
    readonly deleteButton: Locator;
    readonly saveButton: Locator;
    readonly cancelButton: Locator;
    readonly yesButton: Locator;
    readonly noButton: Locator;
    readonly sendButton: Locator;
    readonly browseButton: Locator;
    readonly browsedStatus: Locator;
    readonly rejectButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.rejectButton = page.locator("//span[contains(text(),'Từ chối')]");
        this.browsedStatus = page.locator("//div[normalize-space()='Đã duyệt']");
        this.browseButton = page.locator("//span[contains(text(),'Duyệt')]");
        this.sendButton = page.locator("//span[contains(text(),'Gửi')]");
        this.noButton = page.locator("//span[normalize-space()='Không']");
        this.yesButton = page.locator("//span[normalize-space()='Có']");
        this.cancelButton = page.locator("//span[contains(normalize-space(),'Hủy')]");
        this.saveButton = page.locator("//span[contains(normalize-space(),'Lưu')]");
        this.deleteButton = page.locator("//tr[@id='row-0']//span[contains(text(),'Xóa')]");
        this.editButton = page.locator("//tr[@id='row-0']//span[contains(text(),'Sửa')]");
        this.clearSearchButton = page.locator("//span[.=' Xóa']");
        this.addButton = page.locator("//span[normalize-space()='Thêm']");
        this.searchButton = page.locator("//span[contains(normalize-space(),'Tìm kiếm')]");
    }

    async verifyBrowsedStatus() {
        await this.browsedStatus.waitFor({ state: 'visible', timeout: 5000 });
        await expect(this.browsedStatus).toHaveText('Đã duyệt');
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
        await this.saveButton.click();
    }

    async clickDelete() {
        await this.deleteButton.click();
    }

    async clickEdit() {
        await this.editButton.click();
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