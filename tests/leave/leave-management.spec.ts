import { test, } from '../base-test';
import { LoginPage } from '../../pages/LoginPage';
import Config from '../../utils/configUtils';
import { LeaveManagementPage } from '../../pages/leave_page/LeaveManagementPage';
import { clearAllLeaveManagements } from '../../db/DBHelper';
import { employeeBrowseLeaveManagement } from './leave-helper';
import { allure } from 'allure-playwright';
import { ToastPage } from '../../pages/ToastPage';
import { BasePage } from '../../pages/BasePage';
import { LogoutPage } from '../../pages/LogoutPage';

test.describe.serial('Leave Management Tests', () => {
    let loginPage: LoginPage;
    let leaveManagementPage: LeaveManagementPage;
    let toastPage: ToastPage;
    let basePage: BasePage;
    let logoutPage: LogoutPage;

    test.beforeEach(async ({ page }) => {

        allure.feature('Leave Management Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        logoutPage = new LogoutPage(page);
        toastPage = new ToastPage(page);
        loginPage = new LoginPage(page);
        leaveManagementPage = new LeaveManagementPage(page);
        basePage = new BasePage(page);
        await loginPage.goto();
    });

    test('Add annual leave for an employee and employee browsed', async ({ page }) => {
        allure.story('Add and Browse Annual Leave');

        await allure.step('Clear previous leave management data', async () => {
            await clearAllLeaveManagements();
        });

        await allure.step('Admin adds annual leave for employee and browses it', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await basePage.clickAdmin();
            await leaveManagementPage.clickLeaveManagementButton();
            await basePage.clickAdd();
            await leaveManagementPage.clickAddEmployee();
            await leaveManagementPage.fillSearchByName();
            await leaveManagementPage.clickSelectAEmployee();
            await leaveManagementPage.clickSaveEmployee();
            await page.waitForTimeout(1000); // Wait for 3 seconds
            await basePage.clickSave();
            await toastPage.getToastAddSuccess();
            await leaveManagementPage.verifyStatusNew('Mới');

            await leaveManagementPage.clickIconActionRow0();
            await basePage.clickConfirm();
            await toastPage.getToastConfirmSuccess();
            await leaveManagementPage.verifyStatusWaitingForApproval('Chờ duyệt');
        });

        await allure.step('Employee browses leave management', async () => {
            await employeeBrowseLeaveManagement(page);
        });
    });

    test('Add annual leave already exists', async ({ page }) => {
        allure.story('Validate Duplicate Annual Leave Entry');

        await allure.step('Admin tries to add existing annual leave record', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await basePage.clickAdmin();
            await leaveManagementPage.clickLeaveManagementButton();
            await basePage.clickAdd();
            await leaveManagementPage.clickComboBoxStatusFormAdd();
            await leaveManagementPage.clickWaitingForApproval();
            await leaveManagementPage.clickAddEmployee();
            await leaveManagementPage.fillSearchByName();
            await leaveManagementPage.clickSelectAEmployee();
            await leaveManagementPage.clickSaveEmployee();
            await leaveManagementPage.clickSaveButton();
            await leaveManagementPage.verifyAnnualLeaveAlreadyExist('Nghỉ phép năm đã tồn tại.');
        });
    });

    test('Add annual leave with status wait for approval and admin browsed', async ({ page }) => {
        allure.story('Add and Browse Annual Leave with Waiting Status');

        await allure.step('Clear previous data and add leave in "Waiting for approval" status', async () => {
            await clearAllLeaveManagements();
            await loginPage.login(Config.admin_username, Config.admin_password);
            await basePage.clickAdmin();
            await leaveManagementPage.clickLeaveManagementButton();
            await basePage.clickAdd();
            await leaveManagementPage.clickComboBoxStatusFormAdd();
            await leaveManagementPage.clickWaitingForApproval();
            await leaveManagementPage.clickAddEmployee();
            await leaveManagementPage.fillSearchByName();
            await leaveManagementPage.clickSelectAEmployee();
            await leaveManagementPage.clickSaveEmployee();
            await leaveManagementPage.clickSaveButton();
            await toastPage.getToastAddSuccess();
            await leaveManagementPage.verifyStatusWaitingForApproval('Chờ duyệt');
        });

        await allure.step('Employee browses leave management', async () => {
            await employeeBrowseLeaveManagement(page);
        });
    });

    test('Add annual leave for a department', async ({ page }) => {
        allure.story('Add Annual Leave for Department');

        await allure.step('Clear previous leave management and add department leave', async () => {
            await clearAllLeaveManagements();
            await loginPage.login(Config.admin_username, Config.admin_password);
            await basePage.clickAdmin();
            await leaveManagementPage.clickLeaveManagementButton();
            await basePage.clickAdd();
            await leaveManagementPage.clickDepartmentAndTeam();
            await leaveManagementPage.clickAddDepatment();
            await leaveManagementPage.clickDepartmentOption();
            await leaveManagementPage.clickSaveDepartmentAndTeam();
            await leaveManagementPage.clickSaveButton();
            await toastPage.getToastAddSuccess();
            await leaveManagementPage.verifyStatusNew('Mới');
        });

        await allure.step('Admin confirms each row and sets status to waiting for approval', async () => {
            await leaveManagementPage.fillSearchEmpployee('Nguyễn Văn Minh');
            await basePage.clickSearch();
            await leaveManagementPage.verifyResultEmployee('Nguyễn Văn Minh');
            await leaveManagementPage.clickIconActionRow0();
            await basePage.clickConfirm();
            await toastPage.getToastConfirmSuccess();
        });

        await allure.step('Employee browses leave management', async () => {
            await employeeBrowseLeaveManagement(page);
        });
    });

    // SEARCH TESTS

    async function beforeSearchTest() {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin();
        await leaveManagementPage.clickLeaveManagementButton();
    }

    test('Search by employee name and year', async ({ page }) => {
        allure.story('Search Leave Management');

        await allure.step('Admin searches leave management by employee name', async () => {
            await beforeSearchTest();
            await leaveManagementPage.fillSearchEmpployee('Nguyễn Văn Minh');
            await basePage.clickSearch();
            await leaveManagementPage.verifyResultEmployee('Nguyễn Văn Minh');
            await basePage.clickClearSearch();
        });

        await allure.step('Admin searches leave management by year', async () => {
            await leaveManagementPage.fillSearchByYear('2025');
            await basePage.clickSearch();
            await leaveManagementPage.verifyResultYear('2025');
        });
    });

    test('Search by pending status', async ({ page }) => {
        allure.story('Search Leave Management by Status');

        await allure.step('Admin searches leave management by status', async () => {
            await beforeSearchTest();
            await leaveManagementPage.clickComboBoxStatus();
            await leaveManagementPage.clicksearchPendingButton();
            await basePage.clickSearch();
            await leaveManagementPage.expectSearchByPendingResult();
        });
    });

    test('Search by reject status', async ({ page }) => {
        allure.story('Search Leave Management by Status');

        await allure.step('Admin searches leave management by status', async () => {
            await beforeSearchTest();
            await leaveManagementPage.clickComboBoxStatus();
            await leaveManagementPage.clickSearchRejectButton();
            await basePage.clickSearch();
            await leaveManagementPage.expectSearchByRejectResult();
        });
    });

    test('Search by approve status', async ({ page }) => {
        allure.story('Search Leave Management by Status');

        await allure.step('Admin searches leave management by status', async () => {
            await beforeSearchTest();
            await leaveManagementPage.clickComboBoxStatus();
            await leaveManagementPage.clickSearchBrowsedButton();
            await basePage.clickSearch();
            await leaveManagementPage.expectSearchByBrowsedResult();
        });
    });

    test('Search by new status', async ({ page }) => {
        allure.story('Search Leave Management by Status');

        await allure.step('Admin searches leave management by status', async () => {
            await beforeSearchTest();
            await leaveManagementPage.clickComboBoxStatus();
            await leaveManagementPage.clickSearchNewButton();
            await basePage.clickSearch();
            await leaveManagementPage.expectSearchByNewResult();
        });
    });
}); 
