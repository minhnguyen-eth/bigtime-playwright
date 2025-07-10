import { test, expect, Page, TestInfo } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { takeScreenshotOnFailure } from "../../utils/screenshotUtils";
import Config from "../../utils/configUtils";
import { EvaluationProcessPage } from "../../pages/evaluation_page/EvaluationProcessPage";
import { ToastPage } from "../../pages/ToastPage";
import { clearAllEvaluationProgress } from '../../db/DBHelper';
import { allure } from "allure-playwright";
import { createCriteria } from "../evaluation/evaluation-helper";
import { BasePage } from "../../pages/BasePage";

test.describe.serial("Evaluation Criteria Tests", () => {

    let loginPage: LoginPage;
    let evaluationProcess: EvaluationProcessPage;
    let toast: ToastPage;
    let basePage: BasePage;

    const randomSuffix = Date.now();
    const random = `Automation test ${randomSuffix}`;

    test.beforeEach(async ({ page }) => {
        allure.feature("Evaluation Process Feature");
        allure.owner("Minh Nguyen");
        allure.severity("Critical");

        loginPage = new LoginPage(page);
        evaluationProcess = new EvaluationProcessPage(page);
        toast = new ToastPage(page);
        basePage = new BasePage(page);
        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test("Add a new evaluation process company form", async ({ page }) => {
        allure.story("Add Evaluation Process - Company Form");
        await allure.step("Clear data and add new company evaluation process", async () => {
            await clearAllEvaluationProgress();
            await basePage.clickAdmin();
            await evaluationProcess.clickEvaluationProcessButton();
            await basePage.clickAdd();
            await evaluationProcess.fillEmployeeEvaluationInput("Nguyễn Văn Minh");
            await evaluationProcess.clickEmployeeEvaluationOption();
            await evaluationProcess.clickEvaluationTypeDropDown();
            await evaluationProcess.clickEvaluationTypeOption1();
            await evaluationProcess.clickEndTime();
            await basePage.clickTodayDatePicker();
            await basePage.clickSave();
        });
        await toast.getToastAddSuccess();
    });

    test("Edit evaluation type", async ({ page }) => {
        allure.story("Edit Evaluation Type");
        await allure.step("Edit evaluation process type", async () => {
            await basePage.clickAdmin();
            await evaluationProcess.clickEvaluationProcessButton();
            await evaluationProcess.clickIconAction();
            await basePage.clickEdit();
            await evaluationProcess.clickEvaluationTypeDropDown();
            await evaluationProcess.clickEvaluationTypeOption2();
            await basePage.clickSave();
        });
        await toast.getToastUpdateSuccess();
    });

    test("Delete evaluation type", async ({ page }) => {
        allure.story("Delete Evaluation Process");
        await allure.step("Delete evaluation process", async () => {
            await basePage.clickAdmin();
            await evaluationProcess.clickEvaluationProcessButton();
            await evaluationProcess.clickIconAction();
            await basePage.clickDelete();
        });
        await toast.getToastDeleteSuccess();
    });

    test("Add a new evaluation process department form", async ({ page }) => {
        allure.story("Add Evaluation Process - Department Form");
        await allure.step("Add new department evaluation process", async () => {
            await basePage.clickAdmin();
            await evaluationProcess.clickEvaluationProcessButton();
            await basePage.clickAdd();
            await evaluationProcess.fillEmployeeEvaluationInput("Nguyễn Văn Minh");
            await evaluationProcess.clickEmployeeEvaluationOption();
            await evaluationProcess.clickEvaluationTypeDropDown();
            await evaluationProcess.clickEvaluationTypeOption1();
            await evaluationProcess.clickEndTime();
            await basePage.clickTodayDatePicker();
            await evaluationProcess.clickEvaluationForm();
            await evaluationProcess.clickDepartmentForm();
            await basePage.clickSave();
        });
        await toast.getToastAddSuccess();
    });

    test("Confirm evaluation type", async ({ page }) => {
        allure.story("Confirm Evaluation Process");
        await allure.step("Confirm evaluation process", async () => {
            await basePage.clickAdmin();
            await evaluationProcess.clickEvaluationProcessButton();
            await evaluationProcess.clickIconAction();
            await basePage.clickConfirm();
        });
        await toast.getToastConfirmSuccess();
    });

    test("Evaluation employee", async ({ page }) => {
        allure.story("Employee Evaluation");
        await allure.step("Employee performs evaluation", async () => {
            await createCriteria(page);
            await basePage.clickAdmin();
            await evaluationProcess.clickListEvaluationButton();
            await evaluationProcess.getWaitEvaluationStatus();
            await evaluationProcess.clickEvaluationButton();
            await basePage.clickSave();
            await basePage.clickYes();
        });
        await toast.getToastEvaluationSuccess();
    });
});