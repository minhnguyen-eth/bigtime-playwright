import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { takeScreenshotOnFailure } from '../utils/screenshotUtils';
import Config from '../utils/configUtils';
import { HomePage } from '../pages/HomePage';
import { LeaveApplicationPage } from '../pages/LeaveApplicationPage';


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

    test('Add Leave Application', async ({ page }) => {
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

    });

});
