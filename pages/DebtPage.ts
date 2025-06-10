import { Page, Locator, expect } from "@playwright/test";
export class DebtPage {
  private page: Page;

  readonly toastAddSuccess: Locator;
  readonly toastUpdateSuccess: Locator;
  readonly toastDeleteSuccess: Locator;
  readonly toastCancelSuccess: Locator;
  readonly toastSendSuccess: Locator;
  readonly toastBrowserSuccess: Locator;
  readonly toastRefusedSuccess: Locator;
  readonly debtButton: Locator;
  readonly addButton: Locator;
  readonly editButton: Locator;
  readonly deleteButton: Locator;
  readonly searchNameInput: Locator;
  readonly chosesearchName: Locator;
  readonly searchButton: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly requiredErrorNameMessage: Locator;
  readonly requiredErrorAmountMessage: Locator;
  readonly requiredErrorNoteMessage: Locator;
  readonly requiredErrorReasonMessage: Locator;
  readonly inputName: Locator;
  readonly inputAmount: Locator;
  readonly inputNote: Locator;
  readonly chosenName: Locator;
  readonly actionButton: Locator;
  readonly actionCancelButton: Locator;
  readonly reasonInput: Locator;
  readonly yesButton: Locator;
  readonly noButton: Locator;
  readonly actionSendButton: Locator;
  readonly logoutButton: Locator;
  readonly actionBrowserButton: Locator;
  readonly actionRefusedButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.debtButton = page.locator("//div[contains(text(),'Tạm ứng')]");
    this.toastAddSuccess = page.locator(
      '//div[contains(text(),"Thêm thành công")]'
    );
    this.toastUpdateSuccess = page.locator(
      '//div[contains(text(),"Cập nhật thành công")]'
    );
    this.toastDeleteSuccess = page.locator(
      '//div[contains(text(),"Xóa thành công")]'
    );
    this.toastCancelSuccess = page.locator(
      '//div[contains(text(),"Hủy thành công")]'
    );
    this.toastSendSuccess = page.locator(
      '//div[contains(text(),"Đã gửi thành công")]'
    );
    this.toastBrowserSuccess = page.locator(
      '//div[contains(text(),"Đã gửi thành công")]'
    );
    this.toastRefusedSuccess = page.locator(
      '//div[contains(text(),"Từ chối thành công")]'
    );
    this.addButton = page.locator("//span[normalize-space()='Thêm']");
    this.searchButton = page.locator("//span[normalize-space()='Tìm kiếm']");
    this.saveButton = page.locator("//span[normalize-space()='Lưu']");
    this.cancelButton = page.locator("//span[normalize-space()='Hủy']");
    this.requiredErrorNameMessage = page.getByText("Nhập chọn nhân viên");
    this.requiredErrorAmountMessage = page.getByText("Nhập nhập số tiền");
    this.requiredErrorNoteMessage = page.getByText("Nhập ghi chú");
    this.requiredErrorReasonMessage = page.getByText("Nhập lý do");
    this.inputName = page.getByRole("textbox", {
      name: "Chọn nhân viên ※ Chọn nhân vi",
    });
    this.chosenName = page.getByText("BAT810-Nguyễn Văn Minh");
    this.inputAmount = page.getByRole('textbox', { name: 'Nhập số tiền ※ Nhập số tiền ※' })
    this.inputNote = page.getByRole("textbox", { name: "Ghi chú ※ Ghi chú ※" });
    this.editButton = page.getByRole('button', { name: 'Sửa' });
    this.searchNameInput = page.getByRole('textbox', { name: 'Tên nhân viên Tên nhân viên' });
    this.chosesearchName = page.getByRole('option', { name: 'BAT810 - Nguyễn Văn Minh' });
    this.actionCancelButton = page.getByRole('button', { name: 'Hủy' });
    this.reasonInput = page.getByRole('textbox', { name: 'Lý do ※ Lý do ※' })
    this.yesButton = page.getByRole('button', { name: 'Có' });
    this.noButton = page.getByRole('button', { name: 'Không' });
    this.actionSendButton = page.getByRole('button', { name: 'Gửi' });
    this.logoutButton = page.locator("//span[normalize-space()='Đăng xuất']");
    this.actionBrowserButton = page.getByRole('button', { name: 'Duyệt' });
    this.actionRefusedButton = page.getByRole('button', { name: 'Từ chối' });
  }

  // Hàm xử lý

  async clickDebtButton() {
    await this.debtButton.click();
  }

  async getToastAddSuccess() {
    await expect(this.toastAddSuccess).toHaveText("Thêm thành công");
    return this.toastAddSuccess.textContent();
  }

  async clickAddButton() {
    await this.addButton.click();
  }

  async clickSaveButton() {
    await this.saveButton.click();
  }

  async clickCancelButton() {
    await this.cancelButton.click();
  }

  async expectFillNameError() {
    await expect(this.requiredErrorNameMessage).toHaveText(
      "Nhập chọn nhân viên"
    );
  }

  async expectFillNoteError() {
    await expect(this.requiredErrorNoteMessage).toHaveText("Nhập ghi chú");
  }

  async fillName(name: string) {
    await this.inputName.fill(name);
    await this.chosenName.click();
  }

  async fillAmount(amount: string) {
    await this.inputAmount.fill(amount);
  }

  async fillNote(note: string) {
    await this.inputNote.fill(note);
  }

  async clickEditButton() {
    await this.searchNameInput.fill('BAT810 - Nguyễn Văn Minh');
    await this.chosesearchName.click();
    await this.searchButton.click();
    await this.page.getByRole('row', { name: '1 BAT810 - Nguyễn Văn Minh 1.000.000 đ add debt test for edit Admin Tạo mới', exact: true }).getByRole('button').click();
    await this.editButton.click();
  }

  async getToastEditSuccess() {
    await expect(this.toastUpdateSuccess).toHaveText("Cập nhật thành công");
    return this.toastUpdateSuccess.textContent();
  }

  async expectFillAmountError () {
    await expect(this.requiredErrorAmountMessage).toHaveText("Nhập nhập số tiền");
  }

  async clickActionCancelButton() {
    await this.searchNameInput.fill('BAT810 - Nguyễn Văn Minh');
    await this.chosesearchName.click();
    await this.searchButton.click();
    await this.page.getByRole('row', { name: '1 BAT810 - Nguyễn Văn Minh 1.000.000 đ add debt test for cancel Admin Tạo mới', exact: true }).getByRole('button').click();
    await this.actionCancelButton.click();
  }

  async getToastCancelSuccess() {
    await expect(this.toastCancelSuccess).toHaveText("Hủy thành công");
    return this.toastCancelSuccess.textContent();
  }

  async fillReason(reason: string) {
    await this.reasonInput.fill(reason);
  }

  async clickYesButton() {
    await this.yesButton.click();
  }

  async clickActionSendButton() {
    await this.searchNameInput.fill('BAT810 - Nguyễn Văn Minh');
    await this.chosesearchName.click();
    await this.searchButton.click();
    await this.page.getByRole('row', { name: '1 BAT810 - Nguyễn Văn Minh 1.000.000 đ add debt test for send Admin Tạo mới', exact: true }).getByRole('button').click();
    await this.actionSendButton.click();
  }

  async expectFillReasonError() {
    await expect(this.requiredErrorReasonMessage).toHaveText("Nhập lý do");
  }

  async getToastSendSuccess() {
    await expect(this.toastSendSuccess).toHaveText("Đã gửi thành công");
    return this.toastSendSuccess.textContent();
  }

  async clickLogoutButton() {
    await this.logoutButton.click();
  }
  
  async clickActionBrowsedButton() {
    await this.page.getByRole('row', { name: '1 BAT810 - Nguyễn Văn Minh 1.000.000 đ add debt test for send Admin Đã gửi', exact: true }).getByRole('button').click();
    await this.actionBrowserButton.click();
  }

  async getToastBrowseSuccess() {
    await expect(this.toastBrowserSuccess).toHaveText("Đã gửi thành công");
    return this.toastBrowserSuccess.textContent();
  }

  async clickActionRefusedButton() {
    await this.page.getByRole('row', { name: '1 BAT810 - Nguyễn Văn Minh 1.000.000 đ add debt test for send Admin Đã gửi', exact: true }).getByRole('button').click();
    await this.actionRefusedButton.click();
  }

  async getToastRefusedSuccess() {
    await expect(this.toastRefusedSuccess).toHaveText("Từ chối thành công");
    return this.toastRefusedSuccess.textContent();
  }

  async clickActionSendCancelButton() {
    await this.page.getByRole('row', { name: '1 BAT810 - Nguyễn Văn Minh 1.000.000 đ add debt test for send Admin Đã gửi', exact: true }).getByRole('button').click();
    await this.actionCancelButton.click();
  }
}
