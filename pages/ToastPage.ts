import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ToastPage extends BasePage {

    readonly TOAST_ADD_SUCCESS: Locator;
    readonly TOAST_UPDATE_SUCCESS: Locator;
    readonly TOAST_DELETE_SUCCESS: Locator;
    readonly TOAST_SEND_SUCCESS: Locator;
    readonly TOAST_BROWSE_SUCCESS: Locator;
    readonly TOAST_EXPORT_SUCCESS: Locator;
    readonly TOAST_CONFIRM_SUCCESS: Locator;
    readonly TOAST_EVALUATION_SUCCESS: Locator;
    readonly TOAST_ADD_FAILED: Locator;
    readonly TOAST_SEND_NOTIFICATION_SUCCESS: Locator;
    readonly TOAST_CANCEL_SUCCESS: Locator;
    readonly TOAST_REJECT_SUCCESS: Locator;
    readonly TOAST_CANCELLED_SUCCESS: Locator;
    readonly TOAST_EDIT_SUCCESS: Locator;
    readonly TOAST_EXPORT_HAVE_NO_DATA: Locator;
    readonly TOAST_PAYMENT_SUCCESS: Locator;
    readonly TOAST_UPDATE_FAILED: Locator;
    readonly TOAST_CHECKIN_SUCCESS: Locator;
    readonly TOAST_SAVE_SUCCESS: Locator;
    readonly TOAST_SEND_BROWSE_SUCCESS: Locator;
    readonly TOAST_BROWSE_SUCCESS2: Locator;
    readonly TOAST_VALIDATE_CLOSE_SALARY: Locator;
    readonly TOAST_EMPLOYEE_EXISTED: Locator;
    readonly TOAST_TERMINATE_CONTRACT_SUCCESS: Locator;
    readonly TOAST_EXTENSION_CONTRACT_SUCCESS: Locator;
    readonly TOAST_SEPARATE_PAYSHEET_SUCCESS: Locator;
    readonly TOAST_ADD_TIME_SUCCESS: Locator;

    constructor(page: Page) {
        super(page);
        this.TOAST_ADD_TIME_SUCCESS = page.locator('//div[contains(text(),"Thêm thời gian thành công")]');
        this.TOAST_SEPARATE_PAYSHEET_SUCCESS = page.locator('//div[contains(text(),"Tách thành công")]');
        this.TOAST_EXTENSION_CONTRACT_SUCCESS = page.locator('//div[contains(text(),"Gia hạn thành công")]');
        this.TOAST_TERMINATE_CONTRACT_SUCCESS = page.locator('//div[contains(text(),"Chấm dứt hợp đồng thành công")]');
        this.TOAST_EMPLOYEE_EXISTED = page.locator('//div[contains(text(),"Nhân viên đã tồn tại")]');
        this.TOAST_VALIDATE_CLOSE_SALARY = page.locator('//div[contains(text(),"Vui lòng duyệt hết tất cả phiếu lương")]');
        this.TOAST_SEND_BROWSE_SUCCESS = page.locator('//div[contains(text(),"Gửi duyệt thành công")]');
        this.TOAST_SAVE_SUCCESS = page.locator('//div[contains(text(),"Lưu thành công")]');
        this.TOAST_CHECKIN_SUCCESS = page.locator('//div[contains(text(),"Chấm công thành công")]');
        this.TOAST_UPDATE_FAILED = page.locator('//div[contains(text(),"Cập nhật không thành công")]');
        this.TOAST_PAYMENT_SUCCESS = page.locator('//div[contains(text(),"Thêm thanh toán phiếu lương thành công")]');
        this.TOAST_EXPORT_HAVE_NO_DATA = page.locator('//div[contains(text(),"Không có dữ liệu")]');
        this.TOAST_EDIT_SUCCESS = page.locator('//div[contains(text(),"Chỉnh sửa thành công")]');
        this.TOAST_CANCELLED_SUCCESS = page.locator('//div[contains(text(),"Đã hủy thành công")]');
        this.TOAST_REJECT_SUCCESS = page.locator('//div[contains(text(),"Từ chối thành công")]');
        this.TOAST_CANCEL_SUCCESS = page.locator('//div[contains(text(),"Hủy thành công")]');
        this.TOAST_SEND_NOTIFICATION_SUCCESS = page.locator('//div[contains(text(),"Gửi thông báo thành công")]');
        this.TOAST_ADD_FAILED = page.locator('//div[contains(text(),"Thêm không thành công")]');
        this.TOAST_EVALUATION_SUCCESS = page.locator('//div[contains(text(),"Đánh giá thành công")]');
        this.TOAST_CONFIRM_SUCCESS = page.locator('//div[contains(text(),"Xác nhận thành công")]');
        this.TOAST_EXPORT_SUCCESS = page.locator('//div[contains(text(),"Xuất thành công")]');
        this.TOAST_SEND_SUCCESS = page.locator('//div[contains(text(),"Đã gửi thành công")]');
        this.TOAST_ADD_SUCCESS = page.locator('//div[contains(text(),"Thêm thành công")]');
        this.TOAST_UPDATE_SUCCESS = page.locator('//div[contains(text(),"Cập nhật thành công")]');
        this.TOAST_DELETE_SUCCESS = page.locator('//div[contains(text(),"Xóa thành công")]');
        this.TOAST_BROWSE_SUCCESS = page.locator('//div[contains(text(),"Đã duyệt thành công")]');
        this.TOAST_BROWSE_SUCCESS2 = page.locator('//div[contains(text(),"Phê duyệt thành công")]');
    }

    async getToastAddTimeSuccess() {
        await this.safeVerifyToHaveText(this.TOAST_ADD_TIME_SUCCESS, 'Thêm thời gian thành công');
    }

    async getToastSeparatePaysheetSuccess() {
        await this.safeVerifyToHaveText(this.TOAST_SEPARATE_PAYSHEET_SUCCESS, 'Tách thành công');
    }

    async getToastExtensionContractSuccess() {
        await this.safeVerifyToHaveText(this.TOAST_EXTENSION_CONTRACT_SUCCESS, 'Gia hạn thành công');
    }

    async getToastTerminateContractSuccess() {
        await this.safeVerifyToHaveText(this.TOAST_TERMINATE_CONTRACT_SUCCESS, 'Chấm dứt hợp đồng thành công');
    }

    async getToastEmployeeExisted() {
        await this.safeVerifyToHaveText(this.TOAST_EMPLOYEE_EXISTED, 'Nhân viên đã tồn tại');
    }

    async getToastValidateCloseSalary() {
        await this.safeVerifyToHaveText(this.TOAST_VALIDATE_CLOSE_SALARY, 'Vui lòng duyệt hết tất cả phiếu lương');
    }

    async getToastBrowseSuccess2() {
        await this.safeVerifyToHaveText(this.TOAST_BROWSE_SUCCESS2, 'Phê duyệt thành công');
    }

    async getToastSendBrowseSuccess() {
        await this.safeVerifyToHaveText(this.TOAST_SEND_BROWSE_SUCCESS, 'Gửi duyệt thành công');
    }

    async getToastSaveSuccess() {
        await this.safeVerifyToHaveText(this.TOAST_SAVE_SUCCESS, 'Lưu thành công');
    }

    async getToastCheckinSuccess() {
        await this.safeVerifyToHaveText(this.TOAST_CHECKIN_SUCCESS, 'Chấm công thành công.');
    }

    async getToastUpdateFailed() {
        await this.safeVerifyToHaveText(this.TOAST_UPDATE_FAILED, 'Cập nhật không thành công');
    }

    async getToastPaymentSuccess() {
        await this.safeVerifyToHaveText(this.TOAST_PAYMENT_SUCCESS, 'Thêm thanh toán phiếu lương thành công');
    }

    async getToastExportHaveNoData() {
        await this.safeVerifyToHaveText(this.TOAST_EXPORT_HAVE_NO_DATA, 'Không có dữ liệu');
    }

    async getToastEditSuccess() {
        await this.safeVerifyToHaveText(this.TOAST_EDIT_SUCCESS, 'Chỉnh sửa thành công');
    }

    async getToastCancelledSuccess() {
        await this.safeVerifyToHaveText(this.TOAST_CANCELLED_SUCCESS, 'Đã hủy thành công');
    }

    async getToastRejectSuccess() {
        await this.safeVerifyToHaveText(this.TOAST_REJECT_SUCCESS, 'Từ chối thành công');
    }

    async getToastCancelSuccess() {
        await this.safeVerifyToHaveText(this.TOAST_CANCEL_SUCCESS, 'Hủy thành công');
    }

    async getToastSendNotificationSuccess() {
        await this.safeVerifyToHaveText(this.TOAST_SEND_NOTIFICATION_SUCCESS, 'Gửi thông báo thành công');
    }

    async getToastAddFailed() {
        await this.safeVerifyToHaveText(this.TOAST_ADD_FAILED, 'Thêm không thành công');
    }

    async getToastEvaluationSuccess() {
        await this.safeVerifyToHaveText(this.TOAST_EVALUATION_SUCCESS, 'Đánh giá thành công');
    }

    async getToastConfirmSuccess() {
        await this.safeVerifyToHaveText(this.TOAST_CONFIRM_SUCCESS, 'Xác nhận thành công');
    }

    async getToastExportSuccess() {
        await this.safeVerifyToHaveText(this.TOAST_EXPORT_SUCCESS, 'Xuất thành công');
    }

    async getToastBrowseSuccess() {
        await this.safeVerifyToHaveText(this.TOAST_BROWSE_SUCCESS, 'Đã duyệt thành công');
    }

    async getToastSendSuccess() {
        await this.safeVerifyTextContains(this.TOAST_SEND_SUCCESS, 'Đã gửi thành công');
    }

    async getToastAddSuccess() {
        await this.safeVerifyToHaveText(this.TOAST_ADD_SUCCESS, 'Thêm thành công');
    }

    async getToastUpdateSuccess() {
        await this.safeVerifyToHaveText(this.TOAST_UPDATE_SUCCESS, 'Cập nhật thành công');
    }

    async getToastDeleteSuccess() {
        await this.safeVerifyToHaveText(this.TOAST_DELETE_SUCCESS, 'Xóa thành công');
    }
}
