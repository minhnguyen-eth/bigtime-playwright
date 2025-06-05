import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { takeScreenshotOnFailure } from '../utils/screenshotUtils';
import Config from '../utils/configUtils';
import { EvaluationTypePage } from '../pages/EvaluationTypePage';
import { HomePage } from '../pages/HomePage';
import { checkEvaluationTypeExists, deleteEvaluationType } from '../utils/mysqlUtils';
import { clearAllEluationTypes } from '../utils/mysqlUtils';

test.describe.serial('Evaluation Type Tests', () => {
    let loginPage: LoginPage;
    let shiftPlanPage: EvaluationTypePage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        shiftPlanPage = new EvaluationTypePage(page);
        homePage = new HomePage(page);

        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });
});