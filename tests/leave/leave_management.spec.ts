import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { takeScreenshotOnFailure } from '../../utils/screenshotUtils';
import Config from '../../utils/configUtils';
import { HomePage } from '../../pages/HomePage';
import { LeaveManagementPage } from '../../pages/LeaveManagementPage';
import { clearAllLeaveManagements } from '../../utils/mysqlUtils';

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

    test('Add annual leave for a employee and admin browsed', async ({ page }) => {

        await clearAllLeaveManagements();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await leaveManagementPage.clickLeaveManagementButton();
        await leaveManagementPage.clickAddButton();
        await leaveManagementPage.clickAddEmployee();
        await leaveManagementPage.fillSearchByName('Nguyễn Văn Minh');
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

    });

    test('Add annual leave already exists', async ({ page }) => {

        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await leaveManagementPage.clickLeaveManagementButton();
        await leaveManagementPage.clickAddButton();
        await leaveManagementPage.clickStatusDropDown();
        await leaveManagementPage.clickWaitingForApproval();
        await leaveManagementPage.clickAddEmployee();
        await leaveManagementPage.fillSearchByName('Nguyễn Văn Minh');
        await leaveManagementPage.clickSelectAEmployee();
        await leaveManagementPage.clickSaveEmployee();
        await leaveManagementPage.clickSaveButton();
        await leaveManagementPage.verifyAnnualLeaveAlreadyExist('Nghỉ phép năm đã tồn tại.');


    });


    test('Add annual leave for a employee with status wait for approval and admin browsed', async ({ page }) => {

        await clearAllLeaveManagements();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await leaveManagementPage.clickLeaveManagementButton();
        await leaveManagementPage.clickAddButton();
        await leaveManagementPage.clickStatusDropDown();
        await leaveManagementPage.clickWaitingForApproval();
        await leaveManagementPage.clickAddEmployee();
        await leaveManagementPage.fillSearchByName('Nguyễn Văn Minh');
        await leaveManagementPage.clickSelectAEmployee();
        await leaveManagementPage.clickSaveEmployee();
        await leaveManagementPage.clickSaveButton();
        await leaveManagementPage.getToastAdd('Thêm thành công');
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

    });

    test('Add annual leave for a department', async ({ page }) => {
        await clearAllLeaveManagements();

        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await leaveManagementPage.clickLeaveManagementButton();
        await leaveManagementPage.clickAddButton();
        await leaveManagementPage.clickDepartmentAndTeam();
        await leaveManagementPage.clickAddDepatment();
        await leaveManagementPage.clickDepartmentOption();
        await leaveManagementPage.clickSaveDepartmentAndTeam();
        await leaveManagementPage.clickSaveButton();
        await leaveManagementPage.getToastAdd('Thêm thành công');
        await leaveManagementPage.verifyStatusNew('Mới');

        await leaveManagementPage.clickIconActionRow0();
        await leaveManagementPage.clickComfirmButton();
        await leaveManagementPage.clickOkButton();
        await leaveManagementPage.getToastConfirm('Xác nhận thành công');
        await leaveManagementPage.verifyStatusWaitingForApproval('Chờ duyệt');

        await leaveManagementPage.clickIconActionRow1();
        await leaveManagementPage.clickComfirmButton();
        await leaveManagementPage.clickOkButton();

        await leaveManagementPage.clickIconActionRow2();
        await leaveManagementPage.clickComfirmButton();
        await leaveManagementPage.clickOkButton();


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

    });

    test('Search', async ({ page }) => {


        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();

        //Search by employee name 
        await leaveManagementPage.clickLeaveManagementButton();
        await leaveManagementPage.fillSearchEmpployee('Nguyễn Văn Minh');
        await leaveManagementPage.clickSearchButton();
        await leaveManagementPage.verifyResultEmployee('Nguyễn Văn Minh');

        // Search by year
        await leaveManagementPage.fillSearchByYear('2025');
        await leaveManagementPage.clickSearchButton();
        await leaveManagementPage.verifyResultYear('2025');

    });

});
