import { Locator, Page, expect } from '@playwright/test';

export class PaysheetPage {
    private page: Page;

    // Buttons & Inputs
    private cancelButton: Locator;
    private paysheetButton: Locator;
    private addButton: Locator;
    private namePaysheetInput: Locator;
    private setNamePaysheetInput: Locator;
    private radioMonthly: Locator;
    private dropdownMonth: Locator;
    private monthOption: Locator;
    private dropdownEmployee: Locator;
    private employeeOption: Locator;
    private saveButton: Locator;
    private logoutButton: Locator;
    private logoutConfirmButton: Locator;
    private submitButton: Locator;
    private latestPaysheetRow: Locator;
    private viewPayrollButton: Locator;
    private sendAllButton: Locator;
    private confirm2Button: Locator;
    private noteInput: Locator;
    private payslipButton: Locator;
    private salarySlipCode: Locator;
    private browseButton: Locator;
    private okButton: Locator;
    private salaryClosingButton: Locator;
    private confirmButton: Locator;
    private exportDataButton: Locator;
    private refreshButton: Locator;
    private paymentHistoryButton: Locator;
    private historyPaymentCodeButton: Locator;
    private employeeNameLabel: Locator;
    private cancelPaysheetButton: Locator;
    private searchLabel: Locator;
    private verifyPaysheetIdCell: Locator;
    private selectAllEmployeesCheckbox: Locator;
    private reasonInput: Locator;
    private reasonLabel: Locator;
    private toastAddSuccess: Locator;
    private toastCancelSuccess: Locator;
    private toastExportSuccess: Locator;
    private createTicketButton: Locator;
    private paymentButton: Locator;
    private checkBoxMonthly: Locator;
    private chooseMonth: Locator;
    private employeeNameInput: Locator;
    private payslipPayment: Locator;
    private requiredEnterName: Locator;
    private searchButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.searchButton = page.locator("//span[.=' Tìm kiếm']")
        this.requiredEnterName = page.locator("//div[contains(text(),'Nhập tên')]")
        this.payslipPayment = page.locator("//span[normalize-space()='Phiếu lương']")
        this.employeeNameInput = page.locator("//form[1]/div[1]/div[3]/div[1]/div[2]/div[1]/div[2]/div[1]/div[6]/div[1]/div[1]/div[1]/div[3]/div[1]/input[1]")
        this.chooseMonth = page.locator("//div[@class='v-field v-field--active v-field--appended v-field--center-affix v-field--dirty v-field--variant-outlined v-theme--lightColor7 v-locale--is-ltr']//i[@title='Open']")
        this.checkBoxMonthly = page.locator('//div/div[2]/div/div[2]/div/div/div/div/div[2]/div/div/input')
        this.cancelButton = page.locator('//span[contains(normalize-space(),"Hủy")]');
        this.paysheetButton = page.locator('//a[@href="/salary/pay-sheet"]');
        this.addButton = page.locator('//span[normalize-space()="Thêm"]');
        this.namePaysheetInput = page.locator('//form/div/div[3]/div/div[2]/div/div[2]/div/div[1]/div/div/div/div[3]/div/input');
        this.setNamePaysheetInput = page.locator('//form//div[3]//div[2]//div//div[1]//div//div[1]//div//input');
        this.radioMonthly = page.locator('//i[contains(@class,"mdi-radiobox-blank")]');
        this.dropdownMonth = page.locator('//i[@title="Open"]');
        this.monthOption = page.locator('//div[@class="v-list-item-title"][normalize-space()="1/6/2025 - 30/6/2025"]');
        this.dropdownEmployee = page.locator("//div[@class='v-field v-field--appended v-field--center-affix v-field--variant-outlined v-theme--lightColor7 v-locale--is-ltr']//div[@class='v-field__input']");
        this.employeeOption = page.locator("//div[@role='option']//div[@class='v-list-item-title']");
        this.saveButton = page.locator('//button[@type="submit"]//span[@class="v-btn__content"]');
        this.logoutButton = page.locator('//div[contains(text(),"Đăng xuất")]');
        this.logoutConfirmButton = page.locator('//span[normalize-space()="Có"]');
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
        this.searchLabel = page.locator('//label[@class="v-label v-field-label"]');
        this.verifyPaysheetIdCell = page.locator("//td[.='BL000001']");
        this.selectAllEmployeesCheckbox = page.locator("//div[@class='v-col-md-12 v-col-12']//i[@class='mdi-radiobox-blank mdi v-icon notranslate v-theme--lightColor7 v-icon--size-default']");
        this.reasonLabel = page.locator('//form//div[3]//textarea');
        this.reasonInput = page.locator('//form//div[3]//div[3]//textarea');
        this.paymentButton = page.locator('//span[contains(normalize-space(),"Thanh toán")]');
        this.createTicketButton = page.locator('//span[contains(normalize-space(),"Tạo phiếu")]');

        // Toasts
        this.toastAddSuccess = page.locator('//div[contains(text(),"Thêm thành công")]');
        this.toastCancelSuccess = page.locator('//div[contains(text(),"Hủy thành công")]');
        this.toastExportSuccess = page.locator('//div[contains(text(),"Xuất thành công")]');


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

    async getToastExport() {
        await expect(this.toastExportSuccess).toBeVisible();
        return this.toastExportSuccess.textContent();
    }

    async getToastCancel() {
        await expect(this.toastCancelSuccess).toBeVisible();
        return this.toastCancelSuccess.textContent();
    }

    async getToastAdd(toast: string) {
        await expect(this.toastAddSuccess).toHaveText(toast);
    }

    async clickRefresh() {
        await this.refreshButton.click();
    }

    async clickOk() {
        await this.okButton.click();
    }

    async setReason(reason: string = 'Automation test') {
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

    async clickSearchLabel() {
        await this.searchLabel.click({ force: true });
    }


    async searchPaysheet(id: string) {
        await this.searchLabel.fill(id);
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

    async clickAdd() {
        await this.addButton.click();
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

    async clickSave() {
        await this.saveButton.click();
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
        await this.salaryClosingButton.click();
    }

    async clickConfirm() {
        await this.confirmButton.click();
    }

    async clickLogout() {
        await this.logoutButton.click();
    }

    async clickLogoutConfirm() {
        await this.logoutConfirmButton.click();
    }
}
