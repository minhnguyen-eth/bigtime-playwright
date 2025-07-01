import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { takeScreenshotOnFailure } from '../../utils/screenshotUtils';
import Config from '../../utils/configUtils';
import { WorkShiftPage } from '../../pages/work_shift_page/WorkShiftPage';
import { HomePage } from '../../pages/HomePage';
import { allure } from 'allure-playwright';
import { clearAllWorkingShift } from '../../utils/mysqlUtils';
import { ToastPage } from '../../pages/ToastPage';

test.describe.serial('Work Shift Tests', () => {
    let loginPage: LoginPage;
    let workShiftPage: WorkShiftPage;
    let homePage: HomePage;
    let toastPage: ToastPage;

    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const workShiftName = `Automation test ${randomSuffix}`;
    const workShiftCode = 'AT' + randomSuffix;

    test.beforeEach(async ({ page }) => {

        allure.feature('Work Shift Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        toastPage = new ToastPage(page);
        loginPage = new LoginPage(page);
        workShiftPage = new WorkShiftPage(page);
        homePage = new HomePage(page);
        await loginPage.goto();
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('Create new work shift', async ({ page }) => {
        allure.story('Create Work Shift Story');
        await clearAllWorkingShift();

        await allure.step('Login to system', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
        });

        await allure.step('Navigate to Work Shift page', async () => {
            await homePage.clickTimeKeepingManagement();
            await workShiftPage.clickOnWorkShiftButton();
        });

        await allure.step('Fill work shift form', async () => {
            await workShiftPage.clickOnAddButton();
            await workShiftPage.fillWorkShiftName(workShiftName);
            await workShiftPage.fillWorkShiftCode(workShiftCode);

            await workShiftPage.clickStartTime();
            await workShiftPage.clickChosseHourPicker();
            await workShiftPage.clickOnChosse08HourPicker();
            await workShiftPage.clickOnChosseMinutePicker();
            await workShiftPage.clickOnChosse00MinutePicker();
            await workShiftPage.clickOnChosseButtonPicker();

            await workShiftPage.clickEndTime();
            await workShiftPage.clickChosseHourPicker();
            await workShiftPage.clickOnChosse17HourPicker();
            await workShiftPage.clickOnChosseMinutePicker();
            await workShiftPage.clickOnChosse00MinutePicker();
            await workShiftPage.clickOnChosseButtonPicker();

            await workShiftPage.clickOnRestCheckBox();

            await workShiftPage.clickOnTimeStartRest();
            await workShiftPage.clickChosseHourPicker();
            await workShiftPage.clickOnChosse12HourPicker();
            await workShiftPage.clickOnChosseMinutePicker();
            await workShiftPage.clickOnChosse00MinutePicker();
            await workShiftPage.clickOnChosseButtonPicker();

            await workShiftPage.clickOnTimeEndRest();
            await workShiftPage.clickChosseHourPicker();
            await workShiftPage.clickChosse13HourPicker();
            await workShiftPage.clickOnChosseMinutePicker();
            await workShiftPage.clickOnChosse00MinutePicker();
            await workShiftPage.clickOnChosseButtonPicker();
            await workShiftPage.getVerifyWorkingTime();
        });

        await allure.step('Select branch and save', async () => {
            await workShiftPage.clickOnBranchDropdown();
            await workShiftPage.clickOnBranchBienHoa();
            await workShiftPage.clickOnSaveButton();
            await toastPage.getToastAddSuccess();
        });
    });

    test('Edit and delete work shift', async ({ page }) => {
        allure.story('Edit & Delete Work Shift Story');
        allure.step('Login to system and navigate to Work Shift page', async () => { })
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickTimeKeepingManagement();
        await workShiftPage.clickOnWorkShiftButton();

        await allure.step('Edit work shift status', async () => {
            await workShiftPage.clickOnEditButton();
            await workShiftPage.clickOnStatusDropdown();
            await workShiftPage.clickOnLockStatus();
            await workShiftPage.clickOnSaveButton();
            await toastPage.getToastUpdateSuccess();
            await workShiftPage.getVerifyLockStatus();
        });

        await allure.step('Delete work shift', async () => {
            await workShiftPage.clickOnDeleteButton();
            await workShiftPage.clickOkButton();
            await toastPage.getToastDeleteSuccess();
        });

    });

    test('Search work shift', async ({ page }) => {
        allure.story('Search Work Shift Story');

        await allure.step('Login to system and navigate to Work Shift page', async () => { })
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickTimeKeepingManagement();
        await workShiftPage.clickOnWorkShiftButton();

        await allure.step('Search by name and code', async () => {
            await workShiftPage.fillWorkShiftNameSearchField('Ca ngày');
            await workShiftPage.fillWorkShiftCodeSearchField('CN');
            await workShiftPage.clickOnSearchButton();
            await workShiftPage.getVerifyWorkShiftName();
            await workShiftPage.getVerifyWorkShiftCode();
            await workShiftPage.clickOnClearSearchButton();
        });

        await allure.step('Search by name only', async () => {
            await workShiftPage.fillWorkShiftNameSearchField('Ca ngày');
            await workShiftPage.clickOnSearchButton();
            await workShiftPage.getVerifyWorkShiftName();
            await workShiftPage.clickOnClearSearchButton();
        });

        await allure.step('Search by code only', async () => {
            await workShiftPage.fillWorkShiftCodeSearchField('CN');
            await workShiftPage.clickOnSearchButton();
            await workShiftPage.getVerifyWorkShiftCode();
            await workShiftPage.clickOnClearSearchButton();
        });

        await allure.step('Search by branch', async () => {
            await workShiftPage.clickOnBranchDropdownSearch();
            await workShiftPage.clickOnBranchBienHoaSearch();
            await workShiftPage.clickOnSearchButton();
            await workShiftPage.getVerifyBranchBienHoaSearch();
            await workShiftPage.clickOnClearSearchButton();
        });

        await allure.step('Search by Active status', async () => {
            await workShiftPage.clickOnStatusDropdownSearch();
            await workShiftPage.clickOnStatus('Active');
            await workShiftPage.clickOnSearchButton();
            await workShiftPage.getVerifyAtiveStatusSearch();
            await workShiftPage.clickOnClearSearchButton();
        });

        await allure.step('Search by Lock status', async () => {
            await workShiftPage.clickOnStatusDropdownSearch();
            await workShiftPage.clickOnStatus('Lock');
            await workShiftPage.clickOnSearchButton();
            await workShiftPage.getVerifyLockStatusSearch();
            await workShiftPage.clickOnClearSearchButton();
        });

        await allure.step('Search by Active & Lock status', async () => {
            await workShiftPage.clickOnStatusDropdownSearch();
            await workShiftPage.clickOnStatus('Active');
            await workShiftPage.clickOnStatus('Lock');
            await workShiftPage.clickOnSearchButton();
            await workShiftPage.getVerifyAtiveStatusSearch();
            await workShiftPage.getVerifyLockStatusSearchRow1();
        });
    });
});


