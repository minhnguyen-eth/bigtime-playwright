import { Locator, Page, expect } from '@playwright/test';

export class ShiftPlanPage {

    private page: Page;

    // Buttons & Inputs
    private toastAddSuccess: Locator;
    private toastCancelSuccess: Locator;
    private toastExportSuccess: Locator;
    private searchButton: Locator;


    constructor(page: Page) {
        this.page = page;

        this.searchButton = page.locator("//span[.=' Tìm kiếm']")

        // Toasts
        this.toastAddSuccess = page.locator('//div[contains(text(),"Thêm thành công")]');
        this.toastCancelSuccess = page.locator('//div[contains(text(),"Hủy thành công")]');
        this.toastExportSuccess = page.locator('//div[contains(text(),"Xuất thành công")]');

    }

    async clickSearchButton() {
        await this.searchButton.click();
    }


    async getToastExport() {
        await expect(this.toastExportSuccess).toBeVisible();
        return this.toastExportSuccess.textContent();
    }

    async getToastCancel() {
        await expect(this.toastCancelSuccess).toBeVisible();
        return this.toastCancelSuccess.textContent();
    }

    async getToastAdd(toast: string) {
        await expect(this.toastAddSuccess).toHaveText(toast);
        return this.toastAddSuccess.textContent();
    }


}
