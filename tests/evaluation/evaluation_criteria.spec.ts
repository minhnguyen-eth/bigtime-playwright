import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { takeScreenshotOnFailure } from '../../utils/screenshotUtils';
import Config from '../../utils/configUtils';
import { HomePage } from '../../pages/HomePage';
import { EvaluationCriteriaPage } from '../../pages/evaluation_page/EvaluationCriteriaPage';

import { clearAllEvaluationCriterias } from '../../utils/mysqlUtils';
import { allure } from 'allure-playwright';

test.describe.serial('Evaluation Criteria Tests', () => {
    let loginPage: LoginPage;
    let evaluationCriteriaPage: EvaluationCriteriaPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        allure.owner('Minh Nguyen');
        allure.feature('Evaluation Critera Feature');
        allure.severity('Critical');
        loginPage = new LoginPage(page);
        evaluationCriteriaPage = new EvaluationCriteriaPage(page);
        homePage = new HomePage(page);
        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    // ======Create========

    test('Create  Criteria without any field', async ({ page }) => {
        await clearAllEvaluationCriterias();
        await homePage.clickAdmin();
        await evaluationCriteriaPage.clickEvaluationCriteria();
        await evaluationCriteriaPage.clickAddButton();
        await evaluationCriteriaPage.clickSave();
        await evaluationCriteriaPage.getRequiredEvaluationTypeName();
        await evaluationCriteriaPage.getRequiredCriteriaName();
    });

    test('Create with lock status', async ({ page }) => {
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const EvaluationCriteriaNameRandom = `Automation test ${randomSuffix}`;
        await homePage.clickAdmin();
        await evaluationCriteriaPage.clickEvaluationCriteria();
        await evaluationCriteriaPage.clickAddButton();
        await evaluationCriteriaPage.clickCancelAddButton();
        await evaluationCriteriaPage.clickAddButton();
        await evaluationCriteriaPage.setEvaluationCriteriaName(EvaluationCriteriaNameRandom);
        await evaluationCriteriaPage.setDescription('Automation Test Description');
        await evaluationCriteriaPage.clickEvaluationCriteriaNameDropDown();
        await evaluationCriteriaPage.clickEvaluationTypeOption();
        await evaluationCriteriaPage.clickStatusDropDown();
        await evaluationCriteriaPage.clickLockStatus();
        await evaluationCriteriaPage.clickSave();
        await evaluationCriteriaPage.verifyToastAddSuccessfull('Thêm thành công');
        await evaluationCriteriaPage.getVerifyLockStatus();
    });

    test('Create criteria with activity status', async ({ page }) => {
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const EvaluationCriteriaNameRandom = `Automation test ${randomSuffix}`;
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
        await evaluationCriteriaPage.clickStatusDropDownSearch();
        await evaluationCriteriaPage.selectStatus('Hoạt động');
        await evaluationCriteriaPage.clickSearchButton();
        await evaluationCriteriaPage.getVerifyActivityStatus();
        await evaluationCriteriaPage.clickDeleteSearch();

        await evaluationCriteriaPage.clickStatusDropDownSearch();
        await evaluationCriteriaPage.selectStatus('Khóa');
        await evaluationCriteriaPage.clickSearchButton();
        await evaluationCriteriaPage.getVerifyLockStatusSearch();
        await evaluationCriteriaPage.clickDeleteSearch();

        await evaluationCriteriaPage.clickStatusDropDownSearch();
        await evaluationCriteriaPage.selectStatus('Hoạt động');
        await evaluationCriteriaPage.selectStatus('Khóa');
        await evaluationCriteriaPage.clickSearchButton();
        await evaluationCriteriaPage.getVerifyActivityStatus();
        await evaluationCriteriaPage.getVerifyLockStatusSearch();

    });

    test('Edit Evaluation Criteria', async ({ page }) => {
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const EvaluationCriteriaNameEdited = `Automation test edited ${randomSuffix}`;
        await homePage.clickAdmin();
        await evaluationCriteriaPage.clickEvaluationCriteria();
        await evaluationCriteriaPage.clickEditButton();
        await evaluationCriteriaPage.editEvaluationCriteriaName(EvaluationCriteriaNameEdited);
        await evaluationCriteriaPage.editDescription('Automation Test Description Edited');
        await evaluationCriteriaPage.clickSave();
        await evaluationCriteriaPage.verifyToastEditSuccessfull('Cập nhật thành công');

        await evaluationCriteriaPage.clickEditButton();
        await evaluationCriteriaPage.clickStatusDropDown();
        await evaluationCriteriaPage.clickLockStatus();
        await evaluationCriteriaPage.clickSave();
        await evaluationCriteriaPage.verifyToastEditSuccessfull('Cập nhật thành công');
        await evaluationCriteriaPage.getVerifyLockStatus();

        await evaluationCriteriaPage.clickEditButton();
        await evaluationCriteriaPage.clickStatusDropDown();
        await evaluationCriteriaPage.selectStatus('Hoạt động');
        await evaluationCriteriaPage.clickSave();
        await evaluationCriteriaPage.getVerifyActivityStatus();


    });

    test('Delete Evaluation Criteria', async ({ page }) => {
        await homePage.clickAdmin();
        await evaluationCriteriaPage.clickEvaluationCriteria();
        await evaluationCriteriaPage.clickDelete();
        await evaluationCriteriaPage.clickOKButton();
        await evaluationCriteriaPage.verifyToastDeleteSuccessfull('Xóa thành công');
    });

});
