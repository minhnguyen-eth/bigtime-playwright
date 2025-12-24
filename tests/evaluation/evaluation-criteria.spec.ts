import { test, } from '../base-test';
import { LoginPage } from "../../pages/LoginPage";
import Config from "../../utils/configUtils";
import { EvaluationCriteriaPage } from "../../pages/evaluation_page/EvaluationCriteriaPage";
import { clearEvaluationCriterias } from '../../db/helpers/DBHelper';
import { allure } from "allure-playwright";
import { ToastPage } from "../../pages/ToastPage";
import { ValidationPage } from '../../pages/ValidationPage';

test.describe.serial("Evaluation Criteria Tests - Kiểm tra tiêu chí đánh giá", () => {
    let loginPage: LoginPage;
    let evaluationCriteriaPage: EvaluationCriteriaPage;
    let toastPage: ToastPage;
    let validationPage: ValidationPage;

    test.beforeEach(async ({ page }) => {
        allure.owner("Minh Nguyen");
        allure.feature("Evaluation Criteria Feature");
        allure.severity("Critical");

        validationPage = new ValidationPage(page);
        toastPage = new ToastPage(page);
        loginPage = new LoginPage(page);
        evaluationCriteriaPage = new EvaluationCriteriaPage(page);
        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
    });

    test("Max length of Evaluation Criteria Name is 255 characters - Kiểm tra tiêu chí đánh giá có độ dài tối đa là 255 ký tự", async ({ page }) => {
        allure.story("Validation on Create Criteria");
        await clearEvaluationCriterias();
        await evaluationCriteriaPage.clickAdmin();
        await evaluationCriteriaPage.clickEvaluationCriteria();
        await evaluationCriteriaPage.clickAdd();
        await evaluationCriteriaPage.setEvaluationCriteriaName("a".repeat(255));
        await evaluationCriteriaPage.clickEvaluationCriteriaNameDropDown();
        await evaluationCriteriaPage.clickEvaluationTypeOption();
        await evaluationCriteriaPage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test("Max length of Evaluation Criteria Name over 255 characters - Kiểm tra tiêu chí đánh giá có độ dài lớn hơn 255 ký tự", async ({ page }) => {
        allure.story("Validation on Create Criteria");
        await evaluationCriteriaPage.clickAdmin();
        await evaluationCriteriaPage.clickEvaluationCriteria();
        await evaluationCriteriaPage.clickAdd();
        await evaluationCriteriaPage.setEvaluationCriteriaName("a".repeat(256));
        await evaluationCriteriaPage.clickEvaluationCriteriaNameDropDown();
        await evaluationCriteriaPage.clickEvaluationTypeOption();
        await evaluationCriteriaPage.clickSave();
        await validationPage.validateMaxLength255Characters();
    });

    test("Max length of Evaluation Criteria Description is 500 characters - Kiểm tra tiêu chí đánh giá có độ dài tối đa là 500 ký tự", async ({ page }) => {
        allure.story("Validation on Create Criteria");
        await evaluationCriteriaPage.clickAdmin();
        await evaluationCriteriaPage.clickEvaluationCriteria();
        await evaluationCriteriaPage.clickAdd();
        await evaluationCriteriaPage.setEvaluationCriteriaName("Automation Test");
        await evaluationCriteriaPage.fillDescription("a".repeat(500));
        await evaluationCriteriaPage.clickEvaluationCriteriaNameDropDown();
        await evaluationCriteriaPage.clickEvaluationTypeOption();
        await evaluationCriteriaPage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test("Max length of Evaluation Criteria Description over 500 characters - Kiểm tra tiêu chí đánh giá có độ dài lớn hơn 500 ký tự", async ({ page }) => {
        allure.story("Validation on Create Criteria");
        await evaluationCriteriaPage.clickAdmin();
        await evaluationCriteriaPage.clickEvaluationCriteria();
        await evaluationCriteriaPage.clickAdd();
        await evaluationCriteriaPage.setEvaluationCriteriaName("Automation Test");
        await evaluationCriteriaPage.fillDescription("a".repeat(501));
        await evaluationCriteriaPage.clickEvaluationCriteriaNameDropDown();
        await evaluationCriteriaPage.clickEvaluationTypeOption();
        await evaluationCriteriaPage.clickSave();
        await validationPage.validateMaxLength500Characters();
    });


    test("Create Criteria without any field - Tạo tiêu chí đánh giá không nhập bất kỳ trường nào", async ({ page }) => {
        allure.story("Validation on Create Criteria");
        await clearEvaluationCriterias();
        await evaluationCriteriaPage.clickAdmin();
        await evaluationCriteriaPage.clickEvaluationCriteria();
        await evaluationCriteriaPage.clickAdd();
        await evaluationCriteriaPage.clickSave();
        await evaluationCriteriaPage.getRequiredEvaluationTypeName();
        await evaluationCriteriaPage.getRequiredCriteriaName();
    });

    test("Create with lock status - Tạo tiêu chí đánh giá với trạng thái khóa", async ({ page }) => {
        allure.story("Create Criteria with Lock Status");
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const EvaluationCriteriaNameRandom = `Automation test ${randomSuffix}`;
        await evaluationCriteriaPage.clickAdmin();
        await evaluationCriteriaPage.clickEvaluationCriteria();
        await evaluationCriteriaPage.clickAdd();
        await evaluationCriteriaPage.setEvaluationCriteriaName(EvaluationCriteriaNameRandom);
        await evaluationCriteriaPage.fillDescription("Automation Test Description");
        await evaluationCriteriaPage.clickEvaluationCriteriaNameDropDown();
        await evaluationCriteriaPage.clickEvaluationTypeOption();
        await evaluationCriteriaPage.clickDropdownStatusInFormNth1();
        await evaluationCriteriaPage.clickLockStatus();
        await evaluationCriteriaPage.clickSave();
        await toastPage.getToastAddSuccess();
        await evaluationCriteriaPage.verifyLockStatusRow0();
    });

    test("Create criteria with activity status - Tạo tiêu chí đánh giá với trạng thái hoạt động", async ({ page }) => {
        allure.story("Create Criteria with Activity Status");
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const EvaluationCriteriaNameRandom = `Automation test ${randomSuffix}`;
        await evaluationCriteriaPage.clickAdmin();
        await evaluationCriteriaPage.clickEvaluationCriteria();
        await evaluationCriteriaPage.clickAdd();
        await evaluationCriteriaPage.setEvaluationCriteriaName(EvaluationCriteriaNameRandom);
        await evaluationCriteriaPage.fillDescription("Automation Test Description");
        await evaluationCriteriaPage.clickEvaluationCriteriaNameDropDown();
        await evaluationCriteriaPage.clickEvaluationTypeOption();
        await evaluationCriteriaPage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test("Search Evaluation Criteria by status - Tìm kiếm tiêu chí đánh giá theo trạng thái", async ({ page }) => {
        allure.story("Search Criteria by Name and Status");
        await evaluationCriteriaPage.clickAdmin();
        await evaluationCriteriaPage.clickEvaluationCriteria();
        await evaluationCriteriaPage.searchEvaluationCriteriaName("Automation Test");
        await evaluationCriteriaPage.clickSearch();
        await evaluationCriteriaPage.verifyResultSearchByName();
        await evaluationCriteriaPage.clickClearSearch();

        await evaluationCriteriaPage.clickDropdownStatusSearch();
        await evaluationCriteriaPage.clickActivityStatus();
        await evaluationCriteriaPage.clickSearch();
        await evaluationCriteriaPage.verifyActivityStatusRow0();
        await evaluationCriteriaPage.clickClearSearch();

        await evaluationCriteriaPage.clickDropdownStatusSearch();
        await evaluationCriteriaPage.clickLockStatus();
        await evaluationCriteriaPage.clickSearch();
        await evaluationCriteriaPage.verifyLockStatusRow0();
        await evaluationCriteriaPage.clickClearSearch();

        await evaluationCriteriaPage.clickDropdownStatusSearch();
        await evaluationCriteriaPage.clickActivityStatus();
        await evaluationCriteriaPage.clickLockStatus();
        await evaluationCriteriaPage.clickSearch();
        await evaluationCriteriaPage.verifyActivityStatusRow0();
    });

    test("Edit Evaluation Criteria - Chỉnh sửa tiêu chí đánh giá", async ({ page }) => {
        allure.story("Edit Evaluation Criteria");
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const EvaluationCriteriaNameEdited = `Automation test edited ${randomSuffix}`;
        await evaluationCriteriaPage.clickAdmin();
        await evaluationCriteriaPage.clickEvaluationCriteria();
        await evaluationCriteriaPage.clickEditRow0();
        await evaluationCriteriaPage.editEvaluationCriteriaName(EvaluationCriteriaNameEdited);
        await evaluationCriteriaPage.fillDescription("Automation Test Description Edited");
        await evaluationCriteriaPage.clickSave();
        await toastPage.getToastUpdateSuccess();

        await evaluationCriteriaPage.clickEditRow0();
        await evaluationCriteriaPage.clickDropdownStatusInFormNth1();
        await evaluationCriteriaPage.clickLockStatus();
        await evaluationCriteriaPage.clickSave();
        await toastPage.getToastUpdateSuccess();
        await evaluationCriteriaPage.verifyLockStatusRow0();

        await evaluationCriteriaPage.clickEditRow0();
        await evaluationCriteriaPage.clickDropdownStatusInFormNth1();
        await evaluationCriteriaPage.clickActivityStatus();
        await evaluationCriteriaPage.clickSave();
        await evaluationCriteriaPage.verifyActivityStatusRow0();
    });

    test("Delete Evaluation Criteria - Xóa tiêu chí đánh giá", async ({ page }) => {
        allure.story("Delete Evaluation Criteria");
        await evaluationCriteriaPage.clickAdmin();
        await evaluationCriteriaPage.clickEvaluationCriteria();
        await evaluationCriteriaPage.clickDeleteRow0();
        await toastPage.getToastDeleteSuccess();
    });
});
