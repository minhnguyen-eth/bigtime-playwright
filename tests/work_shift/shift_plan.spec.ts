import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { takeScreenshotOnFailure } from '../../utils/screenshotUtils';
import Config from '../../utils/configUtils';
import { HomePage } from '../../pages/HomePage';
import { ShiftPlanPage } from '../../pages/work_shift_page/ShiftPlanPage';
import { clearAllShiftPlan } from '../../utils/mysqlUtils';
import { checkShiftPlanExists } from '../../utils/mysqlUtils';
import { allure } from 'allure-playwright';

test.describe.serial('Evaluation Type Tests', () => {
    let loginPage: LoginPage;
    let shiftPlanPage: ShiftPlanPage;
    let homePage: HomePage;

    const randomSuffix = Math.random().toString(36).substring(2, 8); // chữ + số, độ dài 6
    const shiftPlanNameRanDom = `Phân ca tháng 7 ${randomSuffix}`;

    test.beforeEach(async ({ page }) => {

        allure.owner('Minh Nguyen');
        allure.feature('Shift Plan Feature');
        allure.severity('Critical');
        loginPage = new LoginPage(page);
        shiftPlanPage = new ShiftPlanPage(page);
        homePage = new HomePage(page);

        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);

        // Delete all shift plan
        // await clearAllShiftPlan();
    });

    test('Add shift plan for department', async ({ page }) => {
        await clearAllShiftPlan();

        await homePage.clickTimeKeepingManagement();
        await shiftPlanPage.clickShiftPlanButton();
        await shiftPlanPage.clickAddButton();
        await shiftPlanPage.fillShiftPlanNameInput(shiftPlanNameRanDom);
        await shiftPlanPage.clickWorkShift();
        await shiftPlanPage.clickWorkShiftOption();

        await shiftPlanPage.clickStartDateInput();
        await shiftPlanPage.clickChosseMonthButton();
        await shiftPlanPage.clickMonth07Button();
        await shiftPlanPage.clickDay1Button();
        await shiftPlanPage.clickChosseButton();

        await shiftPlanPage.clickEndDateInput();
        await shiftPlanPage.clickChosseMonthButton();
        await shiftPlanPage.clickMonth07Button();
        await shiftPlanPage.clickDay31Button();
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
        const shiftPlanNameRanDom = `Automation test add sift plan for a employee ${randomSuffix}`;

        await homePage.clickTimeKeepingManagement();
        await shiftPlanPage.clickShiftPlanButton();
        await shiftPlanPage.clickAddButton();
        await shiftPlanPage.fillShiftPlanNameInput(shiftPlanNameRanDom);
        await shiftPlanPage.clickWorkShift();
        await shiftPlanPage.clickWorkShiftOption();

        await shiftPlanPage.clickStartDateInput();
        await shiftPlanPage.clickChosseMonthButton();
        await shiftPlanPage.clickMonth07Button();
        await shiftPlanPage.clickDay1Button();
        await shiftPlanPage.clickChosseButton();

        await shiftPlanPage.clickEndDateInput();
        await shiftPlanPage.clickChosseMonthButton();
        await shiftPlanPage.clickMonth07Button();
        await shiftPlanPage.clickDay31Button();
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


    test('Save shift plan with empty shift plan name and work shift', async ({ page }) => {

        await homePage.clickTimeKeepingManagement();
        await shiftPlanPage.clickShiftPlanButton();
        await shiftPlanPage.clickAddButton();
        await shiftPlanPage.clickSaveButton();
        await shiftPlanPage.getRequiredFieldNameShift('Nhập tên bảng phân ca');
        await shiftPlanPage.getRequiredFieldNameWorkShift('Nhập ca làm việc');
    });


    test('Delete shift plan', async ({ page }) => {
        await homePage.clickTimeKeepingManagement();
        await shiftPlanPage.clickShiftPlanButton();
        await shiftPlanPage.clickChooseMonthSearch();
        await shiftPlanPage.clickMonth07Button();
        await shiftPlanPage.clickChosseButton();
        await shiftPlanPage.clickSearchButton();
        await shiftPlanPage.clickDeleteButton();
        await shiftPlanPage.clickOkButton();
        await shiftPlanPage.getToastDelete('Xóa thành công');
    });



});