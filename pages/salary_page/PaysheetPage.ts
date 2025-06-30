import { Locator, Page, expect } from '@playwright/test';

export class PaysheetPage {
    readonly page: Page;
 
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


    constructor(page: Page) {
        this.page = page;
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
        this.monthOption = page.locator('//div[@class="v-list-item-title"][normalize-space()="1/6/2025 - 30/6/2025"]');
        this.monthOption05 = page.locator('//div[@class="v-list-item-title"][normalize-space()="1/5/2025 - 31/5/2025"]');
        this.dropdownEmployee = page.locator("//div[@class='v-field v-field--appended v-field--center-affix v-field--variant-outlined v-theme--lightColor7 v-locale--is-ltr']//div[@class='v-field__input']");
        this.employeeOption = page.locator("//div[@role='option']//div[@class='v-list-item-title']");
       
        this.submitButton = page.locator('//button[@type="submit"]');
        this.latestPaysheetRow = page.locator('//tr[@id="row-0"]');
        this.viewPayrollButton = page.locator('//span[contains(normalize-space(),"Xem bảng lương")]');
        this.sendAllButton = page.locator('//span[contains(normalize-space(),"Gửi tất cả")]');
        this.confirm2Button = page.locator('//span[.="Xác nhận"]');
        this.noteInput = page.locator('//textarea[@class="v-field__input"]');
        this.payslipButton = page.locator('//a[@href="/salary/payslip"]');
        this.salarySlipCode = page.locator('//tr[@id="row-0"]//td[2]');
        this.browseButton = page.locator('//span[contains(normalize-space(),"Duyệt")]');
        this.okButton = page.locator('//span[normalize-space()="Có"]');
        this.salaryClosingButton = page.locator('//span[contains(normalize-space(),"Chốt lương")]');
        this.confirmButton = page.locator('//span[.="Xác nhận"]');
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
        this.paymentButton = page.locator('//span[contains(normalize-space(),"Thanh toán")]');
        this.createTicketButton = page.locator('//span[contains(normalize-space(),"Tạo phiếu")]');


    }

    async clickMonthOption05() {
        await this.monthOption05.click();
    }

    async clickExportOnly1Paysheet() {
        await this.exportOnly1Paysheet.click();
    }

    async clickChosseDatePicker() {
        await this.chosseDatePicker.click();
    }

    async clickMonth05() {
        await this.Month05.click();
    }

    async clickChosseMonthExport() {
        await this.chosseMonthExport.click();
    }

    async clickExportExcelByMonth() {
        await this.exportExcelByMonth.click();
    }


    async clickSearchButton() {
        await this.searchButton.click();
    }

    async verifyPaysheetId(text: string) {
        await expect(this.verifyPaysheetIdCell).toHaveText((text)
        );

    }

    async getRequiredEnterName(enterName: string) {
        await expect(this.requiredEnterName).toHaveText(enterName);

    }

    async clickPayslipPayment() {
        await this.payslipPayment.click();
    }

    async clickSalarySlipCode() {
        await this.salarySlipCode.click();
    }

    async clickPayslip() {
        await this.payslipButton.click();
    }

    async clickEmployeeOption() {
        await this.employeeOption.click();
    }

    async clickAndSetDropDownEmployee() {
        await this.dropdownEmployee.click();
        await this.page.keyboard.type('Nguyễn Văn Minh');
    }

    async setNote(note: string) {
        await this.noteInput.fill(note);
    }

    async clickChooseMonth() {
        await this.chooseMonth.click();
    }

    async clickCheckBoxMonthly() {
        await this.checkBoxMonthly.click();
    }

    async clickExportData() {
        await this.exportDataButton.click();
    }

    async clickRefresh() {
        await this.refreshButton.click();
    }

    async clickOk() {
        await this.okButton.click();
    }

    async fillReason(reason: string) {
        await this.reasonLabel.click();
        await this.reasonInput.fill(reason);
    }

    async clickSelectAllEmployees() {
        await this.selectAllEmployeesCheckbox.click({ force: true });
    }

    async isPaysheetIdDisplayed(id: string) {
        const cell = this.page.locator(`//td[normalize-space()="${id}"]`);
        return cell.isVisible();
    }

    async fillSearchPaysheet(id: string) {
        await this.searchInput.fill(id);
    }

    async clickCancelPaysheet() {
        await this.cancelPaysheetButton.click();
    }

    async getEmployeeName(employeeName: string) {
        await expect(this.employeeNameLabel).toHaveText(employeeName);
    }

    async clickHistoryPaymentCode() {
        await this.historyPaymentCodeButton.click();
    }

    async clickPaymentHistory() {
        await this.paymentHistoryButton.click();
    }

    async clickCreateTicket() {
        await this.createTicketButton.click();
    }

    async clickPayment() {
        await this.paymentButton.click();
    }

    async clickPaysheet() {
        await this.paysheetButton.click();
    }

    async setNamePaysheet(name: string) {
        await this.namePaysheetInput.fill(name);
    }

    async clickMonthlyRadio() {
        await this.radioMonthly.click();
    }

    async clickDropdownMonth() {
        await this.dropdownMonth.click();
    }

    async clickMonthOption() {
        await this.monthOption.click();
    }

    async setEmployeeName(name: string) {
        await this.employeeNameInput.fill(name);
    }

    async clickLatestPaysheetRow() {
        await this.latestPaysheetRow.click();
    }

    async clickViewPayroll() {
        await this.viewPayrollButton.click();
    }

    async clickSendAll() {
        await this.sendAllButton.click();
    }

    async clickConfirm2() {
        await this.confirm2Button.click();
    }

    async clickBrowse() {
        await this.browseButton.click();
        
    }

    async clickSalaryClosing() {
        await this.page.waitForLoadState('networkidle');
        await this.salaryClosingButton.click();
    }

    async clickConfirm() {
        await this.confirmButton.click();
    }

}
