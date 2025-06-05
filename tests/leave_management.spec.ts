import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { takeScreenshotOnFailure } from '../utils/screenshotUtils';
import Config from '../utils/configUtils';
import { HomePage } from '../pages/HomePage';
import { LeaveManagementPage } from '../pages/LeaveManagementPage';
import { clearAllLeaveManagements } from '../utils/mysqlUtils';

test.describe.serial('Leave Management Tests', () => {
    let loginPage: LoginPage;
    let leaveManagementPage: LeaveManagementPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        leaveManagementPage = new LeaveManagementPage(page);
        homePage = new HomePage(page);

        await loginPage.goto();

    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('Add Annual Leave ', async ({ page }) => {

        await clearAllLeaveManagements();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await leaveManagementPage.clickLeaveManagementButton();
        await leaveManagementPage.clickAddButton();
        await leaveManagementPage.clickAddEmployeeAndPart();
        await leaveManagementPage.fillSearchByName('Nguyễn Văn Minh');
        await leaveManagementPage.clickSelectAEmployee();
        await leaveManagementPage.clickSaveEmployee();
        await leaveManagementPage.clickSaveButton();
        await leaveManagementPage.getToastAdd('Thêm thành công');

        await leaveManagementPage.clickIconAction();
        await leaveManagementPage.clickComfirmButton();
        await leaveManagementPage.clickOkButton();
        await leaveManagementPage.getToastConfirm('Xác nhận thành công');

        await leaveManagementPage.clickLogout();
        await leaveManagementPage.clickLogoutConfirm();
        await page.waitForTimeout(2000);

        await loginPage.goto();
        await loginPage.login(Config.employee_username, Config.employee_password);
        await homePage.clickAdmin();
        await leaveManagementPage.clickLeaveManagementButton();
        await leaveManagementPage.clickIconAction();
        await leaveManagementPage.clickBrowsed();
        await leaveManagementPage.clickOkButton();
        await leaveManagementPage.getToastBrowsed('Đã duyệt thành công');
    



    });

});
