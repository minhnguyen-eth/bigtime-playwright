import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/BasePage';
import Config from '../utils/configUtils';
import { ToastPage } from '../pages/ToastPage';
import { HolidayManagementPage } from '../pages/HolidayManagementPage';
import { clearHolidayManagement } from '../utils/mysqlUtils';



test.describe('Holiday Management', () => {
    let loginPage: LoginPage;
    let basePage: BasePage;
    let holidayManagementPage: HolidayManagementPage;
    let toastPage: ToastPage;


    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        basePage = new BasePage(page);
        toastPage = new ToastPage(page);
        holidayManagementPage = new HolidayManagementPage(page);
        await loginPage.goto();

    });

    test('E2E Holiday Management', async ({ page }) => {
        await clearHolidayManagement();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin();
        await holidayManagementPage.clickHolidayButton();
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

    test('Delete Holiday', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin();
        await holidayManagementPage.clickHolidayButton();
        await holidayManagementPage.clickDeleteButton();
        await toastPage.getToastDeleteSuccess();
    });


});