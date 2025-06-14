import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { takeScreenshotOnFailure } from '../../utils/screenshotUtils';
import Config from '../../utils/configUtils';
import { HomePage } from '../../pages/HomePage';
import { EvaluationProcessPage } from '../../pages/EvaluationProcessPage';
import { ToastPage } from '../../pages/ToastPage';
import { clearAllEvaluationProgress } from '../../utils/mysqlUtils';
import { allure } from 'allure-playwright';
import { createCriteria } from '../evaluation/evaluation_helper';

test.describe.serial('Evaluation Criteria Tests', () => {
    let loginPage: LoginPage;
    let evaluationProcess: EvaluationProcessPage;
    let homePage: HomePage;
    let toast: ToastPage

    const randomSuffix = Date.now();
    const random = `Automation test ${randomSuffix}`;

    test.beforeEach(async ({ page }) => {
        allure.owner('Minh Nguyen');
        allure.feature('Evaluation Process Feature');
        allure.severity('Critical');
        loginPage = new LoginPage(page);
        evaluationProcess = new EvaluationProcessPage(page);
        homePage = new HomePage(page);
        toast = new ToastPage(page);
        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('Add a new evaluation process company form', async ({ page }) => {
        await clearAllEvaluationProgress();
        await homePage.clickAdmin();
        await evaluationProcess.clickEvaluationProcessButton();
        await evaluationProcess.clickAddButton();
        await evaluationProcess.clickCancelButton();
        await evaluationProcess.clickCancelButton();
        await evaluationProcess.clickAddButton();
        await evaluationProcess.fillEmployeeEvaluationInput('Nguyễn Văn Minh');
        await evaluationProcess.clickEmployeeEvaluationOption();
        await evaluationProcess.clickEvaluationTypeDropDown();
        await evaluationProcess.clickEvaluationTypeOption1();
        await evaluationProcess.clickStartTime();
        await evaluationProcess.clickChosseButton();
        await evaluationProcess.clickEndTime();
        await evaluationProcess.clickToDay();
        await evaluationProcess.clickChosseButton();
        await evaluationProcess.clickSaveButton();
        await toast.getToastAddSuccess();
    });

    test(' Edit evaluation type', async ({ page }) => {
        await homePage.clickAdmin();
        await evaluationProcess.clickEvaluationProcessButton();
        await evaluationProcess.clickIconAction();
        await evaluationProcess.clickEditButton();
        await evaluationProcess.clickCancelButton();
        await evaluationProcess.clickIconAction();
        await evaluationProcess.clickEditButton();
        await evaluationProcess.clickEvaluationTypeDropDown();
        await evaluationProcess.clickEvaluationTypeOption2();
        await evaluationProcess.clickSaveButton();
        await toast.getToastUpdateSuccess();
    });

    test('Delete evaluation type', async ({ page }) => {
        await homePage.clickAdmin();
        await evaluationProcess.clickEvaluationProcessButton();
        await evaluationProcess.clickIconAction();
        await evaluationProcess.clickDeleteButton();
        await evaluationProcess.clickYesButton();
        await toast.getToastDeleteSuccess();
    });


    test('Add a new evaluation process department form', async ({ page }) => {
        await homePage.clickAdmin();
        await evaluationProcess.clickEvaluationProcessButton();
        await evaluationProcess.clickAddButton();
        await evaluationProcess.clickCancelButton();
        await evaluationProcess.clickCancelButton();
        await evaluationProcess.clickAddButton();
        await evaluationProcess.fillEmployeeEvaluationInput('Nguyễn Văn Minh');
        await evaluationProcess.clickEmployeeEvaluationOption();
        await evaluationProcess.clickEvaluationTypeDropDown();
        await evaluationProcess.clickEvaluationTypeOption1();
        await evaluationProcess.clickStartTime();
        await evaluationProcess.clickChosseButton();
        await evaluationProcess.clickEndTime();
        await evaluationProcess.clickToDay();
        await evaluationProcess.clickChosseButton();
        await evaluationProcess.clickEvaluationForm();
        await evaluationProcess.clickDepartmentForm();
        await evaluationProcess.clickSaveButton();
        await toast.getToastAddSuccess();
    });

    test('Confirm evaluation type', async ({ page }) => {
        await homePage.clickAdmin();
        await evaluationProcess.clickEvaluationProcessButton();
        await evaluationProcess.clickIconAction();
        await evaluationProcess.clickConfirmButton();
        await evaluationProcess.clickYesButton();
        await toast.getToastConfirmSuccess();
    });


    test('Evaluation employee', async ({ page }) => {
        await createCriteria(page);
        await homePage.clickAdmin();
        await evaluationProcess.clickListEvaluationButton();
        await evaluationProcess.getWaitEvaluationStatus();
        await evaluationProcess.clickEvaluationButton();
        await evaluationProcess.clickSaveButton();
        await evaluationProcess.clickYesButton();
        await toast.getToastEvaluationSuccess();

    });


});