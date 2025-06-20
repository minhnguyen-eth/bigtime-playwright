import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { takeScreenshotOnFailure } from '../utils/screenshotUtils';
import Config from '../utils/configUtils';
import { HomePage } from '../pages/HomePage';
import { RegisnationPage } from '../pages/RegisnationPage';
import { ToastPage } from '../pages/ToastPage';
import { LogoutPage } from '../pages/LogoutPage';
import { allure } from 'allure-playwright';

test.describe.serial('Resignation Tests', () => {
    let loginPage: LoginPage;
    let regisnationPage: RegisnationPage;
    let homePage: HomePage;
    let toastPage: ToastPage;
    let logoutPage: LogoutPage;

    const randomSuffix = Math.random().toString(36).substring(2, 8);

    test.beforeEach(async ({ page }) => {
      
        allure.feature('Resignation Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        logoutPage = new LogoutPage(page);
        loginPage = new LoginPage(page);
        regisnationPage = new RegisnationPage(page);
        homePage = new HomePage(page);
        toastPage = new ToastPage(page);
        await loginPage.goto();
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('Complete resignation approval process', async ({ page }) => {
        allure.story('Full Resignation Process Story');

        await allure.step('Employee logs in and creates resignation request', async () => {
            await loginPage.login(Config.employee_username, Config.employee_password);
            await homePage.clickAdmin();
            await regisnationPage.clickRegisnationButton();
            await regisnationPage.clickAddButton();
            await regisnationPage.fillReason('Automation test');
            await regisnationPage.clickSaveButton();
            await toastPage.getToastAddSuccess();
            await regisnationPage.clickRow0();
        });

        await allure.step('Employee sends resignation request', async () => {
            await regisnationPage.clickSendButton();
            await regisnationPage.clickOkButton();
            await toastPage.getToastSendSuccess();
        });

        await allure.step('Employee browses own request', async () => {
            await regisnationPage.clickRow0();
            await regisnationPage.clickBrowseButton();
            await regisnationPage.clickOkButton();
            await toastPage.getToastBrowseSuccess();
            await regisnationPage.Logout();
            await page.waitForTimeout(1200);
        });

        await allure.step('Manager approves resignation request', async () => {
            await loginPage.goto();
            await loginPage.login(Config.manager_username, Config.manager_password);
            await homePage.clickAdmin();
            await regisnationPage.clickRegisnationButton();
            await regisnationPage.clickRow0();
            await regisnationPage.clickBrowseButton();
            await regisnationPage.clickOkButton();
            await toastPage.getToastBrowseSuccess();
            await regisnationPage.Logout();
            await page.waitForTimeout(1200);
        });

        await allure.step('Admin approves resignation request', async () => {
            await loginPage.goto();
            await loginPage.login(Config.admin_username, Config.admin_password);
            await homePage.clickAdmin();
            await regisnationPage.clickRegisnationButton();
            await regisnationPage.clickRow0();
            await regisnationPage.clickBrowseButton();
            await regisnationPage.clickOkButton();
            await toastPage.getToastBrowseSuccess();
        });
    });

    test('Search resignation requests', async ({ page }) => {
        allure.story('Search Resignation Story');

        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await regisnationPage.clickRegisnationButton();

        await allure.step('Search by employee name', async () => {
            await regisnationPage.searchEmployeeName('Nguyễn Văn Minh');
            await regisnationPage.clickSearchButton();
            await regisnationPage.getVerifyEmployeeNameSearch();
            await regisnationPage.clickClearSearchButton();
        });

        await allure.step('Search by notification of leave date', async () => {
            await regisnationPage.clickNotificaOfLeave();
            await regisnationPage.clickDay16();
            await regisnationPage.clickChosseButton();
            await regisnationPage.clickSearchButton();
            await regisnationPage.getVerifyNotificationOfLeave();
            await regisnationPage.clickClearSearchButton();
        });

        await allure.step('Search by browsed status', async () => {
            await regisnationPage.clickStatusDropDown();
            await regisnationPage.clickBrowsedStatusOption();
            await regisnationPage.clickSearchButton();
            await regisnationPage.getVerifyBrowseStatusOption();
            await regisnationPage.clickClearSearchButton();
        });

        await allure.step('Search by submitted status', async () => {
            await regisnationPage.clickStatusDropDown();
            await regisnationPage.clickSubmittedButton();
            await regisnationPage.clickSearchButton();
            await regisnationPage.getVerifySubmittedButton();
            await regisnationPage.clickClearSearchButton();
        });

        await allure.step('Search by rejected status', async () => {
            await regisnationPage.clickStatusDropDown();
            await regisnationPage.clickRejectStatusOption();
            await regisnationPage.clickSearchButton();
            await regisnationPage.getVerifyRejectStatusOption();
            await regisnationPage.clickClearSearchButton();
        });

        await allure.step('Search by canceled status', async () => {
            await regisnationPage.clickStatusDropDown();
            await regisnationPage.clickCancelStatusOption();
            await regisnationPage.clickSearchButton();
            await regisnationPage.getVerifyCancelStatusOption();
            await regisnationPage.clickClearSearchButton();
        });
    });

    test('Export resignation requests to Excel', async ({ page }) => {
        allure.story('Export Resignation to Excel Story');

        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await regisnationPage.clickRegisnationButton();

        await allure.step('Export resignation requests by date range', async () => {
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

});
