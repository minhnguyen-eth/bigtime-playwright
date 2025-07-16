import { test, } from '../base-test';
import { LoginPage } from "../../pages/LoginPage";
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

    async function addEvaluationProcessDepartmentForm() {
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
    }

    test("Add a new evaluation process department form", async ({ page }) => {
        allure.story("Add Evaluation Process - Department Form");
        await addEvaluationProcessDepartmentForm();
        await toast.getToastAddSuccess();
    });

    test('Add duplicate evaluation process', async ({ page }) => {
        allure.story("Add Duplicate Evaluation Process");
        await addEvaluationProcessDepartmentForm();
        await toast.getToastAddFailed();
        await evaluationProcess.getValidateDuplicateEvaluation();
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
            await basePage.clickAdmin();
            await evaluationProcess.clickListEvaluationButton();
            await evaluationProcess.fillListEvaluationSearchByName('Nguyễn Văn Minh');
            await basePage.clickSearch();
            await evaluationProcess.clickEvaluationButton();
            await basePage.clickSave();
            await basePage.clickYes();
        });
        await toast.getToastEvaluationSuccess();
    });

    async function cancelEvalaution() {
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
        await evaluationProcess.clickIconAction();
        await basePage.clickConfirm();
        await evaluationProcess.clickIconAction();
        await basePage.clickCancel();
        await basePage.fillReason('Cancel evaluation');
        await toast.getToastCancelledSuccess();
    }

    test('Cancel evaluation', async ({ page }) => {
        await clearAllEvaluationProgress();
        allure.story("Cancel Evaluation");
        await allure.step("Cancel evaluation", async () => {
            await cancelEvalaution();
        });
    });

    test('Add after cancel evaluation', async ({ page }) => {
        allure.story("Add evaluation after cancel");
        await allure.step("Add evaluation after cancel", async () => {
            await addEvaluationProcessDepartmentForm();
        });
        await toast.getToastAddSuccess();
    });

    test('Search by status', async ({ page }) => {
        await clearAllEvaluationProgress();

        await allure.step("Search by new status", async () => {
            // Search by new status
            await basePage.clickAdmin();
            await evaluationProcess.clickEvaluationProcessButton();
            await evaluationProcess.clickSeachByStatusComboBox();
            await evaluationProcess.clickNewStatusOption();
            await basePage.clickSearch();

            // verify search result
            await evaluationProcess.expectNewStatusOption();
            await basePage.clickClearSearch();
        });

        await allure.step("Search by wait for evaluation status", async () => {
            // Search by pending status
            await evaluationProcess.clickSeachByStatusComboBox();
            await evaluationProcess.clickwaitForEvaluationOption();
            await basePage.clickSearch();

            // verify search result
            await evaluationProcess.expectwaitForEvaluationStatus();
            await basePage.clickClearSearch();
        });

        await allure.step("Search by cancel status", async () => {
            // Search by cancel status
            await evaluationProcess.clickSeachByStatusComboBox();
            await evaluationProcess.clickCancelStatusOption();
            await basePage.clickSearch();

            // verify search result
            await evaluationProcess.expectCancelStatusOption();
            await basePage.clickClearSearch();
        });

        await allure.step("Search by complete status", async () => {
            // Search by complete status
            await evaluationProcess.clickSeachByStatusComboBox();
            await evaluationProcess.clickCompleteStatusOption();
            await basePage.clickSearch();

            // verify search result
            await evaluationProcess.expectCompleteStatusOption();
            await basePage.clickClearSearch();
        });

        await allure.step("Search by wait for approval status", async () => {
            // Search by wait for approval status
            await evaluationProcess.clickSeachByStatusComboBox();
            await evaluationProcess.clickwaitForApprovalOption();
            await basePage.clickSearch();

            // verify search result
            await evaluationProcess.expectwaitForApprovalStatus();
            await basePage.clickClearSearch();
        });
    });

    test('Search by employee name', async ({ page }) => {
        await basePage.clickAdmin();
        await evaluationProcess.clickEvaluationProcessButton();
        await evaluationProcess.fillSearchByEmployeeNameInput('Big app');
        await basePage.clickSearch();
        await evaluationProcess.expectSearchByEmployeeName();
    });

    test('Search by evaluation type', async ({ page }) => {
        await basePage.clickAdmin();
        await evaluationProcess.clickEvaluationProcessButton();
        await evaluationProcess.fillSearchByEvaluationTypeInput('Đánh giá nhân viên');
        await basePage.clickSearch();
        await evaluationProcess.expectSearchByEvaluationType();
    });

    test('List evaluation - Search by status', async ({ page }) => {
        await allure.step("Search by new status", async () => {
            // Search by new status
            await basePage.clickAdmin();
            await evaluationProcess.clickListEvaluationButton();
            await evaluationProcess.clickSeachByStatusComboBox();
            await evaluationProcess.clickNewStatusOption();
            await basePage.clickSearch();

            // verify search result
            await evaluationProcess.expectListEvaluationVerifyNewStatus();

        });

        await allure.step("Search by wait for evaluation status", async () => {
            // Search by pending status
            await evaluationProcess.clickSeachByStatusComboBox();
            await evaluationProcess.clickwaitForEvaluationOption();
            await basePage.clickSearch();

            // verify search result
            await evaluationProcess.expectListEvaluationVerifywaitForEvaluationStatus();

        });

        await allure.step("Search by cancel status", async () => {
            // Search by cancel status
            await evaluationProcess.clickSeachByStatusComboBox();
            await evaluationProcess.clickCancelStatusOption();
            await basePage.clickSearch();

            // verify search result
            await evaluationProcess.expectListEvaluationVerifyCancelStatus();

        });

        await allure.step("Search by complete status", async () => {
            // Search by complete status
            await evaluationProcess.clickSeachByStatusComboBox();
            await evaluationProcess.clickCompleteStatusOption();
            await basePage.clickSearch();

            // verify search result
            await evaluationProcess.expectListEvaluationVerifyCompleteStatus();

        });

        await allure.step("Search by wait for approval status", async () => {
            // Search by wait for approval status
            await evaluationProcess.clickSeachByStatusComboBox();
            await evaluationProcess.clickwaitForApprovalOption();
            await basePage.clickSearch();

            // verify search result
            await evaluationProcess.expectListEvaluationVerifywaitForApprovalStatus();

        });
    });
});