import { Locator, Page, expect } from '@playwright/test';

export class PaysheetPage {
  private page: Page;

  // Buttons & Inputs
  private cancelButton: Locator;
  private paysheetButton: Locator;
  private addButton: Locator;
  private namePaysheetInput: Locator;
  private setNamePaysheetInput: Locator;
  private radioMonthly: Locator;
  private dropdownMonth: Locator;
  private monthOption: Locator;
  private dropdownEmployee: Locator;
  private employeeOption: Locator;
  private saveButton: Locator;
  private logoutButton: Locator;
  private logoutConfirmButton: Locator;
  private submitButton: Locator;
  private latestPaysheetRow: Locator;
  private viewPayrollButton: Locator;
  private sendAllButton: Locator;
  private confirm2Button: Locator;
  private noteInput: Locator;
  private payslipButton: Locator;
  private salarySlipCode: Locator;
  private browseButton: Locator;
  private okButton: Locator;
  private salaryClosingButton: Locator;
  private confirmButton: Locator;
  private exportDataButton: Locator;
  private refreshButton: Locator;
  private paymentHistoryButton: Locator;
  private historyPaymentCodeButton: Locator;
  private employeeNameLabel: Locator;
  private cancelPaysheetButton: Locator;
  private searchLabel: Locator;
  private verifyPaysheetIdCell: Locator;
  private selectAllEmployeesCheckbox: Locator;
  private reasonInput: Locator;
  private reasonLabel: Locator;
  private toastAddSuccess: Locator;
  private toastCancelSuccess: Locator;
  private toastExportSuccess: Locator;
  private createTicketButton: Locator;
  private paymentButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cancelButton       = page.locator('//span[contains(normalize-space(),"Hủy")]');
    this.paysheetButton     = page.locator('//a[@href="/salary/pay-sheet"]');
    this.addButton          = page.locator('//span[normalize-space()="Thêm"]');
    this.namePaysheetInput  = page.locator('//form/div/div[3]/div/div[2]/div/div[2]/div/div[1]/div/div/div/div[3]/div/input');
    this.setNamePaysheetInput = page.locator('//form//div[3]//div[2]//div//div[1]//div//div[1]//div//input');
    this.radioMonthly       = page.locator('//i[contains(@class,"mdi-radiobox-blank")]');
    this.dropdownMonth      = page.locator('//i[@title="Open"]');
    this.monthOption        = page.locator('//div[@class="v-list-item-title"][normalize-space()="1/5/2025 - 31/5/2025"]');
    this.dropdownEmployee   = page.locator('//div[@class="v-field__input"]');
    this.employeeOption     = page.locator('//div[@role="option"]//div[@class="v-list-item-title"]');
    this.saveButton         = page.locator('//button[@type="submit"]//span[@class="v-btn__content"]');
    this.logoutButton       = page.locator('//div[contains(text(),"Đăng xuất")]');
    this.logoutConfirmButton= page.locator('//span[normalize-space()="Có"]');
    this.submitButton       = page.locator('//button[@type="submit"]');
    this.latestPaysheetRow  = page.locator('//tr[@id="row-0"]');
    this.viewPayrollButton  = page.locator('//span[contains(normalize-space(),"Xem bảng lương")]');
    this.sendAllButton      = page.locator('//span[contains(normalize-space(),"Gửi tất cả")]');
    this.confirm2Button     = page.locator('//span[.="Xác nhận"]');
    this.noteInput          = page.locator('//textarea[@class="v-field__input"]');
    this.payslipButton      = page.locator('//a[@href="/salary/payslip"]');
    this.salarySlipCode     = page.locator('//tr[@id="row-0"]//td[2]');
    this.browseButton       = page.locator('//span[contains(normalize-space(),"Duyệt")]');
    this.okButton           = page.locator('//span[normalize-space()="Có"]');
    this.salaryClosingButton= page.locator('//span[contains(normalize-space(),"Chốt lương")]');
    this.confirmButton      = page.locator('//button[contains(@class,"v-btn--outlined")]//span[@class="v-btn__content"]');
    this.exportDataButton   = page.locator('//span[contains(normalize-space(),"Xuất dữ liệu")]');
    this.refreshButton      = page.locator('//span[normalize-space()="Làm mới"]');
    this.paymentHistoryButton = page.locator('//span[normalize-space()="Lịch sử thanh toán"]');
    this.historyPaymentCodeButton = page.locator('//td[@class="text-left cursor-pointer"]');
    this.employeeNameLabel  = page.locator('//div[contains(text(),"Nguyễn Văn Minh")]');
    this.cancelPaysheetButton = page.locator('//span[normalize-space()="Hủy"]');
    this.searchLabel        = page.locator('//label[@class="v-label v-field-label"]');
    this.verifyPaysheetIdCell = page.locator('//td[normalize-space()="BL000001"]');
    this.selectAllEmployeesCheckbox = page.locator('//i[contains(@class,"mdi-radiobox-blank")][1]');
    this.reasonLabel        = page.locator('//form//div[3]//textarea');
    this.reasonInput        = page.locator('//form//div[3]//div[3]//textarea');
    this.toastAddSuccess    = page.locator('//div[contains(text(),"Thêm thành công")]');
    this.toastCancelSuccess = page.locator('//div[contains(text(),"Hủy thành công")]');
    this.toastExportSuccess = page.locator('//div[contains(text(),"Xuất thành công")]');
    this.createTicketButton = page.locator('//span[contains(normalize-space(),"Tạo phiếu")]');
    this.paymentButton      = page.locator('//span[contains(normalize-space(),"Thanh toán")]');
  }

  async clickExportData() {
    await this.exportDataButton.click();
  }

  async getToastExport() {
    await expect(this.toastExportSuccess).toBeVisible();
    return this.toastExportSuccess.textContent();
  }

  async getToastCancel() {
    await expect(this.toastCancelSuccess).toBeVisible();
    return this.toastCancelSuccess.textContent();
  }

  async getToastAdd() {
    await expect(this.toastAddSuccess).toBeVisible();
    return this.toastAddSuccess.textContent();
  }

  async clickRefresh() {
    await this.refreshButton.click();
  }

  async clickOk() {
    await this.okButton.click();
  }

  async setReason(reason: string = 'Automation test') {
    await this.reasonLabel.click();
    await this.reasonInput.fill(reason);
  }

  async clickSelectAllEmployees() {
    await this.selectAllEmployeesCheckbox.click();
  }

  async isPaysheetIdDisplayed(id: string) {
    const cell = this.page.locator(`//td[normalize-space()="${id}"]`);
    return cell.isVisible();
  }

  async searchPaysheet(id: string) {
    await this.searchLabel.click();
    await this.page.keyboard.type(id);
    await this.page.keyboard.press('Enter');
  }

  async clickCancelPaysheet() {
    await this.cancelPaysheetButton.click();
  }

  async getEmployeeName() {
    return this.employeeNameLabel.textContent();
  }

  async clickHistoryPaymentCode() {
    await this.historyPaymentCodeButton.click();
  }

  async clickPaymentHistory() {
    await this.paymentHistoryButton.click();
  }

  async clickCreateTicket() {
    await this.createTicketButton.click();
  }

  async clickPayment() {
    await this.paymentButton.click();
  }

  async clickPaysheet() {
    await this.paysheetButton.click();
  }

  async clickAdd() {
    await this.addButton.click();
  }

  async setNamePaysheet(name: string) {
    await this.namePaysheetInput.fill(name);
  }

  async clickMonthlyRadio() {
    await this.radioMonthly.click();
  }

  async clickDropdownMonth() {
    await this.dropdownMonth.click();
  }

  async clickMonthOption() {
    await this.monthOption.click();
  }

  async selectEmployee(name: string) {
    await this.dropdownEmployee.click();
    await this.dropdownEmployee.fill(name);
    await this.employeeOption.click();
  }

  async clickSave() {
    await this.saveButton.click();
  }

  async clickLatestPaysheetRow() {
    await this.latestPaysheetRow.click();
  }

  async clickViewPayroll() {
    await this.viewPayrollButton.click();
  }

  async clickSendAll() {
    await this.sendAllButton.click();
  }

  async clickConfirm2() {
    await this.confirm2Button.click();
  }

  async clickBrowse() {
    await this.browseButton.click();
  }

  async clickSalaryClosing() {
    await this.salaryClosingButton.click();
  }

  async clickConfirm() {
    await this.confirmButton.click();
  }

  async clickLogout() {
    await this.logoutButton.click();
    await this.logoutConfirmButton.click();
  }
}
