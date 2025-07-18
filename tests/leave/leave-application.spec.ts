import { expect, test, } from '../base-test';
import { LoginPage } from '../../pages/LoginPage';
import Config from '../../utils/configUtils';
import { LeaveApplicationPage } from '../../pages/leave_page/LeaveApplicationPage';
import { checkLeaveApplicationExists, clearLeaveApplications, clearLeaveManagements } from '../../db/helpers/DBHelper';
import { addAnnualLeaveForEmployeeAndAdmin, sendAndApproveLeave } from './leave-helper';
import { allure } from 'allure-playwright';
import { ToastPage } from '../../pages/ToastPage';
import { LogoutPage } from '../../pages/LogoutPage';
import { ValidationPage } from '../../pages/ValidationPage';

test.describe.serial('Leave Application Tests', () => {
    let loginPage: LoginPage;
    let leaveApplicationPage: LeaveApplicationPage;
    let toastPage: ToastPage;
    let logoutPage: LogoutPage;
    let validationPage: ValidationPage;

    test.beforeEach(async ({ page }) => {
        allure.feature('Leave Application Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        validationPage = new ValidationPage(page);
        logoutPage = new LogoutPage(page);
        loginPage = new LoginPage(page);
        leaveApplicationPage = new LeaveApplicationPage(page);
        toastPage = new ToastPage(page);
    });

    async function addLeaveApplication() {
        await leaveApplicationPage.clickAdd();
        await leaveApplicationPage.clickLeaveTypeDropDown();
        await leaveApplicationPage.clickAnualLeave();
        await leaveApplicationPage.setDate();
        await leaveApplicationPage.fillReason('Automation test leave application');
        await leaveApplicationPage.clickSave();
        await toastPage.getToastAddSuccess();
    }
    async function beforeSearchTest() {
        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.employee_password);
        await leaveApplicationPage.clickTimeKeepingManagement();
        await leaveApplicationPage.clickLeaveApplicationButton();
    }

    async function beforeTest() {
        await clearLeaveApplications();
        await loginPage.goto();
        await loginPage.login(Config.employee_username, Config.employee_password);
        await leaveApplicationPage.clickTimeKeepingManagement();
        await leaveApplicationPage.clickLeaveApplicationButton();
    }

    test("Max lenght of reason is 255 characters", async ({ page }) => {
        await clearLeaveApplications();
        await beforeTest();
        await leaveApplicationPage.clickAdd();
        await leaveApplicationPage.clickLeaveTypeDropDown();
        await leaveApplicationPage.clickAnualLeave();
        await leaveApplicationPage.setDate();
        await leaveApplicationPage.fillReason('a'.repeat(255));
        await leaveApplicationPage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test("Max lenght of reason over 255 characters", async ({ page }) => {
        await beforeTest();
        await leaveApplicationPage.clickAdd();
        await leaveApplicationPage.clickLeaveTypeDropDown();
        await leaveApplicationPage.clickAnualLeave();
        await leaveApplicationPage.setDate();
        await leaveApplicationPage.fillReason('a'.repeat(256));
        await leaveApplicationPage.clickSave();
        await validationPage.validateMaxLength255Characters();
    });

    test('Search by month', async ({ page }) => {
        await clearLeaveApplications();
        await beforeSearchTest();
        await leaveApplicationPage.searchByMonth();
        await leaveApplicationPage.expectSearchByMonthResult();
    });

    test('Search by cancel status', async ({ page }) => {
        await beforeSearchTest();
        await leaveApplicationPage.clickCancelButtonSearch();
        await leaveApplicationPage.expectSearchByCancelResult();
    });

    test('Search by pending status', async ({ page }) => {
        await beforeSearchTest();
        await leaveApplicationPage.clickWaitForBrowsedButtonSearch();
        await leaveApplicationPage.expectSearchByWaitForBrowsedResult();
    });

    test('Search by approved status', async ({ page }) => {
        await beforeSearchTest();
        await leaveApplicationPage.clickBrowsedButtonSearch();
        await leaveApplicationPage.expectSearchByBrowsedResult();
    });

    test('Search by rejected status', async ({ page }) => {
        await beforeSearchTest();
        await leaveApplicationPage.clickRejectButtonSearch();
        await leaveApplicationPage.expectSearchByRejectedResult();
    });

    test('Search by regular leave application', async ({ page }) => {
        await beforeSearchTest();
        await leaveApplicationPage.clickSearchByRegularLeave();
        await leaveApplicationPage.getVerifyRegularLeave();
    });

    test('Search by social insurance leave application', async ({ page }) => {
        await beforeSearchTest();
        await leaveApplicationPage.clickSearchBySocialInsuranceLeave();
        await leaveApplicationPage.getVerifySocialInsuranceLeave();
    });

    test('Search by anual leave application', async ({ page }) => {
        await beforeSearchTest();
        await leaveApplicationPage.clickSearchByAnualLeave();
        await leaveApplicationPage.getVerifyAnualLeave();
    });

    test('Search by special leave application', async ({ page }) => {
        await beforeSearchTest();
        await leaveApplicationPage.clickSearchBySpecialLeave();
        await leaveApplicationPage.getVerifySpecialLeave();
    });

    test('Search by maternity leave application', async ({ page }) => {
        await beforeSearchTest();
        await leaveApplicationPage.clickSearchByMaternityLeave();
        await leaveApplicationPage.getVerifyMaternityLeave();
    });

    test('Add annual leave for a employee and manager browsed', async ({ page }) => {
        allure.story('Setup Annual Leave');
        await allure.step('Clear all leave management and add annual leave for employee and admin', async () => {
            await clearLeaveManagements();
            await addAnnualLeaveForEmployeeAndAdmin(page);
        });
    });

    test('Delete leave application', async ({ page }) => {
        await beforeTest();
        await addLeaveApplication();
        await leaveApplicationPage.clickRow0();
        await leaveApplicationPage.clickDelete();
        await toastPage.getToastDeleteSuccess();
    });

    test('Edit reason of leave application', async ({ page }) => {
        await beforeTest();
        await addLeaveApplication();
        await leaveApplicationPage.clickRow0();
        await leaveApplicationPage.clickEdit();
        await leaveApplicationPage.fillReason('Automation test edited');
        await leaveApplicationPage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit day of leave application', async ({ page }) => {
        await beforeTest();
        await addLeaveApplication();
        await leaveApplicationPage.clickRow0();
        await leaveApplicationPage.clickEdit();
        await leaveApplicationPage.setDateForEdit();
        await leaveApplicationPage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit leave type of leave application', async ({ page }) => {
        await beforeTest();
        await addLeaveApplication();
        await leaveApplicationPage.clickRow0();
        await leaveApplicationPage.clickEdit();
        await leaveApplicationPage.clickLeaveTypeDropDown();
        await leaveApplicationPage.clickSocialInsuranceLeave();
        await leaveApplicationPage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Add leave application with annual leave and send to admin -> admin approve', async ({ page }) => {
        allure.story('Annual Leave Application Flow');
        await allure.step('Employee applies for annual leave', async () => {

            await beforeTest();
            await addLeaveApplication();
            await leaveApplicationPage.getVerifyAnualLeave();
        });
        await allure.step('Send and approve leave application', async () => {
            await sendAndApproveLeave(page);
        });
    });

    test('Admin reject leave application', async ({ page }) => {
        allure.story('Admin Reject Annual Leave Application Flow');
        await allure.step('Employee applies for annual leave', async () => {

            await beforeTest();
            await addLeaveApplication();

        });
        await allure.step('Send to admin and admin reject leave application', async () => {
            await leaveApplicationPage.clickRow0();
            await leaveApplicationPage.clickSend();
            await toastPage.getToastSendBrowseSuccess();
            await logoutPage.logout();
            await loginPage.login(Config.admin_username, Config.admin_password);
            await leaveApplicationPage.clickRow0();
            await leaveApplicationPage.clickReject();
            await leaveApplicationPage.fillReason('Automation test');
            await toastPage.getToastRejectSuccess();
        });
    });

    test('Add leave application with regular leave and send to admin -> admin approve', async ({ page }) => {
        allure.story('Regular Leave Application Flow');
        await allure.step('Employee applies for regular leave', async () => {

            await beforeTest();
            await leaveApplicationPage.clickAdd();
            await leaveApplicationPage.clickLeaveTypeDropDown();
            await leaveApplicationPage.clickRegularLeave();
            await leaveApplicationPage.setDate();
            await leaveApplicationPage.fillReason('Automation test reason');
            await leaveApplicationPage.clickSave();
            await toastPage.getToastAddSuccess();

            // Check leave application exits in DB with reason and new status = 0
            const existsInDB = await checkLeaveApplicationExists('Automation test reason', 0);
            expect(existsInDB).toBeTruthy();

        });
        await allure.step('Send and approve leave application', async () => {
            await sendAndApproveLeave(page);

            // Check approved status = 2
            const checkApprovedStatus = await checkLeaveApplicationExists('Automation test reason', 2);
            expect(checkApprovedStatus).toBeTruthy();
        });
    });

    test('Add leave application with social insurance leave and send to admin -> admin approve', async ({ page }) => {
        allure.story('Social Insurance Leave Application Flow');
        await allure.step('Employee applies for social insurance leave', async () => {

            await beforeTest();
            await leaveApplicationPage.clickAdd();
            await leaveApplicationPage.clickLeaveTypeDropDown();
            await leaveApplicationPage.clickSocialInsuranceLeave();
            await leaveApplicationPage.setDate();
            await leaveApplicationPage.fillReason('Automation test');
            await leaveApplicationPage.clickSave();
            await toastPage.getToastAddSuccess();
            await leaveApplicationPage.getVerifySocialInsuranceLeave();
        });
        await allure.step('Send and approve leave application', async () => {
            await sendAndApproveLeave(page);
        });
    });

    test('Add leave application with maternity leave and send to admin -> admin approve', async ({ page }) => {
        allure.story('Maternity Leave Application Flow');
        await allure.step('Employee applies for maternity leave', async () => {

            await beforeTest();
            await leaveApplicationPage.clickAdd();
            await leaveApplicationPage.clickLeaveTypeDropDown();
            await leaveApplicationPage.clickMaternityLeave();
            await leaveApplicationPage.setDate();
            await leaveApplicationPage.fillReason('Automation test');
            await leaveApplicationPage.clickSave();
            await toastPage.getToastAddSuccess();
            await leaveApplicationPage.getVerifyMaternityLeave();
        });
        await allure.step('Send and approve leave application', async () => {
            await sendAndApproveLeave(page);
        });
    });

    test('Add leave application with special leave and send to admin -> admin approve', async ({ page }) => {
        allure.story('Special Leave Application Flow');
        await allure.step('Employee applies for special leave', async () => {

            await beforeTest();
            await leaveApplicationPage.clickAdd();
            await leaveApplicationPage.clickLeaveTypeDropDown();
            await leaveApplicationPage.clickSpecialLeave();
            await leaveApplicationPage.setDate();
            await leaveApplicationPage.fillReason('Automation test');
            await leaveApplicationPage.clickSave();
            await toastPage.getToastAddSuccess();
            await leaveApplicationPage.getVerifySpecialLeave();
        });
        await allure.step('Send and approve leave application', async () => {
            await sendAndApproveLeave(page);
        });
    });
});
