import { test, } from '../base-test';
import { LoginPage } from '../../pages/LoginPage';
import { ToastPage } from '../../pages/ToastPage';
import Config from '../../utils/configUtils';
import { allure } from 'allure-playwright';
import { RewardEmployeePage } from '../../pages/reward_page/RewardEmployeePage';
import { clearAllRewardUsers } from '../../db/DBHelper';
import { BasePage } from '../../pages/BasePage';
import { LogoutPage } from '../../pages/LogoutPage';

test.describe.serial('Reward Employee Tests', () => {
    let loginPage: LoginPage;
    let rewardEmployeePage: RewardEmployeePage;
    let toastPage: ToastPage;
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
        toastPage = new ToastPage(page);
        await loginPage.goto();

    });

    async function beforeTest() {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
        await basePage.clickAdd();
    }

    test("Max length of reward name is 255 characters", async ({ page }) => {
        await beforeTest();
        await rewardEmployeePage.fillRewardName('a'.repeat(255));
        await rewardEmployeePage.fillChosseEmployee('Minh');
        await rewardEmployeePage.clickSelectEmployee();
        await rewardEmployeePage.clickChosseRewardType();
        await rewardEmployeePage.clickSelectRewardType();
        await rewardEmployeePage.fillMoneyInput('1000000');
        await rewardEmployeePage.fillDescriptionInput('Description');
        await rewardEmployeePage.fillNoteInput('Note');
        await basePage.clickSave();
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
        await rewardEmployeePage.fillDescriptionInput('Description');
        await rewardEmployeePage.fillNoteInput('Note');
        await basePage.clickSave();
        await basePage.verifyMaxlenght255Charactor();
    });

    test("Max length of description is 500 characters", async ({ page }) => {
        await beforeTest();
        await rewardEmployeePage.fillRewardName('Test max length of description');
        await rewardEmployeePage.fillChosseEmployee('Minh');
        await rewardEmployeePage.clickSelectEmployee();
        await rewardEmployeePage.clickChosseRewardType();
        await rewardEmployeePage.clickSelectRewardType();
        await rewardEmployeePage.fillMoneyInput('1000000');
        await rewardEmployeePage.fillDescriptionInput('a'.repeat(500));
        await rewardEmployeePage.fillNoteInput('Note');
        await basePage.clickSave();
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
        await rewardEmployeePage.fillDescriptionInput('z'.repeat(501));
        await rewardEmployeePage.fillNoteInput('Note');
        await basePage.clickSave();
        await basePage.verifyMaxlenght500Charactor();
    });

    test("Max length of note is 500 characters", async ({ page }) => {
        await beforeTest();
        await rewardEmployeePage.fillRewardName('Test max length of note');
        await rewardEmployeePage.fillChosseEmployee('Minh');
        await rewardEmployeePage.clickSelectEmployee();
        await rewardEmployeePage.clickChosseRewardType();
        await rewardEmployeePage.clickSelectRewardType();
        await rewardEmployeePage.fillMoneyInput('1000000');
        await rewardEmployeePage.fillDescriptionInput('Description');
        await rewardEmployeePage.fillNoteInput('a'.repeat(500));
        await basePage.clickSave();
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
        await rewardEmployeePage.fillDescriptionInput('Description');
        await rewardEmployeePage.fillNoteInput('z'.repeat(501));
        await basePage.clickSave();
        await basePage.verifyMaxlenght500Charactor();
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
        await toastPage.getToastAddSuccess();

        // Send reward to admin
        await basePage.clickRow0();
        await basePage.clickSend();

        await logoutPage.logout();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
        await basePage.clickRow0();
        await basePage.clickBrowse();
        await toastPage.getToastBrowseSuccess();
        await basePage.verifyBrowsedStatus();
    });

    test('E2E reward employee - manager send reward to admin reject', async ({ page }) => {
        await loginPage.login(Config.manager_username, Config.manager_password);
        await basePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
        await basePage.clickAdd();
        await rewardEmployeePage.CreateReward();
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();

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
        await toastPage.getToastRejectSuccess();
    });

    test('Create reward with valid information', async ({ page }) => {
        await beforeTest();
        await rewardEmployeePage.CreateReward();
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
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
        await rewardEmployeePage.fillDescriptionInput('Description 2');
        await rewardEmployeePage.fillNoteInput('Note 2');
        await rewardEmployeePage.clickStatusDropdownAdd();
        await rewardEmployeePage.clickSelectApproved();
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Cancel reward', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
        await basePage.clickRow0();
        await rewardEmployeePage.clickCancelButton();
        await rewardEmployeePage.fillReasonInput('Reason cancel');
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
        await basePage.clickSave();
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
        await rewardEmployeePage.fillDescriptionInput('Description 4');
        await rewardEmployeePage.fillNoteInput('Note 4');
        await rewardEmployeePage.clickDayRewardAdd();
        await rewardEmployeePage.clickDay19();
        await rewardEmployeePage.clickChosseButton();
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();

    });

    test('Save with empty reward name, employee, reward type, money', async ({ page }) => {
        await beforeTest();
        await rewardEmployeePage.clearMoneyInput();
        await basePage.clickSave();
        await rewardEmployeePage.validateValidationRewardName();
        await rewardEmployeePage.validateValidationEmployee();
        await rewardEmployeePage.validateValidationRewardType();
        await rewardEmployeePage.validateValidationMoney();
    });

    async function beforeTestSearch() {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
    }

    test('Search with reward name', async ({ page }) => {
        await beforeTestSearch();
        await rewardEmployeePage.fillSearchByRewardName('Reward Employee');
        await basePage.clickSearch();
        await rewardEmployeePage.verifySearchByRewardNameSearch();
        await basePage.clickClearSearch();
    });

    test('Search by employee name', async ({ page }) => {
        await beforeTestSearch();
        await rewardEmployeePage.fillSearchByEmployee('Nguyễn Văn Minh');
        await basePage.clickSearch();
        await rewardEmployeePage.verifySearchByEmployeeSearch();
    });

    test('Search by reward type', async ({ page }) => {
        await beforeTestSearch();
        await rewardEmployeePage.fillSearchByRewardType('Khen thưởng 2');
        await basePage.clickSearch();
        await rewardEmployeePage.verifySearchByRewardTypeSearch();
    });

    test('Search by date', async ({ page }) => {
        await beforeTestSearch();
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
        await beforeTestSearch();

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