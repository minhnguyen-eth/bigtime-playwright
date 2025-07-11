import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class PaysheetPage extends BasePage {

    readonly paysheetButton: Locator;
    readonly namePaysheetInput: Locator;
    readonly setNamePaysheetInput: Locator;
    readonly radioMonthly: Locator;
    readonly dropdownMonth: Locator;
    readonly monthOption: Locator;
    readonly dropdownEmployee: Locator;
    readonly employeeOption: Locator;
    readonly submitButton: Locator;
    readonly latestPaysheetRow: Locator;
    readonly viewPayrollButton: Locator;
    readonly sendAllButton: Locator;
    readonly confirm2Button: Locator;
    readonly noteInput: Locator;
    readonly payslipButton: Locator;
    readonly salarySlipCode: Locator;
    readonly browseButton: Locator;
    readonly okButton: Locator;
    readonly salaryClosingButton: Locator;
    readonly confirmButton: Locator;
    readonly exportDataButton: Locator;
    readonly refreshButton: Locator;
    readonly paymentHistoryButton: Locator;
    readonly historyPaymentCodeButton: Locator;
    readonly employeeNameLabel: Locator;
    readonly cancelPaysheetButton: Locator;
    readonly searchInput: Locator;
    readonly verifyPaysheetIdCell: Locator;
    readonly selectAllEmployeesCheckbox: Locator;
    readonly reasonInput: Locator;
    readonly reasonLabel: Locator;
    readonly createTicketButton: Locator;
    readonly paymentButton: Locator;
    readonly checkBoxMonthly: Locator;
    readonly chooseMonth: Locator;
    readonly employeeNameInput: Locator;
    readonly payslipPayment: Locator;
    readonly requiredEnterName: Locator;
    readonly searchButton: Locator;
    readonly searchEmployeeName: Locator;
    readonly exportExcelByMonth: Locator;
    readonly chosseMonthExport: Locator;
    readonly Month05: Locator;
    readonly chosseDatePicker: Locator;
    readonly exportOnly1Paysheet: Locator;
    readonly monthOption05: Locator;
    readonly addMoreEmployee: Locator;
    readonly fillEmployeeName: Locator;
    readonly selectMoreEmployee: Locator;
    readonly salarySlipCodeRow1: Locator;
    readonly baseSalary: Locator;
    readonly numberOfWorkingDays: Locator;
    readonly verifyBaseSalary: Locator;
    readonly overTimeInput: Locator;
    readonly bonusButton: Locator;
    readonly addBonusButton: Locator;
    readonly moneyInput: Locator;
    readonly timesInput: Locator;
    readonly typeInput: Locator;
    readonly verifyBonus: Locator;
    readonly deduction: Locator;
    readonly addDeduction: Locator;
    readonly temporarySaveButton: Locator;
    readonly verifyOverTime: Locator;
    readonly verifyAllowance: Locator;
    readonly verifyDeduction: Locator;

    constructor(page: Page) {
        super(page);
        this.verifyDeduction = page.locator("//p[contains(text(),'300.000 đ')]")
        this.verifyAllowance = page.locator("//p[contains(text(),'50.000.000 đ')]")
        this.verifyOverTime = page.locator("//input[contains(@value,'500.000')]")
        this.temporarySaveButton = page.locator("//span[.=' Lưu tạm']")
        this.addDeduction = page.locator("//span[.='Thêm khoản trừ khác']");
        this.deduction = page.locator("//table/tbody/tr/td[8]/p");
        this.verifyBonus = page.locator("//p[contains(text(),'200.000 đ')]")
        this.typeInput = page.locator("//td[2]/div/div/div/div[3]/div/input")
        this.timesInput = page.locator("//tr/td[3]/div/div/div/div[3]/div/input")
        this.moneyInput = page.locator("//td[4]/div/div/div/div[3]/input")
        this.addBonusButton = page.locator("//span[.='Thêm khoản thưởng khác']")
        this.bonusButton = page.locator("//tbody/tr[@class='selected-row']/td[7]/p[1]")
        this.overTimeInput = page.locator("//tr/td[5]/div/div/div/div[3]/input")
        this.verifyBaseSalary = page.locator("//p[contains(text(),'20.000.000 đ')]")
        this.numberOfWorkingDays = page.locator("//tr/td[4]/div/div/div/div[3]/div/input")
        this.baseSalary = page.locator("//tbody/tr/td[4]/p[1]")
        this.selectMoreEmployee = page.locator("//span[contains(.,'Big App Tech')]")
        this.fillEmployeeName = page.locator("//div[3]/div[2]/div/div/div/div[3]/div/input")
        this.addMoreEmployee = page.locator("//span[normalize-space()='Thêm nhân viên']")
        this.exportOnly1Paysheet = page.locator("//button[@class='v-btn v-theme--lightColor7 bg-success v-btn--density-default rounded-lg v-btn--size-x-small v-btn--variant-flat mr-2']//span[@class='v-btn__content']")
        this.chosseDatePicker = page.locator("//button[contains(text(),'Chọn')]")
        this.Month05 = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='Thg 5']")
        this.chosseMonthExport = page.locator("//div[2]/div/div/div/div/div[1]/div/div/div[3]/input")
        this.exportExcelByMonth = page.locator("//span[.=' Xuất dữ liệu']")
        this.searchButton = page.locator("//span[.=' Tìm kiếm']")
        this.requiredEnterName = page.locator("//div[contains(text(),'Nhập tên')]")
        this.payslipPayment = page.locator("//span[normalize-space()='Phiếu lương']")
        this.employeeNameInput = page.locator("//form[1]/div[1]/div[3]/div[1]/div[2]/div[1]/div[2]/div[1]/div[6]/div[1]/div[1]/div[1]/div[3]/div[1]/input[1]")
        this.chooseMonth = page.locator("//div[@class='v-field v-field--active v-field--appended v-field--center-affix v-field--dirty v-field--variant-outlined v-theme--lightColor7 v-locale--is-ltr']//i[@title='Open']")
        this.checkBoxMonthly = page.locator('//div/div[2]/div/div[2]/div/div/div/div/div[2]/div/div/input')
        this.paysheetButton = page.locator('//a[@href="/salary/pay-sheet"]');
        this.namePaysheetInput = page.locator('//form/div/div[3]/div/div[2]/div/div[2]/div/div[1]/div/div/div/div[3]/div/input');
        this.setNamePaysheetInput = page.locator('//form//div[3]//div[2]//div//div[1]//div//div[1]//div//input');
        this.radioMonthly = page.locator('//i[contains(@class,"mdi-radiobox-blank")]');
        this.dropdownMonth = page.locator('//i[@title="Open"]');
        this.monthOption = page.locator('//div[@class="v-list-item-title"][normalize-space()="1/7/2025 - 31/7/2025"]');
        this.monthOption05 = page.locator('//div[@class="v-list-item-title"][normalize-space()="1/5/2025 - 31/5/2025"]');
        this.dropdownEmployee = page.locator("//div[@class='v-field v-field--appended v-field--center-affix v-field--variant-outlined v-theme--lightColor7 v-locale--is-ltr']//div[@class='v-field__input']");
        this.employeeOption = page.locator("//div[@role='option']//div[@class='v-list-item-title']");
        this.submitButton = page.locator('//button[@type="submit"]');
        this.latestPaysheetRow = page.locator("//tr[@id='row-0']");
        this.viewPayrollButton = page.getByRole('button', { name: 'Xem bảng lương' });
        this.sendAllButton = page.locator('//span[contains(normalize-space(),"Gửi tất cả")]');
        this.confirm2Button = page.locator('//span[.="Xác nhận"]');
        this.noteInput = page.locator('//textarea[@class="v-field__input"]');
        this.payslipButton = page.locator('//a[@href="/salary/payslip"]');
        this.salarySlipCode = page.locator('//tr[@id="row-0"]//td[2]');
        this.salarySlipCodeRow1 = page.locator('//tr[@id="row-1"]//td[2]');
        this.browseButton = page.locator('//span[contains(normalize-space(),"Duyệt")]');
        this.okButton = page.locator('//span[normalize-space()="Có"]');
        this.salaryClosingButton = page.getByRole('button', { name: 'Chốt lương' });
        this.confirmButton = page.getByRole('button', { name: 'Xác nhận' });
        this.exportDataButton = page.locator('//span[contains(normalize-space(),"Xuất dữ liệu")]');
        this.refreshButton = page.locator('//span[normalize-space()="Làm mới"]');
        this.paymentHistoryButton = page.locator('//span[normalize-space()="Lịch sử thanh toán"]');
        this.historyPaymentCodeButton = page.locator('//td[@class="text-left cursor-pointer"]');
        this.employeeNameLabel = page.locator('//div[contains(text(),"Nguyễn Văn Minh")]');
        this.cancelPaysheetButton = page.locator('//span[normalize-space()="Hủy"]');
        this.searchInput = page.locator("//div[1]/div/div/div/div[4]/div/input");
        this.verifyPaysheetIdCell = page.locator("//td[.='BL000001']");
        this.selectAllEmployeesCheckbox = page.locator("//div[@class='v-col-md-12 v-col-12']//i[@class='mdi-radiobox-blank mdi v-icon notranslate v-theme--lightColor7 v-icon--size-default']");
        this.reasonLabel = page.locator('//form//div[3]//textarea');
        this.reasonInput = page.locator('//form//div[3]//div[3]//textarea');
        this.paymentButton = page.getByRole('button', { name: 'Thanh toán' });
        this.createTicketButton = page.locator('//span[contains(normalize-space(),"Tạo phiếu")]');

    }

    async expectAllowance() {
        await this.safeVerifyTextContains(this.verifyAllowance, '50.000.000');
    }

    async expectDeduction() {
        await this.safeVerifyTextContains(this.verifyDeduction, '300.000');
    }

    async expectOverTime() {
        await expect(this.verifyOverTime).toBeVisible();
        await expect(this.verifyOverTime).toHaveValue(/500\.000/);
    }

    async clickTemporarySave() {
        await this.safeClick(this.temporarySaveButton);
    }

    async fillDeductionMoney(money: string) {
        await this.safeFill(this.moneyInput, money);
    }

    async fillTimes(times: string) {
        await this.safeFill(this.timesInput, times);
    }

    async fillDeductionType(type: string) {
        await this.safeFill(this.typeInput, type);
    }

    async clickAddDeduction() {
        await this.safeClick(this.addDeduction);
    }

    async clickDeduction() {
        await this.safeClick(this.deduction);
    }

    async expectBonusMoney() {
        await this.safeVerifyToHaveText(this.verifyBonus, '200.000 đ');
    }

    async fillBonusType(type: string) {
        await this.safeFill(this.typeInput, type);
    }

    async fillBonusTimes(times: string) {
        await this.safeFill(this.timesInput, times);
    }

    async fillBonusMoney(money: string) {
        await this.safeFill(this.moneyInput, money);
    }

    async clickAddBonusButton() {
        await this.safeClick(this.addBonusButton);
    }

    async clickBonusButton() {
        await this.safeClick(this.bonusButton);
    }

    async fillOverTime(overtime: string) {
        await this.safeFill(this.overTimeInput, overtime);
    }

    async expectBaseSalary() {
        await this.safeVerifyTextContains(this.verifyBaseSalary, '20.000.000');
    }

    async fillNumberOfWorkingDays(number: string) {
        await this.safeFill(this.numberOfWorkingDays, number);
    }

    async clickbaseSalary() {
        await this.safeClick(this.baseSalary);

    }
    async clickSalarySlipCodeRow1() {
        await this.safeClick(this.salarySlipCodeRow1);
    }

    async clickSelectMoreEmployee() {
        await this.safeClick(this.selectMoreEmployee);
    }

    async fillEmployeeNameInput(name: string) {
        await this.safeFill(this.fillEmployeeName, name);
    }

    async clickAddMoreEmployee() {
        await this.safeClick(this.addMoreEmployee);
    }

    async clickMonthOption05() {
        await this.safeClick(this.monthOption05);
    }

    async clickExportOnly1Paysheet() {
        await this.safeClick(this.exportOnly1Paysheet);
    }
    async clickChosseDatePicker() {
        await this.safeClick(this.chosseDatePicker);
    }

    async clickMonth05() {
        await this.safeClick(this.Month05);
    }

    async clickChosseMonthExport() {
        await this.safeClick(this.chosseMonthExport);
    }

    async clickExportExcelByMonth() {
        await this.safeClick(this.exportExcelByMonth);
    }

    async clickSearchButton() {
        await this.safeClick(this.searchButton);
    }

    async verifyPaysheetId(text: string) {
        await this.safeVerifyToHaveText(this.verifyPaysheetIdCell, text);
    }

    async getRequiredEnterName(enterName: string) {
        await this.safeVerifyToHaveText(this.requiredEnterName, enterName);
    }

    async clickPayslipPayment() {
        await this.waitForOverlayToDisappear();
        await this.safeClick(this.payslipPayment);
    }

    async clickSalarySlipCode() {
        await this.safeClick(this.salarySlipCode);
    }

    async clickPayslip() {
        await this.safeClick(this.payslipButton);
    }

    async clickEmployeeOption() {
        await this.safeClick(this.employeeOption);
    }

    async clickAndSetDropDownEmployee(name: string) {
        await this.safeClick(this.dropdownEmployee);
        await this.page.keyboard.type(name);
    }

    async setNote(note: string) {
        await this.safeFill(this.noteInput, note);
    }

    async clickChooseMonth() {
        await this.safeClick(this.chooseMonth);
    }

    async clickCheckBoxMonthly() {
        await this.safeClick(this.checkBoxMonthly);
    }

    async clickExportData() {
        await this.safeClick(this.exportDataButton);
    }

    async clickRefresh() {
        await this.safeClick(this.refreshButton);
    }

    async clickOk() {
        await this.safeClick(this.okButton);
    }

    async fillReason(reason: string) {
        await this.safeClick(this.reasonLabel);
        await this.safeFill(this.reasonInput, reason);
    }

    async clickSelectAllEmployees() {
        await this.safeClick(this.selectAllEmployeesCheckbox, { force: true });
    }

    async fillSearchPaysheet(id: string) {
        await this.safeFill(this.searchInput, id);
    }

    async clickCancelPaysheet() {
        await this.safeClick(this.cancelPaysheetButton);
    }

    async getEmployeeName(employeeName: string) {
        await this.safeVerifyToHaveText(this.employeeNameLabel, employeeName);
    }

    async clickHistoryPaymentCode() {
        await this.safeClick(this.historyPaymentCodeButton);
    }

    async clickPaymentHistory() {
        await this.safeClick(this.paymentHistoryButton);
    }

    async clickCreateTicket() {
        await this.safeClick(this.createTicketButton);
    }

    async clickPayment() {
        await this.waitForOverlayToDisappear();
        await this.safeClick(this.paymentButton);
    }

    async waitForOverlayToDisappear() {
        await this.page.waitForFunction(() => {
            return [...document.querySelectorAll('.v-overlay__scrim')].every(el => {
                const style = window.getComputedStyle(el);
                return (
                    (el as HTMLElement).offsetParent === null ||
                    style.visibility === 'hidden' ||
                    style.opacity === '0'
                );
            });
        }, { timeout: 10000 });
    }

    async clickPaysheet() {
        await this.safeClick(this.paysheetButton);
    }

    async setNamePaysheet(name: string) {
        await this.safeFill(this.namePaysheetInput, name);
    }

    async clickMonthlyRadio() {
        await this.safeClick(this.radioMonthly);
    }

    async clickDropdownMonth() {
        await this.safeClick(this.dropdownMonth);
    }

    async clickMonthOption() {
        await this.safeClick(this.monthOption);
    }

    async setEmployeeName(name: string) {
        await this.safeFill(this.employeeNameInput, name);

    }

    async clickLatestPaysheetRow() {
        await this.waitForOverlayToDisappear();
        await this.safeClick(this.latestPaysheetRow);
    }

    async clickViewPayroll() {
        await this.safeClick(this.viewPayrollButton);
    }

    async clickSendAll() {
        await this.safeClick(this.sendAllButton);
    }

    async clickConfirm2() {
        await this.safeClick(this.confirm2Button);
    }

    async clickBrowse() {
        await this.safeClick(this.browseButton);
        await this.safeClick(this.okButton);
    }

    async clickSalaryClosing() {
        await this.safeClick(this.salaryClosingButton);
    }

    async clickConfirm() {
        await this.safeClick(this.confirmButton);
    }
}
