import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { takeScreenshotOnFailure } from '../../utils/screenshotUtils';
import Config from '../../utils/configUtils';
import { HomePage } from '../../pages/HomePage';
import { LeaveManagementPage } from '../../pages/leave_page/LeaveManagementPage';
import { clearAllLeaveManagements } from '../../utils/mysqlUtils';
import { employeeBrowseLeaveManagement } from './leave_helper';
import { allure } from 'allure-playwright';
import { ToastPage } from '../../pages/ToastPage';

test.describe.serial('Leave Management Tests', () => {
    let loginPage: LoginPage;
    let leaveManagementPage: LeaveManagementPage;
    let homePage: HomePage;
    let toastPage: ToastPage;

    test.beforeEach(async ({ page }) => {

        allure.owner('Minh Nguyen');
        allure.feature('Leave Management Feature');
        allure.severity('Critical');

        toastPage = new ToastPage(page);
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
        await leaveManagementPage.fillSearchByName();
        await leaveManagementPage.clickSelectAEmployee();
        await leaveManagementPage.clickSaveEmployee();
        await leaveManagementPage.clickSaveButton();
        await toastPage.getToastAddSuccess();
        await leaveManagementPage.verifyStatusNew('Mới');

        await leaveManagementPage.clickIconActionRow0();
        await leaveManagementPage.clickComfirmButton();
        await leaveManagementPage.clickOkButton();
        await toastPage.getToastConfirmSuccess();
        await leaveManagementPage.verifyStatusWaitingForApproval('Chờ duyệt');

        // Employee browse leave management
        await employeeBrowseLeaveManagement(page);

    });

    test('Add annual leave already exists', async ({ page }) => {

        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await leaveManagementPage.clickLeaveManagementButton();
        await leaveManagementPage.clickAddButton();
        await leaveManagementPage.clickStatusDropDown();
        await leaveManagementPage.clickWaitingForApproval();
        await leaveManagementPage.clickAddEmployee();
        await leaveManagementPage.fillSearchByName();
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
        await leaveManagementPage.fillSearchByName();
        await leaveManagementPage.clickSelectAEmployee();
        await leaveManagementPage.clickSaveEmployee();
        await leaveManagementPage.clickSaveButton();
        await toastPage.getToastAddSuccess();
        await leaveManagementPage.verifyStatusWaitingForApproval('Chờ duyệt');

        // Employee browse leave management
        await employeeBrowseLeaveManagement(page);

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
        await toastPage.getToastAddSuccess();
        await leaveManagementPage.verifyStatusNew('Mới');

        await leaveManagementPage.clickIconActionRow0();
        await leaveManagementPage.clickComfirmButton();
        await leaveManagementPage.clickOkButton();
        await toastPage.getToastConfirmSuccess();
        await leaveManagementPage.verifyStatusWaitingForApproval('Chờ duyệt');

        await leaveManagementPage.clickIconActionRow1();
        await leaveManagementPage.clickComfirmButton();
        await leaveManagementPage.clickOkButton();

        await leaveManagementPage.clickIconActionRow2();
        await leaveManagementPage.clickComfirmButton();
        await leaveManagementPage.clickOkButton();

        // Employee browse leave management
        await employeeBrowseLeaveManagement(page);

    });

    test('Search by employee name and year', async ({ page }) => {

        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();

        //Search by employee name 
        await leaveManagementPage.clickLeaveManagementButton();
        await leaveManagementPage.fillSearchEmpployee('Nguyễn Văn Minh');
        await leaveManagementPage.clickSearchButton();
        await leaveManagementPage.verifyResultEmployee('Nguyễn Văn Minh');
        await leaveManagementPage.clickClearSearchButton();
        

        // Search by year
        await leaveManagementPage.fillSearchByYear('2025');
        await leaveManagementPage.clickSearchButton();
        await leaveManagementPage.verifyResultYear('2025');

    });
});
