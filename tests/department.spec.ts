import { test, } from './base-test';
import { LoginPage } from '../pages/LoginPage';
import Config from '../utils/configUtils';
import { allure } from 'allure-playwright';
import { ToastPage } from '../pages/ToastPage';
import { DepartmentPage } from '../pages/DepartmentPage';
import { clearDepartment } from '../db/helpers/DBHelper';
import { ValidationPage } from '../pages/ValidationPage';

test.describe.serial('Department Test', () => {
    let loginPage: LoginPage;
    let departmentPage: DepartmentPage;
    let toastPage: ToastPage;
    let validation: ValidationPage;

    test.beforeEach(async ({ page }) => {
        allure.feature('Department Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        toastPage = new ToastPage(page);
        departmentPage = new DepartmentPage(page);
        loginPage = new LoginPage(page);
        validation = new ValidationPage(page);

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
        await toastPage.getToastAddSuccess();
    });

    test('Maxlenght name with over 255 characters', async ({ page }) => {
        await departmentPage.clickAdd();
        await departmentPage.fillDepartmentName("z".repeat(256));
        await departmentPage.fillNote("Automation test");
        await departmentPage.clickSave();
        await validation.validateMaxLength255Characters();
    });

    test('Maxlenght note with 255 characters', async ({ page }) => {
        const randomName = "Automation test" + Math.random().toString(36).substring(2, 7);
        await departmentPage.clickAdd();
        await departmentPage.fillDepartmentName(randomName);
        await departmentPage.fillNote("z".repeat(255));
        await departmentPage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Maxlenght note with over 255 characters', async ({ page }) => {
        const randomName = "Automation test" + Math.random().toString(36).substring(2, 7);
        await departmentPage.clickAdd();
        await departmentPage.fillDepartmentName(randomName);
        await departmentPage.fillNote("z".repeat(256));
        await departmentPage.clickSave();
        await validation.validateMaxLength255Characters();
    });

    test('Create with lock status', async ({ page }) => {
        const randomName = "Automation test" + Math.random().toString(36).substring(2, 7);
        await departmentPage.clickAdd();
        await departmentPage.fillDepartmentName(randomName);
        await departmentPage.fillNote("Automation test");
        await departmentPage.clickDropdownStatusInForm();
        await departmentPage.clickLockStatus();
        await departmentPage.clickSave();
        await toastPage.getToastAddSuccess();
        await departmentPage.verifyLockStatusRow0();
    });

    test('Create department with valid data', async ({ page }) => {
        const randomName = "Automation test" + Math.random().toString(36).substring(2, 7);
        await departmentPage.clickAdd();
        await departmentPage.fillDepartmentName(randomName);
        await departmentPage.fillNote("Automation test");
        await departmentPage.clickSave();
        await toastPage.getToastAddSuccess();
    });



    test('Create department with duplicate name', async ({ page }) => {
        await departmentPage.clickAdd();
        await departmentPage.fillDepartmentName("Bộ phận IT");
        await departmentPage.fillNote("Automation test");
        await departmentPage.clickSave();
        await validation.validateNameAlreadyExists();
        await toastPage.getToastAddFailed();
    });

    test('Create department with empty name', async ({ page }) => {
        await departmentPage.clickAdd();
        await departmentPage.fillNote("Automation test");
        await departmentPage.clickSave();
        await departmentPage.verifyValidateNameDepartment();
    });

    test('Edit active status to lock status', async ({ page }) => {

        await departmentPage.clickEditRow0();
        await departmentPage.clickDropdownStatusInForm();
        await departmentPage.clickLockStatus();
        await departmentPage.clickSave();
        await toastPage.getToastUpdateSuccess();
        await departmentPage.verifyLockStatusRow0();
    });

    test('Edit lock status to active status', async ({ page }) => {

        await departmentPage.clickEditRow0();
        await departmentPage.clickDropdownStatusInForm();
        await departmentPage.clickActivityStatus();
        await departmentPage.clickSave();
        await toastPage.getToastUpdateSuccess();
        await departmentPage.verifyActivityStatusRow0();
    });

    test('Edit department name successfully', async ({ page }) => {
        const randomName = "Automation test" + Math.random().toString(36).substring(2, 7);
        await departmentPage.clickEditRow0();
        await departmentPage.fillDepartmentName(randomName);
        await departmentPage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit note successfully', async ({ page }) => {
        await departmentPage.clickEditRow0();
        await departmentPage.fillNote("Automation test");
        await departmentPage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit department name with duplicate name', async ({ page }) => {
        await departmentPage.clickEditRow0();
        await departmentPage.fillDepartmentName("Bộ phận IT");
        await departmentPage.clickSave();
        await validation.validateNameAlreadyExists();
        await toastPage.getToastUpdateFailed();
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
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit department note with empty note', async ({ page }) => {
        await departmentPage.clickEditRow0();
        await departmentPage.fillNote("");
        await departmentPage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Delete department successfully', async ({ page }) => {
        await departmentPage.clickDeleteRow0();
        await toastPage.getToastDeleteSuccess();
    });

    test('Search department by name', async ({ page }) => {
        await departmentPage.fillSearchByNameDepartment("Bộ phận IT");
        await departmentPage.clickSearch();
        await departmentPage.verifySearchByNameResult();
    });

    test('Search with no data', async ({ page }) => {
        await departmentPage.fillSearchByNameDepartment("ksafjjasnfjas");
        await departmentPage.clickSearch();
        await validation.validateNoExistData();
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