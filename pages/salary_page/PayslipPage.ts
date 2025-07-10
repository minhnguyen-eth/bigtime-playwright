import { Page, Locator } from '@playwright/test';
import { PaysheetPage } from './PaysheetPage';

export class PayslipPage extends PaysheetPage {

    readonly verifyCancelledStatus: Locator;


    constructor(page: Page) {
        super(page);
        this.verifyCancelledStatus = page.locator("//tr[@id='row-0']//div[@class='v-chip__content']");
    }

    async expectVerifyCancelledStatus() {
        await this.safeVerifyToHaveText(this.verifyCancelledStatus, 'Đã hủy');
    }

    async handleCancelPaySlip() {
        await this.clickSalary();
        await this.clickPaysheet();
        await this.clickAdd();
        await this.setNamePaysheet('Automation test');
        await this.clickCheckBoxMonthly();
        await this.clickChooseMonth();
        await this.clickMonthOption();
        await this.setNote('Automation test');
        await this.clickAndSetDropDownEmployee('Nguyễn Văn Minh');
        await this.clickEmployeeOption();
        await this.clickSave();
        await this.clickPayslip();
        await this.clickSalarySlipCode();
        await this.clickCancel();
        await this.fillReason('test');
        await this.clickOk();
        await this.expectVerifyCancelledStatus();
    }
}
