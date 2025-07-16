import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ToastPage extends BasePage{
   
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
    readonly toastRejectSuccess: Locator;
    readonly toastCancelledSuccess: Locator;
    readonly toastEditSuccess: Locator;
    readonly toastExportHaveNoData: Locator;
    readonly toastPaymentSuccess: Locator;
    readonly toastUpdateFailed: Locator;
    readonly toastCheckinSuccess: Locator;
    readonly toastSaveSuccess: Locator;
    readonly toastSendBrowseSuccess: Locator;
    readonly toastBrowseSuccess2: Locator;
    readonly toastValidateCloseSalary: Locator;
    readonly toastEmployeeExisted: Locator;

    constructor(page: Page) {
        super(page);
        this.toastEmployeeExisted = page.locator('//div[contains(text(),"Nhân viên đã tồn tại")]');
        this.toastValidateCloseSalary = page.locator('//div[contains(text(),"Vui lòng duyệt hết tất cả phiếu lương")]');
        this.toastSendBrowseSuccess = page.locator('//div[contains(text(),"Gửi duyệt thành công")]');
        this.toastSaveSuccess = page.locator('//div[contains(text(),"Lưu thành công")]');
        this.toastCheckinSuccess = page.locator('//div[contains(text(),"Chấm công thành công")]');
        this.toastUpdateFailed = page.locator('//div[contains(text(),"Cập nhật không thành công")]');
        this.toastPaymentSuccess = page.locator('//div[contains(text(),"Thêm thanh toán phiếu lương thành công")]');
        this.toastExportHaveNoData = page.locator('//div[contains(text(),"Không có dữ liệu")]');
        this.toastEditSuccess = page.locator('//div[contains(text(),"Chỉnh sửa thành công")]');
        this.toastCancelledSuccess = page.locator('//div[contains(text(),"Đã hủy thành công")]');
        this.toastRejectSuccess = page.locator('//div[contains(text(),"Từ chối thành công")]');
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
        this.toastBrowseSuccess2 = page.locator('//div[contains(text(),"Phê duyệt thành công")]');
    }

    async getToastEmployeeExisted() {
        await this.safeVerifyToHaveText(this.toastEmployeeExisted, 'Nhân viên đã tồn tại');
    }

    async getToastValidateCloseSalary() {
        await this.safeVerifyToHaveText(this.toastValidateCloseSalary, 'Vui lòng duyệt hết tất cả phiếu lương');
    }

    async getToastBrowseSuccess2() {
        await this.safeVerifyToHaveText(this.toastBrowseSuccess2, 'Phê duyệt thành công');
    }

    async getToastSendBrowseSuccess() {
        await this.safeVerifyToHaveText(this.toastSendBrowseSuccess, 'Gửi duyệt thành công');
    }

    async getToastSaveSuccess() {
        await this.safeVerifyToHaveText(this.toastSaveSuccess, 'Lưu thành công');
    }

    async getToastCheckinSuccess() {
        await this.safeVerifyToHaveText(this.toastCheckinSuccess, 'Chấm công thành công.');
    }

    async getToastUpdateFailed() {
        await this.safeVerifyToHaveText(this.toastUpdateFailed, 'Cập nhật không thành công');
    }

    async getToastPaymentSuccess() {
        await this.safeVerifyToHaveText(this.toastPaymentSuccess, 'Thêm thanh toán phiếu lương thành công');
    }

    async getToastExportHaveNoData() {
        await this.safeVerifyToHaveText(this.toastExportHaveNoData, 'Không có dữ liệu');
    }

    async getToastEditSuccess() {
        await this.safeVerifyToHaveText(this.toastEditSuccess, 'Chỉnh sửa thành công');
    }

    async getToastCancelledSuccess() {
        await this.safeVerifyToHaveText(this.toastCancelledSuccess, 'Đã hủy thành công');
    }

    async getToastRejectSuccess() {
        await this.safeVerifyToHaveText(this.toastRejectSuccess, 'Từ chối thành công');
    }

    async getToastCancelSuccess() {
        await this.safeVerifyToHaveText(this.toastCancelSuccess, 'Hủy thành công');
    }

    async getToastSendNotificationSuccess() {
        await this.safeVerifyToHaveText(this.toastSendNotificationSuccess, 'Gửi thông báo thành công');
    }

    async getToastAddFailed() {
        await this.safeVerifyToHaveText(this.toastAddFailed, 'Thêm không thành công');
    }

    async getToastEvaluationSuccess() {
        await this.safeVerifyToHaveText(this.toastEvaluationSuccess, 'Đánh giá thành công');
    }

    async getToastConfirmSuccess() {
        await this.safeVerifyToHaveText(this.toastConfirmSuccess, 'Xác nhận thành công');
    }

    async getToastExportSuccess() {
        await this.safeVerifyToHaveText(this.toastExportSuccess, 'Xuất thành công');
    }

    async getToastBrowseSuccess() {
        await this.safeVerifyToHaveText(this.toastBrowseSuccess, 'Đã duyệt thành công');
    }

    async getToastSendSuccess() {
        await this.safeVerifyTextContains(this.toastSendSuccess, 'Đã gửi thành công');
    }

    async getToastAddSuccess() {
        await this.safeVerifyToHaveText(this.toastAddSuccess, 'Thêm thành công');
    }

    async getToastUpdateSuccess() {
        await this.safeVerifyToHaveText(this.toastUpdateSuccess, 'Cập nhật thành công');
    }

    async getToastDeleteSuccess() {
        await this.safeVerifyToHaveText(this.toastDeleteSuccess, 'Xóa thành công');
    }
}
