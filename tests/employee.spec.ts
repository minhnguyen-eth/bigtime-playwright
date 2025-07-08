import { test, TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { takeScreenshotOnFailure } from '../utils/screenshotUtils';
import Config from '../utils/configUtils';
import { allure } from 'allure-playwright';
import { EmployeePage } from '../pages/EmployeePage';
import { BasePage } from '../pages/BasePage';
import { ResumePage } from '../pages/ResumePage';
import { ToastPage } from '../pages/ToastPage';

test.describe.serial('Employee Tests', () => {
    let loginPage: LoginPage;
    let employeePage: EmployeePage
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
        basePage = new BasePage(page);
        resumePage = new ResumePage(page);
        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin();
        await employeePage.clickUser();
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test(`E2E - Add with role employee`, async ({ page }) => {
        await employeePage.addWithRoleEmployee();

        //Verify
        await basePage.clickRow0();
        await employeePage.expectDateOfBirthIsDisplayed();
        await employeePage.expectDepartmentIsDisplayed();
        await employeePage.expectPositionIsDisplayed();
        await employeePage.expectTeamIsDisplayed();
        await employeePage.expectJoningTheCompanyIsDisplayed();
    });
    test('Test resume with full data valid information', async ({ page }) => {
        await basePage.clickRow0();
        await resumePage.testResumeWithValidData();
        await basePage.clickSave();
        await toastPage.getToastEditSuccess();
    });

    test('Add with basic information and set salary by date ', async ({ page }) => {
        await employeePage.testAddAndSetSalaryByDate();
    });

    test('Add without set salary', async ({ page }) => {
        await employeePage.addWithoutSetSalary();
    });

    test('Add with basic information and edit information', async ({ page }) => {
        await employeePage.testAddEmployee();
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
        await basePage.clickRow0();
        await basePage.clickEdit();
        await employeePage.testFillMoreInformation();
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Save resume with empty information required', async ({ page }) => {
        await basePage.clickRow0();
        await resumePage.testSaveWithEmptyFieldsRequired();
        await basePage.clickSave();
        await resumePage.verifyMsgEthnicityRequired();
        await resumePage.verifyMsgPlaceOfBirthRequired();
        await resumePage.verifyMsgReligionRequired();
        await resumePage.verifyMsgHownTownRequired();

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
