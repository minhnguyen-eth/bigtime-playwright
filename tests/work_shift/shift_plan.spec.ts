import { expect, test, } from '../base-test';
import { LoginPage } from '../../pages/LoginPage';
import Config from '../../utils/configUtils';
import { ShiftPlanPage } from '../../pages/work_shift_page/ShiftPlanPage';
import { allure } from 'allure-playwright';
import { ToastPage } from '../../pages/ToastPage';
import { ValidationPage } from '../../pages/ValidationPage';
import { checkShiftPlanExists, clearShiftPlan } from '../../db/modules/ShiftplanDB';

test.describe.serial('Shift Plan Tests', () => {
    let loginPage: LoginPage;
    let shiftPlanPage: ShiftPlanPage;
    let toastPage: ToastPage;
    let validation: ValidationPage;

    test.beforeEach(async ({ page }) => {
        allure.feature('Shift Plan Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        validation = new ValidationPage(page);
        toastPage = new ToastPage(page);
        loginPage = new LoginPage(page);
        shiftPlanPage = new ShiftPlanPage(page);

        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await shiftPlanPage.clickTimeKeepingManagement();
        await shiftPlanPage.clickShiftPlanButton();
    });

    async function testBody() {
        await shiftPlanPage.clickWorkShift();
        await shiftPlanPage.clickWorkShiftOption();
        await shiftPlanPage.clickStartDateInput();
        await shiftPlanPage.clickChosseMonthButton();
        await shiftPlanPage.clickMonth08();
        await shiftPlanPage.clickDay1Button();
        await shiftPlanPage.clickChoose();
        await shiftPlanPage.clickEndDateInput();
        await shiftPlanPage.clickChosseMonthButton();
        await shiftPlanPage.clickMonth08();
        await shiftPlanPage.clickDay31Button();
        await shiftPlanPage.clickChoose();
        await shiftPlanPage.clickAddNth1();
        await shiftPlanPage.fillSearchEmployeeInput('Nguyễn Văn Minh');
        await shiftPlanPage.clickEmployeeCheckbox();
        await shiftPlanPage.clickSaveNth1();;
        await shiftPlanPage.clickSave();
    }

    test("Max lengh of name 255 character", async ({ page }) => {
        await clearShiftPlan();
        await shiftPlanPage.clickAdd();
        await shiftPlanPage.fillShiftPlanNameInput('z'.repeat(255));
        // Test body
        await testBody();

        await toastPage.getToastAddSuccess();
    });

    test("Max lengh of name over 255 character", async ({ page }) => {
        await shiftPlanPage.clickAdd();
        await shiftPlanPage.fillShiftPlanNameInput('z'.repeat(256));
        // Test body
        await testBody();

        await validation.validateMaxLength255Characters();
    });

    test('Add shift plan for department', async ({ page }) => {
        const randomName = Math.random().toString(36).substring(2, 8);
        allure.story('Add Shift Plan for Department Story');

        await allure.step('Clear existing shift plans from DB', async () => {
            await clearShiftPlan();
        });

        await allure.step('Fill Shift Plan form for department', async () => {
            await shiftPlanPage.clickAdd();
            await shiftPlanPage.fillShiftPlanNameInput(randomName);
            await shiftPlanPage.clickWorkShift();
            await shiftPlanPage.clickWorkShiftOption();

            await shiftPlanPage.clickStartDateInput();
            await shiftPlanPage.clickChosseMonthButton();
            await shiftPlanPage.clickMonth08();
            await shiftPlanPage.clickDay1Button();
            await shiftPlanPage.clickChoose();

            await shiftPlanPage.clickEndDateInput();
            await shiftPlanPage.clickChosseMonthButton();
            await shiftPlanPage.clickMonth08();
            await shiftPlanPage.clickDay31Button();
            await shiftPlanPage.clickChoose();

            await shiftPlanPage.clickDepartmentButton();
            await shiftPlanPage.clickAddNth1();
            await shiftPlanPage.clickDepartmentDropDown();
            await shiftPlanPage.clickDepartmentOption();
            await shiftPlanPage.clickSaveNth1();

            await shiftPlanPage.clickSave();
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
            await shiftPlanPage.clickAdd();
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
            await shiftPlanPage.clickAdd();
            await shiftPlanPage.clickSave();
        });

        await allure.step('Verify required field warnings', async () => {
            await shiftPlanPage.getRequiredFieldNameShift('Nhập tên bảng phân ca');
            await shiftPlanPage.getRequiredFieldNameWorkShift('Nhập ca làm việc');
        });
    });

    test.skip('Edit with remove employee', async ({ page }) => {
        await shiftPlanPage.clickChooseMonthSearch();
        await shiftPlanPage.clickMonth08();
        await shiftPlanPage.clickChoose();
        await shiftPlanPage.clickSearch();

        await shiftPlanPage.clickEditRow0();
    });

    test.skip('Edit name of shift plan', async ({ page }) => {
        const randomName = "Edited name" + Math.random().toString(36).substring(2, 5);
        allure.story('Edit Name of Shift Plan Story');

        await allure.step('Edit name of shift plan', async () => {
            await shiftPlanPage.clickChooseMonthSearch();
            await shiftPlanPage.clickMonth08();
            await shiftPlanPage.clickChoose();
            await shiftPlanPage.clickSearch();

            await shiftPlanPage.clickEditRow0();
            await shiftPlanPage.fillShiftPlanNameInput(randomName);
            await shiftPlanPage.clickSave();
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
            await shiftPlanPage.clickSearch();
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
            await shiftPlanPage.clickSearch();
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
            await shiftPlanPage.clickChoose();
            await shiftPlanPage.clickSearch();
            await shiftPlanPage.clickDeleteRow0();
            await toastPage.getToastDeleteSuccess();
        });
    });
});
