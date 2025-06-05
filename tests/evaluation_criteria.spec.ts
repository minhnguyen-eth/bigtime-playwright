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
        await evaluationCriteriaPage.clickEvaluationCriteria();
        // await evaluationCriteriaPage.clickAddButton();
        // await evaluationCriteriaPage.setEvaluationCriteriaName('Automation Test');
        // await evaluationCriteriaPage.setDescription('Automation Test Description');
        // await evaluationCriteriaPage.clickEvaluationCriteriaNameDropDown();
        // await evaluationCriteriaPage.clickEvaluationTypeOption();
        // await evaluationCriteriaPage.clickSave();
        // await evaluationCriteriaPage.verifyToastAddSuccessfull('Thêm thành công');

        // Search Evaluation Criteria
        await evaluationCriteriaPage.searchEvaluationCriteriaName('Automation Test');
        await evaluationCriteriaPage.clickSearchButton();
        await evaluationCriteriaPage.verifyResultSearchByName('Automation Test');
        await evaluationCriteriaPage.clickDeleteSearch();

        // Search Evaluation Criteria by status and locklock
        await evaluationCriteriaPage.clickStatusDropDown();
        await evaluationCriteriaPage.selectStatus('Hoạt động');
        await evaluationCriteriaPage.clickSearchButton();
        await evaluationCriteriaPage.clickDeleteSearch();

        await evaluationCriteriaPage.clickStatusDropDown();
        await evaluationCriteriaPage.selectStatus('Khóa');
        await evaluationCriteriaPage.clickSearchButton();
        await evaluationCriteriaPage.clickDeleteSearch();


        await evaluationCriteriaPage.clickStatusDropDown();
        await evaluationCriteriaPage.selectStatus('Hoạt động');
        await evaluationCriteriaPage.selectStatus('Khóa');
        await evaluationCriteriaPage.clickSearchButton();



        // Delete Evaluation Criteria
        await evaluationCriteriaPage.clickDelete();
        await evaluationCriteriaPage.clickOKButton();
        await evaluationCriteriaPage.verifyToastDeleteSuccessfull('Xóa thành công');


    });



    test('Edit Evaluation Criteria', async ({ page }) => {
        await homePage.clickAdmin();
        await evaluationCriteriaPage.clickEvaluationCriteria();
        await evaluationCriteriaPage.clickEditButton();
        await evaluationCriteriaPage.editEvaluationCriteriaName('Automation Test Edited');
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

    //=====Search==========

    test('Search Evaluation Criteria by Name', async ({ page }) => {
        await homePage.clickAdmin();
        await evaluationCriteriaPage.searchEvaluationCriteriaName('Automation Test');
        await evaluationCriteriaPage.clickSearchButton();
        await evaluationCriteriaPage.verifyResultSearchByName('Automation Test');
    });

    test('Search Evaluation Criteria by status', async ({ page }) => {
        await homePage.clickAdmin();
        await evaluationCriteriaPage.clickStatusDropDown();
        await evaluationCriteriaPage.selectStatus('Hoạt động');
        await evaluationCriteriaPage.clickSearchButton();
    });

});
