import { test, } from '../base-test';
import { LoginPage } from '../../pages/LoginPage';
import Config from '../../utils/configUtils';
import { PaysheetPage } from '../../pages/salary_page/PaysheetPage';
import { allure } from 'allure-playwright';
import { ToastPage } from '../../pages/ToastPage';
import { LogoutPage } from '../../pages/LogoutPage';
import { ValidationPage } from '../../pages/ValidationPage';
import { PaysheetHelper } from './paysheet-helper';
import { clearPaysheets } from '../../db/modules/PaysheetDB';
import { importCheckTime } from '../../db/modules/CheckTimeDB';
import { importCheckDay } from '../../db/modules/CheckDayDB';
import { importPayrolls } from '../../db/modules/PayrollsDB';

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

        await importCheckTime();
        await importCheckDay();
        await importPayrolls();

        validation = new ValidationPage(page);
        toastPage = new ToastPage(page);
        loginPage = new LoginPage(page);
        paysheet = new PaysheetPage(page);
        logoutPage = new LogoutPage(page);
        paysheetHelper = new PaysheetHelper(paysheet, loginPage, logoutPage, toastPage);
        await loginPage.goto();
    });

    async function beforeTest() {
        await clearPaysheets();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await paysheet.clickSalary();
        await paysheet.clickPaysheet();
    }

    test('E2E Payroll and Payment Process - Kiểm tra quy trình tính lương và thanh toán', async ({ page }) => {
        await clearPaysheets();
        await beforeTest();
        await allure.step('Admin creates and sends paysheet', async () => {
            await paysheetHelper.addPaysheet();
        });

        await allure.step('Employee browses payslip => Admin payment ', async () => {
            await paysheetHelper.sendAndBrowse03();
        });
    });

    test('Add duplicate employee in a paysheet - Thêm nhân viên trùng trong 1 bảng lương', async ({ page }) => {
        await beforeTest();
        await allure.step('Admin creates paysheet - Quản lý tạo bảng lương', async () => {
            await paysheetHelper.addPaysheet();
        });

        await allure.step('Add duplicate employee - Thêm nhân viên trùng trong 1 bảng lương', async () => {
            await paysheet.clickLatestPaysheetRow();
            await paysheet.clickViewPayroll();
            await paysheet.clickAddMoreEmployee();
            await paysheet.fillEmployeeNameInput('test lương');
            await paysheet.clickSelectEmployee2();
            await paysheet.clickSave();
        });

        await allure.step('Verify employee existed - Verify nhân viên đã tồn tại trong bảng lương', async () => {
            await toastPage.getToastEmployeeExisted();
        });
    });

    test('E2E Payroll and Payment Process with add more employee - Kiểm tra quy trình tính lương, thêm 1 nhân viên vào bảng lương', async ({ page }) => {
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
            await loginPage.goto();
        });

        await allure.step('Employee 1 approves payslip', async () => {
            await loginPage.login('testluong@gmail.com', '123456');
            await paysheet.clickSalary();
            await paysheet.clickPayslip();
            await paysheet.clickSalarySlipCode();
            await paysheet.clickBrowse();
            await logoutPage.logout();
            await loginPage.goto();
        });

        await allure.step('Employee 2 approves payslip', async () => {
            await loginPage.login('bigapptech@gmail.com', '123456');
            await paysheet.clickSalary();
            await paysheet.clickPayslip();
            await paysheet.clickSalarySlipCode();
            await paysheet.clickBrowse();
            // await logoutPage.logout();
        });
    });

    test('Test close salary when employee not browse - Kiểm tra chốt luong khi nhân viên chưa duyệt phiếu lương', async ({ page }) => {
        await beforeTest();
        await paysheetHelper.addPaysheet();
        await paysheet.clickLatestPaysheetRow();
        await paysheet.clickViewPayroll();
        await paysheet.clickSalaryClosing();
        await paysheet.clickConfirmPaysheet();
        await toastPage.getToastValidateCloseSalary();
    });

    test('Search Paysheet - Tìm kiếm bảng lương theo ID', async ({ page }) => {
        allure.story('Search Paysheet Story');

        await beforeTest();

        await allure.step('Search paysheet by ID', async () => {
            await paysheet.fillSearchPaysheet('BL000001');
            await paysheet.clickSearch();
            await paysheet.verifyPaysheetId('BL000001');
        });
    });

    test('Search with data not exist - Tìm kiếm bảng lương không tồn tại', async ({ page }) => {
        allure.story('Search Paysheet Story');
        await beforeTest();

        await allure.step('Search paysheet by ID', async () => {
            await paysheet.fillSearchPaysheet('BL0000000000');
            await paysheet.clickSearch();
            await validation.validateNoExistData();
        });
    });

    test('Add Paysheet Without Name - Tạo bảng lương không nhập tên', async ({ page }) => {
        allure.story('Validation Paysheet Creation Story');
        await beforeTest();

        await allure.step('Try to add paysheet without entering name', async () => {
            await paysheet.clickAdd();
            await paysheet.clickSave();
            await paysheet.getRequiredEnterName('Nhập tên');
        });
    });

    test('Add Paysheet With All Employees - Tạo bảng lương cho tất cả nhân viên', async ({ page }) => {
        allure.story('Add Paysheet For All Employees Story');
        await beforeTest();

        await allure.step('Add paysheet for all employees', async () => {
            await paysheet.clickAdd();
            await paysheet.setNamePaysheet('Automation test');
            await paysheet.clickCheckboxMonthly();
            await paysheet.clickChooseMonth();
            await paysheet.clickMonthOption();
            await paysheet.clickSelectAllEmployees();
            await paysheet.setNote('Automation test');
            await paysheet.clickSave();
            await toastPage.getToastAddSuccess();
        });
    });

    test('Cancel Paysheet - Hủy bảng lương', async ({ page }) => {
        allure.story('Cancel Paysheet Story');
        await beforeTest();

        await allure.step('Add paysheet for all employees', async () => {
            await paysheetHelper.addPaysheet();
        });

        await allure.step('Cancel latest paysheet with reason', async () => {
            await paysheet.clickLatestPaysheetRow();
            await paysheet.clickCancel();
            await paysheet.fillReason('Automation test cancel paysheet');
            await toastPage.getToastCancelSuccess();
        });
    });

    test('Export excel by all current month - Xuất excel của tháng hiện tại', async ({ page }) => {
        allure.story('Export Excel by Month Story');
        await beforeTest();

        await allure.step('Add paysheet for all employees', async () => {
            await paysheetHelper.addPaysheet();
        });

        await allure.step('Export excel by month', async () => {
            await paysheet.clickExportExcelByMonth();
            await paysheet.clickYes();
            await toastPage.getToastExportSuccess();
        });
    });

    test('Export excel by only one paysheet - Xuất excel của 1 bảng lương', async ({ page }) => {
        allure.story('Export Excel by 1 Paysheet Story');
        await beforeTest();

        await allure.step('Add paysheet for all employees', async () => {
            await paysheetHelper.addPaysheet();
        });

        await allure.step('Click export button of the lastest paysheet ', async () => {
            await paysheet.clickLatestPaysheetRow();
            await paysheet.clickExportOnly1Paysheet();
            await toastPage.getToastExportSuccess();
        });
    });

    test('Export excel by last month - Xuất excel của tháng trước', async ({ page }) => {
        allure.story('Export Excel by last month Story');
        await beforeTest();

        await allure.step('Export excel by last month  ', async () => {
            await paysheet.clickExportExcelByMonth();
            await paysheet.clickChooseMonthExport();
            await paysheet.clickMonth05(); // 05-2025
            await paysheet.clickChoose();
            await paysheet.clickYes();
            await toastPage.getToastExportSuccess();
        });
    });

    test('E2E update salary in paysheet - Kiểm tra chỉnh sửa lương trong bảng lương', async ({ page }) => {
        allure.story('Edit Paysheet Process Story');

        await allure.step('Admin create paysheet', async () => {
            await beforeTest();
            await paysheetHelper.addPaysheet();
        });

        await allure.step('Edit paysheet', async () => {
            await paysheet.clickLatestPaysheetRow();
            await paysheet.clickViewPayroll();
            // await paysheet.clickbaseSalary();
            // await paysheet.fillNumberOfWorkingDays('31');
            // await paysheet.clickSave();
            // await paysheet.fillOverTime('500000');
            await paysheet.clickBonusButton();
            await paysheet.clickAddBonusButton();
            await paysheet.fillBonusType('Automation test');
            await paysheet.fillBonusMoney('500000');
            await paysheet.fillBonusTimes('2');
            await paysheet.clickSave();

            await paysheet.clickAllowanceButton();
            await paysheet.clickAddAllowanceButton();
            await paysheet.fillAllowanceType('Automation test');
            ;
            await paysheet.fillAllowanceMoney('2000000');
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
            // await paysheet.expectOverTime();
            await paysheet.verifyBonus('1.000.000');
            await paysheet.verifyDeduction('300.000');
            await paysheet.verifyAllowance('2.000.000', 0);
        });
    });

    test('Maxlength name paysheet over 245 characters', async ({ page }) => {
        allure.story('Validation Paysheet Creation Story');
        await beforeTest();

        await allure.step('Add paysheet with name length 246 characters', async () => {

            await paysheet.clickAdd();
            await paysheet.setNamePaysheet('a'.repeat(246));
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
            await paysheet.clickCheckboxMonthly();
            await paysheet.clickChooseMonth();
            await paysheet.clickMonthOption();
            await paysheet.fillSearchByName('test lương');
            await paysheet.clickButtonSearch();
            await paysheet.clickSelectEmployee();
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
            await paysheet.clickCheckboxMonthly();
            await paysheet.clickChooseMonth();
            await paysheet.clickMonthOption();
            await paysheet.fillSearchByName('test lương');
            await paysheet.clickButtonSearch();
            await paysheet.clickSelectEmployee();
            await paysheet.setNote('Automation test');
            await paysheet.clickSave();
            await toastPage.getToastAddSuccess();
        });
    });

    test('E2E Separate payroll - Kiểm tra tách bảng lương', async ({ page }) => {
        allure.story('Separate payroll Story');
        await beforeTest();

        await allure.step('Add paysheet for 2 employees', async () => {
            await paysheet.clickAdd();
            await paysheet.setNamePaysheet('Automation test');
            await paysheet.clickCheckboxMonthly();
            await paysheet.clickChooseMonth();
            await paysheet.clickMonthOption();
            await paysheet.setNote('Automation test');
            await paysheet.fillSearchByName('test lương');
            await paysheet.clickButtonSearch();
            await paysheet.clickSelectEmployee();
            await paysheet.fillSearchByName('Big app tech');
            await paysheet.clickButtonSearch();
            await paysheet.clickSelectEmployee();
            await paysheet.clickSave();
            await toastPage.getToastAddSuccess();

            await paysheet.clickLatestPaysheetRow();
            await paysheet.clickViewPayroll();
            await paysheet.clickSendAll();
            await paysheet.clickConfirmPaysheet();
            await logoutPage.logout();

            await loginPage.goto();
            await loginPage.login('testluong@gmail.com', '123456');
            await paysheetHelper.browsePayslip();
            await logoutPage.logout();

            await loginPage.goto();
            await loginPage.login(Config.admin_username, Config.admin_password);
            await paysheet.clickSalary();
            await paysheet.clickPaysheet();
            await paysheet.clickLatestPaysheetRow();
            await paysheet.clickPayslipPayment();
            await paysheet.clickSeparateButton();
            await paysheet.verifyPopupSeparate('Bạn có chắc chắn muốn tách bảng lương thành 2 phần: đã duyệt và chưa duyệt không?');
            await paysheet.clickYes();
            await toastPage.getToastSeparatePaysheetSuccess();

            // Payment 
            await paysheet.fillSearchPaysheet('T01');
            await paysheet.clickSearch();
            await paysheet.clickLatestPaysheetRow();
            await paysheet.clickViewPayroll();
            await paysheet.clickSalaryClosing();
            await paysheet.clickConfirmPaysheet();
            await paysheet.clickLatestPaysheetRow();
            await paysheet.clickPayslipPayment();
            await paysheet.clickFirstCheckbox();
            await paysheet.clickPayment();
            await paysheet.clickPaymentConfirm();
            await toastPage.getToastPaymentSuccess();
        });
    });

    /* Test thuế với nhân viên có 1 người phụ thuộc
       Test Data : Lương chính = 14.000.000, 
       Mức đóng bảo hiểm 14.000.000, BHXH 8%, BHYT 1.5%, BHTN 1% 
       Phụ cấp = 3.000.000 (Miễn thuế 2.730.000)
       Mức đóng thuế = 17.000.000 - 1.470.140(Bảo hiểm) - 11.000.000(miễn bản thân) - 2.730.000(miễn phụ cấp) = 1.799.860
       Thuế bậc 1 = 1.799.860 * 5% = 89.993 
       Tổng nhận = 17.000.000 - 1.470.140(Bảo hiểm) - 89.993(Thuế) = 15.439.867 */
    test('E2E Calculate tax with 1 dependents - Kiểm tra tính thuế khi có 1 người phụ thuộc ', async ({ page }) => {
        allure.story('Calculate tax without dependents Story');
        await beforeTest();

        await allure.step('Add paysheet for 1 employees', async () => {
            await paysheet.clickAdd();
            await paysheet.setNamePaysheet('Automation test');
            await paysheet.clickCheckboxMonthly();
            await paysheet.clickChooseMonth();
            await paysheet.clickCustomMonth(12);
            await paysheet.fillSearchByName('BAT101');
            await page.keyboard.press('Enter');
            await paysheet.clickSelectEmployee();
            await paysheet.setNote('Automation test tax');
            await paysheet.clickSave();
            await toastPage.getToastAddSuccess();
            await paysheet.clickLatestPaysheetRow();
            await paysheet.clickViewPayroll();

            // verify salary and tax
            await paysheet.verifyMainSalary('20.000.000');
            await paysheet.verifyTotalSalary('20.000.000');
            await paysheet.verifyInsurance('2.100.000');
            await paysheet.verifyTaxOf1Dependent('125.000');
            await paysheet.verifyTotalReceived('17.775.000');
        });

    });

    /* Test thuế nhân viên có 2 người phụ thuộc

        Test Data : Lương chính = [20.000.00] 
        Mức đóng bảo hiểm 20.000.000 * (BHXH 8% = 1.600.000) + (BHYT 1.5% = 300.000) + (BHTN 1% = 200.000) + (ĐOÀN PHÍ = 0) = [2.100.000]
        Mức đóng thuế = (20.000.000 Tổng lương) - (2.100.000 Bảo hiểm) - (11.000.000 miễn bản thân) - (8.800.000 2 NPT) = [0]
        Thuế = 0
        Tổng nhận = (20.000.000 lương chính - (2.100.000 Bảo hiểm) = [17.900.000] */
    test('E2E Calculate tax with 2 dependents - Kiểm tra tính thuế với 2 người phụ thuộc ', async ({ page }) => {
        allure.description(`
        Employee: BAT102
        Payroll month: 12/2025
        Base salary: 30,000,000 VND
        Dependent deduction start date: 15/12/2025

        Insurance deduction: 3.150.000 VND (30.000.000 * (BHXH 8%) + (BHYT 1.5%) + (BHTN 1%) + (ĐOÀN PHÍ 0%))
        Personal deduction: 11,000,000 VND
        Dependent deduction: 8,800,000 VND (2 dependents)

        Taxable income: 7,050,000 VND
        PIT (5%): 455.000 VND

        Expected:
        - Dependent deduction is applied
        - Net salary: 26,395,000 VND
        `);
        await beforeTest();
        await allure.step('Add paysheet for 1 employees', async () => {
            await paysheet.clickAdd();
            await paysheet.setNamePaysheet('Automation test');
            await paysheet.clickCheckboxMonthly();
            await paysheet.clickChooseMonth();
            await paysheet.clickCustomMonth(12);
            await paysheet.fillSearchByName('BAT102');
            await page.keyboard.press('Enter');
            await paysheet.clickSelectEmployee();
            await paysheet.setNote('Automation test tax');
            await paysheet.clickSave();
            await toastPage.getToastAddSuccess();
            await paysheet.clickLatestPaysheetRow();
            await paysheet.clickViewPayroll();
        });

        await allure.step('Verify salary and tax', async () => {
            await paysheet.verifyMainSalary('30.000.000');
            await paysheet.verifyTotalSalary('30.000.000');
            await paysheet.verifyInsurance('3.150.000');
            await paysheet.verifyTax('455.000 ', 0);
            await paysheet.verifyTotalReceived('26.395.000');
        });
    });


    /* Test thuế nhân viên có phát sinh người phụ thuộc giữa tháng */
    test('E2E Calculate tax with dependents in the middle of the month - Kiểm tra tính thuế khi phát sinh NPT giữa tháng', async ({ page }) => {
        allure.description(`
        Employee: BAT107
        Payroll month: 12/2025
        Base salary: 20,000,000 VND
        Dependent deduction start date: 15/12/2025

        Insurance deduction: 2,100,000 VND (20.000.000 * (BHXH 8%) + (BHYT 1.5%) + (BHTN 1%) + (ĐOÀN PHÍ 0%))
        Personal deduction: 11,000,000 VND (free tax)
        Dependent deduction: 4,400,000 VND (1 dependent)

        Taxable income: 2,500,000 VND
        PIT (5%): 125,000 VND

        Expected:
        - Dependent deduction is applied
        - Net salary: 17,775,000 VND
        `);

        await beforeTest();
        await allure.step('Add paysheet for 1 employees', async () => {
            await paysheet.clickAdd();
            await paysheet.setNamePaysheet('Automation test');
            await paysheet.clickCheckboxMonthly();
            await paysheet.clickChooseMonth();
            await paysheet.clickCustomMonth(12);
            await paysheet.fillSearchByName('BAT107');
            await page.keyboard.press('Enter');
            await paysheet.clickSelectEmployee();
            await paysheet.setNote('Automation test tax');
            await paysheet.clickSave();
            await toastPage.getToastAddSuccess();
            await paysheet.clickLatestPaysheetRow();
            await paysheet.clickViewPayroll();

            // verify salary and tax
            await paysheet.verifyMainSalary('20.000.000');
            await paysheet.verifyTotalSalary('20.000.000');
            await paysheet.verifyInsurance('2.100.000');
            await paysheet.verifyTax('125.000', 0);
            await paysheet.verifyTotalReceived('17.775.000');

        });
    });

    /* Test thuế nhân viên có người phụ thuộc hết hạn giảm trừ giữa tháng */
    test('E2E Calculate tax with dependents expired in the middle of the month - Kiểm tra tính thuế kh NPT hết hạn giảm trừ giữa tháng', async ({ page }) => {
        allure.description(`
        Employee: BAT108
        Payroll month: 12/2025
        Base salary: 20,000,000 VND
        Dependent deduction expiry date: 18/12/2025

        Tax calculation:
        - Gross salary: 20,000,000 VND
        - Insurance deduction: 2,100,000 VND (20.000.000 * (BHXH 8%) + (BHYT 1.5%) + (BHTN 1%) + (ĐOÀN PHÍ 0%))
        - Personal deduction: 11,000,000 VND
        - Dependent deduction (1 dependent): 4,400,000 VND
        - Taxable income: 2,500,000 VND
        - PIT (5%): 125,000 VND

        Expected result:
        - Dependent deduction is applied
        - Net salary: 17,775,000 VND
        `);
        await beforeTest();
        await allure.step('Add paysheet for 1 employees', async () => {
            await paysheet.clickAdd();
            await paysheet.setNamePaysheet('Automation test');
            await paysheet.clickCheckboxMonthly();
            await paysheet.clickChooseMonth();
            await paysheet.clickCustomMonth(12);
            await paysheet.fillSearchByName('BAT108');
            await page.keyboard.press('Enter');
            await paysheet.clickSelectEmployee();
            await paysheet.setNote('Automation test tax');
            await paysheet.clickSave();
            await toastPage.getToastAddSuccess();
            await paysheet.clickLatestPaysheetRow();
            await paysheet.clickViewPayroll();

            // verify salary and tax
            await paysheet.verifyMainSalary('20.000.000');
            await paysheet.verifyTotalSalary('20.000.000');
            await paysheet.verifyInsurance('2.100.000');
            await paysheet.verifyTax('125.000', 0);
            await paysheet.verifyTotalReceived('17.775.000');

        });

    });

    /*  Chưa đến ngày giảm trừ NPT */
    test('E2E Calculate tax with dependents not yet effective - Kiểm tra tính thuế khi chưa đến ngày giảm trừ NPT', async ({ page }) => {
        allure.description(`
        Employee: BAT105
        Payroll month: 12/2025
        Base salary: 20,000,000 VND
        Dependent deduction effective date: 30/09/2026

        Insurance deduction:
        - Social insurance (8%): 1,600,000 VND
        - Health insurance (1.5%): 300,000 VND
        - Unemployment insurance (1%): 200,000 VND
        Total insurance: 2,100,000 VND

        Tax calculation:
        - Gross salary: 20,000,000 VND
        - Insurance deduction: 2,100,000 VND
        - Personal deduction: 11,000,000 VND
        - Taxable income: 6,900,000 VND
      
        Progressive PIT calculation:
        - First 5,000,000 VND × 5% = 250,000 VND
        - Remaining 1,900,000 VND × 10% = 190,000 VND
        - Total PIT: 440,000 VND


        Expected result:
        - Dependent deduction is NOT applied
        - Net salary: 17,460,000 VND`);

        await beforeTest();
        await allure.step('Add paysheet for 1 employees', async () => {
            await paysheet.clickAdd();
            await paysheet.setNamePaysheet('Automation test');
            await paysheet.clickCheckboxMonthly();
            await paysheet.clickChooseMonth();
            await paysheet.clickCustomMonth(12);
            await paysheet.fillSearchByName('BAT105');
            await page.keyboard.press('Enter');
            await paysheet.clickSelectEmployee();
            await paysheet.setNote('Automation test tax');
            await paysheet.clickSave();
            await toastPage.getToastAddSuccess();
            await paysheet.clickLatestPaysheetRow();
            await paysheet.clickViewPayroll();

            // verify salary and tax
            await paysheet.verifyMainSalary('20.000.000');
            await paysheet.verifyTotalSalary('20.000.000');
            await paysheet.verifyInsurance('2.100.000');
            await paysheet.verifyTax('440.000', 0);
            await paysheet.verifyTotalReceived('17.460.000');

        });

    });

    /* Đã hết hạn giảm trừ NPT */
    test('E2E Calculate tax with dependents expired - Kiểm tra tính thuế khi NPT hết hạn giảm trừ', async ({ page }) => {
        allure.description(`
        Employee: BAT106
        Payroll month: 12/2025
        Base salary: 20,000,000 VND
        Dependent deduction expiry date: 01/11/2025

        Insurance deduction:
        - Social insurance (8%): 1,600,000 VND
        - Health insurance (1.5%): 300,000 VND
        - Unemployment insurance (1%): 200,000 VND
        Total insurance: 2,100,000 VND

        Tax calculation:
        - Gross salary: 20,000,000 VND
        - Insurance deduction: 2,100,000 VND (20.000.000 * (BHXH 8%) + (BHYT 1.5%) + (BHTN 1%) + (ĐOÀN PHÍ 0%))
        - Personal deduction: 11,000,000 VND
        - Taxable income: 6,900,000 VND

        Progressive PIT calculation:
        - First 5,000,000 VND × 5% = 250,000 VND
        - Remaining 1,900,000 VND × 10% = 190,000 VND
        - Total PIT: 440,000 VND

        Expected result:
        - Dependent deduction is NOT applied
        - Net salary: 17,555,000 VND
        `);

        await beforeTest();
        await allure.step('Add paysheet for 1 employees', async () => {
            await paysheet.clickAdd();
            await paysheet.setNamePaysheet('Automation test');
            await paysheet.clickCheckboxMonthly();
            await paysheet.clickChooseMonth();
            await paysheet.clickCustomMonth(12);
            await paysheet.fillSearchByName('BAT106');
            await page.keyboard.press('Enter');
            await paysheet.clickSelectEmployee();
            await paysheet.setNote('Automation test tax');
            await paysheet.clickSave();
            await toastPage.getToastAddSuccess();
            await paysheet.clickLatestPaysheetRow();
            await paysheet.clickViewPayroll();

            // verify salary and tax
            await paysheet.verifyMainSalary('20.000.000');
            await paysheet.verifyTotalSalary('20.000.000');
            await paysheet.verifyInsurance('2.100.000');
            await paysheet.verifyTax('440.000', 0);
            await paysheet.verifyTotalReceived('17.460.000');

        });
    });

    /* Test tính lương cho nhân viên có 1 ngày nghỉ phép năm */
    test('E2E Calculate salary with 1 day annual leave - Kiểm tra tính lương khi có 1 ngày nghỉ phép năm ', async ({ page }) => {
        allure.story('Calculate salary with 1 day leave Story');
        await beforeTest();
        await allure.step('Add paysheet for 1 employees', async () => {
            await paysheet.clickAdd();
            await paysheet.setNamePaysheet('Automation test');
            await paysheet.clickCheckboxMonthly();
            await paysheet.clickChooseMonth();
            await paysheet.clickCustomMonth(12);
            await paysheet.fillSearchByName('BAT400');
            await page.keyboard.press('Enter');
            await paysheet.clickSelectEmployee();
            await paysheet.setNote('Automation test salary');
            await paysheet.clickSave();
            await toastPage.getToastAddSuccess();
            await paysheet.clickLatestPaysheetRow();
            await paysheet.clickViewPayroll();

            // verify salary
            await paysheet.verifyMainSalary('10.000.000');
            await paysheet.verifyAllowance('0', 0);
            await paysheet.verifyTotalSalary('10.000.000');
            await paysheet.verifyInsurance('1.050.000');
            await paysheet.verifyTax('0', 4);
            await paysheet.verifyTotalReceived('8.950.000');

        });
    });

    /* Test tính lương cho nhân viên có 1 ngày nghỉ thường */
    test('E2E Calculate salary with 1 day regular leave - Kiểm tra tính lương khi có 1 ngày nghỉ thường ', async ({ page }) => {
        allure.story('Calculate salary with 1 day regular leave Story');
        allure.description(`
        Employee: BAT402
        Payroll month: 12/2025
        Base salary: 10,000,000 VND
        Standard work: 2
        Working days: 1
        Regular leave: 1 day

        Expected:
        Main salary: 5,000,000 VND
        Insurance deduction: 1.050.000 VND
        Net salary: 3,950,000 VND
        `)
        await beforeTest();
        await allure.step('Add paysheet for 1 employees', async () => {
            await paysheet.clickAdd();
            await paysheet.setNamePaysheet('Automation test');
            await paysheet.clickCheckboxMonthly();
            await paysheet.clickChooseMonth();
            await paysheet.clickCustomMonth(12);
            await paysheet.fillSearchByName('BAT402');
            await page.keyboard.press('Enter');
            await paysheet.clickSelectEmployee();
            await paysheet.setNote('Automation test salary');
            await paysheet.clickSave();
            await toastPage.getToastAddSuccess();
            await paysheet.clickLatestPaysheetRow();
            await paysheet.clickViewPayroll();

            // verify salary
            await paysheet.verifyMainSalary('5.000.000');
            await paysheet.verifyAllowance('0', 0);
            await paysheet.verifyTotalSalary('5.000.000');
            await paysheet.verifyInsurance('1.050.000');
            await paysheet.verifyTax('0', 4);
            await paysheet.verifyTotalReceived('3.950.000');

        });
    });

      /* Test thuế không có người phụ thuộc
        Test Data : Lương chính = 14.000.000, 
        Mức đóng bảo hiểm 14.000.000, BHXH 8%, BHYT 1.5%, BHTN 1% , ĐOÀN PHÍ 1% = 1.470.140
        Phụ cấp = 3.000.000 (Miễn thuế 2.730.000)
        Mức đóng thuế = 17.000.000 - 1.470.140(Bảo hiểm) - 11.000.000(miễn bản thân) - 2.730.000(miễn phụ cấp) = 1.799.860
        Thuế bậc 1 = 1.799.860 * 5% = 89.993 
        Tổng nhận = 17.000.000 - 1.470.140(Bảo hiểm) - 89.993(Thuế) = 15.439.867 */
    test('E2E Calculate tax without dependents - Kiểm tra tính thuế khi không có người phụ thuộc ', async ({ page }) => {
        allure.story('Calculate tax without dependents Story');
        await beforeTest();

        await allure.step('Add paysheet for 1 employees', async () => {
            await paysheet.clickAdd();
            await paysheet.setNamePaysheet('Automation test');
            await paysheet.clickCheckboxMonthly();
            await paysheet.clickChooseMonth();
            await paysheet.clickCustomMonth(12);
            await paysheet.fillSearchByName('BAT100');
            await page.keyboard.press('Enter');
            await paysheet.clickSelectEmployee();
            await paysheet.setNote('Automation test tax');
            await paysheet.clickSave();
            await toastPage.getToastAddSuccess();
            await paysheet.clickLatestPaysheetRow();
            await paysheet.clickViewPayroll();

            // verify salary and tax
            await paysheet.verifyMainSalary('14.000.000');
            await paysheet.verifyAllowance('3.000.000', 0);
            await paysheet.verifyTotalSalary('17.000.000');
            await paysheet.verifyInsurance('1.470.140');
            await paysheet.verifyTax('89.993', 0);
            await paysheet.verifyTotalReceived('15.439.867');

        });
    });
});

