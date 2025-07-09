import { test, TestInfo } from '@playwright/test';
import { ToastPage } from '../../pages/ToastPage';
import { LoginPage } from '../../pages/LoginPage';
import { BasePage } from '../../pages/BasePage';
import { takeScreenshotOnFailure } from '../../utils/screenshotUtils';
import Config from '../../utils/configUtils';
import { TermPage } from '../../pages/contract_page/TermPage';
import { clearTerm } from '../../utils/mysqlUtils';
import { allure } from "allure-playwright";

test.describe.serial('Term Tests', () => {
    let termPage: TermPage;
    let toastPage: ToastPage;
    let loginPage: LoginPage;
    let basePage: BasePage;

    test.beforeEach(async ({ page }) => {
        allure.owner("Minh Nguyen");
        allure.feature("Term Feature");
        allure.severity("Critical");

        loginPage = new LoginPage(page);
        toastPage = new ToastPage(page);
        termPage = new TermPage(page);
        basePage = new BasePage(page);

        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin();
        await termPage.clickTerm();

    });
    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('Create term with empty name', async ({ page }) => {
        await clearTerm();
        await basePage.clickAdd();
        await termPage.fillContent('Automatic created term');
        await basePage.clickSave();
        await termPage.validateNameError();
    });

    test('Create term with empty content', async ({ page }) => {
        await basePage.clickAdd();
        await termPage.fillName('Automatic created term');
        await basePage.clickSave();
        await termPage.validateContentError();
    });

    test('Create term with valid data', async ({ page }) => {
        await basePage.clickAdd();
        await termPage.fillName('Automatic created term 1');
        await termPage.fillContent('Automatic created term');
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Create term with duplicate name', async ({ page }) => {
        await basePage.clickAdd();
        await termPage.fillName('Automatic created term 1');
        await termPage.fillContent('Automatic created term');
        await basePage.clickSave();
        await termPage.validateNameDuplicateError();
        await toastPage.getToastAddFailed();
    });

    test('Create term with lock status', async ({ page }) => {
        await basePage.clickAdd();
        await termPage.fillName('Automatic created term with lock status');
        await termPage.fillContent('Automatic created term');
        await termPage.clickDropdownStatus();
        await termPage.clickLockStatus();
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Max length name 255', async ({ page }) => {
        await basePage.clickAdd();
        await termPage.fillName('a'.repeat(255));
        await termPage.fillContent('Automatic created term');
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Max length name over 255', async ({ page }) => {
        await basePage.clickAdd();
        await termPage.fillName('a'.repeat(256));
        await termPage.fillContent('Automatic created term');
        await basePage.clickSave();
        await termPage.validateMaxLengthNameError();
    });

    test('Edit status', async ({ page }) => {
        await basePage.clickEditRow0();
        await termPage.clickDropdownStatus();
        await termPage.clickLockStatus();
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit name with empty name', async ({ page }) => {
        await basePage.clickEditRow0();
        await termPage.fillName('');
        await basePage.clickSave();
        await termPage.validateNameError();
    });

    test('Edit content with empty content', async ({ page }) => {
        await basePage.clickEditRow0();
        await termPage.fillContent('');
        await basePage.clickSave();
        await termPage.validateContentError();
    });

    test('Edit name with valid data', async ({ page }) => {
        await basePage.clickEditRow0();
        await termPage.fillName('Automatic edit name');
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit content with valid data', async ({ page }) => {
        await basePage.clickEditRow0();
        await termPage.fillContent('Automatic edit content');
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Search by status', async ({ page }) => {
        // Search by lock status
        await basePage.clickDropdownStatusSearch();
        await basePage.clickLockStatus();
        await basePage.clickSearch();
        await basePage.verifyLockStatusRow0();
        await basePage.clickClearSearch();

        // Search by active status
        await basePage.clickDropdownStatusSearch();
        await basePage.clickActivityStatus();
        await basePage.clickSearch();
        await basePage.verifyActivityStatusRow0();
    });

    test('Delete term', async ({ page }) => {
        await basePage.clickDeleteRow0();
        await toastPage.getToastDeleteSuccess();
    });
});