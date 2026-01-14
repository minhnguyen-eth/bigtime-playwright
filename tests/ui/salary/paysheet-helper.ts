import { LoginPage } from '../../../pages/LoginPage';
import { PaysheetPage } from '../../../pages/salary_page/PaysheetPage';
import { LogoutPage } from '../../../pages/LogoutPage';
import Config from '../../../utils/configUtils';
import { ToastMessages } from '../../../constants/MessagesCommon';

export class PaysheetHelper {
  constructor(
    
    private paysheet: PaysheetPage,
    private loginPage: LoginPage,
    private logoutPage: LogoutPage,

  ) { }

  // Admin -> Employee -> Manager -> Admin
  async sendAndBrowse01() {
    await this.paysheet.clickLatestPaysheetRow();
    await this.paysheet.clickViewPayroll();
    await this.paysheet.clickSendAll();
    await this.paysheet.clickConfirmPaysheet();
    await this.logoutPage.logout();

    await this.loginPage.login('testluong@gmail.com', '123456');
    await this.browsePayslip();
    await this.logoutPage.logout();

    await this.loginPage.login(Config.manager_department_username, Config.manager_department_password);
    await this.browsePayslip();
    await this.logoutPage.logout();

    await this.loginPage.login(Config.admin_username, Config.admin_password);
    await this.browsePayslip();
    await this.paysheet.clickPaysheet();
    await this.paysheet.clickLatestPaysheetRow();
    await this.paysheet.clickViewPayroll();
    await this.paysheet.clickSalaryClosing();
    await this.paysheet.clickConfirmPaysheet();
    await this.paysheet.clickLatestPaysheetRow();
    await this.paysheet.clickPayslipPayment();
    await this.paysheet.clickPayment();
    await this.paysheet.clickPaymentConfirm();
    await this.paysheet.verifyToastMessage(ToastMessages.TOAST_PAYMENT_SUCCESS);
  }

  // Admin -> Employee -> Admin
  async sendAndBrowse02() {
    await this.paysheet.clickLatestPaysheetRow();
    await this.paysheet.clickViewPayroll();
    await this.paysheet.clickSendAll();
    await this.paysheet.clickConfirmPaysheet();
    await this.logoutPage.logout();

    await this.loginPage.login('testluong@gmail.com', '123456');
    await this.browsePayslip();
    await this.logoutPage.logout();

    await this.loginPage.login(Config.admin_username, Config.admin_password);
    await this.browsePayslip();
    await this.paysheet.clickPaysheet();
    await this.paysheet.clickLatestPaysheetRow();
    await this.paysheet.clickViewPayroll();
    await this.paysheet.clickSalaryClosing();
    await this.paysheet.clickConfirmPaysheet();
    await this.paysheet.clickLatestPaysheetRow();
    await this.paysheet.clickPayslipPayment();
    await this.paysheet.clickPayment();
    await this.paysheet.clickPaymentConfirm();
    await this.paysheet.verifyToastMessage(ToastMessages.TOAST_PAYMENT_SUCCESS);
  }

  // Admin -> Employee
  async sendAndBrowse03() {
    await this.paysheet.clickLatestPaysheetRow();
    await this.paysheet.clickViewPayroll();
    await this.paysheet.clickSendAll();
    await this.paysheet.clickConfirmPaysheet();
    await this.logoutPage.logout();

    await this.loginPage.goto();
    await this.loginPage.login('testluong@gmail.com', '123456');
    await this.browsePayslip();
    await this.logoutPage.logout();

    await this.loginPage.goto();
    await this.loginPage.login(Config.admin_username, Config.admin_password);
    await this.paysheet.clickSalary();
    await this.paysheet.clickPaysheet();
    await this.paysheet.clickLatestPaysheetRow();
    await this.paysheet.clickViewPayroll();
    await this.paysheet.clickSalaryClosing();
    await this.paysheet.clickConfirmPaysheet();
    await this.paysheet.clickLatestPaysheetRow();
    await this.paysheet.clickPayslipPayment();
    await this.paysheet.clickFirstCheckbox();
    await this.paysheet.clickPayment();
    await this.paysheet.clickPaymentConfirm();
    await this.paysheet.verifyToastMessage(ToastMessages.TOAST_PAYMENT_SUCCESS);
  }

  // Tạo bảng lương mới
  async addPaysheet(employeeName: string = 'test lương') {
    await this.paysheet.clickAdd();
    await this.paysheet.setNamePaysheet('Automation test');
    await this.paysheet.clickCheckboxMonthly();
    await this.paysheet.clickChooseMonth();
    await this.paysheet.clickMonthOption();
    await this.paysheet.setNote('Automation test');
    await this.paysheet.fillSearchByName(employeeName);
    await this.paysheet.clickSearchButtonTablist();
    await this.paysheet.clickSelectEmployee();
    await this.paysheet.clickSave();
    await this.paysheet.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
  }

  // Hành động lặp lại: xem phiếu lương
  async browsePayslip() {
    await this.paysheet.clickSalary();
    await this.paysheet.clickPayslip();
    await this.paysheet.clickSalarySlipCode();
    await this.paysheet.clickBrowse();
    await this.paysheet.verifyToastMessage(ToastMessages.TOAST_BROWSE_SUCCESS);
  }
}
