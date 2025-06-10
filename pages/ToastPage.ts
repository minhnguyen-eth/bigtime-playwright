import { Page, Locator, expect } from '@playwright/test';
export class ToastPage {
    private page: Page;

    readonly toastAddSuccess: Locator;
    readonly toastUpdateSuccess: Locator;
    readonly toastDeleteSuccess: Locator;
    readonly toastSendSuccess: Locator;


    constructor(page: Page) {
        this.page = page;

        this.toastSendSuccess = page.locator('//div[contains(text(),"Đã gửi thành công")]');
        this.toastAddSuccess = page.locator('//div[contains(text(),"Thêm thành công")]');
        this.toastUpdateSuccess = page.locator('//div[contains(text(),"Cập nhật thành công")]');
        this.toastDeleteSuccess = page.locator('//div[contains(text(),"Xóa thành công")]');


    }

    async getToastSendSuccess() {
        await expect(this.toastSendSuccess).toHaveText('Đã gửi thành công');
        return this.toastSendSuccess.textContent();
    }

    async getToastAddSuccess() {
        await expect(this.toastAddSuccess).toHaveText('Thêm thành công');
        return this.toastAddSuccess.textContent();
    }

    async getToastUpdateSuccess() {
        await expect(this.toastUpdateSuccess).toHaveText('Cập nhật thành công');
        return this.toastUpdateSuccess.textContent();
    }

    async getToastDeleteSuccess() {
        await expect(this.toastDeleteSuccess).toHaveText('Xóa thành công');
        return this.toastDeleteSuccess.textContent();
    }

}

