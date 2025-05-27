import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { takeScreenshotOnFailure } from '../utils/screenshotUtils';
import Config from '../utils/configUtils';
import { EvaluationTypePage } from '../pages/EvaluationTypePage';
import { HomePage } from '../pages/HomePage';
import { checkEvaluationTypeExists } from '../utils/mysqlUtils';

test.describe('Evaluation Type Tests', () => {
    let loginPage: LoginPage;
    let evaluationtype: EvaluationTypePage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        evaluationtype = new EvaluationTypePage(page);
        homePage = new HomePage(page);

        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('Add Evaluation Type', async ({ page }) => {
        const randomSuffix = Date.now(); // Hoặc dùng Math.random().toString(36).substring(2, 8)
        const evaluationName = `Automation test ${randomSuffix}`;

        await homePage.clickAdmin();
        await evaluationtype.clickEvaluationType();
        await evaluationtype.clickAdd();
        await evaluationtype.setEvaluationTypeName(evaluationName);
        await evaluationtype.clickSave();
        await evaluationtype.expectMessageSuccess();

        // Kiểm tra trong database
        const existsInDB = await checkEvaluationTypeExists(evaluationName);
        expect(existsInDB).toBeTruthy();
    });

    // Search Evaluation Type
    test('Search Evaluation Type', async ({ page }) => {
        await homePage.clickAdmin();
        await evaluationtype.clickEvaluationType();
        await evaluationtype.setSerachEvaluationTypeName("Đánh giá chuyên cần");
        await evaluationtype.clickSearchButton();
        await evaluationtype.expectSearchEvaluationTypeName("Đánh giá chuyên cần");
    });

});
