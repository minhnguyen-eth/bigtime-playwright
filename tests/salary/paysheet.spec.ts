import { test, } from '../base-test';
import { LoginPage } from '../../pages/LoginPage';
import Config from '../../utils/configUtils';
import { PaysheetPage } from '../../pages/salary_page/PaysheetPage';
import { allure } from 'allure-playwright';
import { ToastPage } from '../../pages/ToastPage';
import { LogoutPage } from '../../pages/LogoutPage';
import { ValidationPage } from '../../pages/ValidationPage';
import { PaysheetHelper } from './paysheet-helper';

test.describe.serial('Paysheet Tests', () => {
    let loginPage: LoginPage;
    let paysheet: PaysheetPage;
    let toastPage: ToastPage;
    let logoutPage: LogoutPage;
    let validation: ValidationPage;
    let paysheetHelper: PaysheetHelper;

    test.beforeEach(async ({ page }) => {
        allure.feature('Paysheet Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        validation = new ValidationPage(page);
        toastPage = new ToastPage(page);
        loginPage = new LoginPage(page);
        paysheet = new PaysheetPage(page);
        logoutPage = new LogoutPage(page);
        paysheetHelper = new PaysheetHelper(paysheet, loginPage, logoutPage, toastPage);
        await loginPage.goto();
    });

    async function beforeTest() {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await paysheet.clickSalary();
        await paysheet.clickPaysheet();
    }

    test('E2E Payroll and Payment Process', async ({ page }) => {
        await allure.step('Admin creates and sends paysheet and completes payment', async () => {
            await beforeTest();
            await paysheetHelper.addPaysheet();
            await paysheetHelper.sendAndBrowse03();
        });
    });

    test('Add duplicate employee in paysheet', async ({ page }) => {
        await allure.step('Admin creates and sends paysheet', async () => {
            await beforeTest();
            await paysheetHelper.addPaysheet();
            await paysheet.clickLatestPaysheetRow();
            await paysheet.clickViewPayroll();
            await paysheet.clickAddMoreEmployee();
            await paysheet.fillEmployeeNameInput('Nguyễn Văn Minh');
            await paysheet.clickSelectEmployee2();
            await paysheet.clickSave();
            await toastPage.getToastEmployeeExisted();
        });
    });

    test('E2E Payroll and Payment Process with add more employee', async ({ page }) => {
        allure.story('Complete Paysheet Process Story');
        await allure.step('Admin creates and sends paysheet', async () => {
            await beforeTest();
            await paysheetHelper.addPaysheet();
            await paysheet.clickLatestPaysheetRow();
            await paysheet.clickViewPayroll();
            await paysheet.clickAddMoreEmployee();
            await paysheet.fillEmployeeNameInput('Big app tech')
            await paysheet.clickSelectMoreEmployee();
            await paysheet.clickSave();
            await toastPage.getToastAddSuccess();
            await paysheet.clickSendAll();
            await paysheet.clickConfirmPaysheet();
            await logoutPage.logout();
        });

        await allure.step('Employee 1 approves payslip', async () => {
            await loginPage.login(Config.employee_username, Config.employee_password);
            await paysheet.clickSalary();
            await paysheet.clickPayslip();
            await paysheet.clickSalarySlipCode();
            await paysheet.clickBrowse();
            await logoutPage.logout();
        });

        await allure.step('Employee 2 approves payslip', async () => {
            await loginPage.login(Config.employee2_username, Config.employee2_password);
            await paysheet.clickSalary();
            await paysheet.clickPayslip();
            await paysheet.clickSalarySlipCode();
            await paysheet.clickBrowse();
            await logoutPage.logout();
        });
    });

    test('Test close salary but not browse', async ({ page }) => {
        await beforeTest();
        await paysheetHelper.addPaysheet();
        await paysheet.clickLatestPaysheetRow();
        await paysheet.clickViewPayroll();
        await paysheet.clickSalaryClosing();
        await paysheet.clickConfirmPaysheet();
        await toastPage.getToastValidateCloseSalary();
    });

    test('Search Paysheet', async ({ page }) => {
        allure.story('Search Paysheet Story');

        await beforeTest();

        await allure.step('Search paysheet by ID', async () => {
            await paysheet.fillSearchPaysheet('BL000001');
            await paysheet.clickSearchButton();
            await paysheet.verifyPaysheetId('BL000001');
        });
    });

    test('Search with data not exist', async ({ page }) => {
        allure.story('Search Paysheet Story');
        await beforeTest();

        await allure.step('Search paysheet by ID', async () => {
            await paysheet.fillSearchPaysheet('BL0000000000');
            await paysheet.clickSearchButton();
            await validation.validateNoExistData();
        });
    });


    test('Add Paysheet Without Name', async ({ page }) => {
        allure.story('Validation Paysheet Creation Story');
        await beforeTest();

        await allure.step('Try to add paysheet without entering name', async () => {
            await paysheet.clickAdd();
            await paysheet.clickSave();
            await paysheet.getRequiredEnterName('Nhập tên');
        });
    });

    test('Add Paysheet With All Employees', async ({ page }) => {
        allure.story('Add Paysheet For All Employees Story');
        await beforeTest();

        await allure.step('Add paysheet for all employees', async () => {
            await paysheet.clickAdd();
            await paysheet.setNamePaysheet('Automation test');
            await paysheet.clickCheckBoxMonthly();
            await paysheet.clickChooseMonth();
            await paysheet.clickMonthOption();
            await paysheet.clickSelectAllEmployees();
            await paysheet.setNote('Automation test');
            await paysheet.clickSave();
            await toastPage.getToastAddSuccess();
        });
    });

    test('Cancel Paysheet', async ({ page }) => {
        allure.story('Cancel Paysheet Story');
        await beforeTest();

        await allure.step('Cancel latest paysheet with reason', async () => {
            await paysheet.clickLatestPaysheetRow();
            await paysheet.clickCancel();
            await paysheet.fillReasonAndClickYes('Automation test cancel paysheet');
            await toastPage.getToastCancelSuccess();
        });
    });

    test('Export excel by all current month', async ({ page }) => {
        allure.story('Export Excel by Month Story');
        await beforeTest();

        await allure.step('Export excel by month', async () => {
            await paysheet.clickExportExcelByMonth();
            await paysheet.clickYes();
            await toastPage.getToastExportSuccess();
        });
    });

    test('Export excel by only one paysheet', async ({ page }) => {
        allure.story('Export Excel by 1 Paysheet Story');
        await beforeTest();

        await allure.step('Click export button of the lastest paysheet ', async () => {
            await paysheet.clickLatestPaysheetRow();
            await paysheet.clickExportOnly1Paysheet();
            await toastPage.getToastExportSuccess();
        });
    });

    test('Export excel by all month 05', async ({ page }) => {
        allure.story('Export Excel by Month 05 Story');
        await beforeTest();

        await allure.step('Export excel by month 5  ', async () => {
            await paysheet.clickAdd();
            await paysheet.setNamePaysheet('Automation test');
            await paysheet.clickCheckBoxMonthly();
            await paysheet.clickChooseMonth();
            await paysheet.clickMonthOption05();
            await paysheet.setNote('Automation test');
            await paysheet.clickAndSetDropDownEmployee('Nguyễn Văn Minh');
            await paysheet.clickEmployeeOption();
            await paysheet.clickSave();
            await toastPage.getToastAddSuccess();
            await paysheet.clickExportExcelByMonth();
            await paysheet.clickChosseMonthExport();
            await paysheet.clickMonth05();
            await paysheet.clickChoose();
            await paysheet.clickYes();
            await toastPage.getToastExportSuccess();
        });
    });

    test('E2E update salary in paysheet', async ({ page }) => {
        allure.story('Edit Paysheet Process Story');

        await allure.step('Admin create paysheet', async () => {
            await beforeTest();
            await paysheetHelper.addPaysheet();
        });

        await allure.step('Edit paysheet', async () => {
            await paysheet.clickLatestPaysheetRow();
            await paysheet.clickViewPayroll();
            await paysheet.clickbaseSalary();
            await paysheet.fillNumberOfWorkingDays('31');
            await paysheet.clickSave();
            await paysheet.fillOverTime('500000');
            await paysheet.clickBonusButton();
            await paysheet.clickAddBonusButton();
            await paysheet.fillBonusType('Automation test');
            await paysheet.fillBonusMoney('100000');
            await paysheet.fillBonusTimes('2');
            await paysheet.clickSave();

            await paysheet.clickDeduction();
            await paysheet.clickAddDeduction();
            await paysheet.fillDeductionType('Automation test');
            await paysheet.fillTimes('2');
            await paysheet.fillDeductionMoney('150000');
            await paysheet.clickSave();
            await paysheet.clickTemporarySave();
            await toastPage.getToastSaveSuccess();

            // Verify update data
            await paysheet.clickPaysheet();
            await paysheet.clickLatestPaysheetRow();
            await paysheet.clickViewPayroll();
            // await paysheet.expectBaseSalary();
            await paysheet.expectOverTime();
            await paysheet.expectBonusMoney();
            await paysheet.expectDeduction();
            await paysheet.expectAllowance();
            await paysheet.clickPaysheet();
            await paysheetHelper.sendAndBrowse03();
        });
    });

    test('Maxlength name paysheet over 245 characters', async ({ page }) => {
        allure.story('Validation Paysheet Creation Story');
        await beforeTest();

        await allure.step('Add paysheet with name length 246 characters', async () => {
            await paysheet.clickAdd();
            await paysheet.setNamePaysheet('a'.repeat(246));
            await paysheet.clickCheckBoxMonthly();
            await paysheet.clickChooseMonth();
            await paysheet.clickMonthOption();
            await paysheet.setNote('Automation test');
            await paysheet.clickAndSetDropDownEmployee('Nguyễn Văn Minh');
            await paysheet.clickEmployeeOption();
            await paysheet.clickSave();
            await validation.validateMaxLength245Characters();
        });
    });

    test('Maxlength note paysheet over 255 characters', async ({ page }) => {
        allure.story('Validation Paysheet Creation Story');
        await beforeTest();

        await allure.step('Add paysheet with note length over 255 characters', async () => {
            await paysheet.clickAdd();
            await paysheet.setNamePaysheet('Automation test');
            await paysheet.clickCheckBoxMonthly();
            await paysheet.clickChooseMonth();
            await paysheet.clickMonthOption();
            await paysheet.clickAndSetDropDownEmployee('Nguyễn Văn Minh');
            await paysheet.clickEmployeeOption();
            await paysheet.setNote('a'.repeat(256));
            await paysheet.clickSave();
            await validation.validateMaxLength255Characters();
        });
    });

    test('Maxlength note paysheet 255 characters', async ({ page }) => {
        allure.story('Validation Paysheet Creation Story');
        await beforeTest();

        await allure.step('Add paysheet with note length 255 characters', async () => {
            await paysheet.clickAdd();
            await paysheet.setNamePaysheet('Automation test');
            await paysheet.clickCheckBoxMonthly();
            await paysheet.clickChooseMonth();
            await paysheet.clickMonthOption();
            await paysheet.clickAndSetDropDownEmployee('Nguyễn Văn Minh');
            await paysheet.clickEmployeeOption();
            await paysheet.setNote('a'.repeat(255));
            await paysheet.clickSave();
            await toastPage.getToastAddSuccess();
        });
    });

    test('Maxlengt name paysheet 245 characters', async ({ page }) => {
        allure.story('Validation Paysheet Creation Story');
        await beforeTest();

        await allure.step('Add paysheet with name length 245 characters', async () => {
            await paysheet.clickAdd();
            await paysheet.setNamePaysheet('a'.repeat(245));
            await paysheet.clickCheckBoxMonthly();
            await paysheet.clickChooseMonth();
            await paysheet.clickMonthOption();
            await paysheet.setNote('Automation test');
            await paysheet.clickAndSetDropDownEmployee('Nguyễn Văn Minh');
            await paysheet.clickEmployeeOption();
            await paysheet.clickSave();
            await toastPage.getToastAddSuccess();
        });
    });
});
