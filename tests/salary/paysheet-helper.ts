import { LoginPage } from '../../pages/LoginPage';
import { PaysheetPage } from '../../pages/salary_page/PaysheetPage';
import { ToastPage } from '../../pages/ToastPage';
import { LogoutPage } from '../../pages/LogoutPage';
import Config from '../../utils/configUtils';

export class PaysheetHelper {
  constructor(
    private paysheet: PaysheetPage,
    private loginPage: LoginPage,
    private logoutPage: LogoutPage,
    private toastPage: ToastPage
  ) { }

  // Admin -> Employee -> Manager -> Admin
  async sendAndBrowse01() {
    await this.paysheet.clickLatestPaysheetRow();
    await this.paysheet.clickViewPayroll();
    await this.paysheet.clickSendAll();
    await this.paysheet.clickConfirmPaysheet();
    await this.logoutPage.logout();

    await this.loginPage.login(Config.employee_username, Config.employee_password);
    await this.browsePayslip();
    await this.logoutPage.logout();

    await this.loginPage.login(Config.manager_username, Config.manager_password);
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
    await this.paysheet.clickCreateTicket();
    await this.toastPage.getToastPaymentSuccess();
  }

  // Admin -> Employee -> Admin
  async sendAndBrowse02() {
    await this.paysheet.clickLatestPaysheetRow();
    await this.paysheet.clickViewPayroll();
    await this.paysheet.clickSendAll();
    await this.paysheet.clickConfirmPaysheet();
    await this.logoutPage.logout();

    await this.loginPage.login(Config.employee_username, Config.employee_password);
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
    await this.paysheet.clickCreateTicket();
    await this.toastPage.getToastPaymentSuccess();
  }

  // Admin -> Employee
  async sendAndBrowse03() {
    await this.paysheet.clickLatestPaysheetRow();
    await this.paysheet.clickViewPayroll();
    await this.paysheet.clickSendAll();
    await this.paysheet.clickConfirmPaysheet();
    await this.logoutPage.logout();

    await this.loginPage.login(Config.employee_username, Config.employee_password);
    await this.browsePayslip();
    await this.logoutPage.logout();

    await this.loginPage.login(Config.admin_username, Config.admin_password);
    await this.paysheet.clickPaysheet();
    await this.paysheet.clickLatestPaysheetRow();
    await this.paysheet.clickViewPayroll();
    await this.paysheet.clickSalaryClosing();
    await this.paysheet.clickConfirmPaysheet();
    await this.paysheet.clickLatestPaysheetRow();
    await this.paysheet.clickPayslipPayment();
    await this.paysheet.clickPayment();
    await this.paysheet.clickCreateTicket();
    await this.toastPage.getToastPaymentSuccess();
  }

  // Tạo bảng lương mới
  async addPaysheet(employeeName: string = 'Nguyễn Văn Minh') {
    await this.paysheet.clickAdd();
    await this.paysheet.setNamePaysheet('Automation test');
    await this.paysheet.clickCheckBoxMonthly();
    await this.paysheet.clickChooseMonth();
    await this.paysheet.clickMonthOption();
    await this.paysheet.setNote('Automation test');
    await this.paysheet.clickAndSetDropDownEmployee(employeeName);
    await this.paysheet.clickEmployeeOption();
    await this.paysheet.clickSave();
    await this.toastPage.getToastAddSuccess();
  }

  // Hành động lặp lại: xem phiếu lương
  private async browsePayslip() {
    await this.paysheet.clickSalary();
    await this.paysheet.clickPayslip();
    await this.paysheet.clickSalarySlipCode();
    await this.paysheet.clickBrowse();
    await this.toastPage.getToastBrowseSuccess();
  }
}
