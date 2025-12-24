import { expect, test, } from '../base-test';
import { LoginPage } from '../../pages/LoginPage';
import Config from '../../utils/configUtils';
import { ShiftPlanPage } from '../../pages/work_shift_page/ShiftPlanPage';
import { allure } from 'allure-playwright';
import { ToastPage } from '../../pages/ToastPage';
import { ValidationPage } from '../../pages/ValidationPage';
import { checkShiftPlanExists, clearShiftPlan, importShiftPlanForTestMonthlyCheckin } from '../../db/modules/ShiftplanDB';
import { MonthlyCheckinPage } from '../../pages/timekeeping_page/MonthlyCheckinPage';
import { clearDataForTestMonthlyCheckin } from '../../db/modules/MonthlyCheckinDB';
import { LogoutPage } from '../../pages/LogoutPage';

test.describe.serial('Monthly Checkin Tests - Chấm công tháng', () => {
    let loginPage: LoginPage;
    let shiftPlanPage: ShiftPlanPage;
    let toastPage: ToastPage;
    let validation: ValidationPage;
    let monthlyCheckinPage: MonthlyCheckinPage;
    let logoutPage: LogoutPage;

    test.beforeEach(async ({ page, context }) => {
        allure.feature('Monthly Checkin Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        // Mock location for check in
        await context.grantPermissions(['geolocation']);
        await context.setGeolocation({
            latitude: 10.762622,
            longitude: 106.660172,
        });

        validation = new ValidationPage(page);
        toastPage = new ToastPage(page);
        loginPage = new LoginPage(page);
        shiftPlanPage = new ShiftPlanPage(page);
        logoutPage = new LogoutPage(page);
        monthlyCheckinPage = new MonthlyCheckinPage(page);

        await loginPage.goto();

    });

    test('Export all employees current month', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await monthlyCheckinPage.clickTimeKeepingManagement();
        await monthlyCheckinPage.clickMonthlyCheckinButton();
        await monthlyCheckinPage.clickFirstCheckbox();
        await monthlyCheckinPage.clickExportButton();
        await toastPage.getToastExportSuccess();

    });

    test('Export 1 employee current month', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await monthlyCheckinPage.clickTimeKeepingManagement();
        await monthlyCheckinPage.clickMonthlyCheckinButton();
        await monthlyCheckinPage.clickSecondCheckbox();
        await monthlyCheckinPage.clickExportButton();
        await toastPage.getToastExportSuccess();

    });

    test('E2E Flow - User check in/out, submit checkday => admin monthly approval, monthly closing', async ({ page }) => {
        const MONTH = 11;

        // USER LOGIN
        await loginPage.login('bat200@gmail.com', '123456');
        await monthlyCheckinPage.clickTimeKeepingManagement();
        await clearDataForTestMonthlyCheckin('uBqEzhKGYn');
        await importShiftPlanForTestMonthlyCheckin();

        // ADD CHECK IN
        await monthlyCheckinPage.clickHistoryLinkButton();
        await monthlyCheckinPage.clickChooseMonthFilter();
        await monthlyCheckinPage.clickChosseMonthPicker(MONTH);
        await monthlyCheckinPage.clickHistoryEditButton();
        await monthlyCheckinPage.clickAdd();
        await monthlyCheckinPage.selectTimeDropdown();
        await monthlyCheckinPage.clickOpenHoursOverlayButton();
        await monthlyCheckinPage.chosseHourPicker('08');
        await monthlyCheckinPage.clickOpenMinutesOverlayButton();
        await monthlyCheckinPage.chosseMinutePicker('00');
        await monthlyCheckinPage.clickChoose();
        await monthlyCheckinPage.fillReason('Test reason check in');
        await monthlyCheckinPage.clickSave();
        await toastPage.getToastAddTimeSuccess();

        // CHECK OUT
        await monthlyCheckinPage.clickAdd();
        await monthlyCheckinPage.selectTimeDropdown();
        await monthlyCheckinPage.clickOpenHoursOverlayButton();
        await monthlyCheckinPage.chosseHourPicker('17');
        await monthlyCheckinPage.clickOpenMinutesOverlayButton();
        await monthlyCheckinPage.chosseMinutePicker('00');
        await monthlyCheckinPage.clickChoose();
        await monthlyCheckinPage.fillReason('Test reason check out');
        await monthlyCheckinPage.clickSave();
        await toastPage.getToastAddTimeSuccess();

        // SUBMIT CHECKDAY
        await monthlyCheckinPage.clickCloseFormButton();
        await monthlyCheckinPage.clickSubmitCheckdayButton();

        // ADMIN LOGIN
        await logoutPage.logout();
        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await monthlyCheckinPage.clickTimeKeepingManagement();
        await monthlyCheckinPage.clickMonthlyCheckinButton();
        await monthlyCheckinPage.clickChooseMonthFilter();
        await monthlyCheckinPage.clickChosseMonthPicker(MONTH);

        // MONTHLY APPROVAL
        await monthlyCheckinPage.clickDropdownStatusSearch();
        await monthlyCheckinPage.clickNotApprovedStatus();
        await monthlyCheckinPage.searchByNameInput('Test chấm công tháng');
        await monthlyCheckinPage.clickSecondCheckbox();
        await monthlyCheckinPage.clickMonthlyApprovalButton();
        await monthlyCheckinPage.checkToastMonthlyApprovalSuccess();

        // MONTHLY CLOSING
        await monthlyCheckinPage.clickDropdownStatusSearch();
        await monthlyCheckinPage.clickApprovedStatus();
        await page.waitForTimeout(1000);
        await monthlyCheckinPage.searchByNameInput('Test chấm công tháng');
        await monthlyCheckinPage.clickSecondCheckbox();
        await monthlyCheckinPage.clickMonthlyClosing();
        await monthlyCheckinPage.checkToastMonthlyClosingSuccess();
    });

    test('Navigate from Monthly Checkin to History Checkin', async ({ page }) => {

        // ADMIN LOGIN
        await loginPage.login(Config.admin_username, Config.admin_password);
        await monthlyCheckinPage.clickTimeKeepingManagement();
        await monthlyCheckinPage.clickMonthlyCheckinButton();
        await monthlyCheckinPage.searchByNameInput('Test chấm công tháng');

        // HANDLE NAVIGATION TO HISTORY CHECKIN PAGE
        await monthlyCheckinPage.clickEmployeeCodeNavigation();
        await monthlyCheckinPage.checkHistoryCheckinTitle();

    });

    test('E2E Flow - admin monthly approval, monthly closing at history checkin page', async ({ page }) => {
        const MONTH = 11;

        // USER LOGIN
        await loginPage.login('bat200@gmail.com', '123456');
        await monthlyCheckinPage.clickTimeKeepingManagement();
        await clearDataForTestMonthlyCheckin('uBqEzhKGYn');
        await importShiftPlanForTestMonthlyCheckin();

        // ADD CHECK IN
        await monthlyCheckinPage.clickHistoryLinkButton();
        await monthlyCheckinPage.clickChooseMonthFilter();
        await monthlyCheckinPage.clickChosseMonthPicker(MONTH);
        await monthlyCheckinPage.clickHistoryEditButton();
        await monthlyCheckinPage.clickAdd();
        await monthlyCheckinPage.selectTimeDropdown();
        await monthlyCheckinPage.clickOpenHoursOverlayButton();
        await monthlyCheckinPage.chosseHourPicker('08');
        await monthlyCheckinPage.clickOpenMinutesOverlayButton();
        await monthlyCheckinPage.chosseMinutePicker('00');
        await monthlyCheckinPage.clickChoose();
        await monthlyCheckinPage.fillReason('Test reason check in');
        await monthlyCheckinPage.clickSave();
        await toastPage.getToastAddTimeSuccess();

        // CHECK OUT
        await monthlyCheckinPage.clickAdd();
        await monthlyCheckinPage.selectTimeDropdown();
        await monthlyCheckinPage.clickOpenHoursOverlayButton();
        await monthlyCheckinPage.chosseHourPicker('17');
        await monthlyCheckinPage.clickOpenMinutesOverlayButton();
        await monthlyCheckinPage.chosseMinutePicker('00');
        await monthlyCheckinPage.clickChoose();
        await monthlyCheckinPage.fillReason('Test reason check out');
        await monthlyCheckinPage.clickSave();
        await toastPage.getToastAddTimeSuccess();

        // SUBMIT CHECKDAY
        await monthlyCheckinPage.clickCloseFormButton();
        await monthlyCheckinPage.clickSubmitCheckdayButton();

        // ADMIN LOGIN
        await logoutPage.logout();
        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await monthlyCheckinPage.clickTimeKeepingManagement();
        await monthlyCheckinPage.clickHistoryLinkButton();
        await monthlyCheckinPage.chooseEmployeeFilter('Test chấm công tháng');
        await monthlyCheckinPage.selectEmployeeFilter();
        await monthlyCheckinPage.clickChooseMonthFilter();
        await monthlyCheckinPage.clickChosseMonthPicker(MONTH);

        // MONTHLY APPROVAL
        await monthlyCheckinPage.clickMonthlyApprovalButtonAtHistoryCheckinPage();
        await monthlyCheckinPage.checkToastMonthlyApprovalSuccess();

        // MONTHLY CLOSING
        await monthlyCheckinPage.clickMonthlyClosingButtonAtHistoryCheckinPage();
        await monthlyCheckinPage.checkToastMonthlyClosingSuccess();
    });
});
