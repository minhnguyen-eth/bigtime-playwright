import { test, } from './base-test';
import { LoginPage } from '../pages/LoginPage';
import Config from '../utils/configUtils';
import { allure } from 'allure-playwright';
import { BasePage } from '../pages/BasePage';
import { ToastPage } from '../pages/ToastPage';
import { DepartmentPage } from '../pages/DepartmentPage';
import { clearDepartment } from '../db/DBHelper';


test.describe.serial('Department Test', () => {
    let loginPage: LoginPage;
    let departmentPage: DepartmentPage;
    let basePage: BasePage;
    let toastPage: ToastPage;

    test.beforeEach(async ({ page }) => {
        allure.feature('Department Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        toastPage = new ToastPage(page);
        departmentPage = new DepartmentPage(page);
        loginPage = new LoginPage(page);
        basePage = new BasePage(page);
        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password)
        await basePage.clickAdmin();
        await departmentPage.clickDepartment();
    })

    test('Maxlenght name with 255 characters', async ({ page }) => {
        await clearDepartment();
        await basePage.clickAdd();
        await departmentPage.fillDepartmentName("z".repeat(255));
        await departmentPage.fillNote("Automation test");
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Maxlenght name with over 255 characters', async ({ page }) => {
        await basePage.clickAdd();
        await departmentPage.fillDepartmentName("z".repeat(256));
        await departmentPage.fillNote("Automation test");
        await basePage.clickSave();
        await basePage.verifyMaxlenght255Charactor();
    });

    test('Maxlenght note with 255 characters', async ({ page }) => {
        const randomName = "Automation test" + Math.random().toString(36).substring(2, 7);
        await basePage.clickAdd();
        await departmentPage.fillDepartmentName(randomName);
        await departmentPage.fillNote("z".repeat(255));
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Maxlenght note with over 255 characters', async ({ page }) => {
        const randomName = "Automation test" + Math.random().toString(36).substring(2, 7);
        await basePage.clickAdd();
        await departmentPage.fillDepartmentName(randomName);
        await departmentPage.fillNote("z".repeat(256));
        await basePage.clickSave();
        await basePage.verifyMaxlenght255Charactor();
    });

    test('Create with lock status', async ({ page }) => {
        const randomName = "Automation test" + Math.random().toString(36).substring(2, 7);
        await basePage.clickAdd();
        await departmentPage.fillDepartmentName(randomName);
        await departmentPage.fillNote("Automation test");
        await basePage.clickIconStatusDropdown();
        await basePage.clickLockStatus();
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
        await basePage.verifyLockStatusRow0();
    });

    test('Create department with valid data', async ({ page }) => {
        const randomName = "Automation test" + Math.random().toString(36).substring(2, 7);
        await basePage.clickAdd();
        await departmentPage.fillDepartmentName(randomName);
        await departmentPage.fillNote("Automation test");
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
    });



    test('Create department with duplicate name', async ({ page }) => {
        await basePage.clickAdd();
        await departmentPage.fillDepartmentName("Bộ phận IT");
        await departmentPage.fillNote("Automation test");
        await basePage.clickSave();
        await basePage.expectNameExist();
        await toastPage.getToastAddFailed();
    });

    test('Create department with empty name', async ({ page }) => {
        await basePage.clickAdd();
        await departmentPage.fillNote("Automation test");
        await basePage.clickSave();
        await departmentPage.verifyValidateNameDepartment();
    });

    test('Edit active status to lock status', async ({ page }) => {

        await basePage.clickEditRow0();
        await basePage.clickIconStatusDropdown();
        await basePage.clickLockStatus();
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
        await basePage.verifyLockStatusRow0();
    });

    test('Edit lock status to active status', async ({ page }) => {

        await basePage.clickEditRow0();
        await basePage.clickIconStatusDropdown();
        await basePage.clickActivityStatus();
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
        await basePage.verifyActivityStatusRow0();
    });

    test('Edit department name successfully', async ({ page }) => {
        const randomName = "Automation test" + Math.random().toString(36).substring(2, 7);
        await basePage.clickEditRow0();
        await departmentPage.fillDepartmentName(randomName);
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit note successfully', async ({ page }) => {
        await basePage.clickEditRow0();
        await departmentPage.fillNote("Automation test");
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit department name with duplicate name', async ({ page }) => {
        await basePage.clickEditRow0();
        await departmentPage.fillDepartmentName("Bộ phận IT");
        await basePage.clickSave();
        await basePage.expectNameExist();
        await toastPage.getToastUpdateFailed();
    });

    test('Edit department name with empty name', async ({ page }) => {
        await basePage.clickEditRow0();
        await departmentPage.fillDepartmentName("");
        await basePage.clickSave();
        await departmentPage.verifyValidateNameDepartment();
    });

    test('Edit department note successfully', async ({ page }) => {
        await basePage.clickEditRow0();
        await departmentPage.fillNote("Automation test");
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit department note with empty note', async ({ page }) => {
        await basePage.clickEditRow0();
        await departmentPage.fillNote("");
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Delete department successfully', async ({ page }) => {
        await basePage.clickDeleteRow0();
        await toastPage.getToastDeleteSuccess();
    });

    test('Search department by name', async ({ page }) => {
        await departmentPage.fillSearchByNameDepartment("Bộ phận IT");
        await basePage.clickSearch();
        await departmentPage.verifySearchByNameResult();
    });

    test('Search with no data', async ({ page }) => {
        await departmentPage.fillSearchByNameDepartment("ksafjjasnfjas");
        await basePage.clickSearch();
        await basePage.verifyNoExistData();
    });

    test('Search by status', async ({ page }) => {
        await basePage.clickDropdownStatusSearch();
        await basePage.clickLockStatus();
        await basePage.clickSearch();
        await basePage.verifyLockStatusRow0();
        await basePage.clickClearSearch();

        await basePage.clickDropdownStatusSearch();
        await basePage.clickActivityStatus();
        await basePage.clickSearch();
        await basePage.verifyActivityStatusRow0();
    });

});