import { test, expect , TestInfo } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { BasePage } from '../../pages/BasePage';
import Config from '../../utils/configUtils';
import { ToastPage } from '../../pages/ToastPage';
import { clearCheckDay, clearCheckTime, mockCheckinData, clearOvertimeSubmission } from '../../db/DBHelper';
import { OvertimeTicketPage } from '../../pages/timekeeping_page/OvertimeTicketPage';
import { LogoutPage } from '../../pages/LogoutPage';
import { allure } from 'allure-playwright';
import { takeScreenshotOnFailure } from '../../utils/screenshotUtils';

test.describe.serial('Overtime Ticket Test Suite', () => {
    let loginPage: LoginPage;
    let basePage: BasePage;
    let overtimeTicketPage: OvertimeTicketPage;
    let toastPage: ToastPage;
    let logoutPage: LogoutPage;

    const userId = '4cMiTbHpAz';
    const today = new Date().toISOString().split('T')[0];

    test.beforeEach(async ({ page, context }) => {
        allure.feature('Overtime Ticket Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        // Set geolocation permissions and location
        await context.grantPermissions(['geolocation']);
        await context.setGeolocation({
            latitude: 10.762622,
            longitude: 106.660172,
        });

        logoutPage = new LogoutPage(page);
        loginPage = new LoginPage(page);
        basePage = new BasePage(page);
        toastPage = new ToastPage(page);
        overtimeTicketPage = new OvertimeTicketPage(page);

        await loginPage.goto();
        await loginPage.login(Config.employee_username, Config.employee_password);
        await basePage.clickTimeKeepingManagement();

        // Clear and mock data
        await clearCheckDay();
        await clearCheckTime();
        await clearOvertimeSubmission();
    });

     test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
      });

    async function addOverTimeTicket() {
        await mockCheckinData(userId, today);
        await overtimeTicketPage.clickOvertimeTicketButton();
        await basePage.clickAdd();
        await overtimeTicketPage.clickOvertimeTicketDayButton();
        await basePage.clickTodayDatePicker();
        await overtimeTicketPage.setOverTimeTicket();
        await overtimeTicketPage.fillReason('Automation test reason');
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();

    }

    test('Maxlength of reason', async ({ page }) => {
        await overtimeTicketPage.clickOvertimeTicketButton();
        await basePage.clickAdd();
        await overtimeTicketPage.clickOvertimeTicketDayButton();
        await basePage.clickTodayDatePicker();
        await overtimeTicketPage.setOverTimeTicket();
        await overtimeTicketPage.fillReason('a'.repeat(256));
        await basePage.clickSave();
        await basePage.verifyMaxlenght255Charactor();
    });

    test('Check in', async ({ page }) => {
        await overtimeTicketPage.clickCheckInOutButton();
        await overtimeTicketPage.clickCheckInButton();
        await overtimeTicketPage.clickConfirmCheckInButton();
        await toastPage.getToastCheckinSuccess();
    });

    test('Create with blank name and reason', async ({ page }) => {
        await overtimeTicketPage.clickOvertimeTicketButton();
        await basePage.clickAdd();
        await basePage.clickSave();
        await overtimeTicketPage.verifyValidateDateRequired();
        await overtimeTicketPage.verifyValidateReasonRequired();
    });

    test('Create with wrong time', async ({ page }) => {
        await mockCheckinData(userId, today);
        await overtimeTicketPage.clickOvertimeTicketButton();
        await basePage.clickAdd();
        await overtimeTicketPage.clickOvertimeTicketDayButton();
        await basePage.clickTodayDatePicker();
        await overtimeTicketPage.clickStartTime();
        await overtimeTicketPage.clickOpenHour();
        await overtimeTicketPage.clickHour17();
        await overtimeTicketPage.clickChosseButton();
        await overtimeTicketPage.clickEndTime();
        await overtimeTicketPage.clickOpenHour();
        await overtimeTicketPage.clickHour19();
        await overtimeTicketPage.clickChosseButton();
        await overtimeTicketPage.fillReason('Automation test reason');

        await basePage.clickSave();
        await toastPage.getToastAddFailed();
        await overtimeTicketPage.verifyValidateWhenUserChosseWrongTime();
    });

    test('Create with pending status', async ({ page }) => {
        await mockCheckinData(userId, today);
        await overtimeTicketPage.clickOvertimeTicketButton();
        await basePage.clickAdd();
        await overtimeTicketPage.clickOvertimeTicketDayButton();
        await basePage.clickTodayDatePicker();
        await overtimeTicketPage.setOverTimeTicket();
        await overtimeTicketPage.fillReason('Automation test reason');
        await overtimeTicketPage.clickDropdownStatus();
        await overtimeTicketPage.clickSelectPendingStatus();
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();

        // Verify pending status
        await basePage.clickRow0();
        await overtimeTicketPage.verifyOvertimeTicketPendingStatus();

        // Manager check overtime ticket
        await logoutPage.logout();
        await loginPage.login(Config.manager_username, Config.manager_password);
        await basePage.clickRow0();
        await overtimeTicketPage.verifyOvertimeTicketPendingStatus();
    });

    test('E2E - Create Overtime Ticket And Send For Admin Approval', async ({ page }) => {
        // Add Overtime Ticket
        await addOverTimeTicket();

        // Verify information
        await basePage.clickRow0();
        await overtimeTicketPage.verifyOvertimeTicketNewStatus();

        // Send Overtime Ticket
        await basePage.clickSend();
        await overtimeTicketPage.getToastSendSuccess();

        await logoutPage.logout();
        await loginPage.login(Config.manager_username, Config.manager_password);

        // Verify information 
        await basePage.clickRow0();
        await overtimeTicketPage.verifyOvertimeTicketPendingStatus();

        // Browse Overtime Ticket
        await basePage.clickBrowse();
        await overtimeTicketPage.getToastBrowseSuccess();

        // Verify information browsed
        await basePage.clickRow0();
        await overtimeTicketPage.verifyOvertimeTicketBrowsedStatus();

        // Admin check overtime ticket
        await logoutPage.logout();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickRow0();
        await overtimeTicketPage.verifyOvertimeTicketBrowsedStatus();

    });

    test('E2E - Reject Overtime Ticket', async ({ page }) => {
        // Add Overtime Ticket
        await addOverTimeTicket();

        // Verify information
        await basePage.clickRow0();
        await overtimeTicketPage.verifyOvertimeTicketNewStatus();

        // Send Overtime Ticket
        await basePage.clickSend();
        await overtimeTicketPage.getToastSendSuccess();

        await logoutPage.logout();
        await loginPage.login(Config.manager_username, Config.manager_password);

        // Verify information 
        await basePage.clickRow0();
        await overtimeTicketPage.verifyOvertimeTicketPendingStatus();

        // Reject Overtime Ticket
        await basePage.clickReject();
        await basePage.fillReason('Automation test reject reason');
        await toastPage.getToastRejectSuccess();

        // Verify reject status
        await basePage.clickRow0();
        await overtimeTicketPage.verifyOvertimeTicketRejectStatus();

        // Employee view rejected ticket
        await logoutPage.logout();
        await loginPage.login(Config.employee_username, Config.employee_password);
        await basePage.clickRow0();
        await overtimeTicketPage.verifyOvertimeTicketRejectStatus();

        // Admin check overtime ticket
        await logoutPage.logout();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickRow0();
        await overtimeTicketPage.verifyOvertimeTicketRejectStatus();
    });

    test('E2E - Edit Pending Overtime Ticket When Rejected', async ({ page }) => {
        // Add Overtime Ticket
        await addOverTimeTicket();

        // Verify information
        await basePage.clickRow0();
        await overtimeTicketPage.verifyOvertimeTicketNewStatus();

        // Send Overtime Ticket
        await basePage.clickSend();
        await overtimeTicketPage.getToastSendSuccess();

        await logoutPage.logout();
        await loginPage.login(Config.manager_username, Config.manager_password);

        // Verify pending status 
        await basePage.clickRow0();
        await overtimeTicketPage.verifyOvertimeTicketPendingStatus();

        // Reject Overtime Ticket
        await basePage.clickReject();
        await basePage.fillReason('Automation test reject reason');
        await toastPage.getToastRejectSuccess();

        // Verify reject status
        await basePage.clickRow0();
        await overtimeTicketPage.verifyOvertimeTicketRejectStatus();

        // Employee edit overtime ticket
        await logoutPage.logout();
        await loginPage.login(Config.employee_username, Config.employee_password);
        await basePage.clickRow0();
        await overtimeTicketPage.verifyOvertimeTicketRejectStatus();
        await basePage.clickEdit();
        await overtimeTicketPage.clickDropdownStatus();
        await overtimeTicketPage.clickSelectPendingStatus();
        await overtimeTicketPage.fillReason('Automation test update reason');
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();

        // Verify pending status 
        await basePage.clickRow0();
        await overtimeTicketPage.verifyOvertimeTicketPendingStatus();

        // Manager check overtime ticket
        await logoutPage.logout();
        await loginPage.login(Config.manager_username, Config.manager_password);
        await basePage.clickRow0();
        await overtimeTicketPage.verifyOvertimeTicketPendingStatus();

        // Manager browse overtime ticket
        await basePage.clickBrowse();
        await overtimeTicketPage.getToastBrowseSuccess();

        // Verify browsed status
        await basePage.clickRow0();
        await overtimeTicketPage.verifyOvertimeTicketBrowsedStatus();

        // Employee check overtime ticket
        await logoutPage.logout();
        await loginPage.login(Config.employee_username, Config.employee_password);
        await basePage.clickRow0();
        await overtimeTicketPage.verifyOvertimeTicketBrowsedStatus();

    });

    test('E2E - Cancel Overtime Ticket', async ({ page }) => {
        // Add Overtime Ticket
        await addOverTimeTicket();

        // Verify information
        await basePage.clickRow0();
        await overtimeTicketPage.verifyOvertimeTicketNewStatus();

        // Send Overtime Ticket
        await basePage.clickSend();
        await overtimeTicketPage.getToastSendSuccess();

        await logoutPage.logout();
        await loginPage.login(Config.manager_username, Config.manager_password);

        // Cancel Overtime Ticket
        await basePage.clickRow0();
        await basePage.clickCancel();
        await basePage.fillReason('Automation test cancel reason');
        await toastPage.getToastCancelSuccess();

        // Verify cancel status
        await basePage.clickRow0();
        await overtimeTicketPage.verifyOvertimeTicketCancelStatus();

        // Employee check cancelled ticket
        await logoutPage.logout();
        await loginPage.login(Config.employee_username, Config.employee_password);
        await basePage.clickRow0();
        await overtimeTicketPage.verifyOvertimeTicketCancelStatus();
    });

    test('Edit - with only click save', async ({ page }) => {
        // Add Overtime Ticket
        await addOverTimeTicket();

        // Edit
        await basePage.clickRow0();
        await basePage.clickEdit();
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit Time In', async ({ page }) => {
        // Add Overtime Ticket
        await addOverTimeTicket();

        // Edit time in
        await basePage.clickRow0();
        await basePage.clickEdit();
        await overtimeTicketPage.clickStartTime();
        await overtimeTicketPage.clickOpenMinute();
        await overtimeTicketPage.clickMinute10();
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit Time Out', async ({ page }) => {
        // Add Overtime Ticket
        await addOverTimeTicket();

        // Edit time out
        await basePage.clickRow0();
        await basePage.clickEdit();
        await overtimeTicketPage.clickEndTime();
        await overtimeTicketPage.clickOpenMinute();
        await overtimeTicketPage.clickMinute10();
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit Reason', async ({ page }) => {
        // Add Overtime Ticket
        await addOverTimeTicket();

        // Edit reason
        await basePage.clickRow0();
        await basePage.clickEdit();
        await overtimeTicketPage.fillReason('Automation test update reason');
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Delete Overtime Ticket', async ({ page }) => {
        // Add Overtime Ticket
        await addOverTimeTicket();

        // Delete
        await basePage.clickRow0();
        await basePage.clickDelete();
        await toastPage.getToastDeleteSuccess();
    });
});
