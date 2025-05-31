import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { takeScreenshotOnFailure } from '../utils/screenshotUtils';
import Config from '../utils/configUtils';
import { EvaluationTypePage } from '../pages/EvaluationTypePage';
import { HomePage } from '../pages/HomePage';
import { checkEvaluationTypeExists, deleteEvaluationType } from '../utils/mysqlUtils';
import { clearAllEluationTypes } from '../utils/mysqlUtils';
import { EvaluationCriteriaPage } from '../pages/EvaluationCriteriaPage';

test.describe.serial('Evaluation Type Tests', () => {
    let loginPage: LoginPage;
    let evaluationCriteriaPage: EvaluationCriteriaPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        evaluationCriteriaPage = new EvaluationCriteriaPage(page);
        homePage = new HomePage(page);

        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test.only('Create, Edit, Delete Evaluation Criteria', async ({ page }) => {

        // Create Evaluation Criteria
        await homePage.clickAdmin();
        await evaluationCriteriaPage.clickEvaluationType();
        await evaluationCriteriaPage.clickAddButton();
        await evaluationCriteriaPage.setEvaluationCriteriaName('Automation Test');
        await evaluationCriteriaPage.setDescription('Automation Test Description');
        await evaluationCriteriaPage.clickEvaluationCriteriaNameDropDown();
        await evaluationCriteriaPage.clickEvaluationTypeOption();
        await evaluationCriteriaPage.clickSave();
        await evaluationCriteriaPage.verifyToastAddSuccessfull('Thêm thành công');

        // Edit Evaluation Criteria
        await evaluationCriteriaPage.clickEditButton();
        await evaluationCriteriaPage.editEvaluationCriteriaName('Automation Test Edited');
        await evaluationCriteriaPage.editDescription('Automation Test Description Edited');
        await evaluationCriteriaPage.clickSave();
        await evaluationCriteriaPage.verifyToastEditSuccessfull('Cập nhật thành công');

        // Delete Evaluation Criteria
        await evaluationCriteriaPage.clickDelete();
        await evaluationCriteriaPage.clickOKButton();
        await evaluationCriteriaPage.verifyToastDeleteSuccessfull('Xóa thành công');

    });

    test('Edit Evaluation Criteria', async ({ page }) => {
        await homePage.clickAdmin();
        await evaluationCriteriaPage.clickEvaluationType();
        await evaluationCriteriaPage.clickEditButton();
        await evaluationCriteriaPage.editEvaluationCriteriaName('Automation Test Edited');
        await evaluationCriteriaPage.editDescription('Automation Test Description Edited');
        await evaluationCriteriaPage.clickSave();
        await evaluationCriteriaPage.verifyToastEditSuccessfull('Cập nhật thành công');


    });

    test('Delete Evaluation Criteria', async ({ page }) => {
        await homePage.clickAdmin();
        await evaluationCriteriaPage.clickEvaluationType();
        await evaluationCriteriaPage.clickDelete();
        await evaluationCriteriaPage.clickOKButton();
        await evaluationCriteriaPage.verifyToastDeleteSuccessfull('Xóa thành công');
    });

    //=====Search==========


});
