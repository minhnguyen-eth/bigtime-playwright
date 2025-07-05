import { Page } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { LeaveManagementPage } from '../../pages/leave_page/LeaveManagementPage';
import { LeaveApplicationPage } from '../../pages/leave_page/LeaveApplicationPage';
import Config from '../../utils/configUtils';
import { clearAllLeaveManagements } from '../../utils/mysqlUtils';
import { ToastPage } from '../../pages/ToastPage';
import { BasePage } from '../../pages/BasePage';

export async function addAnnualLeaveForEmployeeAndAdmin(page: Page) {
    const loginPage = new LoginPage(page);
    const leaveManagementPage = new LeaveManagementPage(page);
    const toastPage = new ToastPage(page);
    const basePage = new BasePage(page);

    await loginPage.goto();
    await loginPage.login(Config.admin_username, Config.admin_password);
    await basePage.clickAdmin();
    await leaveManagementPage.clickLeaveManagementButton();
    await basePage.clickAdd();
    await leaveManagementPage.clickAddEmployee();
    await leaveManagementPage.fillSearchByName();
    await leaveManagementPage.clickSelectAEmployee();
    await leaveManagementPage.clickSaveEmployee();
     await page.waitForTimeout(1000);
    await basePage.clickSave();
    await toastPage.getToastAddSuccess();
    await leaveManagementPage.verifyStatusNew('Mới');

    await leaveManagementPage.clickIconActionRow0();
    await basePage.clickConfirm();
    await toastPage.getToastAddSuccess();
    await leaveManagementPage.verifyStatusWaitingForApproval('Chờ duyệt');
    await leaveManagementPage.Logout();
    await page.waitForTimeout(1200);

    await loginPage.goto();
    await loginPage.login(Config.employee_username, Config.employee_password);
    await basePage.clickAdmin();
    await leaveManagementPage.clickLeaveManagementButton();
    await leaveManagementPage.clickIconActionRow0();
    await basePage.clickBrowse();
    await toastPage.getToastBrowseSuccess;
    await leaveManagementPage.verifyStatusApproved('Đã duyệt');
}

export async function sendAndApproveLeave(page: Page) {
    const loginPage = new LoginPage(page);
    const leaveApplicationPage = new LeaveApplicationPage(page);
    const toastPage = new ToastPage(page);
    const basePage = new BasePage(page);

    // Employee sends leave application
    await leaveApplicationPage.clickRow0();
    await basePage.clickSend();
    await leaveApplicationPage.getToastSend('Gửi duyệt thành công');
    await leaveApplicationPage.Logout();
    await page.waitForTimeout(1200);

    // Admin approves leave application
    await loginPage.goto();
    await loginPage.login(Config.admin_username, Config.admin_password);
    await basePage.clickTimeKeepingManagement();
    await leaveApplicationPage.clickLeaveApplicationButton();
    await leaveApplicationPage.clickRow0();
    await basePage.clickBrowse();
    await leaveApplicationPage.getToastBrowsedSuccess('Phê duyệt thành công');
}

export async function employeeBrowseLeaveManagement(page: Page) {
    const loginPage = new LoginPage(page);
    const leaveManagementPage = new LeaveManagementPage(page);
    const toastPage = new ToastPage(page);
    const basePage = new BasePage(page);

    await leaveManagementPage.Logout();
    await page.waitForTimeout(1200);
    await loginPage.goto();
    await loginPage.login(Config.employee_username, Config.employee_password);
    await basePage.clickAdmin();
    await leaveManagementPage.clickLeaveManagementButton();
    await leaveManagementPage.clickIconActionRow0();
    await basePage.clickBrowse();
    await toastPage.getToastBrowseSuccess;
    await leaveManagementPage.verifyStatusApproved('Đã duyệt');
}
