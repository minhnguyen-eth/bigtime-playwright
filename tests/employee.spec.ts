import { test, TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { takeScreenshotOnFailure } from '../utils/screenshotUtils';
import Config from '../utils/configUtils';
import { allure } from 'allure-playwright';
import { EmployeePage } from '../pages/EmployeePage';
import { HomePage } from '../pages/HomePage';
import { BasePage } from '../pages/BasePage';
import { ResumePage } from '../pages/ResumePage';
import { ToastPage } from '../pages/ToastPage';


test.describe.serial('Employee Tests', () => {
    let loginPage: LoginPage;
    let employeePage: EmployeePage
    let homePage: HomePage;
    let basePage: BasePage;
    let resumePage: ResumePage;
    let toastPage: ToastPage;

    test.beforeEach(async ({ page }) => {
        allure.feature('Employee Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        toastPage = new ToastPage(page);
        employeePage = new EmployeePage(page);
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        basePage = new BasePage(page);
        resumePage = new ResumePage(page);
        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await employeePage.clickUser();

    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test(`Add with role employee`, async ({ page }) => {
        await employeePage.addWithRoleEmployee();
    });

    test('Test resume with full data valid information', async ({ page }) => {
        await basePage.clickRow0();
        await resumePage.testResumeWithValidData();
        await basePage.clickSave();
        await toastPage.getToastEditSuccess();
    });

    test('Add and set daily salary ', async ({ page }) => {
        await employeePage.addAndSetDailySalary();
    });

    test('Add with invalid email', async ({ page }) => {
        await employeePage.addWithInValidEmail();
    });

    test('Add with role department management', async ({ page }) => {
        await employeePage.addWithRoleDepartmentManager();
    });

    test('Add with duplicate employee code and email', async ({ page }) => {
        await employeePage.addWithDuplicateCodeAndEmail();
    });

    test('Save without any information', async ({ page }) => {
        await employeePage.testSaveWithoutAnyInformation();
    });

    test('Edit employee name', async ({ page }) => {
        await employeePage.testEditEmployeeName();
    });

    test('Edit employee code', async ({ page }) => {
        await employeePage.testEditEmployeeCode();
    });

    test('Delete user', async ({ page }) => {
        await employeePage.deleteAUser();
    });

    test('Search user', async ({ page }) => {
        await employeePage.searchByEmployeeCode();
        await employeePage.searchByEmployeeName();
        await employeePage.searchByEmployeeCodeAndName();
        await employeePage.searchByGender();
    });
});
