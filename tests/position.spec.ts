import { test, TestInfo } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { PositionPage } from '../pages/PositionPage';
import { ToastPage } from '../pages/ToastPage';
import { LoginPage } from '../pages/LoginPage';
import { Config } from '../utils/configUtils';
import { clearPosition } from '../utils/mysqlUtils';
import { takeScreenshotOnFailure } from '../utils/screenshotUtils';
import { allure } from 'allure-playwright';

test.describe.serial('Position Tests', () => {
    let basePage: BasePage;
    let positionPage: PositionPage;
    let toastPage: ToastPage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        allure.feature('Position Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        basePage = new BasePage(page);
        positionPage = new PositionPage(page);
        toastPage = new ToastPage(page);
        loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin()
        await positionPage.clickPositions()
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('Create with empty name', async ({ page }) => {
        await clearPosition();
        await basePage.clickAdd();
        await basePage.clickSave()
        await positionPage.checkMsgNameRequired()
    });

    test('Create with lock status', async ({ page }) => {
        const randomName = "Automation test position " + Math.floor(Math.random() * 1000000);
        await basePage.clickAdd();
        await positionPage.inputName(randomName)
        await positionPage.inputNote("Automation test note")
        await positionPage.clickSatatusDropdown()
        await positionPage.clickLockStatus()
        await basePage.clickSave()
        await toastPage.getToastAddSuccess()
        await basePage.verifyLockStatusRow0();
    });

    test('Create New Position Successfully', async ({ page }) => {
        await basePage.clickAdd();
        await positionPage.inputName("Automation test position")
        await positionPage.inputNote("Automation test note")
        await basePage.clickSave()
        await toastPage.getToastAddSuccess()
    });

    test('Edit position active to lock status', async ({ page }) => {
        await basePage.clickEditRow0();
        await positionPage.clickSatatusDropdown()
        await positionPage.clickLockStatus()
        await basePage.clickSave()
        await toastPage.getToastUpdateSuccess()
        await basePage.verifyLockStatusRow0();
    })

    test('Edit position lock to active status', async ({ page }) => {
        await basePage.clickEditRow0();
        await positionPage.clickSatatusDropdown()
        await basePage.clickActivityStatus()
        await basePage.clickSave()
        await toastPage.getToastUpdateSuccess()
        await basePage.verifyActivityStatusRow0();
    })

    test('Create position with empty note', async ({ page }) => {
        await basePage.clickAdd();
        await positionPage.inputName("Automation test position 2")
        await basePage.clickSave()
        await toastPage.getToastAddSuccess()
    });

    test('Create position with existed name', async ({ page }) => {
        await basePage.clickAdd();
        await positionPage.inputName("Project Manager")
        await positionPage.inputNote("Automation test note")
        await basePage.clickSave()
        await positionPage.checkNameExistError()
        await toastPage.getToastAddFailed()
    });

    test('Edit position name and note successfully', async ({ page }) => {
        await basePage.clickEditRow0()
        await positionPage.inputName("Automation test edit position")
        await positionPage.inputNote("Automation test edit note")
        await basePage.clickSave()
        await toastPage.getToastUpdateSuccess()
    });

    test('Search by name', async ({ page }) => {
        await positionPage.inputNameSearch("Project Manager")
        await basePage.clickSearch()
        await positionPage.checkSearchNameResult();
        await basePage.clickClearSearch()
        await positionPage.inputNameSearch("Project")
        await basePage.clickSearch()
        await positionPage.checkSearchNameResult();
    });

    test('Search by name no existed', async ({ page }) => {
        await positionPage.inputNameSearch("Test not existed")
        await basePage.clickSearch()
        await basePage.verifyNoExistData();
    });

    test('Search by status', async ({ page }) => {
        await basePage.clickDropdownStatusSearch()
        await basePage.clickActivityStatus()
        await basePage.clickSearch()
        await basePage.verifyActivityStatusRow0();
        await basePage.clickClearSearch()
        await basePage.clickDropdownStatusSearch()
        await basePage.clickLockStatus()
        await basePage.clickSearch()
        await basePage.verifyLockStatusRow0();
    });

    test('Delete position successfully', async ({ page }) => {
        await basePage.clickDeleteRow0()
        await toastPage.getToastDeleteSuccess()
    });
});