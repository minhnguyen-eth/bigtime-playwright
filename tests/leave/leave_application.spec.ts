import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { takeScreenshotOnFailure } from '../../utils/screenshotUtils';
import Config from '../../utils/configUtils';
import { HomePage } from '../../pages/HomePage';
import { LeaveApplicationPage } from '../../pages/leave_page/LeaveApplicationPage';
import { clearAllLeaveApplications } from '../../utils/mysqlUtils';
import { clearAllLeaveManagements } from '../../utils/mysqlUtils';
import { addAnnualLeaveForEmployeeAndAdmin, sendAndApproveLeave } from './leave_helper';
import { allure } from 'allure-playwright';

test.describe.serial('Leave Application Tests', () => {
    let loginPage: LoginPage;
    let leaveApplicationPage: LeaveApplicationPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {

        allure.feature('Leave Application Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        loginPage = new LoginPage(page);
        leaveApplicationPage = new LeaveApplicationPage(page);
        homePage = new HomePage(page);
        await loginPage.goto();
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('Add annual leave for a employee and admin browsed', async ({ page }) => {
        allure.story('Setup Annual Leave');
        await allure.step('Clear all leave management and add annual leave for employee and admin', async () => {
            await clearAllLeaveManagements();
            await addAnnualLeaveForEmployeeAndAdmin(page);
        });
    });

    test('Add leave application with annual leave and send to admin -> admin approve', async ({ page }) => {
        allure.story('Annual Leave Application Flow');
        await allure.step('Employee applies for annual leave', async () => {
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
        });
        await allure.step('Send and approve leave application', async () => {
            await sendAndApproveLeave(page);
        });
    });

    test('Add leave application with regular leave and send to admin -> admin approve', async ({ page }) => {
        allure.story('Regular Leave Application Flow');
        await allure.step('Employee applies for regular leave', async () => {
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
        });
        await allure.step('Send and approve leave application', async () => {
            await sendAndApproveLeave(page);
        });
    });

    test('Add leave application with social insurance leave and send to admin -> admin approve', async ({ page }) => {
        allure.story('Social Insurance Leave Application Flow');
        await allure.step('Employee applies for social insurance leave', async () => {
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
        });
        await allure.step('Send and approve leave application', async () => {
            await sendAndApproveLeave(page);
        });
    });

    test('Add leave application with maternity leave and send to admin -> admin approve', async ({ page }) => {
        allure.story('Maternity Leave Application Flow');
        await allure.step('Employee applies for maternity leave', async () => {
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
        });
        await allure.step('Send and approve leave application', async () => {
            await sendAndApproveLeave(page);
        });
    });

    test('Add leave application with special leave and send to admin -> admin approve', async ({ page }) => {
        allure.story('Special Leave Application Flow');
        await allure.step('Employee applies for special leave', async () => {
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
        });
        await allure.step('Send and approve leave application', async () => {
            await sendAndApproveLeave(page);
        });
    });

});
