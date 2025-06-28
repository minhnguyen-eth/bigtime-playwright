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
import { BasePage } from '../../pages/BasePage';
import { ToastPage } from '../../pages/ToastPage';
import { LogoutPage } from '../../pages/LogoutPage';

test.describe.serial('Leave Application Tests', () => {
    let loginPage: LoginPage;
    let leaveApplicationPage: LeaveApplicationPage;
    let homePage: HomePage;
    let basePage: BasePage;
    let toastPage: ToastPage;
    let logoutPage: LogoutPage;

    test.beforeEach(async ({ page }) => {

        allure.feature('Leave Application Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        logoutPage = new LogoutPage(page);
        loginPage = new LoginPage(page);
        leaveApplicationPage = new LeaveApplicationPage(page);
        homePage = new HomePage(page);
        basePage = new BasePage(page);
        toastPage = new ToastPage(page);
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
            await basePage.clickAdd();
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
            await toastPage.getToastAddSuccess();
            await leaveApplicationPage.getVerifyAnualLeave();
        });
        await allure.step('Send and approve leave application', async () => {
            await sendAndApproveLeave(page);
        });
    });

    test('Admin reject leave application', async ({ page }) => {
        allure.story('Admin Reject Annual Leave Application Flow');
        await allure.step('Employee applies for annual leave', async () => {
            await clearAllLeaveApplications();
            await loginPage.login(Config.employee_username, Config.employee_password);
            await homePage.clickTimeKeepingManagement();
            await leaveApplicationPage.clickLeaveApplicationButton();
            await basePage.clickAdd();
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
            await toastPage.getToastAddSuccess();
            await leaveApplicationPage.getVerifyAnualLeave();
        });
        await allure.step('Send to admin and admin reject leave application', async () => {
            await leaveApplicationPage.clickRow0();
            await basePage.clickSend();
            await leaveApplicationPage.getToastSend('Gửi duyệt thành công');
            await logoutPage.logout();
            await loginPage.login(Config.admin_username, Config.admin_password);
            await leaveApplicationPage.clickRow0();
            await basePage.clickReject();
            await basePage.fillReason('Automation test');
            await toastPage.getToastRejectSuccess();
        });
    });

    test('Add leave application with regular leave and send to admin -> admin approve', async ({ page }) => {
        allure.story('Regular Leave Application Flow');
        await allure.step('Employee applies for regular leave', async () => {
            await clearAllLeaveApplications();
            await loginPage.login(Config.employee_username, Config.employee_password);
            await homePage.clickTimeKeepingManagement();
            await leaveApplicationPage.clickLeaveApplicationButton();
            await basePage.clickAdd();
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
            await basePage.clickAdd();
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
            await toastPage.getToastAddSuccess();
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
            await basePage.clickAdd();
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
            await toastPage.getToastAddSuccess();
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
            await basePage.clickAdd();
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
            await toastPage.getToastAddSuccess();
            await leaveApplicationPage.getVerifySpecialLeave();
        });
        await allure.step('Send and approve leave application', async () => {
            await sendAndApproveLeave(page);
        });
    });

});
