import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { takeScreenshotOnFailure } from '../utils/screenshotUtils';
import Config from '../utils/configUtils';
import { HomePage } from '../pages/HomePage';
import { PaysheetPage } from '../pages/PaysheetPage';

test.describe.serial('Paysheet', () => {
    let loginPage: LoginPage;
    let paysheet: PaysheetPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        paysheet = new PaysheetPage(page);
        homePage = new HomePage(page);


    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    // Test quy trình duyệt lương, chốt lương , thanh toán 
    test.skip('Salary approval, salary closing, payment process', async ({ page }) => {
        // await clearAllPaysheets();
        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickSalary();
        await paysheet.clickPaysheet();
        await paysheet.clickAdd();
        await paysheet.setNamePaysheet('Automation test');
        await paysheet.clickCheckBoxMonthly();
        await paysheet.clickChooseMonth();
        await paysheet.clickMonthOption();
        await paysheet.setNote('Automation test');
        await paysheet.clickAndSetDropDownEmployee();
        await paysheet.clickEmployeeOption();
        await paysheet.clickSave();
        await paysheet.getToastAdd('Thêm thành công');
        await paysheet.clickLatestPaysheetRow();
        await paysheet.clickViewPayroll();
        await paysheet.clickSendAll();
        await paysheet.clickConfirm();
        await paysheet.clickLogout();
        await paysheet.clickLogoutConfirm();
        await page.waitForTimeout(1200);

        // Nhân viên duyệt lương
        await loginPage.goto();
        await loginPage.login(Config.employee_username, Config.employee_password);
        await homePage.clickSalary();
        await paysheet.clickPayslip();
        await paysheet.clickSalarySlipCode();
        await paysheet.clickBrowse();
        await paysheet.clickOk();
        await paysheet.clickLogout();
        await paysheet.clickLogoutConfirm();
        await page.waitForTimeout(1200);

        // Quản lý bộ phận duyệt lương
        await loginPage.goto();
        await loginPage.login(Config.manager_username, Config.manager_password);
        await homePage.clickSalary();
        await paysheet.clickPayslip();
        await paysheet.clickSalarySlipCode();
        await paysheet.clickBrowse();
        await paysheet.clickOk();
        await paysheet.clickLogout();
        await paysheet.clickLogoutConfirm();
        await page.waitForTimeout(1200);

        // Quản lý duyệt lương, chốt lương và thanh toán
        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickSalary();
        await paysheet.clickPayslip();
        await paysheet.clickSalarySlipCode();
        await paysheet.clickBrowse();
        await paysheet.clickOk();

        await paysheet.clickPaysheet();
        await paysheet.clickLatestPaysheetRow();
        await paysheet.clickViewPayroll();
        await paysheet.clickSalaryClosing();
        await paysheet.clickConfirm();

        await paysheet.clickLatestPaysheetRow();
        await paysheet.clickPayslipPayment();
        await paysheet.clickPayment();
        await paysheet.clickCreateTicket();
        await paysheet.clickPaymentHistory();
        await paysheet.clickHistoryPaymentCode();
        await paysheet.getEmployeeName('Nguyễn Văn Minh');

    });

    test('Search paysheet', async ({ page }) => {
        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickSalary();
        await paysheet.clickPaysheet();
        await paysheet.clickSearchLabel();
        await paysheet.searchPaysheet('BL000001');
        await paysheet.clickSearchButton();
        await paysheet.verifyPaysheetId('BL000001');

    });

    test('Add paysheet but not enter name', async ({ page }) => {
        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickSalary();
        await paysheet.clickPaysheet();
        await paysheet.clickAdd();
        await paysheet.clickSave();
        await paysheet.getRequiredEnterName('Nhập tên');

    });

    // Add paysheet with all employee
    test('Add paysheet with all employee', async ({ page }) => {
        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickSalary();
        await paysheet.clickPaysheet();
        await paysheet.clickAdd();
        await paysheet.setNamePaysheet('Automation test');
        await paysheet.clickCheckBoxMonthly();
        await paysheet.clickChooseMonth();
        await paysheet.clickMonthOption();
        await paysheet.clickSelectAllEmployees();
        await paysheet.setNote('Automation test');
        await paysheet.clickSave();
        await paysheet.getToastAdd('Thêm thành công');


    });

});