import { test, TestInfo } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { takeScreenshotOnFailure } from '../../utils/screenshotUtils';
import Config from '../../utils/configUtils';
import { HomePage } from '../../pages/HomePage';
import { PaysheetPage } from '../../pages/salary_page/PaysheetPage';
import { allure } from 'allure-playwright';
import { ToastPage } from '../../pages/ToastPage';
import { LogoutPage } from '../../pages/LogoutPage';
import { BasePage } from '../../pages/BasePage';

test.describe.serial('Paysheet Tests', () => {

    let loginPage: LoginPage;
    let paysheet: PaysheetPage;
    let homePage: HomePage;
    let toastPage: ToastPage;
    let logoutPage: LogoutPage;
    let basePage: BasePage;

    test.beforeEach(async ({ page }) => {

        allure.feature('Paysheet Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        basePage = new BasePage(page);
        toastPage = new ToastPage(page);
        loginPage = new LoginPage(page);
        paysheet = new PaysheetPage(page);
        homePage = new HomePage(page);
        logoutPage = new LogoutPage(page);
        await loginPage.goto();
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('E2E Payroll and Payment Process', async ({ page }) => {
        allure.story('Complete Paysheet Process Story');

        await allure.step('Admin creates and sends paysheet', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await homePage.clickSalary();
            await paysheet.clickPaysheet();
            await basePage.clickAdd();
            await paysheet.setNamePaysheet('Automation test');
            await paysheet.clickCheckBoxMonthly();
            await paysheet.clickChooseMonth();
            await paysheet.clickMonthOption();
            await paysheet.setNote('Automation test');
            await paysheet.clickAndSetDropDownEmployee('Nguyễn Văn Minh');
            await paysheet.clickEmployeeOption();
            await basePage.clickSave();
            await toastPage.getToastAddSuccess();
            await paysheet.clickLatestPaysheetRow();
            await paysheet.clickViewPayroll();
            await paysheet.clickSendAll();
            await paysheet.clickConfirm();
            await logoutPage.logout();

        });

        await allure.step('Employee approves payslip', async () => {

            await loginPage.login(Config.employee_username, Config.employee_password);
            await homePage.clickSalary();
            await paysheet.clickPayslip();
            await paysheet.clickSalarySlipCode();
            await paysheet.clickBrowse();
            await toastPage.getToastBrowseSuccess();
            await logoutPage.logout();
        });

        await allure.step('Manager approves payslip', async () => {

            await loginPage.login(Config.manager_username, Config.manager_password);
            await homePage.clickSalary();
            await paysheet.clickPayslip();
            await paysheet.clickSalarySlipCode();
            await paysheet.clickBrowse();
            await logoutPage.logout();
        });

        await allure.step('Admin closes paysheet and completes payment', async () => {

            await loginPage.login(Config.admin_username, Config.admin_password);
            await homePage.clickSalary();
            await paysheet.clickPayslip();
            await paysheet.clickSalarySlipCode();
            await paysheet.clickBrowse();
            await paysheet.clickPaysheet();
            await paysheet.clickLatestPaysheetRow();
            await paysheet.clickViewPayroll();
            // await paysheet.clickSalaryClosing();
            // await paysheet.clickConfirm();
            // await paysheet.clickLatestPaysheetRow();
            // await paysheet.clickPayslipPayment();
            // await paysheet.clickPayment();
            // await paysheet.clickCreateTicket();
            // await toastPage.getToastPaymentSuccess();
        });
    });

    test('E2E Payroll and Payment Process with add more employee', async ({ page }) => {
        allure.story('Complete Paysheet Process Story');

        await allure.step('Admin creates and sends paysheet', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await homePage.clickSalary();
            await paysheet.clickPaysheet();
            await basePage.clickAdd();
            await paysheet.setNamePaysheet('Automation test');
            await paysheet.clickCheckBoxMonthly();
            await paysheet.clickChooseMonth();
            await paysheet.clickMonthOption();
            await paysheet.setNote('Automation test');
            await paysheet.clickAndSetDropDownEmployee('Nguyễn Văn Minh');
            await paysheet.clickEmployeeOption();
            await basePage.clickSave();
            await toastPage.getToastAddSuccess();
            await paysheet.clickLatestPaysheetRow();
            await paysheet.clickViewPayroll();
            await paysheet.clickAddMoreEmployee();
            await paysheet.fillEmployeeNameInput('Big app tech')
            await paysheet.clickSelectMoreEmployee();
            await basePage.clickSave();
            await toastPage.getToastAddSuccess();
            await paysheet.clickSendAll();
            await paysheet.clickConfirm();
            await logoutPage.logout();

        });

        await allure.step('Employee 1 approves payslip', async () => {
            await loginPage.login(Config.employee_username, Config.employee_password);
            await homePage.clickSalary();
            await paysheet.clickPayslip();
            await paysheet.clickSalarySlipCode();
            await paysheet.clickBrowse();
            await logoutPage.logout();
        });


        await allure.step('Employee 2 approves payslip', async () => {
            await loginPage.login(Config.employee2_username, Config.employee2_password);
            await homePage.clickSalary();
            await paysheet.clickPayslip();
            await paysheet.clickSalarySlipCode();
            await paysheet.clickBrowse();
            await logoutPage.logout();
        });

        await allure.step('Manager approves payslip', async () => {
            await loginPage.login(Config.manager_username, Config.manager_password);
            await homePage.clickSalary();
            await paysheet.clickPayslip();
            await paysheet.clickSalarySlipCode();
            await paysheet.clickBrowse();

            await paysheet.clickSalarySlipCodeRow1();
            await paysheet.clickBrowse();
  
            await logoutPage.logout();
        });
    });


    test('Search Paysheet', async ({ page }) => {
        allure.story('Search Paysheet Story');

        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickSalary();
        await paysheet.clickPaysheet();

        await allure.step('Search paysheet by ID', async () => {
            await paysheet.fillSearchPaysheet('BL000001');
            await paysheet.clickSearchButton();
            await paysheet.verifyPaysheetId('BL000001');
        });
    });

    test('Add Paysheet Without Name', async ({ page }) => {
        allure.story('Validation Paysheet Creation Story');

        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickSalary();
        await paysheet.clickPaysheet();

        await allure.step('Try to add paysheet without entering name', async () => {
            await basePage.clickAdd();
            await basePage.clickSave();
            await paysheet.getRequiredEnterName('Nhập tên');
        });
    });

    test('Add Paysheet With All Employees', async ({ page }) => {
        allure.story('Add Paysheet For All Employees Story');

        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickSalary();
        await paysheet.clickPaysheet();

        await allure.step('Add paysheet for all employees', async () => {
            await basePage.clickAdd();
            await paysheet.setNamePaysheet('Automation test');
            await paysheet.clickCheckBoxMonthly();
            await paysheet.clickChooseMonth();
            await paysheet.clickMonthOption();
            await paysheet.clickSelectAllEmployees();
            await paysheet.setNote('Automation test');
            // await basePage.clickSave();
            // await toastPage.getToastAddSuccess();
        });
    });

    test('Cancel Paysheet', async ({ page }) => {
        allure.story('Cancel Paysheet Story');

        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickSalary();
        await paysheet.clickPaysheet();

        await allure.step('Cancel latest paysheet with reason', async () => {
            await paysheet.clickLatestPaysheetRow();
            await paysheet.clickCancelPaysheet();
            await paysheet.fillReason('Automation test cancel paysheet');
            await paysheet.clickOk();
            await toastPage.getToastCancelSuccess();
        });
    });

    test('Export excel by all current month', async ({ page }) => {
        allure.story('Export Excel by Month Story');

        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickSalary();
        await paysheet.clickPaysheet();

        await allure.step('Export excel by month', async () => {
            await paysheet.clickExportExcelByMonth();
            await paysheet.clickOk();
            await toastPage.getToastExportSuccess();
        });
    });

    test('Export excel by all month 05', async ({ page }) => {
        allure.story('Export Excel by Month 05 Story');

        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickSalary();
        await paysheet.clickPaysheet();

        await allure.step('Export excel by month 5  ', async () => {

            await basePage.clickAdd();
            await paysheet.setNamePaysheet('Automation test');
            await paysheet.clickCheckBoxMonthly();
            await paysheet.clickChooseMonth();
            await paysheet.clickMonthOption05();
            await paysheet.setNote('Automation test');
            await paysheet.clickAndSetDropDownEmployee('Nguyễn Văn Minh');
            await paysheet.clickEmployeeOption();
            await basePage.clickSave();
            await toastPage.getToastAddSuccess();
            await paysheet.clickExportExcelByMonth();
            await paysheet.clickChosseMonthExport();
            await paysheet.clickMonth05();
            await paysheet.clickChosseDatePicker();
            await paysheet.clickOk();
            await toastPage.getToastExportSuccess();
        });
    });

    test('Export excel by only one paysheet', async ({ page }) => {
        allure.story('Export Excel by 1 Paysheet Story');

        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickSalary();
        await paysheet.clickPaysheet();

        await allure.step('Click export button of the lastest paysheet ', async () => {

            await paysheet.clickLatestPaysheetRow();
            await paysheet.clickExportOnly1Paysheet();
            await toastPage.getToastExportSuccess();
        });
    });

});