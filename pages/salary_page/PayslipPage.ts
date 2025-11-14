import { Page, Locator } from '@playwright/test';
import { PaysheetPage } from './PaysheetPage';

export class PayslipPage extends PaysheetPage {
    readonly verifyCancelledStatus: Locator;
    readonly exportButton: Locator;
    readonly exportAllButton: Locator;

    constructor(page: Page) {
        super(page);
        this.exportAllButton = page.locator("//span[contains(.,'Xuất dữ liệu')]");
        this.exportButton = page.locator("//span[.='Xuất dữ liệu']");
        this.verifyCancelledStatus = page.locator("//tr[@id='row-0']//div[@class='v-chip__content']");
    }

    async clickExportFirst() {
        await this.safeClick(this.exportAllButton);
    }

    async clickExport() {
        await this.safeClick(this.exportButton);
    }

    async expectVerifyCancelledStatus() {
        await this.safeVerifyToHaveText(this.verifyCancelledStatus, 'Đã hủy');
    }

    async createPaysheetBase(name: string = 'Automation test', employeeName: string = 'Nguyễn Văn Minh') {
        await this.clickSalary();
        await this.clickPaysheet();
        await this.clickAdd();
        await this.setNamePaysheet(name);
        await this.clickCheckBoxMonthly();
        await this.clickChooseMonth();
        await this.clickMonthOption();
        await this.setNote(name);
        await this.fillSearchByName(employeeName);
        await this.clickButtonSearch();
        await this.clickSelectEmployee();
        await this.clickSave();
    }


    async handleExportByMonth() {
        await this.createPaysheetBase();
        await this.clickPayslip();
        await this.clickExportFirst();
    }

    async handleExportOnlyOneEmployee() {
        await this.createPaysheetBase();
        await this.clickPayslip();
        await this.clickSalarySlipCode();
        await this.clickExport();
    }

    async handleCancelPaySlip() {
        await this.createPaysheetBase();
        await this.clickPayslip();
        await this.clickSalarySlipCode();
        await this.clickCancel();
        await this.fillReason('test');
        await this.expectVerifyCancelledStatus();
    }
}
