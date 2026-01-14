import { test, } from './base-test';
import { LoginPage } from '../../pages/LoginPage';
import Config from '../../utils/configUtils';
import { allure } from 'allure-playwright';
import { LevelPage } from '../../pages/LevelPage';
import { clearLevel } from '../../db/helpers/DBHelper';
import { ToastMessages, ValidationMessages } from '../../constants/MessagesCommon';

test.describe.serial('Level Test Suite', () => {
    let loginPage: LoginPage;
    let levelPage: LevelPage;


    test.beforeEach(async ({ page }) => {
        allure.feature('Level Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        levelPage = new LevelPage(page);
        loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password)
        await levelPage.clickAdmin();
        await levelPage.clickLevel();
    })

    test('Create with lock status successfully', async ({ page }) => {
        await clearLevel();
        const random = "Automation test" + Math.random().toString(36).substring(2, 7);
        await levelPage.clickAdd();
        await levelPage.fillLevelName(random);
        await levelPage.fillCode(random);
        await levelPage.clickDropdownStatusInFormNth1();
        await levelPage.clickLockStatus();
        await levelPage.clickSave();
        await levelPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
        await levelPage.verifyLockStatusRow0();
    });

    test('Create level successfully', async ({ page }) => {
        const random = "Automation test" + Math.random().toString(36).substring(2, 7);
        await levelPage.clickAdd();
        await levelPage.fillLevelName(random);
        await levelPage.fillCode(random);
        await levelPage.fillNote("Automation test");
        await levelPage.clickSave();
        await levelPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test('Create level with blank name', async ({ page }) => {
        const random = "Automation test" + Math.random().toString(36).substring(2, 7);
        await levelPage.clickAdd();
        await levelPage.fillCode(random);
        await levelPage.fillNote("Automation test");
        await levelPage.clickSave();
        await levelPage.expectValidateNameRequired();
    });

    test('Create level with blank note', async ({ page }) => {
        const random = "Automation test" + Math.random().toString(36).substring(2, 7);
        await levelPage.clickAdd();
        await levelPage.fillLevelName(random);
        await levelPage.fillCode(random);
        await levelPage.clickSave();
        await levelPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test('Create with duplicate name', async ({ page }) => {
        const random = "Automation test" + Math.random().toString(36).substring(2, 7);
        await levelPage.clickAdd();
        await levelPage.fillLevelName("Intern");
        await levelPage.fillCode(random);
        await levelPage.fillNote("Automation test");
        await levelPage.clickSave();
        await levelPage.verifyValidationMessage(ValidationMessages.NAME_ALREADY_EXISTS);
        await levelPage.verifyToastMessage(ToastMessages.TOAST_ADD_FAILED);
    });

    test('Create with duplicate code', async ({ page }) => {
        const random = "Automation test" + Math.random().toString(36).substring(2, 7);
        await levelPage.clickAdd();
        await levelPage.fillLevelName(random);
        await levelPage.fillCode("Intern");
        await levelPage.fillNote("Automation test");
        await levelPage.clickSave();
        await levelPage.expectValidateCodeExist();
        await levelPage.verifyToastMessage(ToastMessages.TOAST_ADD_FAILED);
    });

    test('Edit note successfully', async ({ page }) => {
        const random = "Automation test" + Math.random().toString(36).substring(2, 7);
        await levelPage.clickEditRow0();
        await levelPage.fillNote("Automation test edit");
        await levelPage.clickSave();
        await levelPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
    });

    test('Edit active status to lock status', async ({ page }) => {
        await levelPage.clickEditRow0();
        await levelPage.clickDropdownStatusInFormNth1();
        await levelPage.clickLockStatus();
        await levelPage.clickSave();
        await levelPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
        await levelPage.verifyLockStatusRow0();
    });

    test('Edit lock status to active status', async ({ page }) => {
        await levelPage.clickEditRow0();
        await levelPage.clickDropdownStatusInFormNth1();
        await levelPage.clickActivityStatus();
        await levelPage.clickSave();
        await levelPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
        await levelPage.verifyActivityStatusRow0();
    });


    test('Edit name successfully', async ({ page }) => {
        await levelPage.clickEditRow0();
        await levelPage.fillLevelName("Automation test edit name");
        await levelPage.clickSave();
        await levelPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
    });

    test('Edit code successfully', async ({ page }) => {
        const random = "Automation test" + Math.random().toString(36).substring(2, 7);
        await levelPage.clickEditRow0();
        await levelPage.fillCode(random);
        await levelPage.clickSave();
        await levelPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
    });

    test('Edit name with duplicate name', async ({ page }) => {
        await levelPage.clickEditRow0();
        await levelPage.fillLevelName("Intern");
        await levelPage.clickSave();
        await levelPage.verifyValidationMessage(ValidationMessages.NAME_ALREADY_EXISTS);
        await levelPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_FAILED);
    });

    test('Edit code with duplicate code', async ({ page }) => {
        await levelPage.clickEditRow0();
        await levelPage.fillCode("Intern");
        await levelPage.clickSave();
        await levelPage.expectValidateCodeExist();
        await levelPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_FAILED);
    });

    test('Edit name with blank name', async ({ page }) => {
        await levelPage.clickEditRow0();
        await levelPage.fillLevelName("");
        await levelPage.clickSave();
        await levelPage.expectValidateNameRequired();
    });

    test('Edit code with blank code', async ({ page }) => {
        await levelPage.clickEditRow0();
        await levelPage.fillCode("");
        await levelPage.clickSave();
        await levelPage.expectValidateCodeRequired();
    });

    test('Delete level successfully', async ({ page }) => {
        await levelPage.clickDeleteRow0();
        await levelPage.verifyToastMessage(ToastMessages.TOAST_DELETE_SUCCESS);
    });

    test('Search by name', async ({ page }) => {
        await levelPage.fillSearchByName("Fresher");
        await levelPage.clickSearch();
        await levelPage.expectSearchByNameResult();
    });

    test('Search by code', async ({ page }) => {
        await levelPage.fillSearchByCode("Fresher");
        await levelPage.clickSearch();
        await levelPage.expectSearchByCodeResult();
    });

    test('Search by status', async ({ page }) => {
        await levelPage.clickDropdownStatusSearch();
        await levelPage.clickLockStatus();
        await levelPage.clickSearch();
        await levelPage.verifyLockStatusRow0();
        await levelPage.clickClearSearch();

        await levelPage.clickDropdownStatusSearch();
        await levelPage.clickActivityStatus();
        await levelPage.clickSearch();
        await levelPage.verifyActivityStatusRow0();
    });

    test('Search with no data', async ({ page }) => {
        await levelPage.fillSearchByName("ksafjjasnfjas");
        await levelPage.clickSearch();
        await levelPage.verifyNoDataExistInSearch();
    });

    test("Max length of name", async ({ page }) => {
        const random = "Automation test" + Math.random().toString(36).substring(2, 7);
        await levelPage.clickAdd();
        await levelPage.fillLevelName("z".repeat(255));
        await levelPage.fillCode(random);
        await levelPage.fillNote("Automation test");
        await levelPage.clickSave();
        await levelPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test("Max length of code", async ({ page }) => {
        const random = "Automation test" + Math.random().toString(36).substring(2, 7);
        await levelPage.clickAdd();
        await levelPage.fillLevelName("zzzzzzzz");
        await levelPage.fillCode("z".repeat(100));
        await levelPage.fillNote("Automation test");
        await levelPage.clickSave();
        await levelPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test("Max length of note", async ({ page }) => {
        const random = "Automation test" + Math.random().toString(36).substring(2, 7);
        await levelPage.clickAdd();
        await levelPage.fillLevelName("zzzzz");
        await levelPage.fillCode(random);
        await levelPage.fillNote("z".repeat(255));
        await levelPage.clickSave();
        await levelPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test("Max length of note over 255", async ({ page }) => {
        const random = "Automation test" + Math.random().toString(36).substring(2, 7);
        await levelPage.clickAdd();
        await levelPage.fillLevelName("zzzzz12");
        await levelPage.fillCode(random);
        await levelPage.fillNote("z".repeat(256));
        await levelPage.clickSave();
        await levelPage.verifyRequiredField(ValidationMessages.MAX_LENGTH_255);
    });

    test("Max length of name over 255", async ({ page }) => {
        const random = "Automation test" + Math.random().toString(36).substring(2, 7);
        await levelPage.clickAdd();
        await levelPage.fillLevelName("z".repeat(256));
        await levelPage.fillCode(random);
        await levelPage.fillNote("Automation test");
        await levelPage.clickSave();
        await levelPage.verifyRequiredField(ValidationMessages.MAX_LENGTH_255);
    });

    test("Max length of code over 100", async ({ page }) => {
        await levelPage.clickAdd();
        await levelPage.fillLevelName("zzzzzzzz");
        await levelPage.fillCode("z".repeat(101));
        await levelPage.fillNote("Automation test");
        await levelPage.clickSave();
        await levelPage.verifyRequiredField(ValidationMessages.MAX_LENGTH_100);
    });
});   
