import { test, } from '../base-test';
import { LoginPage } from '../../pages/LoginPage';
import Config from '../../utils/configUtils';
import { WorkShiftPage } from '../../pages/work_shift_page/WorkShiftPage';
import { allure } from 'allure-playwright';
import { ToastPage } from '../../pages/ToastPage';
import { ValidationPage } from '../../pages/ValidationPage';
import { clearWorkingShift } from '../../db/helpers/DBHelper';

test.describe.serial('Work Shift Tests', () => {
    let loginPage: LoginPage;
    let workShiftPage: WorkShiftPage;
    let toastPage: ToastPage;
    let validation: ValidationPage;

    test.beforeEach(async ({ page }) => {
        allure.feature('Work Shift Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        validation = new ValidationPage(page);
        toastPage = new ToastPage(page);
        loginPage = new LoginPage(page);
        workShiftPage = new WorkShiftPage(page);
        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await workShiftPage.clickTimeKeepingManagement();
        await workShiftPage.clickOnWorkShiftButton();
    });

    async function testBody() {
        await workShiftPage.clickStartTime();
        await workShiftPage.clickChosseHourPicker();
        await workShiftPage.clickOnChosse08HourPicker();
        await workShiftPage.clickOnChosseMinutePicker();
        await workShiftPage.clickOnChosse00MinutePicker();
        await workShiftPage.clickEndTime();
        await workShiftPage.clickChosseHourPicker();
        await workShiftPage.clickOnChosse17HourPicker();
        await workShiftPage.clickOnChosseMinutePicker();
        await workShiftPage.clickOnChosse00MinutePicker();
        await workShiftPage.clickOnRestCheckBox();
        await workShiftPage.clickOnTimeStartRest();
        await workShiftPage.clickChosseHourPicker();
        await workShiftPage.clickOnChosse12HourPicker();
        await workShiftPage.clickOnChosseMinutePicker();
        await workShiftPage.clickOnChosse00MinutePicker();
        await workShiftPage.clickOnTimeEndRest();
        await workShiftPage.clickChosseHourPicker();
        await workShiftPage.clickChosse13HourPicker();
        await workShiftPage.clickOnChosseMinutePicker();
        await workShiftPage.clickOnChosse00MinutePicker();
        await workShiftPage.getVerifyWorkingTime();
    }

    test("Max length of work shift name is 255 characters", async ({ page }) => {
        await clearWorkingShift();
        const workShiftCode = 'AT' + Math.random().toString(36).substring(2, 8);
        await workShiftPage.clickAdd();
        await workShiftPage.fillWorkShiftName('a'.repeat(255));
        await workShiftPage.fillWorkShiftCode(workShiftCode);
        await testBody();
        await workShiftPage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test("Max length of work shift name over 255 characters", async ({ page }) => {
        const workShiftCode = 'AT' + Math.random().toString(36).substring(2, 8);
        await workShiftPage.clickAdd();
        await workShiftPage.fillWorkShiftName('a'.repeat(256));
        await workShiftPage.fillWorkShiftCode(workShiftCode);
        await testBody();
        await workShiftPage.clickSave();
        await validation.validateMaxLength255Characters();
    });

    test('Create new work shift', async ({ page }) => {
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const workShiftName = `Automation test ${randomSuffix}`;
        const workShiftCode = 'AT' + randomSuffix;

        await clearWorkingShift();
        await allure.step('Fill work shift form', async () => {
            await workShiftPage.clickAdd();
            await workShiftPage.fillWorkShiftName(workShiftName);
            await workShiftPage.fillWorkShiftCode(workShiftCode);

            await testBody();
        });

        await allure.step('Select branch and save', async () => {
            await workShiftPage.clickOnBranchDropdown();
            await workShiftPage.clickOnBranchBienHoa();
            await workShiftPage.clickSave();
            await toastPage.getToastAddSuccess();
        });
    });

    test('Edit and delete work shift', async ({ page }) => {

        await allure.step('Edit work shift status', async () => {
            await workShiftPage.clickEditRow0();
            await workShiftPage.clickDropdownStatusInFormNth1();
            await workShiftPage.clickLockStatus();
            await workShiftPage.clickSave();
            await toastPage.getToastUpdateSuccess();
            await workShiftPage.verifyLockStatusRow0();
        });

        await allure.step('Delete work shift', async () => {
            await workShiftPage.clickDeleteRow0();
            await toastPage.getToastDeleteSuccess();
        });

    });

    test('Search by name and code of a work shift', async ({ page }) => {
        await allure.step('Search by name and code', async () => {
            await workShiftPage.fillWorkShiftNameSearchField('Ca ngày');
            await workShiftPage.fillWorkShiftCodeSearchField('CN');
            await workShiftPage.clickSearch();
            await workShiftPage.getVerifyWorkShiftName();
            await workShiftPage.getVerifyWorkShiftCode();
            await workShiftPage.clickClearSearch();
        });

        await allure.step('Search by name only', async () => {
            await workShiftPage.fillWorkShiftNameSearchField('Ca ngày');
            await workShiftPage.clickSearch();
            await workShiftPage.getVerifyWorkShiftName();
            await workShiftPage.clickClearSearch();
        });

        await allure.step('Search by code only', async () => {
            await workShiftPage.fillWorkShiftCodeSearchField('CN');
            await workShiftPage.clickSearch();
            await workShiftPage.getVerifyWorkShiftCode();
            await workShiftPage.clickClearSearch();
        });
    });

    test('Search by status', async ({ page }) => {
        await allure.step('Search by Active status', async () => {
            await workShiftPage.clickDropdownStatusSearch();
            await workShiftPage.clickActivityStatus();
            await workShiftPage.clickSearch();
            await workShiftPage.verifyActivityStatusRow0();
            await workShiftPage.clickClearSearch();
        });

        await allure.step('Search by Lock status', async () => {
            await workShiftPage.clickDropdownStatusSearch();
            await workShiftPage.clickLockStatus();
            await workShiftPage.clickSearch();
            await workShiftPage.verifyLockStatusRow0();
            await workShiftPage.clickClearSearch();
        });

        await allure.step('Search by Active & Lock status', async () => {
            await workShiftPage.clickDropdownStatusSearch();
            await workShiftPage.clickActivityStatus();
            await workShiftPage.clickLockStatus
            await workShiftPage.clickSearch();
            await workShiftPage.verifyActivityStatusRow0();
            // await workShiftPage.getVerifyLockStatusSearchRow1()
        });
    });

    test('Search by branch ', async ({ page }) => {
        await workShiftPage.clickOnBranchDropdownSearch();
        await workShiftPage.clickOnBranchBienHoaSearch();
        await workShiftPage.clickSearch();
        await workShiftPage.getVerifyBranchBienHoaSearch();
        await workShiftPage.clickClearSearch();
    });
});



