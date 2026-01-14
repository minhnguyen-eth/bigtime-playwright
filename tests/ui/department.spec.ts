import { test, } from './base-test';
import { LoginPage } from '../../pages/LoginPage';
import Config from '../../utils/configUtils';
import { allure } from 'allure-playwright';
import { DepartmentPage } from '../../pages/DepartmentPage';
import { clearDepartment } from '../../db/helpers/DBHelper';
import { ToastMessages, ValidationMessages } from '../../constants/MessagesCommon';

test.describe.serial('Department Test', () => {
    let loginPage: LoginPage;
    let departmentPage: DepartmentPage;

    test.beforeEach(async ({ page }) => {
        allure.feature('Department Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        departmentPage = new DepartmentPage(page);
        loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password)
        await departmentPage.clickAdmin();
        await departmentPage.clickDepartment();
    })

    test('Maxlenght name with 255 characters', async ({ page }) => {
        await clearDepartment();
        await departmentPage.clickAdd();
        await departmentPage.fillDepartmentName("z".repeat(255));
        await departmentPage.fillNote("Automation test");
        await departmentPage.clickSave();
        await departmentPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test('Maxlenght name with over 255 characters', async ({ page }) => {
        await departmentPage.clickAdd();
        await departmentPage.fillDepartmentName("z".repeat(256));
        await departmentPage.fillNote("Automation test");
        await departmentPage.clickSave();
        await departmentPage.verifyRequiredField(ValidationMessages.MAX_LENGTH_255);
    });

    test('Maxlenght note with 255 characters', async ({ page }) => {
        const randomName = "Automation test" + Math.random().toString(36).substring(2, 7);
        await departmentPage.clickAdd();
        await departmentPage.fillDepartmentName(randomName);
        await departmentPage.fillNote("z".repeat(255));
        await departmentPage.clickSave();
        await departmentPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test('Maxlenght note with over 255 characters', async ({ page }) => {
        const randomName = "Automation test" + Math.random().toString(36).substring(2, 7);
        await departmentPage.clickAdd();
        await departmentPage.fillDepartmentName(randomName);
        await departmentPage.fillNote("z".repeat(256));
        await departmentPage.clickSave();
        await departmentPage.verifyRequiredField(ValidationMessages.MAX_LENGTH_255);
    });

    test('Create with lock status', async ({ page }) => {
        const randomName = "Automation test" + Math.random().toString(36).substring(2, 7);
        await departmentPage.clickAdd();
        await departmentPage.fillDepartmentName(randomName);
        await departmentPage.fillNote("Automation test");
        await departmentPage.clickDropdownStatusInFormNth1();
        await departmentPage.clickLockStatus();
        await departmentPage.clickSave();
        await departmentPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
        await departmentPage.verifyLockStatusRow0();
    });

    test('Create department with valid data', async ({ page }) => {
        const randomName = "Automation test" + Math.random().toString(36).substring(2, 7);
        await departmentPage.clickAdd();
        await departmentPage.fillDepartmentName(randomName);
        await departmentPage.fillNote("Automation test");
        await departmentPage.clickSave();
        await departmentPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test('Create department with duplicate name', async ({ page }) => {
        await departmentPage.clickAdd();
        await departmentPage.fillDepartmentName("Bộ phận IT");
        await departmentPage.fillNote("Automation test");
        await departmentPage.clickSave();
        await departmentPage.verifyValidationMessage(ValidationMessages.NAME_ALREADY_EXISTS);
        await departmentPage.verifyToastMessage(ToastMessages.TOAST_ADD_FAILED);
    });

    test('Create department with empty name', async ({ page }) => {
        await departmentPage.clickAdd();
        await departmentPage.fillNote("Automation test");
        await departmentPage.clickSave();
        await departmentPage.verifyValidateNameDepartment();
    });

    test('Edit active status to lock status', async ({ page }) => {
        await departmentPage.clickEditRow0();
        await departmentPage.clickDropdownStatusInFormNth1();
        await departmentPage.clickLockStatus();
        await departmentPage.clickSave();
        await departmentPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
        await departmentPage.verifyLockStatusRow0();
    });

    test('Edit lock status to active status', async ({ page }) => {
        await departmentPage.clickEditRow0();
        await departmentPage.clickDropdownStatusInFormNth1();
        await departmentPage.clickActivityStatus();
        await departmentPage.clickSave();
        await departmentPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
        await departmentPage.verifyActivityStatusRow0();
    });

    test('Edit department name successfully', async ({ page }) => {
        const randomName = "Automation test" + Math.random().toString(36).substring(2, 7);
        await departmentPage.clickEditRow0();
        await departmentPage.fillDepartmentName(randomName);
        await departmentPage.clickSave();
        await departmentPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
    });

    test('Edit note successfully', async ({ page }) => {
        await departmentPage.clickEditRow0();
        await departmentPage.fillNote("Automation test");
        await departmentPage.clickSave();
        await departmentPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
    });

    test('Edit department name with duplicate name', async ({ page }) => {
        await departmentPage.clickEditRow0();
        await departmentPage.fillDepartmentName("Bộ phận IT");
        await departmentPage.clickSave();
        await departmentPage.verifyValidationMessage(ValidationMessages.NAME_ALREADY_EXISTS);
        await departmentPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_FAILED);
    });

    test('Edit department name with empty name', async ({ page }) => {
        await departmentPage.clickEditRow0();
        await departmentPage.fillDepartmentName("");
        await departmentPage.clickSave();
        await departmentPage.verifyValidateNameDepartment();
    });

    test('Edit department note successfully', async ({ page }) => {
        await departmentPage.clickEditRow0();
        await departmentPage.fillNote("Automation test");
        await departmentPage.clickSave();
        await departmentPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
    });

    test('Edit department note with empty note', async ({ page }) => {
        await departmentPage.clickEditRow0();
        await departmentPage.fillNote("");
        await departmentPage.clickSave();
        await departmentPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
    });

    test('Delete department successfully', async ({ page }) => {
        await departmentPage.clickDeleteRow0();
        await departmentPage.verifyToastMessage(ToastMessages.TOAST_DELETE_SUCCESS);
    });

    test('Search department by name', async ({ page }) => {
        await departmentPage.fillSearchByNameDepartment("Bộ phận IT");
        await departmentPage.clickSearch();
        await departmentPage.verifySearchByNameResult();
    });

    test('Search with no data', async ({ page }) => {
        await departmentPage.fillSearchByNameDepartment("ksafjjasnfjas");
        await departmentPage.clickSearch();
        await departmentPage.verifyNoDataExistInSearch();
    });

    test('Search by status', async ({ page }) => {
        await departmentPage.clickDropdownStatusSearch();
        await departmentPage.clickLockStatus();
        await departmentPage.clickSearch();
        await departmentPage.verifyLockStatusRow0();
        await departmentPage.clickClearSearch();
        await departmentPage.clickDropdownStatusSearch();
        await departmentPage.clickActivityStatus();
        await departmentPage.clickSearch();
        await departmentPage.verifyActivityStatusRow0();
    });
});
