import { test, } from './base-test';
import { LoginPage } from '../pages/LoginPage';
import Config from '../utils/configUtils';
import { allure } from 'allure-playwright';
import { BasePage } from '../pages/BasePage';
import { ToastPage } from '../pages/ToastPage';
import { BranchPage } from '../pages/BranchPage';
import { clearBranch } from '../db/DBHelper';

test.describe.serial('Branch Test', () => {
    let loginPage: LoginPage;
    let branchPage: BranchPage
    let basePage: BasePage;
    let toastPage: ToastPage;

    test.beforeEach(async ({ page }) => {
        allure.feature('Branch Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        toastPage = new ToastPage(page);
        branchPage = new BranchPage(page);
        loginPage = new LoginPage(page);
        basePage = new BasePage(page);
        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password)
        await basePage.clickAdmin();
    })

    test('Create branch with valid information', async ({ page }) => {
        await clearBranch();
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;

        await branchPage.clickBranchButton();
        await basePage.clickAdd();
        await branchPage.fillBranchName(randomString);
        await branchPage.fillShortName(randomString);
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress(randomString);
        await branchPage.fillNoteInput(randomString);
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Create with over number of employee', async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await basePage.clickAdd();
        await branchPage.fillBranchName(randomString);
        await branchPage.fillShortName(randomString);
        await branchPage.fillNumberOfEmployee("1001");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress(randomString);
        await basePage.clickSave();
        await branchPage.verifyMaxNumberOfEmployee();
    });

    test('Create with min number of employee', async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await basePage.clickAdd();
        await branchPage.fillBranchName(randomString);
        await branchPage.fillShortName(randomString);
        await branchPage.fillNumberOfEmployee("99");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress(randomString);
        await basePage.clickSave();
        await branchPage.verifyMinNumberOfEmployee();
    });

    test('Create with duplicate branch name', async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await basePage.clickAdd();
        await branchPage.fillBranchName('Biên Hòa');
        await branchPage.fillShortName(randomString);
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress(randomString);
        await basePage.clickSave();
        await branchPage.verifyBranchExist();
    });

    test('Create with duplicate short name', async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await basePage.clickAdd();
        await branchPage.fillBranchName(randomString);
        await branchPage.fillShortName('BH101');
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress(randomString);
        await basePage.clickSave();
        await branchPage.verifyShortNameExist();
    });

    test('Create with lock status', async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await basePage.clickAdd();
        await branchPage.fillBranchName(randomString);
        await branchPage.fillShortName(randomString);
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress(randomString);
        await basePage.clickIconStatusDropdown();
        await basePage.clickLockStatus();
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
        await basePage.verifyLockStatusRow0();
    });

    test('Create with blank address and note', async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await basePage.clickAdd();
        await branchPage.fillBranchName(randomString);
        await branchPage.fillShortName(randomString);
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await basePage.clickSave();
    });

    test('Create with blank data', async ({ page }) => {
        await branchPage.clickBranchButton();
        await basePage.clickAdd();
        await basePage.clickSave();
        await branchPage.verifyPhoneNumber();
        await branchPage.verifyBranchNameRequired();
        await branchPage.verifyShortNameRequired();
    });

    test('Edit active status to lock status', async ({ page }) => {
        await branchPage.clickBranchButton();
        await basePage.clickEditRow0();
        await basePage.clickIconStatusDropdown();
        await basePage.clickLockStatus();
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
        await basePage.verifyLockStatusRow0();
    });

    test('Edit lock status to active status', async ({ page }) => {
        await branchPage.clickBranchButton();
        await basePage.clickEditRow0();
        await basePage.clickIconStatusDropdown();
        await basePage.clickActivityStatus();
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
        await basePage.verifyActivityStatusRow0();
    });

    test('Edit branch name', async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        await branchPage.clickBranchButton();
        await basePage.clickEditRow0();
        await branchPage.fillBranchName(randomString);
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit short name', async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        await branchPage.clickBranchButton();
        await basePage.clickEditRow0();
        await branchPage.fillShortName(randomString);
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit number of employee', async ({ page }) => {
        await branchPage.clickBranchButton();
        await basePage.clickEditRow0();
        await branchPage.fillNumberOfEmployee("999");
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit phone number', async ({ page }) => {
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await basePage.clickEditRow0();
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit branch address', async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        await branchPage.clickBranchButton();
        await basePage.clickEditRow0();
        await branchPage.fillBranchAddress(randomString);
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit note', async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        await branchPage.clickBranchButton();
        await basePage.clickEditRow0();
        await branchPage.fillNoteInput(randomString);
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit with duplicate branch name', async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        await branchPage.clickBranchButton();
        await basePage.clickEditRow0();
        await branchPage.fillBranchName('Biên Hòa');
        await basePage.clickSave();
        await branchPage.verifyBranchExist();
    });

    test('Edit all fields', async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await basePage.clickEditRow0();
        await branchPage.fillBranchName(randomString);
        await branchPage.fillShortName(randomString);
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress(randomString);
        await branchPage.fillNoteInput(randomString);
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Delete branch', async ({ page }) => {
        await branchPage.clickBranchButton();
        await basePage.clickDeleteRow0();
        await toastPage.getToastDeleteSuccess();
    });

    test('Search by branch name', async ({ page }) => {
        await branchPage.clickBranchButton();
        await branchPage.fillSearchByBranchName("Biên Hòa");
        await basePage.clickSearch();
        await branchPage.verifySearchByNameResult();
    });

    test('Search by status', async ({ page }) => {
        await branchPage.clickBranchButton();
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

    test("Max length of branch name 255 characters", async ({ page }) => {
        await clearBranch();
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await basePage.clickAdd();
        await branchPage.fillBranchName("z".repeat(255));
        await branchPage.fillShortName(randomString);
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress(randomString);
        await branchPage.fillNoteInput(randomString);
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test("Max length of branch name over 255 characters", async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await basePage.clickAdd();
        await branchPage.fillBranchName("z".repeat(256));
        await branchPage.fillShortName(randomString);
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress(randomString);
        await branchPage.fillNoteInput(randomString);
        await basePage.clickSave();
        await basePage.verifyMaxlenght255Charactor();
    });

    test("Max length of short name 50 characters", async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await basePage.clickAdd();
        await branchPage.fillBranchName(randomString);
        await branchPage.fillShortName("z".repeat(50));
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress(randomString);
        await branchPage.fillNoteInput(randomString);
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test("Max length of short name over 50 characters", async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await basePage.clickAdd();
        await branchPage.fillBranchName(randomString);
        await branchPage.fillShortName("z".repeat(51));
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress(randomString);
        await branchPage.fillNoteInput(randomString);
        await basePage.clickSave();
        await branchPage.verifyMaxLengthShortName();
    });

    test("Max length of note 500 characters", async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await basePage.clickAdd();
        await branchPage.fillBranchName(randomString);
        await branchPage.fillShortName(randomString);
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress(randomString);
        await branchPage.fillNoteInput("z".repeat(500));
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test("Max length of branch address 500 characters", async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await basePage.clickAdd();
        await branchPage.fillBranchName(randomString);
        await branchPage.fillShortName(randomString);
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress("z".repeat(500));
        await branchPage.fillNoteInput(randomString);
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test("Max length of note over 500 characters", async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await basePage.clickAdd();
        await branchPage.fillBranchName(randomString);
        await branchPage.fillShortName(randomString);
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress(randomString);
        await branchPage.fillNoteInput("z".repeat(501));
        await basePage.clickSave();
        await toastPage.getToastAddFailed();
    });

    test("Max length of branch address over 500 characters", async ({ page }) => {
        const randomString = "Automation test branch " + Math.random().toString(36).substring(7);
        const phoneNumber = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        await branchPage.clickBranchButton();
        await basePage.clickAdd();
        await branchPage.fillBranchName(randomString);
        await branchPage.fillShortName(randomString);
        await branchPage.fillNumberOfEmployee("999");
        await branchPage.fillPhoneNumber(phoneNumber.toString());
        await branchPage.fillBranchAddress("z".repeat(501));
        await branchPage.fillNoteInput(randomString);
        await basePage.clickSave();
        await basePage.verifyMaxlenght500Charactor();
    });
});
