import { expect, test, } from '../base-test';
import { LoginPage } from "../../pages/LoginPage";
import Config from "../../utils/configUtils";
import { EvaluationTypePage } from "../../pages/evaluation_page/EvaluationTypePage";
import { checkEvaluationTypeExists, deleteEvaluationType, clearAllEluationTypes } from '../../db/DBHelper';
import { ValidationPage } from '../../pages/ValidationPage';
import { allure } from "allure-playwright";
import { ToastPage } from "../../pages/ToastPage";

test.describe.serial("Evaluation Type Tests", () => {
    let loginPage: LoginPage;
    let evaluationtype: EvaluationTypePage;
    let toastPage: ToastPage;
    let validationPage: ValidationPage;

    test.beforeEach(async ({ page }) => {
        allure.owner("Minh Nguyen");
        allure.feature("Evaluation Type Feature");
        allure.severity("Critical");

        validationPage = new ValidationPage(page);
        loginPage = new LoginPage(page);
        evaluationtype = new EvaluationTypePage(page);
        toastPage = new ToastPage(page);
        

        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
    });

    test("Max lenghth of evaluation type name is 255 characters", async ({ page }) => {
        await clearAllEluationTypes();
        allure.story("Evaluation Type Name Length Validation");
        
        await evaluationtype.clickAdmin();
        await evaluationtype.clickEvaluationType();
        await evaluationtype.clickAdd();
        await evaluationtype.setEvaluationTypeName('a'.repeat(255));
        await evaluationtype.clickSave();
        await toastPage.getToastAddSuccess();
    });

     test("Max lenghth of evaluation type name over 255 characters", async ({ page }) => {
        allure.story("Evaluation Type Name Length Validation");
        
        await evaluationtype.clickAdmin();
        await evaluationtype.clickEvaluationType();
        await evaluationtype.clickAdd();
        await evaluationtype.setEvaluationTypeName('a'.repeat(256));
        await evaluationtype.clickSave();
        await validationPage.validateMaxLength255Characters();
    });

    test("Max lenghth of evaluation type description is 500 characters", async ({ page }) => {
        allure.story("Evaluation Type Description Length Validation");
        
        await evaluationtype.clickAdmin();
        await evaluationtype.clickEvaluationType();
        await evaluationtype.clickAdd();
        await evaluationtype.setEvaluationTypeName('Automation test max length description');
        await evaluationtype.fillDescription('a'.repeat(500));
        await evaluationtype.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test("Max lenghth of evaluation type description over 500 characters", async ({ page }) => {
        allure.story("Evaluation Type Description Length Validation");
        
        await evaluationtype.clickAdmin();
        await evaluationtype.clickEvaluationType();
        await evaluationtype.clickAdd();
        await evaluationtype.setEvaluationTypeName('Automation test max length description');
        await evaluationtype.fillDescription('a'.repeat(501));
        await evaluationtype.clickSave();
        await validationPage.validateMaxLength500Characters();
    });


    test("Add evaluation type with valid data and check in database", async ({ page }) => {
        allure.story("Create Evaluation Type with Valid Data");
        allure.description("Create Evaluation Type with Valid Data and Check Existence in Database.");
        await clearAllEluationTypes();

        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const evaluationName = `Automation test ${randomSuffix}`;

        await evaluationtype.clickAdmin();
        await evaluationtype.clickEvaluationType();
        await evaluationtype.clickAdd();
        await evaluationtype.setEvaluationTypeName(evaluationName);
        await evaluationtype.fillDescription("This is a test description");
        await evaluationtype.clickSave();
        await toastPage.getToastAddSuccess();

        const existsInDB = await checkEvaluationTypeExists(evaluationName);
        expect(existsInDB).toBeTruthy();

        if (existsInDB) {
            const isDeleted = await deleteEvaluationType(evaluationName);
            console.info(`Đã xóa loại đánh giá "${evaluationName}": ${isDeleted}`);
        }
    });

    test("Add evaluation type with empty description", async ({ page }) => {
        allure.story("Create Evaluation Type with Empty Description");
        allure.description("Tạo loại đánh giá với mô tả để trống và kiểm tra tồn tại trong database.");

        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const evaluationName = `Automation test ${randomSuffix}`;

        await evaluationtype.clickAdmin();
        await evaluationtype.clickEvaluationType();
        await evaluationtype.clickAdd();
        await evaluationtype.setEvaluationTypeName(evaluationName);
        await evaluationtype.clickSave();
        await toastPage.getToastAddSuccess();

        const existsInDB = await checkEvaluationTypeExists(evaluationName);
        expect(existsInDB).toBeTruthy();
    });


    test("Edit activity to lock status", async ({ page }) => {
        allure.story("Edit Evaluation Type Status");
        allure.description("Chỉnh sửa loại đánh giá từ trạng thái hoạt động sang trạng thái khóa.");

        await evaluationtype.clickAdmin();
        await evaluationtype.clickEvaluationType();
        await evaluationtype.clickEditRow0();
        await evaluationtype.clickDropdownStatusInForm();
        await evaluationtype.clickLockStatus();
        await evaluationtype.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test("Add evaluation type with lock status", async ({ page }) => {
        allure.story("Create Evaluation Type with Lock Status");
        allure.description("Tạo loại đánh giá với trạng thái khóa và kiểm tra tồn tại trong database.");

        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const evaluationName = `Automation test ${randomSuffix}`;

        await evaluationtype.clickAdmin();
        await evaluationtype.clickEvaluationType();
        await evaluationtype.clickAdd();
        await evaluationtype.setEvaluationTypeName(evaluationName);
        await evaluationtype.fillDescription("This is a test description");
        await evaluationtype.clickDropdownStatusInForm();
        await evaluationtype.clickLockStatus();
        await evaluationtype.clickSave();
        await toastPage.getToastAddSuccess();

        const existsInDB = await checkEvaluationTypeExists(evaluationName);
        expect(existsInDB).toBeTruthy();
    });

    test("Search Evaluation Type", async ({ page }) => {
        allure.story("Search Evaluation Type by Name");
        allure.description("Tìm kiếm loại đánh giá theo tên cụ thể và xác minh kết quả.");

        await evaluationtype.clickAdmin();
        await evaluationtype.clickEvaluationType();
        await evaluationtype.setSerachEvaluationTypeName("Đánh giá chuyên cần");
        await evaluationtype.clickSearch();
        await evaluationtype.expectSearchEvaluationTypeName("Đánh giá chuyên cần");
    });

    test('Delete evaluation type', async ({ page }) => {
        allure.story("Delete Evaluation Type");
        allure.description("Xóa loại đánh giá và xác minh thông báo thành công.");

        await evaluationtype.clickAdmin();
        await evaluationtype.clickEvaluationType();
        await evaluationtype.clickDeleteRow0();
        await toastPage.getToastDeleteSuccess();
    });
});
