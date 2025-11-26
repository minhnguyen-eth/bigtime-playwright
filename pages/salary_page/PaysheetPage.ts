import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class PaysheetPage extends BasePage {
    readonly PAYSHEET_BUTTON: Locator;
    readonly NAME_PAYSHEET_INPUT: Locator;
    readonly RADIO_MONTHLY: Locator;
    readonly DROPDOWN_MONTH: Locator;
    readonly DROPDOWN_EMPLOYEE: Locator;
    readonly EMPLOYEE_OPTION: Locator;
    readonly SUBMIT_BUTTON: Locator;
    readonly LATEST_PAYSHEET_ROW: Locator;
    readonly VIEW_PAYROLL_BUTTON: Locator;
    readonly SEND_ALL_BUTTON: Locator;
    readonly CONFIRM_2_BUTTON: Locator;
    readonly NOTE_INPUT: Locator;
    readonly PAYSLIP_BUTTON: Locator;
    readonly SALARY_SLIP_CODE: Locator;
    readonly BROWSE_BUTTON: Locator;
    readonly SALARY_CLOSING_BUTTON: Locator;
    readonly EXPORT_DATA_BUTTON: Locator;
    readonly REFRESH_BUTTON: Locator;
    readonly PAYMENT_HISTORY_BUTTON: Locator;
    readonly HISTORY_PAYMENT_CODE_BUTTON: Locator;
    readonly EMPLOYEE_NAME_LABEL: Locator;
    readonly SEARCH_INPUT: Locator;
    readonly VERIFY_PAYSHEET_ID_CELL: Locator;
    readonly SELECT_ALL_EMPLOYEES_CHECKBOX: Locator;
    readonly REASON_INPUT: Locator;
    readonly REASON_LABEL: Locator;
    readonly PAYMENT_CONFIRM_BUTTON: Locator;
    readonly PAYMENT_BUTTON: Locator;
    readonly CHECKBOX_MONTHLY: Locator;
    readonly CHOOSE_MONTH: Locator;
    readonly EMPLOYEE_NAME_INPUT: Locator;
    readonly PAYSLIP_PAYMENT: Locator;
    readonly REQUIRED_ENTER_NAME: Locator;
    readonly EXPORT_EXCEL_BY_MONTH: Locator;
    readonly CHOOSE_MONTH_EXPORT: Locator;
    readonly MONTH_05: Locator;
    readonly EXPORT_ONLY_1_PAYSHEET: Locator;
    readonly ADD_MORE_EMPLOYEE: Locator;
    readonly FILL_EMPLOYEE_NAME: Locator;
    readonly SELECT_MORE_EMPLOYEE: Locator;
    readonly BASE_SALARY: Locator;
    readonly NUMBER_OF_WORKING_DAYS: Locator;
    readonly OVERTIME_INPUT: Locator;
    readonly BONUS_BUTTON: Locator;
    readonly ADD_BONUS_BUTTON: Locator;
    readonly MONEY_INPUT: Locator;
    readonly TIMES_INPUT: Locator;
    readonly TYPE_INPUT: Locator;
    readonly DEDUCTION: Locator;
    readonly ADD_DEDUCTION: Locator;
    readonly TEMPORARY_SAVE_BUTTON: Locator;
    readonly VERIFY_OVERTIME: Locator;
    readonly SELECT_MORE_EMPLOYEE_2: Locator;
    readonly CHECKBOX_PAYSLIPS_FIRST: Locator;
    readonly SEARCH_BY_NAME: Locator;
    readonly BUTTON_SEARCH: Locator;
    readonly SELECT_EMPLOYEE: Locator;
    readonly ALLOWANCE_BUTTON: Locator;
    readonly ADD_ALLOWANCE_BUTTON: Locator;
    readonly INPUT_FILL_MONEY_ALLOWANCE: Locator;
    readonly SEPARATE_BUTTON: Locator;
    readonly POPUP_SEPARATE: Locator;

    constructor(page: Page) {
        super(page);
        this.POPUP_SEPARATE = page.locator("//div[.='Bạn có chắc chắn muốn tách bảng lương thành 2 phần: đã duyệt và chưa duyệt không?']");
        this.SEPARATE_BUTTON = page.locator("//span[contains(.,'Tách')]");
        this.INPUT_FILL_MONEY_ALLOWANCE = page.locator("//tr/td[3]/div/div/div/div[3]/input");
        this.ADD_ALLOWANCE_BUTTON = page.locator("//span[contains(.,'Thêm khoản phụ cấp khác')]");
        this.ALLOWANCE_BUTTON = page.locator("//tbody/tr/td[6]/p[1]");
        this.BUTTON_SEARCH = page.getByRole('tablist').getByRole('button', { name: 'Tìm kiếm' });
        this.CHECKBOX_PAYSLIPS_FIRST = page.locator('.v-selection-control').first();
        this.VERIFY_OVERTIME = page.locator("//input[contains(@value,'500.000')]");
        this.TEMPORARY_SAVE_BUTTON = page.locator("//span[.=' Lưu tạm']");
        this.ADD_DEDUCTION = page.locator("//span[.='Thêm khoản trừ khác']");
        this.DEDUCTION = page.locator("//table/tbody/tr/td[8]/p");
        this.TYPE_INPUT = page.locator("//td[2]/div/div/div/div[3]/div/input");
        this.TIMES_INPUT = page.locator("//tr/td[3]/div/div/div/div[3]/div/input");
        this.MONEY_INPUT = page.locator("//td[4]/div/div/div/div[3]/input");
        this.ADD_BONUS_BUTTON = page.locator("//span[.='Thêm khoản thưởng khác']");
        this.BONUS_BUTTON = page.locator("//tbody/tr/td[7]/p[1]");
        this.OVERTIME_INPUT = page.locator("//tr/td[5]/div/div/div/div[3]/input");
        this.NUMBER_OF_WORKING_DAYS = page.locator("//tr/td[4]/div/div/div/div[3]/div/input");
        this.BASE_SALARY = page.locator("//tbody/tr/td[4]/p[1]");
        this.SELECT_MORE_EMPLOYEE = page.getByRole('option', { name: /Big App Tech/ });
        this.SELECT_MORE_EMPLOYEE_2 = page.getByRole('option', { name: 'BAT810 - Nguyễn Văn Minh' });
        this.FILL_EMPLOYEE_NAME = page.locator("//div[3]/div[2]/div/div/div/div[3]/div/input");
        this.ADD_MORE_EMPLOYEE = page.locator("//span[normalize-space()='Thêm nhân viên']");
        this.EXPORT_ONLY_1_PAYSHEET = page.getByRole('table').getByRole('button', { name: 'Xuất dữ liệu' });
        this.MONTH_05 = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='Thg 5']");
        this.CHOOSE_MONTH_EXPORT = page.getByLabel('', { exact: true });
        this.EXPORT_EXCEL_BY_MONTH = page.getByRole('main').locator('header').getByRole('button', { name: 'Xuất dữ liệu' });
        this.REQUIRED_ENTER_NAME = page.locator("//div[contains(text(),'Nhập tên')]");
        this.PAYSLIP_PAYMENT = page.locator("//span[normalize-space()='Phiếu lương']");
        this.EMPLOYEE_NAME_INPUT = page.getByRole('textbox', { name: 'Nhân viên ※' });
        this.CHOOSE_MONTH = page.getByRole('textbox', { name: 'Khoảng thời gian hàng tháng' });
        this.CHECKBOX_MONTHLY = page.getByRole('radio', { name: 'Hàng tháng' });
        this.PAYSHEET_BUTTON = page.locator('//a[@href="/salary/pay-sheet"]');
        this.NAME_PAYSHEET_INPUT = page.getByRole('textbox', { name: 'Tên ※' });
        this.RADIO_MONTHLY = page.getByRole('radio', { name: 'Hàng tháng' });
        this.DROPDOWN_MONTH = page.locator('//i[@title="Open"]');
        this.DROPDOWN_EMPLOYEE = page.getByRole('textbox', { name: 'Nhân viên ※' });
        this.EMPLOYEE_OPTION = page.locator("//div[@role='option']//div[@class='v-list-item-title']");
        this.SUBMIT_BUTTON = page.locator('//button[@type="submit"]');
        this.LATEST_PAYSHEET_ROW = page.locator('#row-0').getByText('Automation test');
        this.VIEW_PAYROLL_BUTTON = page.getByRole('button', { name: 'Xem bảng lương' });
        this.SEND_ALL_BUTTON = page.locator('//span[contains(normalize-space(),"Gửi tất cả")]');
        this.CONFIRM_2_BUTTON = page.locator('//span[.="Xác nhận"]');
        this.NOTE_INPUT = page.locator('//textarea[@class="v-field__input"]');
        this.PAYSLIP_BUTTON = page.locator('//a[@href="/salary/payslip"]');
        this.SALARY_SLIP_CODE = page.locator('//tr[@id="row-0"]//td[2]');
        this.BROWSE_BUTTON = page.getByRole('button', { name: /Duyệt/ }).first();
        this.SALARY_CLOSING_BUTTON = page.getByRole('button', { name: 'Chốt lương' });
        this.EXPORT_DATA_BUTTON = page.locator('//span[contains(normalize-space(),"Xuất dữ liệu")]');
        this.REFRESH_BUTTON = page.locator('//span[normalize-space()="Làm mới"]');
        this.PAYMENT_HISTORY_BUTTON = page.locator('//span[normalize-space()="Lịch sử thanh toán"]');
        this.HISTORY_PAYMENT_CODE_BUTTON = page.locator('//td[@class="text-left cursor-pointer"]');
        this.EMPLOYEE_NAME_LABEL = page.locator('//div[contains(text(),"Nguyễn Văn Minh")]');
        this.SEARCH_INPUT = page.getByRole('textbox', { name: 'Tìm kiếm theo mã hoặc tên bảng lương' });
        this.VERIFY_PAYSHEET_ID_CELL = page.locator("//td[.='BL000001']");
        this.SELECT_ALL_EMPLOYEES_CHECKBOX = page.getByRole('radio', { name: 'Chọn tất cả nhân viên' });
        this.REASON_LABEL = page.locator('//form//div[3]//textarea');
        this.REASON_INPUT = page.locator('//form//div[3]//div[3]//textarea[1]');
        this.PAYMENT_BUTTON = page.getByRole('button', { name: 'Thanh toán' });
        this.PAYMENT_CONFIRM_BUTTON = page.locator('//span[contains(normalize-space(),"Xác nhận thanh toán")]');
        this.SEARCH_BY_NAME = page.getByRole('textbox', { name: 'Tìm kiếm theo tên' });
        this.SELECT_EMPLOYEE = page.locator("(//input[@type='checkbox'])[2]");
    }
    async verifyTotalTaxAmountCalculated(amount: string) {
        const locator = this.page.getByText(`${amount} đ`, { exact: true });
        await this.safeVerifyTextContains(locator, amount);
    }

    async verifyTotalReceived(amount: string) {
        const locator = this.page.locator(`(//td[@class='text-right'][contains(text(),'${amount} đ')])[3]`);
        await this.safeVerifyTextContains(locator, amount);
    }

    async verifyInsurance(amount: string) {
        const locator = this.page.locator(`//p[contains(text(),'${amount} đ')]`);
        await this.safeVerifyTextContains(locator, amount);
    }

    async verifyTotalSalary(amount: string) {
        const locator = this.page.locator(`(//td[@class='text-right'][contains(text(),'${amount} đ')])[2]`);
        await this.safeVerifyTextContains(locator, amount);
    }

    async verifyTax(amount: string) {
        const locator = this.page.locator(`//p[contains(text(),'${amount} đ')]`);
        await this.safeVerifyTextContains(locator, amount);
    }

    async verifyMainSalary(amount: string) {
        const locator = this.page.locator(`//p[contains(text(),'${amount} đ')]`);
        await this.safeVerifyTextContains(locator, amount);
    }

    async verifyAllowance(amount: string) {
        const locator = this.page.locator(`//p[contains(text(),'${amount} đ')]`);
        await this.safeVerifyTextContains(locator, amount);
    }

    async verifyDeduction(amount: string) {
        const locator = this.page.locator(`//p[contains(text(),'${amount} đ')]`);
        await this.safeVerifyTextContains(locator, amount);
    }

    async verifyPopupSeparate(text: string) {
        await this.safeVerifyToHaveText(this.POPUP_SEPARATE, text);
    }

    async clickSeparateButton() {
        await this.safeClick(this.SEPARATE_BUTTON);
    }

    async fillAllowanceMoney(money: string) {
        await this.safeFill(this.INPUT_FILL_MONEY_ALLOWANCE, money);
    }

    async fillAllowanceType(name: string) {
        await this.safeFill(this.TYPE_INPUT, name);
    }

    async clickAddAllowanceButton() {
        await this.safeClick(this.ADD_ALLOWANCE_BUTTON);
    }

    async clickAllowanceButton() {
        await this.safeClick(this.ALLOWANCE_BUTTON);
    }

    async clickSelectEmployee() {
        await this.safeClick(this.SELECT_EMPLOYEE);
    }

    async clickButtonSearch() {
        await this.safeClick(this.BUTTON_SEARCH);
    }

    async clickConfirmPaysheet() {
        await this.safeClick(this.CONFIRM_BUTTON);
    }

    async fillSearchByName(name: string) {
        await this.safeFill(this.SEARCH_BY_NAME, name);
    }

    async clickCheckboxPayslipsFirst() {
        await this.safeClick(this.CHECKBOX_PAYSLIPS_FIRST);
    }

    async clickSelectEmployee2() {
        await this.safeClick(this.SELECT_MORE_EMPLOYEE_2);
    }

    async expectOvertime() {
        await expect(this.VERIFY_OVERTIME).toBeVisible();
        await expect(this.VERIFY_OVERTIME).toHaveValue(/500\.000/);
    }

    async clickTemporarySave() {
        await this.safeClick(this.TEMPORARY_SAVE_BUTTON);
    }

    async fillDeductionMoney(money: string) {
        await this.safeFill(this.MONEY_INPUT, money);
    }

    async fillTimes(times: string) {
        await this.safeFill(this.TIMES_INPUT, times);
    }

    async fillDeductionType(type: string) {
        await this.safeFill(this.TYPE_INPUT, type);
    }

    async clickAddDeduction() {
        await this.safeClick(this.ADD_DEDUCTION);
    }

    async clickDeduction() {
        await this.safeClick(this.DEDUCTION);
    }

    async verifyBonus(amount: string) {
        const locator = this.page.locator(`//p[contains(text(),'${amount} đ')]`);
        await this.safeVerifyTextContains(locator, amount);
    }

    async fillBonusType(type: string) {
        await this.safeFill(this.TYPE_INPUT, type);
    }

    async fillBonusTimes(times: string) {
        await this.safeFill(this.TIMES_INPUT, times);
    }

    async fillBonusMoney(money: string) {
        await this.safeFill(this.MONEY_INPUT, money);
    }

    async clickAddBonusButton() {
        await this.safeClick(this.ADD_BONUS_BUTTON);
    }

    async clickBonusButton() {
        await this.safeClick(this.BONUS_BUTTON);
    }

    async fillOvertime(overtime: string) {
        await this.safeFill(this.OVERTIME_INPUT, overtime);
    }

    async fillNumberOfWorkingDays(number: string) {
        await this.safeFill(this.NUMBER_OF_WORKING_DAYS, number);
    }

    async clickBaseSalary() {
        await this.safeClick(this.BASE_SALARY);
    }

    async clickSelectMoreEmployee() {
        await this.safeClick(this.SELECT_MORE_EMPLOYEE);
    }

    async fillEmployeeNameInput(name: string) {
        await this.safeFill(this.FILL_EMPLOYEE_NAME, name);
    }

    async clickAddMoreEmployee() {
        await this.safeClick(this.ADD_MORE_EMPLOYEE);
    }

    async clickExportOnly1Paysheet() {
        await this.safeClick(this.EXPORT_ONLY_1_PAYSHEET);
    }

    async clickMonth05() {
        await this.safeClick(this.MONTH_05);
    }

    async clickChooseMonthExport() {
        await this.safeClick(this.CHOOSE_MONTH_EXPORT);
    }

    async clickExportExcelByMonth() {
        await this.safeClick(this.EXPORT_EXCEL_BY_MONTH);
    }

    async verifyPaysheetId(text: string) {
        await this.safeVerifyToHaveText(this.VERIFY_PAYSHEET_ID_CELL, text);
    }

    async getRequiredEnterName(enterName: string) {
        await this.safeVerifyToHaveText(this.REQUIRED_ENTER_NAME, enterName);
    }

    async clickPayslipPayment() {
        await this.waitForOverlayToDisappear();
        await this.safeClick(this.PAYSLIP_PAYMENT);
    }

    async clickSalarySlipCode() {
        await this.safeClick(this.SALARY_SLIP_CODE);
    }

    async clickPayslip() {
        await this.safeClick(this.PAYSLIP_BUTTON);
    }

    async clickEmployeeOption() {
        await this.safeClick(this.EMPLOYEE_OPTION);
    }

    async clickAndSetDropdownEmployee(name: string) {
        await this.safeClick(this.DROPDOWN_EMPLOYEE);
        await this.page.keyboard.type(name);
    }

    async setNote(note: string) {
        await this.safeFill(this.NOTE_INPUT, note);
    }

    async clickChooseMonth() {
        await this.safeClick(this.CHOOSE_MONTH);
    }

    async clickCheckboxMonthly() {
        await this.safeClick(this.CHECKBOX_MONTHLY);
    }

    async clickExportData() {
        await this.safeClick(this.EXPORT_DATA_BUTTON);
    }

    async clickRefresh() {
        await this.safeClick(this.REFRESH_BUTTON);
    }

    async fillReason(reason: string) {
        await this.safeFill(this.REASON_INPUT, reason);
        await this.clickYes();
    }

    async clickSelectAllEmployees() {
        await this.safeClick(this.SELECT_ALL_EMPLOYEES_CHECKBOX, { force: true });
    }

    async fillSearchPaysheet(name: string) {
        await this.safeFill(this.SEARCH_INPUT, name);
    }

    async getEmployeeName(employeeName: string) {
        await this.safeVerifyToHaveText(this.EMPLOYEE_NAME_LABEL, employeeName);
    }

    async clickHistoryPaymentCode() {
        await this.safeClick(this.HISTORY_PAYMENT_CODE_BUTTON);
    }

    async clickPaymentHistory() {
        await this.safeClick(this.PAYMENT_HISTORY_BUTTON);
    }

    async clickPaymentConfirm() {
        await this.safeClick(this.PAYMENT_CONFIRM_BUTTON);
    }

    async clickPayment() {
        await this.safeClick(this.PAYMENT_BUTTON);
    }

    async clickPaysheet() {
        await this.safeClick(this.PAYSHEET_BUTTON);
    }

    async setNamePaysheet(name: string) {
        await this.safeFill(this.NAME_PAYSHEET_INPUT, name);
    }

    async clickMonthlyRadio() {
        await this.safeClick(this.RADIO_MONTHLY);
    }

    async clickDropdownMonth() {
        await this.safeClick(this.DROPDOWN_MONTH);
    }


    // Hàm tùy chỉnh tháng
    async clickCustomMonth(month: number) {
        // const month = 11;
        const year = new Date().getFullYear();
        const firstDay = `1/${month}/${year}`;
        const lastDayOfMonth = new Date(year, month, 0).getDate();
        const lastDay = `${lastDayOfMonth}/${month}/${year}`;
        const dateRange = `${firstDay} - ${lastDay}`;

        const monthOption = this.page.locator(
            `//div[@class="v-list-item-title"][normalize-space()="${dateRange}"]`
        );

        await this.safeClick(monthOption);
    }


    // Hàm chọn tháng hiện tại
    async clickMonthOption() {
        const now = new Date();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();

        const firstDay = `1/${month}/${year}`;
        const lastDayOfMonth = new Date(year, month, 0).getDate();
        const lastDay = `${lastDayOfMonth}/${month}/${year}`;

        const dateRange = `${firstDay} - ${lastDay}`;

        const monthOption = this.page.locator(`//div[@class="v-list-item-title"][normalize-space()="${dateRange}"]`);

        await this.safeClick(monthOption);
    }

    async setEmployeeName(name: string) {
        await this.safeFill(this.EMPLOYEE_NAME_INPUT, name);
    }

    async clickLatestPaysheetRow() {
        await this.safeClick(this.LATEST_PAYSHEET_ROW);
    }

    async clickViewPayroll() {
        await this.safeClick(this.VIEW_PAYROLL_BUTTON);
    }

    async clickSendAll() {
        await this.safeClick(this.SEND_ALL_BUTTON);
    }

    async clickConfirm2() {
        await this.safeClick(this.CONFIRM_2_BUTTON);
    }

    async clickBrowse() {
        await this.safeClick(this.BROWSE_BUTTON);
        await this.clickYes();
    }

    async clickSalaryClosing() {
        await this.safeClick(this.SALARY_CLOSING_BUTTON);
    }
}
