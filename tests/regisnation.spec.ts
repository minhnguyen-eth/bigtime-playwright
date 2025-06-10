import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { takeScreenshotOnFailure } from '../utils/screenshotUtils';
import Config from '../utils/configUtils';
import { HomePage } from '../pages/HomePage';
import { RegisnationPage } from '../pages/RegisnationPage';
import { ToastPage } from '../pages/ToastPage';

test.describe.serial('Work Shift Tests', () => {
    let loginPage: LoginPage;
    let regisnationPage: RegisnationPage;
    let homePage: HomePage;
    let toastPage: ToastPage;

    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const workShiftName = `Automation test ${randomSuffix}`;
    const workShiftCode = 'AT' + randomSuffix;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        regisnationPage = new RegisnationPage(page)
        homePage = new HomePage(page);
        toastPage = new ToastPage(page);
        await loginPage.goto();
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('Create registration and send to admin for approval', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await regisnationPage.clickRegisnationButton();
        await regisnationPage.clickAddButton();
        await regisnationPage.fillReason('Automation test');
        await regisnationPage.clickSaveButton();
        await toastPage.getToastAddSuccess();

    });



});
