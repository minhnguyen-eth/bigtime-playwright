import { test, expect, Page, TestInfo } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { takeScreenshotOnFailure } from "../../utils/screenshotUtils";
import Config from "../../utils/configUtils";
import { EvaluationTypePage } from "../../pages/evaluation_page/EvaluationTypePage";
import { HomePage } from "../../pages/HomePage";
import { checkEvaluationTypeExists, deleteEvaluationType } from "../../utils/mysqlUtils";
import { clearAllEluationTypes } from "../../utils/mysqlUtils";
import { allure } from "allure-playwright";
import { ToastPage } from "../../pages/ToastPage";
import { BasePage } from "../../pages/BasePage";

test.describe.serial("Evaluation Type Tests", () => {
    let loginPage: LoginPage;
    let evaluationtype: EvaluationTypePage;
    let homePage: HomePage;
    let toastPage: ToastPage;
    let basePage: BasePage;

    test.beforeEach(async ({ page }) => {
        allure.owner("Minh Nguyen");
        allure.feature("Evaluation Type Feature");
        allure.severity("Critical");

        loginPage = new LoginPage(page);
        evaluationtype = new EvaluationTypePage(page);
        homePage = new HomePage(page);
        toastPage = new ToastPage(page);
        basePage = new BasePage(page);

        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test("Add evaluation type with valid data and check in database", async ({ page }) => {
        allure.story("Create Evaluation Type with Valid Data");
        allure.description("Tạo loại đánh giá hợp lệ và kiểm tra tồn tại trong database.");

        await clearAllEluationTypes();

        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const evaluationName = `Automation test ${randomSuffix}`;

        await homePage.clickAdmin();
        await evaluationtype.clickEvaluationType();
        await basePage.clickAdd();
        await evaluationtype.setEvaluationTypeName(evaluationName);
        await evaluationtype.fillDescription("This is a test description");
        await basePage.clickSave();
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

        await homePage.clickAdmin();
        await evaluationtype.clickEvaluationType();
        await basePage.clickAdd();
        await evaluationtype.setEvaluationTypeName(evaluationName);
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();

        const existsInDB = await checkEvaluationTypeExists(evaluationName);
        expect(existsInDB).toBeTruthy();
    });

    
    test("Edit activity to lock status", async ({ page }) => {
        allure.story("Edit Evaluation Type Status");
        allure.description("Chỉnh sửa loại đánh giá từ trạng thái hoạt động sang trạng thái khóa.");

        await homePage.clickAdmin();
        await evaluationtype.clickEvaluationType();
        await basePage.clickEditRow0();
        await evaluationtype.clickStatusDropdown();
        await evaluationtype.clickLockStatus();
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test("Add evaluation type with lock status", async ({ page }) => {
        allure.story("Create Evaluation Type with Lock Status");
        allure.description("Tạo loại đánh giá với trạng thái khóa và kiểm tra tồn tại trong database.");

        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const evaluationName = `Automation test ${randomSuffix}`;

        await homePage.clickAdmin();
        await evaluationtype.clickEvaluationType();
        await basePage.clickAdd();
        await evaluationtype.setEvaluationTypeName(evaluationName);
        await evaluationtype.fillDescription("This is a test description");
        await evaluationtype.clickStatusDropdown();
        await evaluationtype.clickLockStatus();
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();

        const existsInDB = await checkEvaluationTypeExists(evaluationName);
        expect(existsInDB).toBeTruthy();
    });

    test("Search Evaluation Type", async ({ page }) => {
        allure.story("Search Evaluation Type by Name");
        allure.description("Tìm kiếm loại đánh giá theo tên cụ thể và xác minh kết quả.");

        await homePage.clickAdmin();
        await evaluationtype.clickEvaluationType();
        await evaluationtype.setSerachEvaluationTypeName("Đánh giá chuyên cần");
        await basePage.clickSearch();
        await evaluationtype.expectSearchEvaluationTypeName("Đánh giá chuyên cần");
    });

    test('Delete evaluation type', async ({ page }) => {
        allure.story("Delete Evaluation Type");
        allure.description("Xóa loại đánh giá và xác minh thông báo thành công.");

        await homePage.clickAdmin();
        await evaluationtype.clickEvaluationType();
        await basePage.clickDeleteRow0();
        await toastPage.getToastDeleteSuccess();
    });

    
});
