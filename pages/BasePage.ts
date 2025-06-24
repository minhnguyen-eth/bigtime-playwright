import { Page, Locator } from "@playwright/test";

export class BasePage {
    readonly page: Page;
    readonly searchButton:Locator;
    readonly addButton:Locator;
    readonly clearSearchButton:Locator;
    readonly editButton:Locator;
    readonly deleteButton:Locator;
    readonly saveButton:Locator;
    readonly cancelButton:Locator;
    readonly yesButton:Locator;
    readonly noButton:Locator;
    readonly inputPlaceholder1:Locator;

    constructor(page: Page) {
        this.page = page;
       
        this.noButton=page.locator("//span[normalize-space()='Không']");
        this.yesButton=page.locator("//span[normalize-space()='Có']");
        this.cancelButton=page.locator("//span[contains(normalize-space(),'Hủy')]");
        this.saveButton=page.locator("//span[contains(normalize-space(),'Lưu')]");
        this.deleteButton=page.locator("//tr[@id='row-0']//span[contains(text(),'Xóa')]");
        this.editButton=page.locator("//tr[@id='row-0']//span[contains(text(),'Sửa')]");
        this.clearSearchButton=page.locator("//span[.=' Xóa']");
        this.addButton=page.locator("//span[normalize-space()='Thêm']");
        this.searchButton=page.locator("//span[contains(normalize-space(),'Tìm kiếm')]");
    }

    async fillInputPlaceholder1(value: string) {
        await this.inputPlaceholder1.fill(value);
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
        await this.addButton.click();
    }
    
    async clickSearch() {
        await this.searchButton.click();
    }

}