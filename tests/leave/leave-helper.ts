import { Page } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { LeaveManagementPage } from '../../pages/leave_page/LeaveManagementPage';
import { LeaveApplicationPage } from '../../pages/leave_page/LeaveApplicationPage';
import Config from '../../utils/configUtils';
import { ToastPage } from '../../pages/ToastPage';
import { LogoutPage } from '../../pages/LogoutPage';

export async function addAnnualLeaveForEmployeeAndAdmin(page: Page) {
    const loginPage = new LoginPage(page);
    const leaveManagementPage = new LeaveManagementPage(page);
    const toastPage = new ToastPage(page);
    const logoutPage = new LogoutPage(page);

    await loginPage.goto();
    await loginPage.login(Config.admin_username, Config.admin_password);
    await leaveManagementPage.clickAdmin();
    await leaveManagementPage.clickLeaveManagementButton();
    await leaveManagementPage.clickAdd();
    await leaveManagementPage.clickAddEmployee();
    await leaveManagementPage.fillSearchByName();
    await leaveManagementPage.clickSelectAnEmployee();
    await leaveManagementPage.clickSaveEmployee();
    await page.waitForTimeout(1000);
    await leaveManagementPage.clickSave();
    await toastPage.getToastAddSuccess();
    // await leaveManagementPage.verifyStatusNew('Mới');
    // await leaveManagementPage.clickIconActionRow0();
    // await leaveManagementPage.clickConfirm();
    // await toastPage.getToastConfirmSuccess();
    await leaveManagementPage.verifyStatusWaitingForApproval('Chờ duyệt');
    await logoutPage.logout();

    await loginPage.goto();
    await loginPage.login(Config.employee_username, Config.employee_password);
    await leaveManagementPage.clickAdmin();
    await leaveManagementPage.clickLeaveManagementButton();
    await leaveManagementPage.clickIconActionRow0();
    await leaveManagementPage.clickBrowse();
    await toastPage.getToastBrowseSuccess2;
    await leaveManagementPage.verifyStatusApproved('Đã duyệt');
}

export async function sendAndApproveLeave(page: Page) {
    const loginPage = new LoginPage(page);
    const leaveApplicationPage = new LeaveApplicationPage(page);
    const leaveManagementPage = new LeaveManagementPage(page);
    const toastPage = new ToastPage(page);
    const logoutPage = new LogoutPage(page);

    // Employee sends leave application
    // await leaveApplicationPage.clickRow0();
    // await leaveManagementPage.clickSendAndClickYes();
    // await toastPage.getToastSendBrowseSuccess();
    await logoutPage.logout();

    // Admin approves leave application
    await loginPage.goto();
    await loginPage.login(Config.admin_username, Config.admin_password);
    await leaveManagementPage.clickAdmin();
    await leaveApplicationPage.clickLeaveApplicationButton();
    await leaveApplicationPage.clickRow0();
    await leaveManagementPage.clickBrowse();
    await toastPage.getToastBrowseSuccess2();
}

export async function employeeBrowseLeaveManagement(page: Page) {
    const loginPage = new LoginPage(page);
    const leaveManagementPage = new LeaveManagementPage(page);
    const toastPage = new ToastPage(page);
    const logoutPage = new LogoutPage(page);

    await logoutPage.logout();
    await loginPage.goto();
    await loginPage.login(Config.employee_username, Config.employee_password);
    await leaveManagementPage.clickAdmin();
    await leaveManagementPage.clickLeaveManagementButton();
    await leaveManagementPage.clickIconActionRow0();
    await leaveManagementPage.clickBrowse();
    await toastPage.getToastBrowseSuccess2;
    await leaveManagementPage.verifyStatusApproved('Đã duyệt');
}
