import { test, TestInfo } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ToastPage } from '../../pages/ToastPage';
import { LogoutPage } from '../../pages/LogoutPage';
import { BasePage } from '../../pages/BasePage';
import { allure } from 'allure-playwright';
import { takeScreenshotOnFailure } from "../../utils/screenshotUtils";
import Config from '../../utils/configUtils';
import { AllowancePage } from '../../pages/salary_page/AllowancePage';
import { clearAllowanceType } from '../../utils/mysqlUtils';

test.describe.serial('Allowance Test', () => {
    let loginPage: LoginPage;
    let toastPage: ToastPage;
    let logoutPage: LogoutPage;
    let basePage: BasePage;
    let allowancePage: AllowancePage;

    test.beforeEach(async ({ page }) => {
        allure.feature('Allowance Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        loginPage = new LoginPage(page);
        allowancePage = new AllowancePage(page);
        toastPage = new ToastPage(page);
        logoutPage = new LogoutPage(page);
        basePage = new BasePage(page);

        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickSalary();
        await allowancePage.clickAllowance();
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });


    test('Save with empty data', async ({ page }) => {
        await clearAllowanceType();
        await basePage.clickAdd();
        await allowancePage.fillAllwanceMoney('');
        await basePage.clickSave();
        await allowancePage.checkMsgAllowanceNameRequired();
        await allowancePage.checkValidationMoneyRequired();
    });

    test('Create allowance type daily with valid data', async ({ page }) => {
        const randomString = Math.random().toString(36).substring(7);
        await basePage.clickAdd();
        await allowancePage.fillAllwanceName(randomString);
        await allowancePage.fillAllwanceMoney('250000');
        await allowancePage.fillNote('Automation test allowance');
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Create duplicate allowance name', async ({ page }) => {
        await basePage.clickAdd();
        await allowancePage.fillAllwanceName('Phụ cấp tiền ăn');
        await basePage.clickSave();
        await allowancePage.checkValidationNameExist();
    });
    test('Create duplicate allowance name with backspace', async ({ page }) => {
        await basePage.clickAdd();
        await allowancePage.fillAllwanceName('Phụ cấp   tiền ăn');
        await basePage.clickSave();
        await allowancePage.checkValidationNameExist();
    });

    test('Create allowance type monthly with valid data', async ({ page }) => {
        const randomString = Math.random().toString(36).substring(7);
        await basePage.clickAdd();
        await allowancePage.fillAllwanceName(randomString);
        await allowancePage.fillAllwanceMoney('250000');
        await allowancePage.fillNote('Automation test allowance');
        await allowancePage.clickAllowanceTypeDropdown();
        await allowancePage.clickMonthly();
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Create with lock status', async ({ page }) => {
        const randomString = Math.random().toString(36).substring(7);
        await basePage.clickAdd();
        await allowancePage.fillAllwanceName(randomString);
        await allowancePage.clickStatusDropdown();
        await allowancePage.clickLockStatus();
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Create allowance with empty note', async ({ page }) => {
        const randomString = Math.random().toString(36).substring(7);
        await basePage.clickAdd();
        await allowancePage.fillAllwanceName(randomString);
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Max length of allowance name 255 characters', async ({ page }) => {
        await basePage.clickAdd();
        await allowancePage.fillAllwanceName('a'.repeat(255));
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Max length of allowance over 255 characters', async ({ page }) => {
        await basePage.clickAdd();
        await allowancePage.fillAllwanceName('a'.repeat(256));
        await basePage.clickSave();
        await allowancePage.checkValidationNameMaxLength255();
    });

    test('Max length of note 500 characters', async ({ page }) => {
        await basePage.clickAdd();
        await allowancePage.fillAllwanceName('Automation test');
        await allowancePage.fillNote('a'.repeat(500));
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Max length of note over 500 characters', async ({ page }) => {
        await basePage.clickAdd();
        await allowancePage.fillAllwanceName('Automation test');
        await allowancePage.fillNote('a'.repeat(501));
        await basePage.clickSave();
        await allowancePage.checkValidationNoteMaxLength500();
    });

    test('Edit allowance name', async ({ page }) => {
        await basePage.clickEditRow0();
        await allowancePage.fillAllwanceName('Automation test edit');
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit allowance money', async ({ page }) => {
        await basePage.clickEditRow0();
        await allowancePage.fillAllwanceMoney('999999');
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit allowance note', async ({ page }) => {
        await basePage.clickEditRow0();
        await allowancePage.fillNote('Automation test edit note');
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit allowance active status to lock status', async ({ page }) => {
        await basePage.clickEditRow0();
        await allowancePage.clickStatusDropdown();
        await allowancePage.clickLockStatus();
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();

        await basePage.clickEditRow0();
        await allowancePage.clickStatusDropdown();
        await allowancePage.clickActivityStatus();
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Delete allowance', async ({ page }) => {
        await basePage.clickDeleteRow0();
        await toastPage.getToastDeleteSuccess();
    });

    test('Search by name', async ({ page }) => {
        await allowancePage.fillNameAllowanceSearch('Phụ cấp tiền ăn');
        await basePage.clickSearch();
        await allowancePage.checkSearchNameResult();
        await basePage.clickClearSearch();
    });

    test('Search by allowance type', async ({ page }) => {
        // search allowance type daily 
        await allowancePage.clickAllowanceTypeDropdownSearch();
        await allowancePage.clickAllowanceTypeDaily();
        await basePage.clickSearch();
        await allowancePage.checkAllowanceTypeDailyResult();

        // search allowance type monthly
        await basePage.clickClearSearch();
        await allowancePage.clickAllowanceTypeDropdownSearch();
        await allowancePage.clickAllowanceTypeMonthly();
        await basePage.clickSearch();
        await allowancePage.checkAllowanceTypeMonthlyResult();

    });
});