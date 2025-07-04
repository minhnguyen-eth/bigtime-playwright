import { test, expect , TestInfo } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { PositionPage } from '../pages/PositionPage';
import { ToastPage } from '../pages/ToastPage';
import { LoginPage } from '../pages/LoginPage';
import { Config } from '../utils/configUtils';
import { clearPosition } from '../utils/mysqlUtils';
import { takeScreenshotOnFailure } from '../utils/screenshotUtils';


test.describe.serial('Position Tests', () => {

    let basePage: BasePage;
    let positionPage: PositionPage;
    let toastPage: ToastPage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
        positionPage = new PositionPage(page);
        toastPage = new ToastPage(page);
        loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin()
        await positionPage.clickPositions()

    })
    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('Create with empty name', async ({ page }) => {
        await clearPosition();
        await basePage.clickAdd();
        await basePage.clickSave()
        await positionPage.checkMsgNameRequired()
    });

    test('Create New Position Successfully', async ({ page }) => {
        await basePage.clickAdd();
        await positionPage.inputName("Automation test position")
        await positionPage.inputNote("Automation test note")
        await basePage.clickSave()
        await toastPage.getToastAddSuccess()
    });

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
    });

    test('Delete position successfully', async ({ page }) => {
        await basePage.clickDeleteRow0()
        await toastPage.getToastDeleteSuccess()
    });
});