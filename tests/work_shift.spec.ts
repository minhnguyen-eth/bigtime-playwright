import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { takeScreenshotOnFailure } from '../utils/screenshotUtils';
import Config from '../utils/configUtils';
import { WorkShiftPage } from '../pages/WorkShiftPage';
import { HomePage } from '../pages/HomePage';

test.describe('Work Shift Tests', () => {
    let loginPage: LoginPage;
    let workShiftPage: WorkShiftPage;
    let homePage: HomePage;

    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const workShiftName = `Automation test ${randomSuffix}`;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        workShiftPage = new WorkShiftPage(page)
        homePage = new HomePage(page);
        await loginPage.goto();
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('Create new work shift', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickTimeKeepingManagement();
        await workShiftPage.clickOnWorkShiftButton();
        await workShiftPage.clickOnAddButton();
        await workShiftPage.fillWorkShiftName(workShiftName);
        await workShiftPage.fillWorkShiftCode('Test');

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

        // await workShiftPage.clickOnBranchDropdown();
        // await workShiftPage.clickOnBranchBienHoa();

        await workShiftPage.clickOnSaveButton();
        await workShiftPage.getToastAdd('Thêm thành công');
    });

    test('Edit lock status work shift and detete ', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickTimeKeepingManagement();
        await workShiftPage.clickOnWorkShiftButton();
        await workShiftPage.clickOnEditButton();
        await workShiftPage.clickOnStatusDropdown();
        await workShiftPage.clickOnLockStatus();
        await workShiftPage.clickOnSaveButton();
        await workShiftPage.getToastUpdate('Cập nhật thành công');
        await workShiftPage.getVerifyLockStatus();

        await workShiftPage.clickOnDeleteButton();
        await workShiftPage.clickOkButton();
        await workShiftPage.getToastDelete('Xóa thành công');


    });



});
