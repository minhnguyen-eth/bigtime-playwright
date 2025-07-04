import { test, expect, Page, TestInfo } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { takeScreenshotOnFailure } from "../../utils/screenshotUtils";
import Config from "../../utils/configUtils";
import { EvaluationCriteriaPage } from "../../pages/evaluation_page/EvaluationCriteriaPage";
import { clearAllEvaluationCriterias } from "../../utils/mysqlUtils";
import { allure } from "allure-playwright";
import { BasePage } from "../../pages/BasePage";

test.describe.serial("Evaluation Criteria Tests", () => {
    let loginPage: LoginPage;
    let evaluationCriteriaPage: EvaluationCriteriaPage;
    let basePage: BasePage;

    test.beforeEach(async ({ page }) => {
        allure.owner("Minh Nguyen");
        allure.feature("Evaluation Criteria Feature");
        allure.severity("Critical");

        loginPage = new LoginPage(page);
        evaluationCriteriaPage = new EvaluationCriteriaPage(page);
        basePage = new BasePage(page);
        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test("Create Criteria without any field", async ({ page }) => {
        allure.story("Validation on Create Criteria");
        await clearAllEvaluationCriterias();
        await basePage.clickAdmin();
        await evaluationCriteriaPage.clickEvaluationCriteria();
        await basePage.clickAdd();
        await basePage.clickSave();
        await evaluationCriteriaPage.getRequiredEvaluationTypeName();
        await evaluationCriteriaPage.getRequiredCriteriaName();
    });

    test("Create with lock status", async ({ page }) => {
        allure.story("Create Criteria with Lock Status");
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const EvaluationCriteriaNameRandom = `Automation test ${randomSuffix}`;
        await basePage.clickAdmin();
        await evaluationCriteriaPage.clickEvaluationCriteria();
        await basePage.clickAdd();
        await evaluationCriteriaPage.setEvaluationCriteriaName(EvaluationCriteriaNameRandom);
        await evaluationCriteriaPage.setDescription("Automation Test Description");
        await evaluationCriteriaPage.clickEvaluationCriteriaNameDropDown();
        await evaluationCriteriaPage.clickEvaluationTypeOption();
        await evaluationCriteriaPage.clickStatusDropDown();
        await evaluationCriteriaPage.clickLockStatus();
        await basePage.clickSave();
        await evaluationCriteriaPage.verifyToastAddSuccessfull("Thêm thành công");
        await evaluationCriteriaPage.getVerifyLockStatus();
    });

    test("Create criteria with activity status", async ({ page }) => {
        allure.story("Create Criteria with Activity Status");
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const EvaluationCriteriaNameRandom = `Automation test ${randomSuffix}`;
        await basePage.clickAdmin();
        await evaluationCriteriaPage.clickEvaluationCriteria();
        await basePage.clickAdd();
        await evaluationCriteriaPage.clickCancelAddButton();
        await evaluationCriteriaPage.clickAddButton();
        await evaluationCriteriaPage.setEvaluationCriteriaName(EvaluationCriteriaNameRandom);
        await evaluationCriteriaPage.setDescription("Automation Test Description");
        await evaluationCriteriaPage.clickEvaluationCriteriaNameDropDown();
        await evaluationCriteriaPage.clickEvaluationTypeOption();
        await basePage.clickSave();
        await evaluationCriteriaPage.verifyToastAddSuccessfull("Thêm thành công");
    });

    test("Search Evaluation Criteria by status", async ({ page }) => {
        allure.story("Search Criteria by Name and Status");
        await basePage.clickAdmin();
        await evaluationCriteriaPage.clickEvaluationCriteria();
        await evaluationCriteriaPage.searchEvaluationCriteriaName("Automation Test");
        await evaluationCriteriaPage.clickSearchButton();
        await evaluationCriteriaPage.verifyResultSearchByName();
        await evaluationCriteriaPage.clickDeleteSearch();

        await evaluationCriteriaPage.clickStatusDropDownSearch();
        await evaluationCriteriaPage.selectStatus("Hoạt động");
        await evaluationCriteriaPage.clickSearchButton();
        await evaluationCriteriaPage.getVerifyActivityStatus();
        await evaluationCriteriaPage.clickDeleteSearch();

        await evaluationCriteriaPage.clickStatusDropDownSearch();
        await evaluationCriteriaPage.selectStatus("Khóa");
        await evaluationCriteriaPage.clickSearchButton();
        await evaluationCriteriaPage.getVerifyLockStatusSearch();
        await evaluationCriteriaPage.clickDeleteSearch();

        await evaluationCriteriaPage.clickStatusDropDownSearch();
        await evaluationCriteriaPage.selectStatus("Hoạt động");
        await evaluationCriteriaPage.selectStatus("Khóa");
        await evaluationCriteriaPage.clickSearchButton();
        await evaluationCriteriaPage.getVerifyActivityStatus();
        await evaluationCriteriaPage.getVerifyLockStatusSearch();
    });

    test("Edit Evaluation Criteria", async ({ page }) => {
        allure.story("Edit Evaluation Criteria");
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const EvaluationCriteriaNameEdited = `Automation test edited ${randomSuffix}`;
        await basePage.clickAdmin();
        await evaluationCriteriaPage.clickEvaluationCriteria();
        await basePage.clickEditRow0();
        await evaluationCriteriaPage.editEvaluationCriteriaName(EvaluationCriteriaNameEdited);
        await evaluationCriteriaPage.editDescription("Automation Test Description Edited");
        await basePage.clickSave();
        await evaluationCriteriaPage.verifyToastEditSuccessfull("Cập nhật thành công");

        await basePage.clickEditRow0();
        await evaluationCriteriaPage.clickStatusDropDown();
        await evaluationCriteriaPage.clickLockStatus();
        await basePage.clickSave();
        await evaluationCriteriaPage.verifyToastEditSuccessfull("Cập nhật thành công");
        await evaluationCriteriaPage.getVerifyLockStatus();

        await basePage.clickEditRow0();
        await evaluationCriteriaPage.clickStatusDropDown();
        await evaluationCriteriaPage.selectStatus("Hoạt động");
        await basePage.clickSave();
        await evaluationCriteriaPage.getVerifyActivityStatus();
    });

    test("Delete Evaluation Criteria", async ({ page }) => {
        allure.story("Delete Evaluation Criteria");
        await basePage.clickAdmin();
        await evaluationCriteriaPage.clickEvaluationCriteria();
        await basePage.clickDeleteRow0();
        await evaluationCriteriaPage.verifyToastDeleteSuccessfull("Xóa thành công");
    });
});
