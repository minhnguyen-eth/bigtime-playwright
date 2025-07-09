import { test, TestInfo } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { takeScreenshotOnFailure } from '../../utils/screenshotUtils';
import { ToastPage } from '../../pages/ToastPage';
import { RewardTypePage } from '../../pages/reward_page/RewardTypePage';
import Config from '../../utils/configUtils';
import { allure } from 'allure-playwright';
import { RewardEmployeePage } from '../../pages/reward_page/RewardEmployeePage';
import { clearAllRewardUsers } from '../../utils/mysqlUtils';
import { BasePage } from '../../pages/BasePage';
import { LogoutPage } from '../../pages/LogoutPage';

test.describe.serial('Reward Employee Tests', () => {
    let loginPage: LoginPage;
    let rewardEmployeePage: RewardEmployeePage;
    let toast: ToastPage;
    let basePage: BasePage;
    let logoutPage: LogoutPage;

    test.beforeEach(async ({ page }) => {

        allure.feature('Reward Employee Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        basePage = new BasePage(page);
        logoutPage = new LogoutPage(page);
        loginPage = new LoginPage(page);
        rewardEmployeePage = new RewardEmployeePage(page);
        toast = new ToastPage(page);
        await loginPage.goto();

    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('E2E reward employee - manager send reward to admin approve', async ({ page }) => {
        await clearAllRewardUsers();
        await loginPage.login(Config.manager_username, Config.manager_password);
        await basePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();

        // Create reward  
        await basePage.clickAdd();
        await rewardEmployeePage.CreateReward();
        await basePage.clickSave();
        await toast.getToastAddSuccess();

        // Send reward to admin
        await basePage.clickRow0();
        await basePage.clickSend();

        await logoutPage.logout();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
        await basePage.clickRow0();
        await basePage.clickBrowse();
        await toast.getToastBrowseSuccess();
        await basePage.verifyBrowsedStatus();
    });

    test('E2E reward employee - manager send reward to admin reject', async ({ page }) => {
        await loginPage.login(Config.manager_username, Config.manager_password);
        await basePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
        await basePage.clickAdd();
        await rewardEmployeePage.CreateReward();
        await basePage.clickSave();
        await toast.getToastAddSuccess();

        // Send reward to admin
        await basePage.clickRow0();
        await basePage.clickSend();

        await logoutPage.logout();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
        await basePage.clickRow0();
        await basePage.clickReject();
        await rewardEmployeePage.fillReasonInput('Reason reject');
        await toast.getToastRejectSuccess();
    });


    test('Create reward with valid information', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
        await basePage.clickAdd();
        await rewardEmployeePage.CreateReward();
        await basePage.clickSave();
        await toast.getToastAddSuccess();
    });

    test('Manager create reward with approved status', async ({ page }) => {
        await loginPage.login(Config.manager_username, Config.manager_password);
        await basePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
        await basePage.clickAdd();
        await rewardEmployeePage.fillRewardName('Reward Employee 2');
        await rewardEmployeePage.fillChosseEmployee('Minh');
        await rewardEmployeePage.clickSelectEmployee();
        await rewardEmployeePage.clickChosseRewardType();
        await rewardEmployeePage.clickSelectRewardType();
        await rewardEmployeePage.fillMoneyInput('1000000');
        await rewardEmployeePage.fillDescriptionInput('Description 2');
        await rewardEmployeePage.fillNoteInput('Note 2');
        await rewardEmployeePage.clickStatusDropdownAdd();
        await rewardEmployeePage.clickSeclectWaitingForApproved();
        await basePage.clickSave();
        await toast.getToastAddSuccess();
    });

    test('Admin create reward with approved status', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
        await basePage.clickAdd();
        await rewardEmployeePage.fillRewardName('Reward Employee 2');
        await rewardEmployeePage.fillChosseEmployee('Minh');
        await rewardEmployeePage.clickSelectEmployee();
        await rewardEmployeePage.clickChosseRewardType();
        await rewardEmployeePage.clickSelectRewardType();
        await rewardEmployeePage.fillMoneyInput('1000000');
        await rewardEmployeePage.fillDescriptionInput('Description 2');
        await rewardEmployeePage.fillNoteInput('Note 2');
        await rewardEmployeePage.clickStatusDropdownAdd();
        await rewardEmployeePage.clickSelectApproved();
        await basePage.clickSave();
        await toast.getToastAddSuccess();
    });

    test('Cancel reward', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
        await basePage.clickRow0();
        await basePage.clickCancel();
        await rewardEmployeePage.fillReasonInput('Reason cancel');
        await toast.getToastCancelledSuccess();
    });

    test('Create reward with empty description and note ', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
        await basePage.clickAdd();
        await rewardEmployeePage.fillRewardName('Reward Employee 3');
        await rewardEmployeePage.fillChosseEmployee('Minh');
        await rewardEmployeePage.clickSelectEmployee();
        await rewardEmployeePage.clickChosseRewardType();
        await rewardEmployeePage.clickSelectRewardType();
        await rewardEmployeePage.fillMoneyInput('1000000');
        await basePage.clickSave();
        await toast.getToastAddSuccess();
    });

    test('Create reward with chosse day reward', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
        await basePage.clickAdd();
        await rewardEmployeePage.fillRewardName('Reward Employee 4');
        await rewardEmployeePage.fillChosseEmployee('Minh');
        await rewardEmployeePage.clickSelectEmployee();
        await rewardEmployeePage.clickChosseRewardType();
        await rewardEmployeePage.clickSelectRewardType();
        await rewardEmployeePage.fillMoneyInput('1000000');
        await rewardEmployeePage.fillDescriptionInput('Description 4');
        await rewardEmployeePage.fillNoteInput('Note 4');
        await rewardEmployeePage.clickDayRewardAdd();
        await rewardEmployeePage.clickDay19();
        await rewardEmployeePage.clickChosseButton();
        await basePage.clickSave();
        await toast.getToastAddSuccess();

    });

    test('Save with empty reward name, employee, reward type, money', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
        await basePage.clickAdd();
        await rewardEmployeePage.clearMoneyInput();
        await basePage.clickSave();
        await rewardEmployeePage.validateValidationRewardName();
        await rewardEmployeePage.validateValidationEmployee();
        await rewardEmployeePage.validateValidationRewardType();
        await rewardEmployeePage.validateValidationMoney();
    });

    test('Search with reward name', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
        await rewardEmployeePage.fillSearchByRewardName('Reward Employee');
        await basePage.clickSearch();
        await rewardEmployeePage.verifySearchByRewardNameSearch();
        await basePage.clickClearSearch();
    });

    test('Search by employee name', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
        await rewardEmployeePage.fillSearchByEmployee('Nguyễn Văn Minh');
        await basePage.clickSearch();
        await rewardEmployeePage.verifySearchByEmployeeSearch();
    });

    test('Search by reward type', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
        await rewardEmployeePage.fillSearchByRewardType('Khen thưởng 2');
        await basePage.clickSearch();
        await rewardEmployeePage.verifySearchByRewardTypeSearch();
    });

    test('Search by date', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
        await rewardEmployeePage.clickDayReward();
        await rewardEmployeePage.clickMonthButton();
        await rewardEmployeePage.clickMonth06Button();
        await rewardEmployeePage.clickDay19();
        await basePage.clickChoose();
        await basePage.clickSearch();
        await rewardEmployeePage.verifySearchByDateSearch();
        await basePage.clickClearSearch();
    });

    test('Search by status', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();

        // Search with approved status
        await rewardEmployeePage.clickStatusDropdownSearch();
        await rewardEmployeePage.clickApprovedStatus();
        await basePage.clickSearch();
        await rewardEmployeePage.verifyApprovedStatusSearch();
        await basePage.clickClearSearch();

        // Search with new status
        await rewardEmployeePage.clickStatusDropdownSearch();
        await rewardEmployeePage.clickNewStatus();
        await basePage.clickSearch();
        await rewardEmployeePage.verifyNewStatusSearch();
        await basePage.clickClearSearch();

        // Search with cancelled status
        await rewardEmployeePage.clickStatusDropdownSearch();
        await rewardEmployeePage.clickCancelledStatus();
        await basePage.clickSearch();
        await rewardEmployeePage.verifyCancelledStatusSearch();
    });
});