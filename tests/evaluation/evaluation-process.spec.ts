import { test, } from '../base-test';
import { LoginPage } from "../../pages/LoginPage";
import Config from "../../utils/configUtils";
import { EvaluationProcessPage } from "../../pages/evaluation_page/EvaluationProcessPage";
import { ToastPage } from "../../pages/ToastPage";
import { clearEvaluationProgress } from '../../db/helpers/DBHelper';
import { allure } from "allure-playwright";
import { createCriteria } from "../evaluation/evaluation-helper";
import { ValidationPage } from "../../pages/ValidationPage";

test.describe.serial("Evaluation Criteria Tests", () => {

    let loginPage: LoginPage;
    let evaluationProcess: EvaluationProcessPage;
    let toast: ToastPage;
    let validation: ValidationPage;
    
    const randomSuffix = Date.now();
    const random = `Automation test ${randomSuffix}`;

    test.beforeEach(async ({ page }) => {
        allure.feature("Evaluation Process Feature");
        allure.owner("Minh Nguyen");
        allure.severity("Critical");

        loginPage = new LoginPage(page);
        evaluationProcess = new EvaluationProcessPage(page);
        toast = new ToastPage(page);
        validation = new ValidationPage(page);
        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
    }); 

    test("Add a new evaluation process company form", async ({ page }) => {
        allure.story("Add Evaluation Process - Company Form");
        await allure.step("Clear data and add new company evaluation process", async () => {
            await clearEvaluationProgress();
            await evaluationProcess.clickAdmin();
            await evaluationProcess.clickEvaluationProcessButton();
            await evaluationProcess.clickAdd();
            await evaluationProcess.fillEmployeeEvaluationInput("Nguyễn Văn Minh");
            await evaluationProcess.clickEmployeeEvaluationOption();
            await evaluationProcess.clickEvaluationTypeDropDown();
            await evaluationProcess.clickEvaluationTypeOption1();
            await evaluationProcess.clickEndTime();
            await evaluationProcess.clickTodayDatePicker();
            await evaluationProcess.clickSave();
        });
        await toast.getToastAddSuccess();
    });

    test("Edit evaluation type", async ({ page }) => {
        allure.story("Edit Evaluation Type");
        await allure.step("Edit evaluation process type", async () => {
            await evaluationProcess.clickAdmin();
            await evaluationProcess.clickEvaluationProcessButton();
            await evaluationProcess.clickIconAction();
            await evaluationProcess.clickEdit();
            await evaluationProcess.clickEvaluationTypeDropDown();
            await evaluationProcess.clickEvaluationTypeOption2();
            await evaluationProcess.clickSave();
        });
        await toast.getToastUpdateSuccess();
    });

    test("Delete evaluation type", async ({ page }) => {
        allure.story("Delete Evaluation Process");
        await allure.step("Delete evaluation process", async () => {
            await evaluationProcess.clickAdmin();
            await evaluationProcess.clickEvaluationProcessButton();
            await evaluationProcess.clickIconAction();
            await evaluationProcess.clickDelete();
        });
        await toast.getToastDeleteSuccess();
    });

    async function addEvaluationProcessDepartmentForm() {
        await evaluationProcess.clickAdmin();
        await evaluationProcess.clickEvaluationProcessButton();
        await evaluationProcess.clickAdd();
        await evaluationProcess.fillEmployeeEvaluationInput("Nguyễn Văn Minh");
        await evaluationProcess.clickEmployeeEvaluationOption();
        await evaluationProcess.clickEvaluationTypeDropDown();
        await evaluationProcess.clickEvaluationTypeOption1();
        await evaluationProcess.clickEndTime();
        await evaluationProcess.clickTodayDatePicker();
        await evaluationProcess.clickEvaluationForm();
        await evaluationProcess.clickDepartmentForm();
        await evaluationProcess.clickSave();
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
            await evaluationProcess.clickAdmin();
            await evaluationProcess.clickEvaluationProcessButton();
            await evaluationProcess.clickIconAction();
            await evaluationProcess.clickConfirm();
        });
        await toast.getToastConfirmSuccess();
    });

    test("Evaluation employee", async ({ page }) => {
        allure.story("Employee Evaluation");
        await allure.step("Employee performs evaluation", async () => {
            await evaluationProcess.clickAdmin();
            await evaluationProcess.clickListEvaluationButton();
            await evaluationProcess.fillListEvaluationSearchByName('Nguyễn Văn Minh');
            await evaluationProcess.clickSearch();
            await evaluationProcess.clickEvaluationButton();
            await evaluationProcess.clickSave();
            await evaluationProcess.clickYes();
        });
        await toast.getToastEvaluationSuccess();
    });

    async function cancelEvalaution() {
        await evaluationProcess.clickAdmin();
        await evaluationProcess.clickEvaluationProcessButton();
        await evaluationProcess.clickAdd();
        await evaluationProcess.fillEmployeeEvaluationInput("Nguyễn Văn Minh");
        await evaluationProcess.clickEmployeeEvaluationOption();
        await evaluationProcess.clickEvaluationTypeDropDown();
        await evaluationProcess.clickEvaluationTypeOption1();
        await evaluationProcess.clickEndTime();
        await evaluationProcess.clickTodayDatePicker();
        await evaluationProcess.clickEvaluationForm();
        await evaluationProcess.clickDepartmentForm();
        await evaluationProcess.clickSave();
        await evaluationProcess.clickIconAction();
        await evaluationProcess.clickConfirm();
        await evaluationProcess.clickIconAction();
        await evaluationProcess.clickCancel();
        await evaluationProcess.fillReason('Cancel evaluation');
        await toast.getToastCancelledSuccess();
    }

    test('Cancel evaluation', async ({ page }) => {
        await clearEvaluationProgress();
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

    test('Evaluation process - Search by status', async ({ page }) => {
        await clearEvaluationProgress();

        await allure.step("Search by new status", async () => {
            // Search by new status
            await evaluationProcess.clickAdmin();
            await evaluationProcess.clickEvaluationProcessButton();
            await evaluationProcess.clickDropdownStatusSearch();
            await evaluationProcess.clickNewStatusOption();
            await evaluationProcess.clickSearch();

            // verify search result
            await evaluationProcess.expectNewStatusOption();
            await evaluationProcess.clickClearSearch();
        });

        await allure.step("Search by wait for evaluation status", async () => {
            // Search by pending status
            await evaluationProcess.clickDropdownStatusSearch();
            await evaluationProcess.clickwaitForEvaluationOption();
            await evaluationProcess.clickSearch();

            // verify search result
            await evaluationProcess.expectwaitForEvaluationStatus();
            await evaluationProcess.clickClearSearch();
        });

        await allure.step("Search by cancel status", async () => {
            // Search by cancel status
            await evaluationProcess.clickDropdownStatusSearch();
            await evaluationProcess.clickCancelStatusOption();
            await evaluationProcess.clickSearch();

            // verify search result
            await evaluationProcess.expectCancelStatusOption();
            await evaluationProcess.clickClearSearch();
        });

        await allure.step("Search by complete status", async () => {
            // Search by complete status
            await evaluationProcess.clickDropdownStatusSearch();
            await evaluationProcess.clickCompleteStatusOption();
            await evaluationProcess.clickSearch();

            // verify search result
            await evaluationProcess.expectCompleteStatusOption();
            await evaluationProcess.clickClearSearch();
        });

        await allure.step("Search by wait for approval status", async () => {
            // Search by wait for approval status
            await evaluationProcess.clickDropdownStatusSearch();
            await evaluationProcess.clickwaitForApprovalOption();
            await evaluationProcess.clickSearch();

            // verify search result
            await evaluationProcess.expectwaitForApprovalStatus();
        });
    });

    test('Search by employee name', async ({ page }) => {
        await evaluationProcess.clickAdmin();
        await evaluationProcess.clickEvaluationProcessButton();
        await evaluationProcess.fillSearchByEmployeeNameInput('Big app');
        await evaluationProcess.clickSearch();
        await evaluationProcess.expectSearchByEmployeeName();
    });

    test('Search by evaluation type', async ({ page }) => {
        await evaluationProcess.clickAdmin();
        await evaluationProcess.clickEvaluationProcessButton();
        await evaluationProcess.fillSearchByEvaluationTypeInput('Đánh giá nhân viên');
        await evaluationProcess.clickSearch();
        await evaluationProcess.expectSearchByEvaluationType();
    });

    test('List evaluation - Search by status', async ({ page }) => {
        await allure.step("Search by new status", async () => {
            // Search by new status
            await evaluationProcess.clickAdmin();
            await evaluationProcess.clickListEvaluationButton();
            await evaluationProcess.clickDropdownStatusSearch();
            await evaluationProcess.clickNewStatusOption();
            await evaluationProcess.clickSearch();

            // verify search result
            await evaluationProcess.expectListEvaluationVerifyNewStatus();

        });

        await allure.step("Search by wait for evaluation status", async () => {
            // Search by pending status
            await evaluationProcess.clickDropdownStatusSearch();
            await evaluationProcess.clickwaitForEvaluationOption();
            await evaluationProcess.clickSearch();

            // verify search result
            await evaluationProcess.expectListEvaluationVerifywaitForEvaluationStatus();

        });

        await allure.step("Search by cancel status", async () => {
            // Search by cancel status
            await evaluationProcess.clickDropdownStatusSearch();
            await evaluationProcess.clickCancelStatusOption();
            await evaluationProcess.clickSearch();

            // verify search result
            await evaluationProcess.expectListEvaluationVerifyCancelStatus();

        });

        await allure.step("Search by complete status", async () => {
            // Search by complete status
            await evaluationProcess.clickDropdownStatusSearch();
            await evaluationProcess.clickCompleteStatusOption();
            await evaluationProcess.clickSearch();

            // verify search result
            await evaluationProcess.expectListEvaluationVerifyCompleteStatus();

        });

        await allure.step("Search by wait for approval status", async () => {
            // Search by wait for approval status
            await evaluationProcess.clickDropdownStatusSearch();
            await evaluationProcess.clickwaitForApprovalOption();
            await evaluationProcess.clickSearch();

            // verify search result
            await evaluationProcess.expectListEvaluationVerifywaitForApprovalStatus();

        });
    });
});