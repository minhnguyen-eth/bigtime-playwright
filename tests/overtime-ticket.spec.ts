import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/BasePage';
import Config from '../utils/configUtils';
import { ToastPage } from '../pages/ToastPage';
import { HolidayManagementPage } from '../pages/HolidayManagementPage';
import { clearCheckDay, clearCheckTime, mockCheckinData } from '../utils/mysqlUtils';



test.describe('Overtime Ticket Test Suite', () => {
    let loginPage: LoginPage;
    let basePage: BasePage;
    let holidayManagementPage: HolidayManagementPage;
    let toastPage: ToastPage;

    const userId = '4cMiTbHpAz';
    const today = new Date().toISOString().split('T')[0];



    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        basePage = new BasePage(page);
        toastPage = new ToastPage(page);
        holidayManagementPage = new HolidayManagementPage(page);
        // await loginPage.goto();

    });

    test('Mock data for Overtime Ticket', async ({ page }) => {
        await clearCheckDay();
        await clearCheckTime();
        await mockCheckinData(userId, today);

    });

    test('Create Overtime Ticket', async ({ page }) => {

    });
});