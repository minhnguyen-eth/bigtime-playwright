import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { takeScreenshotOnFailure } from '../../utils/screenshotUtils';
import Config from '../../utils/configUtils';
import { ShiftPlanPage } from '../../pages/work_shift_page/ShiftPlanPage';
import { clearAllShiftPlan, checkShiftPlanExists } from '../../utils/mysqlUtils';
import { allure } from 'allure-playwright';
import { ToastPage } from '../../pages/ToastPage';
import { BasePage } from '../../pages/BasePage';

test.describe.serial('Shift Plan Tests', () => {
    let loginPage: LoginPage;
    let shiftPlanPage: ShiftPlanPage;
    let toastPage: ToastPage;
    let basePage: BasePage;

    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const shiftPlanNameRanDom = `Automation test ${randomSuffix}`;

    test.beforeEach(async ({ page }) => {
        allure.feature('Shift Plan Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        toastPage = new ToastPage(page);
        basePage = new BasePage(page);
        loginPage = new LoginPage(page);
        shiftPlanPage = new ShiftPlanPage(page);

        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickTimeKeepingManagement();
        await shiftPlanPage.clickShiftPlanButton();
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('Add shift plan for department', async ({ page }) => {
        allure.story('Add Shift Plan for Department Story');

        await allure.step('Clear existing shift plans from DB', async () => {
            await clearAllShiftPlan();
        });

        await allure.step('Fill Shift Plan form for department', async () => {
            await basePage.clickAdd();
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
            await toastPage.getToastAddSuccess();
        });

        await allure.step('Verify shift plan added in DB', async () => {
            const existsInDB = await checkShiftPlanExists(shiftPlanNameRanDom);
            expect(existsInDB).toBeTruthy();
        });
    });

    test('Add shift plan for an employee', async ({ page }) => {
        allure.story('Add Shift Plan for Employee Story');
        const shiftPlanNameRanDom = `Automation test ${randomSuffix}`;

        await allure.step('Fill Shift Plan form for employee', async () => {
            await basePage.clickAdd();
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
            await toastPage.getToastAddSuccess();
        });

        await allure.step('Verify shift plan added in DB', async () => {
            const existsInDB = await checkShiftPlanExists(shiftPlanNameRanDom);
            expect(existsInDB).toBeTruthy();
        });
    });

    test('Save shift plan with empty shift plan name and work shift', async ({ page }) => {
        allure.story('Validate Required Fields Story');

        await allure.step('Try saving empty shift plan', async () => {
            await basePage.clickAdd();
            await basePage.clickSave();
        });

        await allure.step('Verify required field warnings', async () => {
            await shiftPlanPage.getRequiredFieldNameShift('Nhập tên bảng phân ca');
            await shiftPlanPage.getRequiredFieldNameWorkShift('Nhập ca làm việc');
        });
    });

    test('Delete shift plan', async ({ page }) => {
        allure.story('Delete Shift Plan Story');

        await allure.step('Search and delete shift plan', async () => {
            await shiftPlanPage.clickChooseMonthSearch();
            await shiftPlanPage.clickMonth07Button();
            await shiftPlanPage.clickChosseButton();
            await shiftPlanPage.clickSearchButton();
            await basePage.clickDeleteRow0();
            await toastPage.getToastDeleteSuccess();
        });
    });
});
