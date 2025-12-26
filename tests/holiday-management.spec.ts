import { test, } from './base-test';
import { LoginPage } from '../pages/LoginPage';
import Config from '../utils/configUtils';
import { ToastPage } from '../pages/ToastPage';
import { HolidayManagementPage } from '../pages/HolidayManagementPage';
import { clearCheckDay, clearCheckTime, clearHolidayManagement } from '../db/helpers/DBHelper';
import { allure } from 'allure-playwright';
import { ValidationPage } from '../pages/ValidationPage';
import { clearPayroll } from '../db/modules/PayrollsDB';

test.describe.serial('Holiday Management', () => {
    let loginPage: LoginPage;
    let holidayManagementPage: HolidayManagementPage;
    let toastPage: ToastPage;
    let validation: ValidationPage;

    test.beforeEach(async ({ page }) => {
        allure.feature('Holiday Management Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        validation = new ValidationPage(page);
        loginPage = new LoginPage(page);
        toastPage = new ToastPage(page);
        holidayManagementPage = new HolidayManagementPage(page);

        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await holidayManagementPage.clickAdmin();
        await holidayManagementPage.clickHolidayButton();
    });


    test("Max length name and reason holiday management 255 characters", async ({ page }) => {
        await clearPayroll();
        await clearHolidayManagement();
        await clearCheckDay();
        await clearCheckTime();
        await holidayManagementPage.clickAdd();
        await holidayManagementPage.fillHolidayName("z".repeat(255));
        await holidayManagementPage.clickStartDate();
        await holidayManagementPage.clickTodayDatePicker();
        await holidayManagementPage.clickEndDate();
        await holidayManagementPage.clickTodayDatePicker();
        await holidayManagementPage.fillReason("z".repeat(255));
        await holidayManagementPage.checkTotalHolidayResult();
        await holidayManagementPage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test("Max length name holiday management over 255 characters", async ({ page }) => {
        await holidayManagementPage.clickAdd();
        await holidayManagementPage.fillHolidayName("z".repeat(256));
        await holidayManagementPage.clickStartDate();
        await holidayManagementPage.clickTodayDatePicker();
        await holidayManagementPage.clickEndDate();
        await holidayManagementPage.clickTodayDatePicker();
        await holidayManagementPage.checkTotalHolidayResult();
        await holidayManagementPage.fillReason("Test reason");
        await holidayManagementPage.clickSave();
        await validation.validateMaxLength255Characters();
    });

    test("Max length reason holiday management over 255 characters", async ({ page }) => {
        await holidayManagementPage.clickAdd();
        await holidayManagementPage.fillHolidayName("Test max length reason");
        await holidayManagementPage.clickStartDate();
        await holidayManagementPage.clickTodayDatePicker();
        await holidayManagementPage.clickEndDate();
        await holidayManagementPage.clickTodayDatePicker();
        await holidayManagementPage.checkTotalHolidayResult();
        await holidayManagementPage.fillReason("z".repeat(256));
        await holidayManagementPage.clickSave();
        await validation.validateMaxLength255Characters();
    });

    test('E2E - Add Holiday Management', async ({ page }) => {
        await clearHolidayManagement();
        await clearCheckDay();
        await clearCheckTime();
        await holidayManagementPage.clickAdd();
        await holidayManagementPage.fillHolidayName("Test");
        await holidayManagementPage.clickStartDate();
        await holidayManagementPage.clickTodayDatePicker();
        await holidayManagementPage.clickEndDate();
        await holidayManagementPage.clickTodayDatePicker();
        await holidayManagementPage.fillReason('Test Reason');
        await holidayManagementPage.checkTotalHolidayResult();
        await holidayManagementPage.clickSave();
        await toastPage.getToastAddSuccess();
        await holidayManagementPage.clickTimeKeeping();
        await holidayManagementPage.clickCheckInOutHistory();
        await holidayManagementPage.fillAndSelectUser('BAT300 - Test quản lý nghỉ lễ');
        await holidayManagementPage.verifyRestHolidayHaveSalary();
    });

    test('Check validation required add with blank field', async ({ page }) => {
        await holidayManagementPage.clickAdd();
        await holidayManagementPage.clickSave();
        await holidayManagementPage.expectNameRequired();
        await holidayManagementPage.expectStartDateRequired();
        await holidayManagementPage.expectEndDateRequired();
        await validation.validateRequiredFillReason();
    });

    test('Add with blank reason', async ({ page }) => {
        await holidayManagementPage.clickAdd();
        await holidayManagementPage.fillHolidayName("Test");
        await holidayManagementPage.clickStartDate();
        await holidayManagementPage.clickTodayDatePicker();
        await holidayManagementPage.clickEndDate();
        await holidayManagementPage.clickTodayDatePicker();
        await holidayManagementPage.clickSave();
        await validation.validateRequiredFillReason();
    });

    test('Add with blank name', async ({ page }) => {
        await holidayManagementPage.clickAdd();
        await holidayManagementPage.clickStartDate();
        await holidayManagementPage.clickTodayDatePicker();
        await holidayManagementPage.clickEndDate();
        await holidayManagementPage.clickTodayDatePicker();
        await holidayManagementPage.fillReason('Test Reason');
        await holidayManagementPage.clickSave();
        await holidayManagementPage.expectNameRequired();
    });

    test('Delete Holiday', async ({ page }) => {
        await clearHolidayManagement();
        await holidayManagementPage.clickAdd();
        await holidayManagementPage.fillHolidayName("Test delete");
        await holidayManagementPage.clickStartDate();
        await holidayManagementPage.clickTodayDatePicker();
        await holidayManagementPage.clickEndDate();
        await holidayManagementPage.clickTodayDatePicker();
        await holidayManagementPage.fillReason("Test reason");
        await holidayManagementPage.checkTotalHolidayResult();
        await holidayManagementPage.clickSave();
        await toastPage.getToastAddSuccess();
        await holidayManagementPage.clickDeleteRow0();
        await toastPage.getToastDeleteSuccess();
    });
});
