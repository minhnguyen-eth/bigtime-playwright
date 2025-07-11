import { test, TestInfo } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { takeScreenshotOnFailure } from '../../utils/screenshotUtils';
import Config from '../../utils/configUtils';
import { PayslipPage } from '../../pages/salary_page/PayslipPage';
import { allure } from 'allure-playwright';
import { ToastPage } from '../../pages/ToastPage';
import { LogoutPage } from '../../pages/LogoutPage';
import { BasePage } from '../../pages/BasePage';
import { clearAllPaysheets, clearAllPayslips } from '../../db/DBHelper';

test.describe.serial('Payslip Tests', () => {
    let loginPage: LoginPage;
    let payslipPage: PayslipPage;
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
        payslipPage = new PayslipPage(page);
        logoutPage = new LogoutPage(page);
        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('Export only one a employee', async ({ page }) => {
        await clearAllPaysheets();
        await clearAllPayslips();
        await payslipPage.handleExportOnlyOneEmployee();
        await toastPage.getToastExportSuccess();
    });

    test('Export by month', async ({ page }) => {
        await clearAllPaysheets();
        await clearAllPayslips();
        await payslipPage.handleExportByMonth();
        await toastPage.getToastExportSuccess();
    });

    test('Cancel payslip', async ({ page }) => {
        await clearAllPaysheets();
        await clearAllPayslips();
        await payslipPage.handleCancelPaySlip();

        // Employe check
        await logoutPage.logout();
        await loginPage.login(Config.employee_username, Config.employee_password);
        await payslipPage.expectVerifyCancelledStatus();
    });
});