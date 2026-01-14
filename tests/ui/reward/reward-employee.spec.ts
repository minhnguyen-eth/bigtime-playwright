import { test, } from '../base-test';
import { LoginPage } from '../../../pages/LoginPage';
import Config from '../../../utils/configUtils';
import { allure } from 'allure-playwright';
import { RewardEmployeePage } from '../../../pages/reward_page/RewardEmployeePage';
import { LogoutPage } from '../../../pages/LogoutPage';
import { clearRewardUsers, importRewardUser } from '../../../db/helpers/DBHelper';
import { ToastMessages, ValidationMessages } from '../../../constants/MessagesCommon';

test.describe.serial('Reward Employee Tests', () => {
    let loginPage: LoginPage;
    let rewardEmployeePage: RewardEmployeePage;
    let logoutPage: LogoutPage;

    test.beforeEach(async ({ page }) => {
        allure.feature('Reward Employee Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        logoutPage = new LogoutPage(page);
        loginPage = new LoginPage(page);
        rewardEmployeePage = new RewardEmployeePage(page);
        await loginPage.goto();
    });

    async function beforeTest() {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await rewardEmployeePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
        await rewardEmployeePage.clickAdd();
    }

    async function beforeTestSearch() {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await rewardEmployeePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
    }

    test("Max length of reward name is 255 characters", async ({ page }) => {
        await clearRewardUsers();
        await beforeTest();
        await rewardEmployeePage.fillRewardName('a'.repeat(255));
        await rewardEmployeePage.fillChooseEmployee('Minh');
        await rewardEmployeePage.clickSelectEmployee();
        await rewardEmployeePage.clickChooseRewardType();
        await rewardEmployeePage.clickSelectRewardType();
        await rewardEmployeePage.fillMoney('1000000');
        await rewardEmployeePage.fillDescription('Description');
        await rewardEmployeePage.fillNote('Note');
        await rewardEmployeePage.clickSave();
        await rewardEmployeePage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test("Max length of reward name over 255 characters", async ({ page }) => {
        await beforeTest();
        await rewardEmployeePage.fillRewardName('z'.repeat(256));
        await rewardEmployeePage.fillChooseEmployee('Minh');
        await rewardEmployeePage.clickSelectEmployee();
        await rewardEmployeePage.clickChooseRewardType();
        await rewardEmployeePage.clickSelectRewardType();
        await rewardEmployeePage.fillMoney('1000000');
        await rewardEmployeePage.fillDescription('Description');
        await rewardEmployeePage.fillNote('Note');
        await rewardEmployeePage.clickSave();
        await rewardEmployeePage.verifyRequiredField(ValidationMessages.MAX_LENGTH_255);
    });

    test("Max length of description is 500 characters", async ({ page }) => {
        await beforeTest();
        await rewardEmployeePage.fillRewardName('Test max length of description');
        await rewardEmployeePage.fillChooseEmployee('Minh');
        await rewardEmployeePage.clickSelectEmployee();
        await rewardEmployeePage.clickChooseRewardType();
        await rewardEmployeePage.clickSelectRewardType();
        await rewardEmployeePage.fillMoney('1000000');
        await rewardEmployeePage.fillDescription('a'.repeat(500));
        await rewardEmployeePage.fillNote('Note');
        await rewardEmployeePage.clickSave();
        await rewardEmployeePage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test("Max length of description over 500 characters", async ({ page }) => {
        await beforeTest();
        await rewardEmployeePage.fillRewardName('Test max length of description');
        await rewardEmployeePage.fillChooseEmployee('Minh');
        await rewardEmployeePage.clickSelectEmployee();
        await rewardEmployeePage.clickChooseRewardType();
        await rewardEmployeePage.clickSelectRewardType();
        await rewardEmployeePage.fillMoney('1000000');
        await rewardEmployeePage.fillDescription('z'.repeat(501));
        await rewardEmployeePage.fillNote('Note');
        await rewardEmployeePage.clickSave();
        await rewardEmployeePage.verifyRequiredField(ValidationMessages.MAX_LENGTH_500);
    });

    test("Max length of note is 500 characters", async ({ page }) => {
        await beforeTest();
        await rewardEmployeePage.fillRewardName('Test max length of note');
        await rewardEmployeePage.fillChooseEmployee('Minh');
        await rewardEmployeePage.clickSelectEmployee();
        await rewardEmployeePage.clickChooseRewardType();
        await rewardEmployeePage.clickSelectRewardType();
        await rewardEmployeePage.fillMoney('1000000');
        await rewardEmployeePage.fillDescription('Description');
        await rewardEmployeePage.fillNote('a'.repeat(500));
        await rewardEmployeePage.clickSave();
        await rewardEmployeePage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test("Max length of note over 500 characters", async ({ page }) => {
        await beforeTest();
        await rewardEmployeePage.fillRewardName('Test max length of note');
        await rewardEmployeePage.fillChooseEmployee('Minh');
        await rewardEmployeePage.clickSelectEmployee();
        await rewardEmployeePage.clickChooseRewardType();
        await rewardEmployeePage.clickSelectRewardType();
        await rewardEmployeePage.fillMoney('1000000');
        await rewardEmployeePage.fillDescription('Description');
        await rewardEmployeePage.fillNote('z'.repeat(501));
        await rewardEmployeePage.clickSave();
        await rewardEmployeePage.verifyRequiredField(ValidationMessages.MAX_LENGTH_500);
    });

    test.skip('E2E reward employee - manager send reward to admin approve', async ({ page }) => {
        await clearRewardUsers();
        await loginPage.login(Config.manager_department_username, Config.manager_department_password);
        await rewardEmployeePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();

        // Create reward  
        await rewardEmployeePage.clickAdd();
        await rewardEmployeePage.createReward();
        await rewardEmployeePage.clickSave();
        await rewardEmployeePage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);

        // Send reward to admin
        await rewardEmployeePage.clickRow0();
        await rewardEmployeePage.clickSendAndClickYes();

        await logoutPage.logout();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await rewardEmployeePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
        await rewardEmployeePage.clickRow0();
        await rewardEmployeePage.clickBrowse();
        await rewardEmployeePage.verifyToastMessage(ToastMessages.TOAST_BROWSE_SUCCESS);
        await rewardEmployeePage.verifyBrowsedStatus();
    });

    test.skip('E2E reward employee - manager send reward to admin reject', async ({ page }) => {
        await loginPage.login(Config.manager_department_username, Config.manager_department_password);
        await rewardEmployeePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
        await rewardEmployeePage.clickAdd();
        await rewardEmployeePage.createReward();
        await rewardEmployeePage.clickSave();
        await rewardEmployeePage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);

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
        await rewardEmployeePage.verifyToastMessage(ToastMessages.TOAST_REJECT_SUCCESS);
    });

    test('Create reward with valid information', async ({ page }) => {
        await beforeTest();
        await rewardEmployeePage.createReward();
        await rewardEmployeePage.clickSave();
        await rewardEmployeePage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test.skip('Manager create reward with approved status', async ({ page }) => {
        await loginPage.login(Config.manager_department_username, Config.manager_department_password);
        await rewardEmployeePage.clickAdmin();
        await rewardEmployeePage.clickRewardEmployee();
        await rewardEmployeePage.clickAdd();
        await rewardEmployeePage.fillRewardName('Reward Employee 2');
        await rewardEmployeePage.fillChooseEmployee('Minh');
        await rewardEmployeePage.clickSelectEmployee();
        await rewardEmployeePage.clickChooseRewardType();
        await rewardEmployeePage.clickSelectRewardType();
        await rewardEmployeePage.fillMoney('1000000');
        await rewardEmployeePage.fillDescription('Description 2');
        await rewardEmployeePage.fillNote('Note 2');
        await rewardEmployeePage.clickDropdownStatusInForm();
        await rewardEmployeePage.clickSelectWaitingForApproved();
        await rewardEmployeePage.clickSave();
        await rewardEmployeePage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test('Admin create reward with approved status', async ({ page }) => {
        await beforeTest();
        await rewardEmployeePage.fillRewardName('Reward Employee 2');
        await rewardEmployeePage.fillChooseEmployee('Minh');
        await rewardEmployeePage.clickSelectEmployee();
        await rewardEmployeePage.clickChooseRewardType();
        await rewardEmployeePage.clickSelectRewardType();
        await rewardEmployeePage.fillMoney('1000000');
        await rewardEmployeePage.fillDescription('Description 2');
        await rewardEmployeePage.fillNote('Note 2');
        await rewardEmployeePage.clickDropdownStatusInFormNth1();
        await rewardEmployeePage.clickApprovedStatus();
        await rewardEmployeePage.clickSave();
        await rewardEmployeePage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test('Cancel reward', async ({ page }) => {
        await beforeTest();
        await rewardEmployeePage.fillRewardName('Reward Employee 3');
        await rewardEmployeePage.fillChooseEmployee('Minh');
        await rewardEmployeePage.clickSelectEmployee();
        await rewardEmployeePage.clickChooseRewardType();
        await rewardEmployeePage.clickSelectRewardType();
        await rewardEmployeePage.fillMoney('1000000');
        await rewardEmployeePage.clickSave();
        await rewardEmployeePage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
        await rewardEmployeePage.clickRow0();
        await rewardEmployeePage.clickBrowse();
        await rewardEmployeePage.clickRow0();
        await rewardEmployeePage.clickCancel();
        await rewardEmployeePage.fillReasonAndClickYes('Reason cancel');
        await rewardEmployeePage.verifyToastMessage(ToastMessages.TOAST_CANCELED_SUCCESS);
    });

    test('Create reward with empty description and note ', async ({ page }) => {
        await beforeTest();
        await rewardEmployeePage.fillRewardName('Reward Employee 3');
        await rewardEmployeePage.fillChooseEmployee('Minh');
        await rewardEmployeePage.clickSelectEmployee();
        await rewardEmployeePage.clickChooseRewardType();
        await rewardEmployeePage.clickSelectRewardType();
        await rewardEmployeePage.fillMoney('1000000');
        await rewardEmployeePage.clickSave();
        await rewardEmployeePage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test('Create reward with chosse day reward', async ({ page }) => {
        await beforeTest();
        await rewardEmployeePage.fillRewardName('Reward Employee 4');
        await rewardEmployeePage.fillChooseEmployee('Minh');
        await rewardEmployeePage.clickSelectEmployee();
        await rewardEmployeePage.clickChooseRewardType();
        await rewardEmployeePage.clickSelectRewardType();
        await rewardEmployeePage.fillMoney('1000000');
        await rewardEmployeePage.fillDescription('Description 4');
        await rewardEmployeePage.fillNote('Note 4');
        await rewardEmployeePage.clickDayRewardInForm();
        await rewardEmployeePage.clickDay19();
        await rewardEmployeePage.clickChoose();
        await rewardEmployeePage.clickSave();
        await rewardEmployeePage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);

    });

    test('Save with empty reward name, employee, reward type, money', async ({ page }) => {
        await beforeTest();
        await rewardEmployeePage.clearMoney();
        await rewardEmployeePage.clickSave();
        await rewardEmployeePage.verifyValidationRewardName();
        await rewardEmployeePage.verifyValidationEmployee();
        await rewardEmployeePage.verifyValidationRewardType();
        await rewardEmployeePage.verifyValidationMoney();
    });

    test('Search with reward name', async ({ page }) => {
        await importRewardUser();
        await beforeTestSearch();
        await rewardEmployeePage.fillSearchByRewardName('Reward Employee');
        await rewardEmployeePage.clickSearch();
        await rewardEmployeePage.verifyRewardNameSearch('Reward Employee');
    });

    test('Search by employee name', async ({ page }) => {
        await beforeTestSearch();
        await rewardEmployeePage.fillSearchByEmployee('Nguyễn Văn Minh');
        await rewardEmployeePage.clickSearch();
        await rewardEmployeePage.verifyEmployeeSearch('BAT810 - Nguyễn Văn Minh');
    });

    test('Search by reward type', async ({ page }) => {
        await beforeTestSearch();
        await rewardEmployeePage.fillSearchByRewardType('Khen thưởng 2');
        await rewardEmployeePage.clickSearch();
        await rewardEmployeePage.verifyRewardTypeSearch('Khen thưởng 2');
    });

    test('Search by date', async ({ page }) => {
        await beforeTestSearch();
        await rewardEmployeePage.clickDayReward();
        await rewardEmployeePage.clickOpenMonthOverlayButton();
        await rewardEmployeePage.clickChosseMonthPicker(6);
        await rewardEmployeePage.clickDay19();
        await rewardEmployeePage.clickChoose();
        await rewardEmployeePage.clickSearch();
        await rewardEmployeePage.verifyDateSearch('19-06-2026');
    });

    test('Search by status', async ({ page }) => {
        await beforeTestSearch();

        // Search with approved status
        await rewardEmployeePage.clickDropdownStatusSearch();
        await rewardEmployeePage.clickApprovedStatus();
        await rewardEmployeePage.clickSearch();
        await rewardEmployeePage.verifyApprovedStatusSearch('Đã duyệt');
        await rewardEmployeePage.clickClearSearch();

        // Search with new status
        await rewardEmployeePage.clickDropdownStatusSearch();
        await rewardEmployeePage.clickNewStatus();
        await rewardEmployeePage.clickSearch();
        await rewardEmployeePage.verifyNewStatusSearch('Mới tạo');
        await rewardEmployeePage.clickClearSearch();

        // Search with cancelled status
        await rewardEmployeePage.clickDropdownStatusSearch();
        await rewardEmployeePage.clickCancelledStatus();
        await rewardEmployeePage.clickSearch();
        await rewardEmployeePage.verifyCancelledStatusSearch('Đã hủy');
    });
});
