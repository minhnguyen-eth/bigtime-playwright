import { Page, Locator, expect } from '@playwright/test';
export class DebtPage {
    private page: Page;

    readonly toastAddSuccess: Locator;
    readonly toastUpdateSuccess: Locator;
    readonly toastDeleteSuccess: Locator;
    readonly debtButton: Locator;
    readonly addButton: Locator;


    constructor(page: Page) {
        this.page = page;

        this.debtButton = page.locator("//div[contains(text(),'Tạm ứng')]");
        this.toastAddSuccess = page.locator('//div[contains(text(),"Thêm thành công")]');
        this.toastUpdateSuccess = page.locator('//div[contains(text(),"Cập nhật thành công")]');
        this.toastDeleteSuccess = page.locator('//div[contains(text(),"Xóa thành công")]');
        this.addButton = page.locator("//span[normalize-space()='Thêm']");

    }



    // Hàm xử lý


    async clickDebtButton() {
        await this.debtButton.click();
    }

    async getToastAddSuccess() {
        await expect(this.toastAddSuccess).toHaveText('Thêm thành công');
        return this.toastAddSuccess.textContent();
    }

    async clickAddButton() {
        await this.addButton.click();
    }
}

