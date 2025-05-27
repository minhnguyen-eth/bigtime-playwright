import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { takeScreenshotOnFailure } from '../utils/screenshotUtils';
import Config from '../utils/configUtils';
import { HomePage } from '../pages/HomePage';
import { PaysheetPage } from '../pages/PaysheetPage';

test.describe('Evaluation Type Tests', () => {
    let loginPage: LoginPage;
    let paysheet: PaysheetPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        paysheet = new PaysheetPage(page);
        homePage = new HomePage(page);

        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
    });

    // Test quy trình duyệt lương, chốt lương , thanh toán 

    test('Paysheet Process', async ({ page }) => {
        await homePage.clickSalary();
        await paysheet.clickPaysheet();
        await paysheet.clickAdd();
        await paysheet.setNamePaysheet('Automation test');

        
    });


});