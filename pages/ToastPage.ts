import { Page, Locator, expect } from '@playwright/test';
export class ToastPage {
    readonly page: Page;
    readonly toastAddSuccess: Locator;
    readonly toastUpdateSuccess: Locator;
    readonly toastDeleteSuccess: Locator;
    readonly toastSendSuccess: Locator;
    readonly toastBrowseSuccess: Locator;
    readonly toastExportSuccess: Locator;
    readonly toastConfirmSuccess: Locator;
    readonly toastEvaluationSuccess: Locator;
    readonly toastAddFailed: Locator;
    readonly toastSendNotificationSuccess: Locator;
    readonly toastCancelSuccess: Locator;
    readonly toastRefuseSuccess: Locator;
    readonly toastCancelledSuccess: Locator;
    readonly toastEditSuccess: Locator;

    constructor(page: Page) {
        this.page = page;
        this.toastEditSuccess = page.locator('//div[contains(text(),"Chỉnh sửa thành công")]');
        this.toastCancelledSuccess = page.locator('//div[contains(text(),"Đã hủy thành công")]');
        this.toastRefuseSuccess = page.locator('//div[contains(text(),"Từ chối thành công")]');
        this.toastCancelSuccess = page.locator('//div[contains(text(),"Hủy thành công")]');
        this.toastSendNotificationSuccess = page.locator('//div[contains(text(),"Gửi thông báo thành công")]');
        this.toastAddFailed = page.locator('//div[contains(text(),"Thêm không thành công")]');
        this.toastEvaluationSuccess = page.locator('//div[contains(text(),"Đánh giá thành công")]');
        this.toastConfirmSuccess = page.locator('//div[contains(text(),"Xác nhận thành công")]');
        this.toastExportSuccess = page.locator('//div[contains(text(),"Xuất thành công")]');
        this.toastSendSuccess = page.locator('//div[contains(text(),"Đã gửi thành công")]');
        this.toastAddSuccess = page.locator('//div[contains(text(),"Thêm thành công")]');
        this.toastUpdateSuccess = page.locator('//div[contains(text(),"Cập nhật thành công")]');
        this.toastDeleteSuccess = page.locator('//div[contains(text(),"Xóa thành công")]');
        this.toastBrowseSuccess = page.locator('//div[contains(text(),"Đã duyệt thành công")]');

    }

    async getToastEditSuccess() {
        await expect(this.toastEditSuccess).toHaveText('Chỉnh sửa thành công');
        return this.toastEditSuccess.textContent();
    }

    async getToastCancelledSuccess() {
        await expect(this.toastCancelledSuccess).toHaveText('Đã hủy thành công');
        return this.toastCancelledSuccess.textContent();
    }

    async getToastRefuseSuccess() {
        await expect(this.toastRefuseSuccess).toHaveText('Từ chối thành công');
        return this.toastRefuseSuccess.textContent();
    }

    async getToastCancelSuccess() {
        await expect(this.toastCancelSuccess).toHaveText('Hủy thành công');
        return this.toastCancelSuccess.textContent();
    }

    async getToastSendNotificationSuccess() {
        await expect(this.toastSendNotificationSuccess).toHaveText('Gửi thông báo thành công');
        return this.toastSendNotificationSuccess.textContent();
    }

    async getToastAddFailed() {
        await expect(this.toastAddFailed).toHaveText('Thêm không thành công');
        return this.toastAddFailed.textContent();
    }

    async getToastEvaluationSuccess() {
        await expect(this.toastEvaluationSuccess).toHaveText('Đánh giá thành công');
        return this.toastEvaluationSuccess.textContent();
    }

    async getToastConfirmSuccess() {
        await expect(this.toastConfirmSuccess).toHaveText('Xác nhận thành công');
        return this.toastConfirmSuccess.textContent();
    }
   
    async getToastExportSuccess() {
        await expect(this.toastExportSuccess).toHaveText('Xuất thành công');
        return this.toastExportSuccess.textContent();
    }

    async getToastBrowseSuccess() {
        await expect(this.toastBrowseSuccess).toHaveText('Đã duyệt thành công');
        return this.toastBrowseSuccess.textContent();
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

