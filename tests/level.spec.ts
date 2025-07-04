import { test, TestInfo, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { takeScreenshotOnFailure } from '../utils/screenshotUtils';
import Config from '../utils/configUtils';
import { allure } from 'allure-playwright';
import { BasePage } from '../pages/BasePage';
import { ToastPage } from '../pages/ToastPage';
import { LevelPage } from '../pages/LevelPage';
import { clearLevel } from '../utils/mysqlUtils';


test.describe.serial('Level Test Suite', () => {

    let loginPage: LoginPage;
    let levelPage: LevelPage;
    let basePage: BasePage;
    let toastPage: ToastPage;

    test.beforeEach(async ({ page }) => {
        allure.feature('Level Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        toastPage = new ToastPage(page);
        levelPage = new LevelPage(page);
        loginPage = new LoginPage(page);
        basePage = new BasePage(page);
        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password)
        await basePage.clickAdmin();
        await levelPage.clickLevel();

    })

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('Create with lock status', async ({ page }) => {
        await clearLevel();
        const random = "Automation test" + Math.random().toString(36).substring(2, 7);
        await basePage.clickAdd();
        await levelPage.fillLevelName(random);
        await levelPage.fillCode(random);
        await basePage.clickIconStatusDropdown();
        await basePage.clickLockStatus();
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
        await basePage.verifyLockStatusRow0();
    });

    test('Create level successfully', async ({ page }) => {
        const random = "Automation test" + Math.random().toString(36).substring(2, 7);
        await basePage.clickAdd();
        await levelPage.fillLevelName(random);
        await levelPage.fillCode(random);
        await levelPage.fillNote("Automation test");
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Create level with blank name', async ({ page }) => {
        const random = "Automation test" + Math.random().toString(36).substring(2, 7);
        await basePage.clickAdd();
        await levelPage.fillCode(random);
        await levelPage.fillNote("Automation test");
        await basePage.clickSave();
        await levelPage.expectValidateNameRequired();
    });

    test('Create level with blank note', async ({ page }) => {
        const random = "Automation test" + Math.random().toString(36).substring(2, 7);
        await basePage.clickAdd();
        await levelPage.fillLevelName(random);
        await levelPage.fillCode(random);
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Create with duplicate name', async ({ page }) => {
        const random = "Automation test" + Math.random().toString(36).substring(2, 7);
        await basePage.clickAdd();
        await levelPage.fillLevelName("Intern");
        await levelPage.fillCode(random);
        await levelPage.fillNote("Automation test");
        await basePage.clickSave();
        await basePage.expectNameExist();
        await toastPage.getToastAddFailed();
    });

    test('Create with duplicate code', async ({ page }) => {
        const random = "Automation test" + Math.random().toString(36).substring(2, 7);
        await basePage.clickAdd();
        await levelPage.fillLevelName(random);
        await levelPage.fillCode("Intern");
        await levelPage.fillNote("Automation test");
        await basePage.clickSave();
        await levelPage.expectValidateCodeExist();
        await toastPage.getToastAddFailed();
    });

    test('Edit note successfully', async ({ page }) => {
        const random = "Automation test" + Math.random().toString(36).substring(2, 7);
        await basePage.clickEditRow0();
        await levelPage.fillNote("Automation test edit");
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
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


    test('Edit name successfully', async ({ page }) => {
        const random = "Automation test" + Math.random().toString(36).substring(2, 7);
        await basePage.clickEditRow0();
        await levelPage.fillLevelName("Automation test edit name");
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit code successfully', async ({ page }) => {
        const random = "Automation test" + Math.random().toString(36).substring(2, 7);
        await basePage.clickEditRow0();
        await levelPage.fillCode(random);
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit name with duplicate name', async ({ page }) => {
        await basePage.clickEditRow0();
        await levelPage.fillLevelName("Intern");
        await basePage.clickSave();
        await basePage.expectNameExist();
        await toastPage.getToastUpdateFailed();
    });

    test('Edit code with duplicate code', async ({ page }) => {
        await basePage.clickEditRow0();
        await levelPage.fillCode("Intern");
        await basePage.clickSave();
        await levelPage.expectValidateCodeExist();
        await toastPage.getToastUpdateFailed();
    });

    test('Edit name with blank name', async ({ page }) => {
        await basePage.clickEditRow0();
        await levelPage.fillLevelName("");
        await basePage.clickSave();
        await levelPage.expectValidateNameRequired();
    });

    test('Edit code with blank code', async ({ page }) => {
        await basePage.clickEditRow0();
        await levelPage.fillCode("");
        await basePage.clickSave();
        await levelPage.expectValidateCodeRequired();
    });

    test('Delete level successfully', async ({ page }) => {
        await basePage.clickDeleteRow0();
        await toastPage.getToastDeleteSuccess();
    });

    test('Search by name', async ({ page }) => {
        await levelPage.fillSearchByName("Fresher");
        await basePage.clickSearch();
        await levelPage.expectSearchByNameResult();
    });

    test('Search by code', async ({ page }) => {
        await levelPage.fillSearchByCode("Fresher");
        await basePage.clickSearch();
        await levelPage.expectSearchByCodeResult();
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

    test('Search with no data', async ({ page }) => {
        await levelPage.fillSearchByName("ksafjjasnfjas");
        await basePage.clickSearch();
        await basePage.verifyNoExistData();
    });

});