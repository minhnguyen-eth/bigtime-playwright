import { test, } from '../base-test';
import { ToastPage } from '../../pages/ToastPage';
import { LoginPage } from '../../pages/LoginPage';
import Config from '../../utils/configUtils';
import { TermPage } from '../../pages/contract_page/TermPage';
import { clearTerm } from '../../db/DBHelper';
import { allure } from "allure-playwright";
import { ValidationPage } from '../../pages/ValidationPage';

test.describe.serial('Term Tests', () => {
    let termPage: TermPage;
    let toastPage: ToastPage;
    let loginPage: LoginPage;
    let validation: ValidationPage;

    test.beforeEach(async ({ page }) => {
        allure.owner("Minh Nguyen");
        allure.feature("Term Feature");
        allure.severity("Critical");

        loginPage = new LoginPage(page);
        toastPage = new ToastPage(page);
        termPage = new TermPage(page);
        validation = new ValidationPage(page);

        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        
        await termPage.clickTerm();
    });

    test('Create term with empty name', async ({ page }) => {
        await clearTerm();
        await termPage.clickAdd();
        await termPage.fillContent('Automatic created term');
        await termPage.clickSave();
        await termPage.validateNameError();
    });

    test('Create term with empty content', async ({ page }) => {
        await termPage.clickAdd();
        await termPage.fillName('Automatic created term');
        await termPage.clickSave();
        await termPage.validateContentError();
    });

    test('Create term with valid data', async ({ page }) => {
        await termPage.clickAdd();
        await termPage.fillName('Automatic created term 1');
        await termPage.fillContent('Automatic created term');
        await termPage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Create term with duplicate name', async ({ page }) => {
        await termPage.clickAdd();
        await termPage.fillName('Automatic created term 1');
        await termPage.fillContent('Automatic created term');
        await termPage.clickSave();
        await termPage.validateNameDuplicateError();
        await toastPage.getToastAddFailed();
    });

    test('Create term with lock status', async ({ page }) => {
        await termPage.clickAdd();
        await termPage.fillName('Automatic created term with lock status');
        await termPage.fillContent('Automatic created term');
        await termPage.clickDropdownStatusInForm();
        await termPage.clickLockStatus();
        await termPage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Max length name 255 character', async ({ page }) => {
        await termPage.clickAdd();
        await termPage.fillName('a'.repeat(255));
        await termPage.fillContent('Automatic created term');
        await termPage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Max length name over 255 character', async ({ page }) => {
        await termPage.clickAdd();
        await termPage.fillName('a'.repeat(256));
        await termPage.fillContent('Automatic created term');
        await termPage.clickSave();
        await termPage.validateMaxLengthNameError();
    });

    test('Max length note 255 character', async ({ page }) => {
        await termPage.clickAdd();
        await termPage.fillName('Automatic created term max length note');
        await termPage.fillContent('a'.repeat(255));
        await termPage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Max length note over 255 character', async ({ page }) => {
        await termPage.clickAdd();
        await termPage.fillName('Automatic created term max length note');
        await termPage.fillContent('a'.repeat(256));
        await termPage.clickSave();
        await validation.validateMaxLength255Characters();
    });

    test('Edit status', async ({ page }) => {
        await termPage.clickEditRow0();
        await termPage.clickDropdownStatusInForm();
        await termPage.clickLockStatus();
        await termPage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit name with empty name', async ({ page }) => {
        await termPage.clickEditRow0();
        await termPage.fillName('');
        await termPage.clickSave();
        await termPage.validateNameError();
    });

    test('Edit content with empty content', async ({ page }) => {
        await termPage.clickEditRow0();
        await termPage.fillContent('');
        await termPage.clickSave();
        await termPage.validateContentError();
    });

    test('Edit name with valid data', async ({ page }) => {
        await termPage.clickEditRow0();
        await termPage.fillName('Automatic edit name');
        await termPage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit content with valid data', async ({ page }) => {
        await termPage.clickEditRow0();
        await termPage.fillContent('Automatic edit content');
        await termPage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Search by status', async ({ page }) => {
        // Search by lock status
        await termPage.clickDropdownStatusSearch();
        await termPage.clickLockStatus();
        await termPage.clickSearch();
        await termPage.verifyLockStatusRow0();
        await termPage.clickClearSearch();

        // Search by active status
        await termPage.clickDropdownStatusSearch();
        await termPage.clickActivityStatus();
        await termPage.clickSearch();
        await termPage.verifyActivityStatusRow0();
    });

    test('Delete term', async ({ page }) => {
        await termPage.clickDeleteRow0();
        await toastPage.getToastDeleteSuccess();
    });
});