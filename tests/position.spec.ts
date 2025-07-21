import { test, } from './base-test';
import { PositionPage } from '../pages/PositionPage';
import { ToastPage } from '../pages/ToastPage';
import { LoginPage } from '../pages/LoginPage';
import { Config } from '../utils/configUtils';
import { clearPosition } from '../db/helpers/DBHelper';
import { allure } from 'allure-playwright';
import { ValidationPage } from '../pages/ValidationPage';

test.describe.serial('Position Tests', () => {
    
    let positionPage: PositionPage;
    let toastPage: ToastPage;
    let loginPage: LoginPage;
    let validation: ValidationPage;

    test.beforeEach(async ({ page }) => {
        allure.feature('Position Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        validation = new ValidationPage(page);
        positionPage = new PositionPage(page);
        toastPage = new ToastPage(page);
        loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await positionPage.clickAdmin()
        await positionPage.clickPositions()
    });

    test("Max length of name and note ", async ({ page }) => {
        await clearPosition();
        await positionPage.clickAdd();
        await positionPage.inputName("z".repeat(255));
        await positionPage.fillNote("A".repeat(255));
        await positionPage.clickSave()
        await toastPage.getToastAddSuccess()
    });

    test("Max length of over 255 charactor of name ", async ({ page }) => {
        await positionPage.clickAdd();
        await positionPage.inputName("z".repeat(256));
        await positionPage.fillNote("a");
        await positionPage.clickSave()
        await validation.validateMaxLength255Characters();
    });

      test("Max length of over 255 charactor of note ", async ({ page }) => {
        await positionPage.clickAdd();
        await positionPage.inputName("zzzzza");
        await positionPage.fillNote("a".repeat(256));
        await positionPage.clickSave()
        await validation.validateMaxLength255Characters()
    });

    test('Create with empty name', async ({ page }) => {
        await clearPosition();
        await positionPage.clickAdd();
        await positionPage.clickSave()
        await positionPage.checkMsgNameRequired()
    });

    test('Create with lock status', async ({ page }) => {
        const randomName = "Automation test position " + Math.floor(Math.random() * 1000000);
        await positionPage.clickAdd();
        await positionPage.inputName(randomName)
        await positionPage.fillNote("Automation test note")
        await positionPage.clickDropdownStatusInFormNth1()
        await positionPage.clickLockStatus()
        await positionPage.clickSave()
        await toastPage.getToastAddSuccess()
        await positionPage.verifyLockStatusRow0();
    });

    test('Create New Position Successfully', async ({ page }) => {
        await positionPage.clickAdd();
        await positionPage.inputName("Automation test position")
        await positionPage.fillNote("Automation test note")
        await positionPage.clickSave()
        await toastPage.getToastAddSuccess()
    });

    test('Edit position active to lock status', async ({ page }) => {
        await positionPage.clickEditRow0();
        await positionPage.clickDropdownStatusInFormNth1()
        await positionPage.clickLockStatus()
        await positionPage.clickSave()
        await toastPage.getToastUpdateSuccess()
        await positionPage.verifyLockStatusRow0();
    })

    test('Edit position lock to active status', async ({ page }) => {
        await positionPage.clickEditRow0();
        await positionPage.clickDropdownStatusInFormNth1()
        await positionPage.clickActivityStatus()
        await positionPage.clickSave()
        await toastPage.getToastUpdateSuccess()
        await positionPage.verifyActivityStatusRow0();
    })

    test('Create position with empty note', async ({ page }) => {
        await positionPage.clickAdd();
        await positionPage.inputName("Automation test position 2")
        await positionPage.clickSave()
        await toastPage.getToastAddSuccess()
    });

    test('Create position with existed name', async ({ page }) => {
        await positionPage.clickAdd();
        await positionPage.inputName("Project Manager")
        await positionPage.fillNote("Automation test note")
        await positionPage.clickSave()
        await validation.validateNameAlreadyExists()
        await toastPage.getToastAddFailed()
    });

    test('Edit position name and note successfully', async ({ page }) => {
        await positionPage.clickEditRow0()
        await positionPage.inputName("Automation test edit position")
        await positionPage.fillNote("Automation test edit note")
        await positionPage.clickSave()
        await toastPage.getToastUpdateSuccess()
    });

    test('Search by name', async ({ page }) => {
        await positionPage.inputNameSearch("Project Manager")
        await positionPage.clickSearch()
        await positionPage.checkSearchNameResult();
        await positionPage.clickClearSearch()
        await positionPage.inputNameSearch("Project")
        await positionPage.clickSearch()
        await positionPage.checkSearchNameResult();
    });

    test('Search by name no existed', async ({ page }) => {
        await positionPage.inputNameSearch("Test not existed")
        await positionPage.clickSearch()
        await validation.validateNoExistData();
    });

    test('Search by status', async ({ page }) => {
        await positionPage.clickDropdownStatusSearch()
        await positionPage.clickActivityStatus()
        await positionPage.clickSearch()
        await positionPage.verifyActivityStatusRow0();
        await positionPage.clickClearSearch()
        await positionPage.clickDropdownStatusSearch()
        await positionPage.clickLockStatus()
        await positionPage.clickSearch()
        await positionPage.verifyLockStatusRow0();
    });

    test('Delete position successfully', async ({ page }) => {
        await positionPage.clickDeleteRow0()
        await toastPage.getToastDeleteSuccess()
    });
});