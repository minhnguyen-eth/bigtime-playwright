import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { takeScreenshotOnFailure } from '../utils/screenshotUtils';
import Config from '../utils/configUtils';
import { HomePage } from '../pages/HomePage';
import { EvaluationCriteriaPage } from '../pages/EvaluationCriteriaPage';

test.describe.serial('Evaluation Criteria Tests', () => {
    let loginPage: LoginPage;
    let evaluationCriteriaPage: EvaluationCriteriaPage;
    let homePage: HomePage;

    const randomSuffix = Date.now();
    const EvaluationCriteriaNameRandom = `Automation test ${randomSuffix}`;
    const EvaluationCriteriaNameEdited = `Automation test Edited ${randomSuffix}`;

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

    test('Create Criteria', async ({ page }) => {
        await homePage.clickAdmin();
        await evaluationCriteriaPage.clickEvaluationCriteria();
        await evaluationCriteriaPage.clickAddButton();
        await evaluationCriteriaPage.clickCancelAddButton();
        await evaluationCriteriaPage.clickAddButton();
        await evaluationCriteriaPage.setEvaluationCriteriaName(EvaluationCriteriaNameRandom);
        await evaluationCriteriaPage.setDescription('Automation Test Description');
        await evaluationCriteriaPage.clickEvaluationCriteriaNameDropDown();
        await evaluationCriteriaPage.clickEvaluationTypeOption();
        await evaluationCriteriaPage.clickSave();
        await evaluationCriteriaPage.verifyToastAddSuccessfull('Thêm thành công');

    });

    //=====Search==========
    test('Search Evaluation Criteria by status', async ({ page }) => {
        await homePage.clickAdmin();
        await evaluationCriteriaPage.clickEvaluationCriteria();

        // Search by name 
        await evaluationCriteriaPage.searchEvaluationCriteriaName('Automation Test');
        await evaluationCriteriaPage.clickSearchButton();
        await evaluationCriteriaPage.verifyResultSearchByName();
        await evaluationCriteriaPage.clickDeleteSearch();

        // Search Evaluation Criteria by status and locklock
        await evaluationCriteriaPage.clickStatusDropDown();
        await evaluationCriteriaPage.selectStatus('Hoạt động');
        await evaluationCriteriaPage.clickSearchButton();
        await evaluationCriteriaPage.getVerifyActivityStatus();
        await evaluationCriteriaPage.clickDeleteSearch();

        await evaluationCriteriaPage.clickStatusDropDown();
        await evaluationCriteriaPage.selectStatus('Khóa');
        await evaluationCriteriaPage.clickSearchButton();
        await evaluationCriteriaPage.getVerifyLockStatusSearch();
        await evaluationCriteriaPage.clickDeleteSearch();

        await evaluationCriteriaPage.clickStatusDropDown();
        await evaluationCriteriaPage.selectStatus('Hoạt động');
        await evaluationCriteriaPage.selectStatus('Khóa');
        await evaluationCriteriaPage.clickSearchButton();
        await evaluationCriteriaPage.getVerifyActivityStatus();
        await evaluationCriteriaPage.getVerifyLockStatusSearch();

    });

    test('Edit Evaluation Criteria', async ({ page }) => {
        await homePage.clickAdmin();
        await evaluationCriteriaPage.clickEvaluationCriteria();
        await evaluationCriteriaPage.clickEditButton();
        await evaluationCriteriaPage.editEvaluationCriteriaName(EvaluationCriteriaNameEdited);
        await evaluationCriteriaPage.editDescription('Automation Test Description Edited');
        await evaluationCriteriaPage.clickSave();
        await evaluationCriteriaPage.verifyToastEditSuccessfull('Cập nhật thành công');
    });

    test('Delete Evaluation Criteria', async ({ page }) => {
        await homePage.clickAdmin();
        await evaluationCriteriaPage.clickEvaluationCriteria();
        await evaluationCriteriaPage.clickDelete();
        await evaluationCriteriaPage.clickOKButton();
        await evaluationCriteriaPage.verifyToastDeleteSuccessfull('Xóa thành công');
    });

});
