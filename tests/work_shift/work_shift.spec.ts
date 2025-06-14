import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { takeScreenshotOnFailure } from '../../utils/screenshotUtils';
import Config from '../../utils/configUtils';
import { WorkShiftPage } from '../../pages/WorkShiftPage';
import { HomePage } from '../../pages/HomePage';
import { allure } from 'allure-playwright';
import { clearAllWorkingShift } from '../../utils/mysqlUtils';


test.describe.serial('Work Shift Tests', () => {
    let loginPage: LoginPage;
    let workShiftPage: WorkShiftPage;
    let homePage: HomePage;

    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const workShiftName = `Automation test ${randomSuffix}`;
    const workShiftCode = 'AT' + randomSuffix;

    test.beforeEach(async ({ page }) => {
        allure.owner('Minh Nguyen');
        allure.feature('Work Shift Feature');
        allure.severity('Critical');
        loginPage = new LoginPage(page);
        workShiftPage = new WorkShiftPage(page)
        homePage = new HomePage(page);
        await loginPage.goto();
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('Create new work shift', async ({ page }) => {
        await clearAllWorkingShift();

        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickTimeKeepingManagement();
        await workShiftPage.clickOnWorkShiftButton();
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

        await workShiftPage.clickOnBranchDropdown();
        await workShiftPage.clickOnBranchBienHoa();

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



    //Search work shift
    test('search work shift', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickTimeKeepingManagement();

        // Search by name and code
        await workShiftPage.clickOnWorkShiftButton();
        await workShiftPage.fillWorkShiftNameSearchField('Ca ngày');
        await workShiftPage.fillWorkShiftCodeSearchField('CN');
        await workShiftPage.clickOnSearchButton();

        //veriry search result
        await workShiftPage.getVerifyWorkShiftName();
        await workShiftPage.getVerifyWorkShiftCode();
        await workShiftPage.clickOnClearSearchButton();


        // Search only by name
        await workShiftPage.fillWorkShiftNameSearchField('Ca ngày');
        await workShiftPage.clickOnSearchButton();
        await workShiftPage.getVerifyWorkShiftName();
        await workShiftPage.clickOnClearSearchButton();

        // Search only by code
        await workShiftPage.fillWorkShiftCodeSearchField('CN');
        await workShiftPage.clickOnSearchButton();
        await workShiftPage.getVerifyWorkShiftCode();
        await workShiftPage.clickOnClearSearchButton();

        // Search by branch
        await workShiftPage.clickOnBranchDropdownSearch();
        await workShiftPage.clickOnBranchBienHoaSearch();
        await workShiftPage.clickOnSearchButton();
        await workShiftPage.getVerifyBranchBienHoaSearch();
        await workShiftPage.clickOnClearSearchButton();

        // Search by activestatus
        await workShiftPage.clickOnStatusDropdownSearch();
        await workShiftPage.clickOnStatus('Active');
        await workShiftPage.clickOnSearchButton();
        await workShiftPage.getVerifyAtiveStatusSearch();
        await workShiftPage.clickOnClearSearchButton();

        // Search by lockstatus
        await workShiftPage.clickOnStatusDropdownSearch();
        await workShiftPage.clickOnStatus('Lock');
        await workShiftPage.clickOnSearchButton();
        await workShiftPage.getVerifyLockStatusSearch();
        await workShiftPage.clickOnClearSearchButton();

        // Search by 2 status
        await workShiftPage.clickOnStatusDropdownSearch();
        await workShiftPage.clickOnStatus('Active');
        await workShiftPage.clickOnStatus('Lock');
        await workShiftPage.clickOnSearchButton();
        await workShiftPage.getVerifyAtiveStatusSearch();
        await workShiftPage.getVerifyLockStatusSearchRow1();

    });

});
