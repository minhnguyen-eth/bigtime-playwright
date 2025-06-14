import { Page } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';
import { LeaveManagementPage } from '../../pages/LeaveManagementPage';
import { LeaveApplicationPage } from '../../pages/LeaveApplicationPage';
import Config from '../../utils/configUtils';
import { clearAllLeaveManagements } from '../../utils/mysqlUtils';

export async function addAnnualLeaveForEmployeeAndAdmin(page: Page) {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const leaveManagementPage = new LeaveManagementPage(page);

    await loginPage.goto();
    await loginPage.login(Config.admin_username, Config.admin_password);
    await homePage.clickAdmin();
    await leaveManagementPage.clickLeaveManagementButton();
    await leaveManagementPage.clickAddButton();
    await leaveManagementPage.clickAddEmployee();
    await leaveManagementPage.fillSearchByName();
    await leaveManagementPage.clickSelectAEmployee();
    await leaveManagementPage.clickSaveEmployee();
    await leaveManagementPage.clickSaveButton();
    await leaveManagementPage.getToastAdd('Thêm thành công');
    await leaveManagementPage.verifyStatusNew('Mới');

    await leaveManagementPage.clickIconActionRow0();
    await leaveManagementPage.clickComfirmButton();
    await leaveManagementPage.clickOkButton();
    await leaveManagementPage.getToastConfirm('Xác nhận thành công');
    await leaveManagementPage.verifyStatusWaitingForApproval('Chờ duyệt');
    await leaveManagementPage.Logout();
    await page.waitForTimeout(1200);

    await loginPage.goto();
    await loginPage.login(Config.employee_username, Config.employee_password);
    await homePage.clickAdmin();
    await leaveManagementPage.clickLeaveManagementButton();
    await leaveManagementPage.clickIconActionRow0();
    await leaveManagementPage.clickBrowsed();
    await leaveManagementPage.clickOkButton();
    await leaveManagementPage.getToastBrowsed('Đã duyệt thành công');
    await leaveManagementPage.verifyStatusApproved('Đã duyệt');
}

export async function sendAndApproveLeave(page: Page) {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const leaveApplicationPage = new LeaveApplicationPage(page);

    // Employee sends leave application
    await leaveApplicationPage.clickDetailLeaveApplicationButton();
    await leaveApplicationPage.clickSendButton();
    await leaveApplicationPage.clickOKButton();
    await leaveApplicationPage.getToastSend('Gửi duyệt thành công');
    await leaveApplicationPage.Logout();
    await page.waitForTimeout(1200);

    // Admin approves leave application
    await loginPage.goto();
    await loginPage.login(Config.admin_username, Config.admin_password);
    await homePage.clickTimeKeepingManagement();
    await leaveApplicationPage.clickLeaveApplicationButton();
    await leaveApplicationPage.clickDetailLeaveApplicationButton();
    await leaveApplicationPage.clickBrowsedButton();
    await leaveApplicationPage.clickOKButton();
    await leaveApplicationPage.getToastBrowsedSuccess('Phê duyệt thành công');
}

export async function employeeBrowseLeaveManagement(page: Page) {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const leaveManagementPage = new LeaveManagementPage(page);

    await leaveManagementPage.Logout();
    await page.waitForTimeout(1200);
    await loginPage.goto();
    await loginPage.login(Config.employee_username, Config.employee_password);
    await homePage.clickAdmin();
    await leaveManagementPage.clickLeaveManagementButton();
    await leaveManagementPage.clickIconActionRow0();
    await leaveManagementPage.clickBrowsed();
    await leaveManagementPage.clickOkButton();
    await leaveManagementPage.getToastBrowsed('Đã duyệt thành công');
    await leaveManagementPage.verifyStatusApproved('Đã duyệt');
}
