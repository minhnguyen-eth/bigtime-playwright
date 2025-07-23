import { test, } from '../base-test';
import { LoginPage } from '../../pages/LoginPage';
import { ToastPage } from '../../pages/ToastPage';
import Config from '../../utils/configUtils';
import { allure } from 'allure-playwright';
import { RewardEmployeePage } from '../../pages/reward_page/RewardEmployeePage';
import { LogoutPage } from '../../pages/LogoutPage';
import { ValidationPage } from '../../pages/ValidationPage';
import { clearRewardUsers } from '../../db/helpers/DBHelper';

test.describe.serial('Reward Employee Tests', () => {
    let loginPage: LoginPage;
    let rewardEmployeePage: RewardEmployeePage;
    let toastPage: ToastPage;
    let validation: ValidationPage;
    let logoutPage: LogoutPage;

    test.beforeEach(async ({ page }) => {
        allure.feature('Reward Employee Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        validation = new ValidationPage(page);
        logoutPage = new LogoutPage(page);
        loginPage = new LoginPage(page);
        rewardEmployeePage = new RewardEmployeePage(page);
        toastPage = new ToastPage(page);
        await loginPage.goto();
    });

    async function beforeTest() {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await rewardEmployeePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
        await rewardEmployeePage.clickAdd();
    }

    test("Max length of reward name is 255 characters", async ({ page }) => {
        await beforeTest();
        await rewardEmployeePage.fillRewardName('a'.repeat(255));
        await rewardEmployeePage.fillChosseEmployee('Minh');
        await rewardEmployeePage.clickSelectEmployee();
        await rewardEmployeePage.clickChosseRewardType();
        await rewardEmployeePage.clickSelectRewardType();
        await rewardEmployeePage.fillMoneyInput('1000000');
        await rewardEmployeePage.fillDescription('Description');
        await rewardEmployeePage.fillNote('Note');
        await rewardEmployeePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test("Max length of reward name over 255 characters", async ({ page }) => {
        await beforeTest();
        await rewardEmployeePage.fillRewardName('z'.repeat(256));
        await rewardEmployeePage.fillChosseEmployee('Minh');
        await rewardEmployeePage.clickSelectEmployee();
        await rewardEmployeePage.clickChosseRewardType();
        await rewardEmployeePage.clickSelectRewardType();
        await rewardEmployeePage.fillMoneyInput('1000000');
        await rewardEmployeePage.fillDescription('Description');
        await rewardEmployeePage.fillNote('Note');
        await rewardEmployeePage.clickSave();
        await validation.validateMaxLength255Characters();
    });

    test("Max length of description is 500 characters", async ({ page }) => {
        await beforeTest();
        await rewardEmployeePage.fillRewardName('Test max length of description');
        await rewardEmployeePage.fillChosseEmployee('Minh');
        await rewardEmployeePage.clickSelectEmployee();
        await rewardEmployeePage.clickChosseRewardType();
        await rewardEmployeePage.clickSelectRewardType();
        await rewardEmployeePage.fillMoneyInput('1000000');
        await rewardEmployeePage.fillDescription('a'.repeat(500));
        await rewardEmployeePage.fillNote('Note');
        await rewardEmployeePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test("Max length of description over 500 characters", async ({ page }) => {
        await beforeTest();
        await rewardEmployeePage.fillRewardName('Test max length of description');
        await rewardEmployeePage.fillChosseEmployee('Minh');
        await rewardEmployeePage.clickSelectEmployee();
        await rewardEmployeePage.clickChosseRewardType();
        await rewardEmployeePage.clickSelectRewardType();
        await rewardEmployeePage.fillMoneyInput('1000000');
        await rewardEmployeePage.fillDescription('z'.repeat(501));
        await rewardEmployeePage.fillNote('Note');
        await rewardEmployeePage.clickSave();
        await validation.validateMaxLength500Characters();
    });

    test("Max length of note is 500 characters", async ({ page }) => {
        await beforeTest();
        await rewardEmployeePage.fillRewardName('Test max length of note');
        await rewardEmployeePage.fillChosseEmployee('Minh');
        await rewardEmployeePage.clickSelectEmployee();
        await rewardEmployeePage.clickChosseRewardType();
        await rewardEmployeePage.clickSelectRewardType();
        await rewardEmployeePage.fillMoneyInput('1000000');
        await rewardEmployeePage.fillDescription('Description');
        await rewardEmployeePage.fillNote('a'.repeat(500));
        await rewardEmployeePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test("Max length of note over 500 characters", async ({ page }) => {
        await beforeTest();
        await rewardEmployeePage.fillRewardName('Test max length of note');
        await rewardEmployeePage.fillChosseEmployee('Minh');
        await rewardEmployeePage.clickSelectEmployee();
        await rewardEmployeePage.clickChosseRewardType();
        await rewardEmployeePage.clickSelectRewardType();
        await rewardEmployeePage.fillMoneyInput('1000000');
        await rewardEmployeePage.fillDescription('Description');
        await rewardEmployeePage.fillNote('z'.repeat(501));
        await rewardEmployeePage.clickSave();
        await validation.validateMaxLength500Characters();
    });

    test.skip('E2E reward employee - manager send reward to admin approve', async ({ page }) => {
        await clearRewardUsers();
        await loginPage.login(Config.manager_username, Config.manager_password);
        await rewardEmployeePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();

        // Create reward  
        await rewardEmployeePage.clickAdd();
        await rewardEmployeePage.CreateReward();
        await rewardEmployeePage.clickSave();
        await toastPage.getToastAddSuccess();

        // Send reward to admin
        await rewardEmployeePage.clickRow0();
        await rewardEmployeePage.clickSendAndClickYes();

        await logoutPage.logout();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await rewardEmployeePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
        await rewardEmployeePage.clickRow0();
        await rewardEmployeePage.clickBrowse();
        await toastPage.getToastBrowseSuccess();
        await rewardEmployeePage.verifyBrowsedStatus();
    });

    test.skip('E2E reward employee - manager send reward to admin reject', async ({ page }) => {
        await loginPage.login(Config.manager_username, Config.manager_password);
        await rewardEmployeePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
        await rewardEmployeePage.clickAdd();
        await rewardEmployeePage.CreateReward();
        await rewardEmployeePage.clickSave();
        await toastPage.getToastAddSuccess();

        // Send reward to admin
        await rewardEmployeePage.clickRow0();
        await rewardEmployeePage.clickSendAndClickYes();

        await logoutPage.logout();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await rewardEmployeePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
        await rewardEmployeePage.clickRow0();
        await rewardEmployeePage.clickReject();
        await rewardEmployeePage.fillReasonAndClickYes('Reason reject');
        await toastPage.getToastRejectSuccess();
    });

    test('Create reward with valid information', async ({ page }) => {
        await beforeTest();
        await rewardEmployeePage.CreateReward();
        await rewardEmployeePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test.skip('Manager create reward with approved status', async ({ page }) => {
        await loginPage.login(Config.manager_username, Config.manager_password);
        await rewardEmployeePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
        await rewardEmployeePage.clickAdd();
        await rewardEmployeePage.fillRewardName('Reward Employee 2');
        await rewardEmployeePage.fillChosseEmployee('Minh');
        await rewardEmployeePage.clickSelectEmployee();
        await rewardEmployeePage.clickChosseRewardType();
        await rewardEmployeePage.clickSelectRewardType();
        await rewardEmployeePage.fillMoneyInput('1000000');
        await rewardEmployeePage.fillDescription('Description 2');
        await rewardEmployeePage.fillNote('Note 2');
        await rewardEmployeePage.clickDropdownStatusInForm();
        await rewardEmployeePage.clickSeclectWaitingForApproved();
        await rewardEmployeePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Admin create reward with approved status', async ({ page }) => {
        await beforeTest();
        await rewardEmployeePage.fillRewardName('Reward Employee 2');
        await rewardEmployeePage.fillChosseEmployee('Minh');
        await rewardEmployeePage.clickSelectEmployee();
        await rewardEmployeePage.clickChosseRewardType();
        await rewardEmployeePage.clickSelectRewardType();
        await rewardEmployeePage.fillMoneyInput('1000000');
        await rewardEmployeePage.fillDescription('Description 2');
        await rewardEmployeePage.fillNote('Note 2');
        await rewardEmployeePage.clickDropdownStatusInForm();
        await rewardEmployeePage.clickSelectApproved();
        await rewardEmployeePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Cancel reward', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await rewardEmployeePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
        await rewardEmployeePage.clickRow0();
        await rewardEmployeePage.clickCancel();
        await rewardEmployeePage.fillReasonAndClickYes('Reason cancel');
        await toastPage.getToastCancelledSuccess();
    });

    test('Create reward with empty description and note ', async ({ page }) => {
        await beforeTest();
        await rewardEmployeePage.fillRewardName('Reward Employee 3');
        await rewardEmployeePage.fillChosseEmployee('Minh');
        await rewardEmployeePage.clickSelectEmployee();
        await rewardEmployeePage.clickChosseRewardType();
        await rewardEmployeePage.clickSelectRewardType();
        await rewardEmployeePage.fillMoneyInput('1000000');
        await rewardEmployeePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Create reward with chosse day reward', async ({ page }) => {
        await beforeTest();
        await rewardEmployeePage.fillRewardName('Reward Employee 4');
        await rewardEmployeePage.fillChosseEmployee('Minh');
        await rewardEmployeePage.clickSelectEmployee();
        await rewardEmployeePage.clickChosseRewardType();
        await rewardEmployeePage.clickSelectRewardType();
        await rewardEmployeePage.fillMoneyInput('1000000');
        await rewardEmployeePage.fillDescription('Description 4');
        await rewardEmployeePage.fillNote('Note 4');
        await rewardEmployeePage.clickDayRewardAdd();
        await rewardEmployeePage.clickDay19();
        await rewardEmployeePage.clickChoose();
        await rewardEmployeePage.clickSave();
        await toastPage.getToastAddSuccess();

    });

    test('Save with empty reward name, employee, reward type, money', async ({ page }) => {
        await beforeTest();
        await rewardEmployeePage.clearMoneyInput();
        await rewardEmployeePage.clickSave();
        await rewardEmployeePage.validateValidationRewardName();
        await rewardEmployeePage.validateValidationEmployee();
        await rewardEmployeePage.validateValidationRewardType();
        await rewardEmployeePage.validateValidationMoney();
    });

    async function beforeTestSearch() {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await rewardEmployeePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
    }

    test('Search with reward name', async ({ page }) => {
        await beforeTestSearch();
        await rewardEmployeePage.fillSearchByRewardName('Reward Employee');
        await rewardEmployeePage.clickSearch();
        await rewardEmployeePage.verifySearchByRewardNameSearch();
        await rewardEmployeePage.clickClearSearch();
    });

    test('Search by employee name', async ({ page }) => {
        await beforeTestSearch();
        await rewardEmployeePage.fillSearchByEmployee('Nguyễn Văn Minh');
        await rewardEmployeePage.clickSearch();
        await rewardEmployeePage.verifySearchByEmployeeSearch();
    });

    test('Search by reward type', async ({ page }) => {
        await beforeTestSearch();
        await rewardEmployeePage.fillSearchByRewardType('Khen thưởng 2');
        await rewardEmployeePage.clickSearch();
        await rewardEmployeePage.verifySearchByRewardTypeSearch();
    });

    test('Search by date', async ({ page }) => {
        await beforeTestSearch();
        await rewardEmployeePage.clickDayReward();
        await rewardEmployeePage.clickMonthButton();
        await rewardEmployeePage.clickMonth06Button();
        await rewardEmployeePage.clickDay19();
        await rewardEmployeePage.clickChoose();
        await rewardEmployeePage.clickSearch();
        await rewardEmployeePage.verifySearchByDateSearch();
        await rewardEmployeePage.clickClearSearch();
    });

    test('Search by status', async ({ page }) => {
        await beforeTestSearch();

        // Search with approved status
        await rewardEmployeePage.clickDropdownStatusSearch();
        await rewardEmployeePage.clickApprovedStatus();
        await rewardEmployeePage.clickSearch();
        await rewardEmployeePage.verifyApprovedStatusSearch();
        await rewardEmployeePage.clickClearSearch();

        // Search with new status
        await rewardEmployeePage.clickDropdownStatusSearch();
        await rewardEmployeePage.clickNewStatus();
        await rewardEmployeePage.clickSearch();
        await rewardEmployeePage.verifyNewStatusSearch();
        await rewardEmployeePage.clickClearSearch();

        // Search with cancelled status
        await rewardEmployeePage.clickDropdownStatusSearch();
        await rewardEmployeePage.clickCancelledStatus();
        await rewardEmployeePage.clickSearch();
        await rewardEmployeePage.verifyCancelledStatusSearch();
    });
});
