import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { takeScreenshotOnFailure } from '../utils/screenshotUtils';
import Config from '../utils/configUtils';
import { HomePage } from '../pages/HomePage';
import { ShiftPlanPage } from '../pages/ShiftPlanPage';
import { clearAllShiftPlan } from '../utils/mysqlUtils';
import { checkShiftPlanExists } from '../utils/mysqlUtils';

test.describe.serial('Evaluation Type Tests', () => {
    let loginPage: LoginPage;
    let shiftPlanPage: ShiftPlanPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        shiftPlanPage = new ShiftPlanPage(page);
        homePage = new HomePage(page);

        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);

        // Delete all shift plan
        await clearAllShiftPlan();
    });

    test('Add shift plan for department', async ({ page }) => {
        const randomSuffix = Date.now(); // Hoặc dùng Math.random().toString(36).substring(2, 8)
        const shiftPlanNameRanDom = `Automation test add sift plan for department ${randomSuffix}`;

        await homePage.clickTimeKeepingManagement();
        await shiftPlanPage.clickShiftPlanButton();
        await shiftPlanPage.clickAddButton();
        await shiftPlanPage.fillShiftPlanNameInput(shiftPlanNameRanDom);
        await shiftPlanPage.clickWorkShift();
        await shiftPlanPage.clickWorkShiftOption();

        await shiftPlanPage.clickStartDateInput();
        await shiftPlanPage.clickDay1Button();
        await shiftPlanPage.clickChosseButton();

        await shiftPlanPage.clickEndDateInput();
        await shiftPlanPage.clickDay30Button();
        await shiftPlanPage.clickChosseButton();

        await shiftPlanPage.clickDepartmentButton();
        await shiftPlanPage.clickAddDepartmentButton();
        await shiftPlanPage.clickDepartmentDropDown();
        await shiftPlanPage.clickDepartmentOption();
        await shiftPlanPage.clickSaveDepartmentButton();

        await shiftPlanPage.clickSaveButton();
        await shiftPlanPage.getToastAdd('Thêm thành công');

        // Kiểm tra trong database
        const existsInDB = await checkShiftPlanExists(shiftPlanNameRanDom);
        expect(existsInDB).toBeTruthy();

    });

    test('Add shift plan for a employee', async ({ page }) => {
        const randomSuffix = Date.now(); // Hoặc dùng Math.random().toString(36).substring(2, 8)
        const shiftPlanNameRanDom = `Automation test add sift plan for a employee ${randomSuffix}`;

        await homePage.clickTimeKeepingManagement();
        await shiftPlanPage.clickShiftPlanButton();
        await shiftPlanPage.clickAddButton();
        await shiftPlanPage.fillShiftPlanNameInput(shiftPlanNameRanDom);
        await shiftPlanPage.clickWorkShift();
        await shiftPlanPage.clickWorkShiftOption();

        await shiftPlanPage.clickStartDateInput();
        await shiftPlanPage.clickDay1Button();
        await shiftPlanPage.clickChosseButton();

        await shiftPlanPage.clickEndDateInput();
        await shiftPlanPage.clickDay30Button();
        await shiftPlanPage.clickChosseButton();

        await shiftPlanPage.clickAddDepartmentButton();
        await shiftPlanPage.fillSearchEmployeeInput('Nguyễn Văn Minh');
        await shiftPlanPage.clickEmployeeCheckbox();
        await shiftPlanPage.clickSaveEmployeeButton();


        await shiftPlanPage.clickSaveButton();
        await shiftPlanPage.getToastAdd('Thêm thành công');

        // Kiểm tra trong database
        const existsInDB = await checkShiftPlanExists(shiftPlanNameRanDom);
        expect(existsInDB).toBeTruthy();

    });





});