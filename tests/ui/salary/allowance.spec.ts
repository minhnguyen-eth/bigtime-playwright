import { test, } from '../base-test';
import { LoginPage } from '../../../pages/LoginPage';
import { allure } from 'allure-playwright';
import Config from '../../../utils/configUtils';
import { AllowancePage } from '../../../pages/salary_page/AllowancePage';
import { clearAllowanceTypes } from '../../../db/helpers/DBHelper';
import { ToastMessages, ValidationMessages } from '../../../constants/MessagesCommon';

test.describe.serial('Allowance Tests', () => {
    let loginPage: LoginPage;
    let allowancePage: AllowancePage;

    test.beforeEach(async ({ page }) => {
        allure.feature('Allowance Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        loginPage = new LoginPage(page);
        allowancePage = new AllowancePage(page);

        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await allowancePage.clickSalary();
        await allowancePage.clickAllowance();
    });

    test('Save with empty data', async ({ page }) => {
        await clearAllowanceTypes();
        await allowancePage.clickAdd();
        await allowancePage.fillAllowanceMoney('');
        await allowancePage.clickSave();
        await allowancePage.checkMsgAllowanceNameRequired();
        await allowancePage.checkValidationMoneyRequired();
    });

    test('E2E - Create allowance type daily with valid data and verify', async ({ page }) => {
        const randomString = Math.random().toString(36).substring(7);
        await allowancePage.clickAdd();
        await allowancePage.fillAllowanceName(randomString);
        await allowancePage.fillAllowanceMoney('250000');
        await allowancePage.fillNote('Automation test allowance');
        await allowancePage.clickSave();
        await allowancePage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test('Create duplicate allowance name', async ({ page }) => {
        await allowancePage.clickAdd();
        await allowancePage.fillAllowanceName('Phụ cấp tiền ăn');
        await allowancePage.clickSave();
        await allowancePage.verifyToastMessage(ToastMessages.TOAST_ADD_FAILED);
    });
    test('Create duplicate allowance name with backspace', async ({ page }) => {
        await allowancePage.clickAdd();
        await allowancePage.fillAllowanceName('Phụ cấp   tiền ăn');
        await allowancePage.clickSave();
        await allowancePage.verifyToastMessage(ToastMessages.TOAST_ADD_FAILED);
    });

    test('Create allowance type monthly with valid data', async ({ page }) => {
        const randomString = Math.random().toString(36).substring(7);
        await allowancePage.clickAdd();
        await allowancePage.fillAllowanceName(randomString);
        await allowancePage.fillAllowanceMoney('250000');
        await allowancePage.fillNote('Automation test allowance');
        await allowancePage.clickAllowanceTypeDropdown();
        await allowancePage.clickMonthly();
        await allowancePage.clickSave();
        await allowancePage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test('Create with lock status', async ({ page }) => {
        const randomString = Math.random().toString(36).substring(7);
        await allowancePage.clickAdd();
        await allowancePage.fillAllowanceName(randomString);
        await allowancePage.clickDropdownStatusInFormNth1();
        await allowancePage.clickLockStatus();
        await allowancePage.clickSave();
        await allowancePage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test('Create allowance with empty note', async ({ page }) => {
        const randomString = Math.random().toString(36).substring(7);
        await allowancePage.clickAdd();
        await allowancePage.fillAllowanceName(randomString);
        await allowancePage.clickSave();
        await allowancePage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test('Max length of allowance name 255 characters', async ({ page }) => {
        await clearAllowanceTypes();
        await allowancePage.clickAdd();
        await allowancePage.fillAllowanceName('a'.repeat(255));
        await allowancePage.clickSave();
        await allowancePage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test('Max length of allowance over 255 characters', async ({ page }) => {
        await allowancePage.clickAdd();
        await allowancePage.fillAllowanceName('a'.repeat(256));
        await allowancePage.clickSave();
        await allowancePage.verifyRequiredField(ValidationMessages.MAX_LENGTH_255);
    });

    test('Max length of note 500 characters', async ({ page }) => {
        await allowancePage.clickAdd();
        await allowancePage.fillAllowanceName('Automation test');
        await allowancePage.fillNote('a'.repeat(500));
        await allowancePage.clickSave();
        await allowancePage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test('Max length of note over 500 characters', async ({ page }) => {
        await allowancePage.clickAdd();
        await allowancePage.fillAllowanceName('Automation test');
        await allowancePage.fillNote('a'.repeat(501));
        await allowancePage.clickSave();
        await allowancePage.verifyRequiredField(ValidationMessages.MAX_LENGTH_500);
    });

    test('Edit allowance name', async ({ page }) => {
        await allowancePage.clickIconAction();
        await allowancePage.clickEdit();
        await allowancePage.fillAllowanceName('Automation test edit');
        await allowancePage.clickSave();
        await allowancePage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
    });

    test('Edit allowance money', async ({ page }) => {
        await allowancePage.clickIconAction();
        await allowancePage.clickEdit();
        await allowancePage.fillAllowanceMoney('999999');
        await allowancePage.clickSave();
        await allowancePage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
    });

    test('Edit allowance note', async ({ page }) => {
        await allowancePage.clickIconAction();
        await allowancePage.clickEdit();
        await allowancePage.fillNote('Automation test edit note');
        await allowancePage.clickSave();
        await allowancePage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
    });

    test('Edit allowance active status to lock status', async ({ page }) => {
        await allowancePage.clickIconAction();
        await allowancePage.clickEdit();
        await allowancePage.clickDropdownStatusInFormNth1();
        await allowancePage.clickLockStatus();
        await allowancePage.clickSave();
        await allowancePage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
    });

    test('Delete allowance', async ({ page }) => {
        await allowancePage.clickAdd();
        await allowancePage.fillAllowanceName('Testing');
        await allowancePage.clickSave();
        await allowancePage.clickIconAction();
        await allowancePage.clickDelete();
        await allowancePage.verifyToastMessage(ToastMessages.TOAST_DELETE_SUCCESS);
    });

    test('Search by name', async ({ page }) => {
        await allowancePage.fillNameAllowanceSearch('Phụ cấp tiền ăn');
        await allowancePage.clickSearch();
        await allowancePage.checkSearchNameResult();
        await allowancePage.clickClearSearch();
    });

    test('Search by allowance type', async ({ page }) => {
        // search allowance type daily 
        await allowancePage.clickAllowanceTypeDropdownSearch();
        await allowancePage.clickAllowanceTypeDaily();
        await allowancePage.clickSearch();
        await allowancePage.checkAllowanceTypeDailyResult();

        // search allowance type monthly
        await allowancePage.clickClearSearch();
        await allowancePage.clickAllowanceTypeDropdownSearch();
        await allowancePage.clickAllowanceTypeMonthly();
        await allowancePage.clickSearch();
        await allowancePage.checkAllowanceTypeMonthlyResult();

    });
});
