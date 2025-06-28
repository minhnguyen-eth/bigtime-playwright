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

    constructor(page: Page) {
        this.page = page;
        this.deleteButton = page.locator("//span[contains(text(),'Xóa')]");
        this.editButton = page.locator("//span[contains(text(),'Sửa')]");
        this.reasonInput = page.locator("//div[2]/div/div[2]/div/div/div/div[3]/textarea");
        this.chosseButton = page.locator("//button[contains(text(),'Chọn')]");
        this.confirmButton = page.locator("//span[contains(text(),'Xác nhận')]");
        this.rejectButton = page.locator("//span[contains(text(),'Từ chối')]");
        this.browsedStatus = page.locator("//tr[@id='row-0']//div[text()='Đã duyệt']");
        this.browseButton = page.locator("//span[contains(text(),'Duyệt')]");
        this.sendButton = page.locator("//span[contains(text(),'Gửi')]");
        this.noButton = page.locator("//span[normalize-space()='Không']");
        this.yesButton = page.locator("//span[normalize-space()='Có']");
        this.cancelButton = page.locator("//span[contains(text(),'Hủy')]");
        this.saveButton = page.locator("//span[contains(normalize-space(),'Lưu')]");
        this.deleteRow0Button = page.locator("//tr[@id='row-0']//span[contains(text(),'Xóa')]");
        this.editRow0Button = page.locator("//tr[@id='row-0']//span[contains(text(),'Sửa')]");
        this.clearSearchButton = page.locator("//span[.=' Xóa']");
        this.addButton = page.locator("//span[normalize-space()='Thêm']");
        this.searchButton = page.locator("//span[contains(normalize-space(),'Tìm kiếm')]");
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
        await this.page.waitForLoadState('networkidle');
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