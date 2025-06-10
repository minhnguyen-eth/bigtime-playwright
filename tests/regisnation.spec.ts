import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { takeScreenshotOnFailure } from '../utils/screenshotUtils';
import Config from '../utils/configUtils';
import { HomePage } from '../pages/HomePage';
import { RegisnationPage } from '../pages/RegisnationPage';
import { ToastPage } from '../pages/ToastPage';
import { LogoutPage } from '../pages/LogoutPage';

test.describe.serial('Work Shift Tests', () => {
    let loginPage: LoginPage;
    let regisnationPage: RegisnationPage;
    let homePage: HomePage;
    let toastPage: ToastPage;
    let logoutPage: LogoutPage;

    const randomSuffix = Math.random().toString(36).substring(2, 8);

    test.beforeEach(async ({ page }) => {
        logoutPage = new LogoutPage(page);
        loginPage = new LoginPage(page);
        regisnationPage = new RegisnationPage(page)
        homePage = new HomePage(page);
        toastPage = new ToastPage(page);
        await loginPage.goto();
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('Test the entire resignation approval process', async ({ page }) => {
        await loginPage.login(Config.employee_username, Config.employee_password);
        await homePage.clickAdmin();

        // Create
        await regisnationPage.clickRegisnationButton();
        await regisnationPage.clickAddButton();
        await regisnationPage.fillReason('Automation test');
        await regisnationPage.clickSaveButton();
        await toastPage.getToastAddSuccess();
        await regisnationPage.clickRow0()

        // Send
        await regisnationPage.clickSendButton();
        await regisnationPage.clickOkButton();
        await toastPage.getToastSendSuccess();

        // Browse
        await regisnationPage.clickRow0()
        await regisnationPage.clickBrowseButton();
        await regisnationPage.clickOkButton();
        await toastPage.getToastBrowseSuccess();
        await logoutPage.logout();
        await page.waitForTimeout(1200);


        // Manager browse
        await loginPage.goto();
        await loginPage.login(Config.manager_username, Config.manager_password);
        await homePage.clickAdmin();
        await regisnationPage.clickRegisnationButton();
        await regisnationPage.clickRow0();
        await regisnationPage.clickBrowseButton();
        await regisnationPage.clickOkButton();
        await toastPage.getToastBrowseSuccess();
        await logoutPage.logout();
        await page.waitForTimeout(1200);

        // Admin browse
        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await regisnationPage.clickRegisnationButton();
        await regisnationPage.clickRow0();
        await regisnationPage.clickBrowseButton();
        await regisnationPage.clickOkButton();
        await toastPage.getToastBrowseSuccess();
    });

    // Search
    test('Search resignation', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();

        // Search by employee name
        await regisnationPage.clickRegisnationButton();
        await regisnationPage.searchEmployeeName('Nguyễn Văn Minh');
        await regisnationPage.clickSearchButton();
        await regisnationPage.getVerifyEmployeeNameSearch();
        await regisnationPage.clickClearSearchButton();

        // Search by notification of leave
        await regisnationPage.clickNotificaOfLeave();
        await regisnationPage.clickDay09();
        await regisnationPage.clickChosseButton();
        await regisnationPage.clickSearchButton();
        await regisnationPage.getVerifyNotificationOfLeave();
        await regisnationPage.clickClearSearchButton();

        // Search by browsed status
        await regisnationPage.clickStatusDropDown();
        await regisnationPage.clickBrowsedStatusOption();
        await regisnationPage.clickSearchButton();
        await regisnationPage.getVerifyBrowseStatusOption();
        await regisnationPage.clickClearSearchButton();

        // Search by submitted status
        await regisnationPage.clickStatusDropDown();
        await regisnationPage.clickSubmittedButton();
        await regisnationPage.clickSearchButton();
        await regisnationPage.getVerifySubmittedButton();
        await regisnationPage.clickClearSearchButton();

        // Search by rejected status
        await regisnationPage.clickStatusDropDown();
        await regisnationPage.clickRejectStatusOption();
        await regisnationPage.clickSearchButton();
        await regisnationPage.getVerifyRejectStatusOption();
        await regisnationPage.clickClearSearchButton();


    });

    test('Export excel', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await regisnationPage.clickRegisnationButton();
        await regisnationPage.clickExportButton();
        await regisnationPage.clickStartDate();
        await regisnationPage.clickDay06();
        await regisnationPage.clickChosseButton();
        await regisnationPage.clickEndDate();
        await regisnationPage.clickDay09();
        await regisnationPage.clickChosseButton();
        await regisnationPage.clickOkButton();
        await toastPage.getToastExportSuccess();
    }); 



});
