import { test, expect, TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/BasePage';
import Config from '../utils/configUtils';
import { ToastPage } from '../pages/ToastPage';
import { HolidayManagementPage } from '../pages/HolidayManagementPage';
import { clearCheckDay, clearCheckTime, clearHolidayManagement } from '../db/DBHelper';
import { allure } from 'allure-playwright';
import { takeScreenshotOnFailure } from '../utils/screenshotUtils';

test.describe.serial('Holiday Management', () => {
    let loginPage: LoginPage;
    let basePage: BasePage;
    let holidayManagementPage: HolidayManagementPage;
    let toastPage: ToastPage;

    test.beforeEach(async ({ page }) => {
        allure.feature('Holiday Management Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        loginPage = new LoginPage(page);
        basePage = new BasePage(page);
        toastPage = new ToastPage(page);
        holidayManagementPage = new HolidayManagementPage(page);
        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin();
        await holidayManagementPage.clickHolidayButton();
    });

     test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
      });

    test('E2E - Add Holiday Management', async ({ page }) => {
        await clearHolidayManagement();
        await clearCheckDay();
        await clearCheckTime();
        await basePage.clickAdd();
        await holidayManagementPage.fillHolidayName("Test");
        await holidayManagementPage.clickStartDate();
        await basePage.clickTodayDatePicker();
        await holidayManagementPage.clickEndDate();
        await basePage.clickTodayDatePicker();
        await holidayManagementPage.fillReason('Test Reason');
        await holidayManagementPage.checkTotalHolidayResult();
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
        await holidayManagementPage.clickTimeKeeping();
        await holidayManagementPage.clickCheckInOutHistory();
        await holidayManagementPage.fillAndSelectUser();
        await holidayManagementPage.verifyRestHolidayHaveSalary();
    });

    test('Unpaid leave', async ({ page }) => {
        await clearHolidayManagement();
        await basePage.clickAdd();
        await holidayManagementPage.fillHolidayName("Test");
        await holidayManagementPage.unCheckBox();
        await holidayManagementPage.clickStartDate();
        await basePage.clickTodayDatePicker();
        await holidayManagementPage.clickEndDate();
        await basePage.clickTodayDatePicker();
        await holidayManagementPage.fillReason('Test Reason');
        await holidayManagementPage.checkTotalHolidayResult();
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
        await holidayManagementPage.clickTimeKeeping();
        await holidayManagementPage.clickCheckInOutHistory();
        await holidayManagementPage.fillAndSelectUser();
        await holidayManagementPage.verifyRestHolidayNoSalary();
    });

    test('Check validation required add with blank field', async ({ page }) => {
        await basePage.clickAdd();
        await basePage.clickSave();
        await holidayManagementPage.expectNameRequired();
        await holidayManagementPage.expectStartDateRequired();
        await holidayManagementPage.expectEndDateRequired();
        await holidayManagementPage.expectReasonRequired();
    });

    test('Add with blank reason', async ({ page }) => {
        await basePage.clickAdd();
        await holidayManagementPage.fillHolidayName("Test");
        await holidayManagementPage.clickStartDate();
        await basePage.clickTodayDatePicker();
        await holidayManagementPage.clickEndDate();
        await basePage.clickTodayDatePicker();
        await basePage.clickSave();
        await holidayManagementPage.expectReasonRequired();
    });

    test('Add with blank name', async ({ page }) => {
        await basePage.clickAdd();
        await holidayManagementPage.clickStartDate();
        await basePage.clickTodayDatePicker();
        await holidayManagementPage.clickEndDate();
        await basePage.clickTodayDatePicker();
        await holidayManagementPage.fillReason('Test Reason');
        await basePage.clickSave();
        await holidayManagementPage.expectNameRequired();
    });

    test('Delete Holiday', async ({ page }) => {
        await holidayManagementPage.clickDeleteButton();
        await toastPage.getToastDeleteSuccess();
    });
});