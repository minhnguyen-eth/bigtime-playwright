import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { takeScreenshotOnFailure } from '../../utils/screenshotUtils';
import Config from '../../utils/configUtils';
import { HomePage } from '../../pages/HomePage';
import { LeaveApplicationPage } from '../../pages/LeaveApplicationPage';
import { clearAllLeaveApplications } from '../../utils/mysqlUtils';
import { clearAllLeaveManagements } from '../../utils/mysqlUtils';
import { addAnnualLeaveForEmployeeAndAdmin, sendAndApproveLeave } from './leave_helper';

test.describe.serial('Leave Application Tests', () => {
    let loginPage: LoginPage;
    let leaveApplicationPage: LeaveApplicationPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        leaveApplicationPage = new LeaveApplicationPage(page);
        homePage = new HomePage(page);
        await loginPage.goto();
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('Add annual leave for a employee and admin browsed', async ({ page }) => {
        await clearAllLeaveManagements();
        await addAnnualLeaveForEmployeeAndAdmin(page);
    });

    test('Add leave application with anual leave and send to admin -> admin approve ', async ({ page }) => {
        await clearAllLeaveApplications();
        await loginPage.login(Config.employee_username, Config.employee_password);
        await homePage.clickTimeKeepingManagement();
        await leaveApplicationPage.clickLeaveApplicationButton();
        await leaveApplicationPage.clickAddButton();
        await leaveApplicationPage.clickLeaveTypeDropDown();

        await leaveApplicationPage.clickAnualLeave();
        await leaveApplicationPage.clickStartDate();
        await leaveApplicationPage.clickTodayButton();
        await leaveApplicationPage.clickChosseButton();
        await leaveApplicationPage.clickEndDate();
        await leaveApplicationPage.clickTodayButton();
        await leaveApplicationPage.clickChosseButton();

        await leaveApplicationPage.fillReason('Automation test');
        await leaveApplicationPage.clickSaveButton();
        await leaveApplicationPage.getToastAdd('Thêm thành công');
        await leaveApplicationPage.getVerifyAnualLeave();

        // Send and approve
        await sendAndApproveLeave(page);

    });

    test('Add leave application with regular leave  and send to admin -> admin approve ', async ({ page }) => {
        await clearAllLeaveApplications();
        await loginPage.login(Config.employee_username, Config.employee_password);
        await homePage.clickTimeKeepingManagement();
        await leaveApplicationPage.clickLeaveApplicationButton();
        await leaveApplicationPage.clickAddButton();
        await leaveApplicationPage.clickLeaveTypeDropDown();

        await leaveApplicationPage.clickRegularLeave();
        await leaveApplicationPage.clickStartDate();
        await leaveApplicationPage.clickTodayButton();
        await leaveApplicationPage.clickChosseButton();

        await leaveApplicationPage.clickEndDate();
        await leaveApplicationPage.clickTodayButton();
        await leaveApplicationPage.clickChosseButton();

        await leaveApplicationPage.fillReason('Automation test');
        await leaveApplicationPage.clickSaveButton();
        await leaveApplicationPage.getToastAdd('Thêm thành công');
        await leaveApplicationPage.getVerifyRegularLeave();

        // Send and approve
        await sendAndApproveLeave(page);


    });

    test('Add leave application with social insurance leave and send to admin -> admin approve ', async ({ page }) => {
        await clearAllLeaveApplications();
        await loginPage.login(Config.employee_username, Config.employee_password);
        await homePage.clickTimeKeepingManagement();
        await leaveApplicationPage.clickLeaveApplicationButton();
        await leaveApplicationPage.clickAddButton();
        await leaveApplicationPage.clickLeaveTypeDropDown();

        await leaveApplicationPage.clickSocialInsuranceLeave();
        await leaveApplicationPage.clickStartDate();
        await leaveApplicationPage.clickTodayButton();
        await leaveApplicationPage.clickChosseButton();

        await leaveApplicationPage.clickEndDate();
        await leaveApplicationPage.clickTodayButton();
        await leaveApplicationPage.clickChosseButton();

        await leaveApplicationPage.fillReason('Automation test');
        await leaveApplicationPage.clickSaveButton();
        await leaveApplicationPage.getToastAdd('Thêm thành công');
        await leaveApplicationPage.getVerifySocialInsuranceLeave();

        // Send and approve
        await sendAndApproveLeave(page);
    });

    test('Add leave application with maternity leave and send to admin -> admin approve ', async ({ page }) => {
        await clearAllLeaveApplications();
        await loginPage.login(Config.employee_username, Config.employee_password);
        await homePage.clickTimeKeepingManagement();
        await leaveApplicationPage.clickLeaveApplicationButton();
        await leaveApplicationPage.clickAddButton();
        await leaveApplicationPage.clickLeaveTypeDropDown();
        await leaveApplicationPage.clickMaternityLeave();
        await leaveApplicationPage.clickStartDate();
        await leaveApplicationPage.clickTodayButton();
        await leaveApplicationPage.clickChosseButton();
        await leaveApplicationPage.clickEndDate();
        await leaveApplicationPage.clickTodayButton();
        await leaveApplicationPage.clickChosseButton();
        await leaveApplicationPage.fillReason('Automation test');
        await leaveApplicationPage.clickSaveButton();
        await leaveApplicationPage.getToastAdd('Thêm thành công');
        await leaveApplicationPage.getVerifyMaternityLeave();

        // Send and approve
        await sendAndApproveLeave(page);
    });
    test('Add leave application with special leave and send to admin -> admin approve ', async ({ page }) => {
        await clearAllLeaveApplications();
        await loginPage.login(Config.employee_username, Config.employee_password);
        await homePage.clickTimeKeepingManagement();
        await leaveApplicationPage.clickLeaveApplicationButton();
        await leaveApplicationPage.clickAddButton();
        await leaveApplicationPage.clickLeaveTypeDropDown();
        await leaveApplicationPage.clickSpecialLeave();
        await leaveApplicationPage.clickStartDate();
        await leaveApplicationPage.clickTodayButton();
        await leaveApplicationPage.clickChosseButton();

        await leaveApplicationPage.clickEndDate();
        await leaveApplicationPage.clickTodayButton();
        await leaveApplicationPage.clickChosseButton();

        await leaveApplicationPage.fillReason('Automation test');
        await leaveApplicationPage.clickSaveButton();
        await leaveApplicationPage.getToastAdd('Thêm thành công');
        await leaveApplicationPage.getVerifySpecialLeave();

        // Send and approve
        await sendAndApproveLeave(page);
    });




});
