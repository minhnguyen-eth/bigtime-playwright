import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { takeScreenshotOnFailure } from '../../utils/screenshotUtils';
import Config from '../../utils/configUtils';
import { ShiftPlanPage } from '../../pages/work_shift_page/ShiftPlanPage';
import { clearAllShiftPlan, checkShiftPlanExists } from '../../db/DBHelper';
import { allure } from 'allure-playwright';
import { ToastPage } from '../../pages/ToastPage';
import { BasePage } from '../../pages/BasePage';

test.describe.serial('Shift Plan Tests', () => {
    let loginPage: LoginPage;
    let shiftPlanPage: ShiftPlanPage;
    let toastPage: ToastPage;
    let basePage: BasePage;

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

    async function testBody() {
        await shiftPlanPage.clickWorkShift();
        await shiftPlanPage.clickWorkShiftOption();
        await shiftPlanPage.clickStartDateInput();
        await shiftPlanPage.clickChosseMonthButton();
        await shiftPlanPage.clickMonth08();
        await shiftPlanPage.clickDay1Button();
        await shiftPlanPage.clickChosseButton();
        await shiftPlanPage.clickEndDateInput();
        await shiftPlanPage.clickChosseMonthButton();
        await shiftPlanPage.clickMonth08();
        await shiftPlanPage.clickDay31Button();
        await shiftPlanPage.clickChosseButton();
        await shiftPlanPage.clickAddDepartmentButton();
        await shiftPlanPage.fillSearchEmployeeInput('Nguyễn Văn Minh');
        await shiftPlanPage.clickEmployeeCheckbox();
        await shiftPlanPage.clickSaveEmployeeButton();;
        await shiftPlanPage.clickSaveButton();
    }

    test("Max lengh of name 255 character", async ({ page }) => {
        await clearAllShiftPlan();
        await basePage.clickAdd();
        await shiftPlanPage.fillShiftPlanNameInput('z'.repeat(255));
        // Test body
        await testBody();

        await toastPage.getToastAddSuccess();
    });

    test("Max lengh of name over 255 character", async ({ page }) => {
        await basePage.clickAdd();
        await shiftPlanPage.fillShiftPlanNameInput('z'.repeat(256));
        // Test body
        await testBody();

        await basePage.verifyMaxlenght255Charactor();
    });

    test('Add shift plan for department', async ({ page }) => {
        const randomName = Math.random().toString(36).substring(2, 8);
        allure.story('Add Shift Plan for Department Story');

        await allure.step('Clear existing shift plans from DB', async () => {
            await clearAllShiftPlan();
        });

        await allure.step('Fill Shift Plan form for department', async () => {
            await basePage.clickAdd();
            await shiftPlanPage.fillShiftPlanNameInput(randomName);
            await shiftPlanPage.clickWorkShift();
            await shiftPlanPage.clickWorkShiftOption();

            await shiftPlanPage.clickStartDateInput();
            await shiftPlanPage.clickChosseMonthButton();
            await shiftPlanPage.clickMonth08();
            await shiftPlanPage.clickDay1Button();
            await shiftPlanPage.clickChosseButton();

            await shiftPlanPage.clickEndDateInput();
            await shiftPlanPage.clickChosseMonthButton();
            await shiftPlanPage.clickMonth08();
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
            const existsInDB = await checkShiftPlanExists(randomName);
            expect(existsInDB).toBeTruthy();
        });
    });

    test('Add shift plan for an employee', async ({ page }) => {
        const randomName = Math.random().toString(36).substring(2, 5);
        allure.story('Add Shift Plan for Employee Story');

        await allure.step('Fill Shift Plan form for employee', async () => {
            await basePage.clickAdd();
            await shiftPlanPage.fillShiftPlanNameInput(randomName);
            // Test body
            await testBody();

            await toastPage.getToastAddSuccess();
        });

        await allure.step('Verify shift plan added in DB', async () => {
            const existsInDB = await checkShiftPlanExists(randomName);
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

    test('Edit with remove employee', async ({ page }) => {
        await shiftPlanPage.clickChooseMonthSearch();
        await shiftPlanPage.clickMonth08();
        await shiftPlanPage.clickChosseButton();
        await shiftPlanPage.clickSearchButton();

        await basePage.clickEditRow0();
    });

    test('Edit name of shift plan', async ({ page }) => {
        const randomName = "Edited name" + Math.random().toString(36).substring(2, 5);
        allure.story('Edit Name of Shift Plan Story');

        await allure.step('Edit name of shift plan', async () => {
            await shiftPlanPage.clickChooseMonthSearch();
            await shiftPlanPage.clickMonth08();
            await shiftPlanPage.clickChosseButton();
            await shiftPlanPage.clickSearchButton();

            await basePage.clickEditRow0();
            await shiftPlanPage.fillShiftPlanNameInput(randomName);
            await basePage.clickSave();
            await toastPage.getToastUpdateSuccess();
            await shiftPlanPage.expectEditNameResult();
        });

        await allure.step('Verify name changed in DB', async () => {
            const existsInDB = await checkShiftPlanExists(randomName);
            expect(existsInDB).toBeTruthy();
        });
    });

    test('Search by name', async ({ page }) => {
        allure.story('Search by Name Story');

        await allure.step('Search by name', async () => {
            await shiftPlanPage.fillSearchByNameInput('Phân ca tháng 7');
            await basePage.clickSearch();
        });

        await allure.step('Verify search results', async () => {
            await shiftPlanPage.expectSearchByNameResult();
        });
    });

    test('Search by work shift', async ({ page }) => {
        allure.story('Search by Work Shift Story');

        await allure.step('Search by work shift', async () => {
            await shiftPlanPage.clickWorkShiftDropDown();
            await shiftPlanPage.clickWorkShiftOption();
            await shiftPlanPage.clickSearchButton();
        });

        await allure.step('Verify search results', async () => {
            await shiftPlanPage.expectSearchWorkShiftResult();
        });
    });

    test('Delete shift plan', async ({ page }) => {
        allure.story('Delete Shift Plan Story');

        await allure.step('Search and delete shift plan', async () => {
            await shiftPlanPage.clickChooseMonthSearch();
            await shiftPlanPage.clickMonth08();
            await shiftPlanPage.clickChosseButton();
            await shiftPlanPage.clickSearchButton();
            await basePage.clickDeleteRow0();
            await toastPage.getToastDeleteSuccess();
        });
    });
});
