import { Page, Locator } from '@playwright/test';
import { PaysheetPage } from './PaysheetPage';

export class PayslipPage extends PaysheetPage {
    readonly VERIFY_CANCELLED_STATUS: Locator;
    readonly EXPORT_BUTTON: Locator;
    readonly EXPORT_ALL_BUTTON: Locator;

    constructor(page: Page) {
        super(page);
        this.EXPORT_ALL_BUTTON = page.locator("//span[contains(.,'Xuất dữ liệu')]");
        this.EXPORT_BUTTON = page.locator("//span[.='Xuất dữ liệu']");
        this.VERIFY_CANCELLED_STATUS = page.locator("//tr[@id='row-0']//div[@class='v-chip__content']");
    }

    
    async clickExportAll() {
        await this.safeClick(this.EXPORT_ALL_BUTTON);
    }

    async clickExport() {
        await this.safeClick(this.EXPORT_BUTTON);
    }

    async verifyCancelledStatus(expected: string = 'Đã hủy') {
        await this.safeVerifyToHaveText(this.VERIFY_CANCELLED_STATUS, expected);
    }

    // CREATE PAYSHEET
    async createPaysheetBase(paysheetName: string = 'Automation test', employeeName: string = 'Nguyễn Văn Minh') {
        await this.clickSalary();
        await this.clickPaysheet();
        await this.clickAdd();
        await this.setNamePaysheet(paysheetName);
        await this.clickCheckboxMonthly();
        await this.clickChooseMonth();
        await this.clickMonthOption();
        await this.setNote(paysheetName);
        await this.fillSearchByName(employeeName);
        await this.clickButtonSearch();
        await this.clickSelectEmployee();
        await this.clickSave();
    }

    async exportPaysheetByMonth() {
        await this.createPaysheetBase();
        await this.clickPayslip();
        await this.clickExportAll();
    }

    async exportSingleEmployeePayslip() {
        await this.createPaysheetBase();
        await this.clickPayslip();
        await this.clickSalarySlipCode();
        await this.clickExport();
    }

    async cancelPayslip(reason: string = 'test') {
        await this.createPaysheetBase();
        await this.clickPayslip();
        await this.clickSalarySlipCode();
        await this.clickCancel();
        await this.fillReason(reason);
        await this.verifyCancelledStatus();
    }
}
