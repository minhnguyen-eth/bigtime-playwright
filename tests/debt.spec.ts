import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { takeScreenshotOnFailure } from '../utils/screenshotUtils';
import Config from '../utils/configUtils';
import { HomePage } from '../pages/HomePage';
import { ToastPage } from '../pages/ToastPage';
import { DebtPage } from '../pages/DebtPage';



test.describe.serial('Debt Tests', () => {
    let loginPage: LoginPage;
    let debtPage: DebtPage;
    let homePage: HomePage;
    let toastPage: ToastPage;

    const randomSuffix = Math.random().toString(36).substring(2, 8);
    

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        debtPage = new DebtPage(page)
        homePage = new HomePage(page);
        toastPage = new ToastPage(page);
        await loginPage.goto();
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('Example test', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickSalary();
        await debtPage.clickDebtButton();
        await debtPage.clickAddButton();
    });



});
