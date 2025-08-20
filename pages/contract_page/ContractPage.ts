import { Page, Locator, expect } from 'playwright/test';
import { BasePage } from '../BasePage';

export class ContractPage extends BasePage {
    readonly contractButton: Locator;
    readonly terminateButton: Locator;
    readonly extensionButton: Locator;
    readonly employeeInput: Locator;
    readonly selectEmployee: Locator;
    readonly formalContract: Locator;
    readonly seasonalContract: Locator;
    readonly collaboratorContract: Locator;
    readonly salaryInput: Locator;
    readonly endDateDropDown: Locator;
    readonly MonthButton: Locator;
    readonly selectMonth: Locator;
    readonly selectDay: Locator;
    readonly noteInput: Locator;
    readonly selectAllTerm: Locator;
    readonly contractTypeDropdown: Locator;
    readonly searchByCode: Locator;
    readonly searchByName: Locator;
    readonly searchByContractType: Locator;
    readonly probationType: Locator;
    readonly permanentType: Locator;
    readonly temporaryType: Locator;
    readonly freeLanceType: Locator;
    readonly verifyProbationTypeResult: Locator;
    readonly verifyPermanentTypeResult: Locator;
    readonly verifyTemporaryTypeResult: Locator;
    readonly verifyFreeLanceTypeResult: Locator;
    readonly startDateSearch: Locator;
    readonly startDateSearchResult: Locator;
    readonly verifySearchByCode: Locator;
    readonly verifySearchByName: Locator;
    readonly selectMonth2: Locator;
    readonly selectDay2: Locator;
    readonly employeeDropdown: Locator;
    readonly newStatusSearch: Locator;
    readonly terminatedStatusSearch: Locator;
    readonly comfirmedStatusSearch: Locator;
    readonly canceledStatusSearch: Locator;
    readonly verifyCanceledStatusSearch: Locator;
    readonly verifyTerminatedStatusSearch: Locator;
    readonly verifyComfirmedStatusSearch: Locator;
    readonly verifyNewStatusSearch: Locator;
    readonly unCheckEditor: Locator;

    constructor(page: Page) {
        super(page);
        this.unCheckEditor = page.getByRole('checkbox', { name: 'Có' });
        this.extensionButton = page.locator("//span[contains(text(),'Gia hạn')]");
        this.terminateButton = page.locator("//span[contains(text(),'Chấm dứt')]");
        this.verifyCanceledStatusSearch = page.locator('#row-0').getByText('Đã hủy');
        this.verifyTerminatedStatusSearch = page.locator('#row-0').getByText('Đã chấm dứt');
        this.verifyComfirmedStatusSearch = page.locator('#row-0').getByText('Đã xác nhận');
        this.verifyNewStatusSearch = page.locator('#row-0').getByText('Mới tạo');
        this.canceledStatusSearch = page.getByRole('option', { name: 'Đã hủy' });
        this.comfirmedStatusSearch = page.getByRole('option', { name: 'Đã xác nhận' });
        this.terminatedStatusSearch = page.getByRole('option', { name: 'Đã chấm dứt' });
        this.newStatusSearch = page.getByRole('option', { name: 'Mới tạo' });
        this.selectDay2 = page.locator("//div[@class='dp__cell_inner dp__pointer dp__date_hover'][normalize-space()='30']");
        this.selectMonth2 = page.locator("//div[@class='dp__overlay_cell_active dp__overlay_cell_pad']")
        this.verifySearchByName = page.locator("//tr[@id='row-0']//span[contains(text(),'BAT810-Nguyễn Văn Minh')]");
        this.verifySearchByCode = page.locator("//tr[@id='row-0']//td[2][contains(normalize-space(), 'HD0001')]");
        this.startDateSearchResult = page.locator("//tr/td[5][contains(normalize-space(), '2025')]");
        this.startDateSearch = page.getByRole('textbox', { name: 'Ngày bắt đầu' })
        this.verifyProbationTypeResult = page.locator("//tr[@id='row-0']//div[text()='Thử việc']");
        this.verifyPermanentTypeResult = page.locator("//tr[@id='row-0']//div[text()='Chính thức']");
        this.verifyTemporaryTypeResult = page.locator("//tr[@id='row-0']//div[text()='Thời vụ']");
        this.verifyFreeLanceTypeResult = page.locator("//tr[@id='row-0']//div[text()='Cộng tác viên']");
        this.temporaryType = page.locator("//div[contains(text(),'Thời vụ')]");
        this.freeLanceType = page.locator("//div[contains(text(),'Cộng tác viên')]");
        this.permanentType = page.locator("//div[contains(text(),'Chính thức')]");
        this.probationType = page.locator("//div[contains(text(),'Thử việc')]");
        this.searchByContractType = page.getByRole('combobox').filter({ hasText: 'Loại hợp đồng' }).locator('i')
        this.searchByName = page.getByRole('textbox', { name: 'Mã - tên nhân viên' })
        this.searchByCode = page.getByRole('textbox', { name: 'Mã hợp đồng' })
        this.contractTypeDropdown = page.locator("(//div[contains(@class, 'v-field') and contains(@class, 'v-field--active')]//i[@title='Open'])[2]");
        this.selectAllTerm = page.locator("//th[contains(@class, 'v-data-table__th')]//i[contains(@class, 'mdi-checkbox-blank-outline')]");
        this.noteInput = page.getByRole('textbox', { name: 'Ghi chú' });
        this.selectDay = page.locator("//div[@class='dp__cell_inner dp__pointer dp__date_hover'][normalize-space()='31']");
        this.selectMonth = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='Thg 8']");
        this.MonthButton = page.getByRole('button', { name: 'Open months overlay' });
        this.endDateDropDown = page.getByRole('textbox', { name: 'Đến ngày ※' });
        this.salaryInput = page.getByRole('textbox', { name: 'Lương cơ bản ※' });
        this.collaboratorContract = page.getByRole('option', { name: 'Cộng tác viên' });
        this.seasonalContract = page.getByRole('option', { name: 'Thời vụ' });
        this.formalContract = page.getByRole('option', { name: 'Chính thức' });
        this.contractButton = page.locator("//a[contains(.,'Hợp đồng')]");
        this.employeeDropdown = page.getByRole('combobox').filter({ hasText: 'Mã - tên nhân viên ※' }).getByLabel('Open');
        this.employeeInput = page.getByRole('textbox', { name: 'Mã - tên nhân viên ※' })
        this.selectEmployee = page.getByRole('option', { name: 'BAT810-Nguyễn Văn Minh' })
    }

    async clickUncheckEditor() {
        await this.safeClick(this.unCheckEditor);
    }

    async handleTerminateContract() {
        await this.clickRow0();
        await this.safeClick(this.terminateButton);
        await this.fillReasonAndClickYes("Test terminate contract");
    }

    async handleExtensionContract() {
        await this.clickRow0();
        await this.safeClick(this.extensionButton);
        await this.clickSave();
        await this.clickYes();
    }

    async verifyNewStatusSearchResult() {
        await this.safeVerifyToHaveText(this.verifyNewStatusSearch, 'Mới tạo');
    }

    async verifyComfirmedStatusSearchResult() {
        await this.safeVerifyToHaveText(this.verifyComfirmedStatusSearch, 'Đã xác nhận');
    }

    async verifyTerminatedStatusSearchResult() {
        await this.safeVerifyToHaveText(this.verifyTerminatedStatusSearch, 'Đã chấm dứt');
    }

    async verifyCanceledStatusSearchResult() {
        await this.safeVerifyToHaveText(this.verifyCanceledStatusSearch, 'Đã hủy');
    }

    async clickNewStatusSearch() {
        await this.safeClick(this.newStatusSearch);
    }

    async clickCanceledStatusSearch() {
        await this.safeClick(this.canceledStatusSearch);
    }

    async clickTerminatedStatusSearch() {
        await this.safeClick(this.terminatedStatusSearch);
    }

    async clickComfirmedStatusSearch() {
        await this.safeClick(this.comfirmedStatusSearch);
    }

    async clickSelectMonth2() {
        await this.safeClick(this.selectMonth2);
    }

    async verifySearchByNameResult() {
        await this.safeVerifyToHaveText(this.verifySearchByName, 'BAT810-Nguyễn Văn Minh');
    }

    async verifySearchByCodeResult() {
        await this.safeVerifyTextContains(this.verifySearchByCode, 'HD0001');

    }

    async verifyStartDateSearchResult() {
        const firstResult = this.startDateSearchResult.nth(0);
        await this.safeVerifyTextContains(firstResult, '2025');
    }

    async clickStartDateSearch() {
        await this.safeClick(this.startDateSearch);
    }

    async verifyProbationType() {
        const firstResult = this.verifyProbationTypeResult.first();
        await this.safeVerifyToHaveText(firstResult, 'Thử việc');
    }

    async verifyPermanentType() {
        const firstResult = this.verifyPermanentTypeResult.first();
        await this.safeVerifyToHaveText(firstResult, 'Chính thức');
    }

    async verifyTemporaryType() {
        const firstResult = this.verifyTemporaryTypeResult.first();
        await this.safeVerifyToHaveText(firstResult, 'Thời vụ');
    }

    async verifyFreeLanceType() {
        const firstResult = this.verifyFreeLanceTypeResult.first();
        await this.safeVerifyToHaveText(firstResult, 'Cộng tác viên');
    }

    async clickProbationType() {
        await this.safeClick(this.probationType);
    }

    async clickPermanentType() {
        await this.safeClick(this.permanentType);
    }

    async clickTemporaryType() {
        await this.safeClick(this.temporaryType);
    }

    async clickFreeLanceType() {
        await this.safeClick(this.freeLanceType);
    }

    async clickSearchByContractType() {
        await this.safeClick(this.searchByContractType);
    }

    async fillSearchByName(name: string) {
        await this.safeFill(this.searchByName, name);
    }

    async fillSearchByCode(code: string) {
        await this.safeFill(this.searchByCode, code);
    }

    async clickContractTypeDropdown() {
        await this.safeClick(this.contractTypeDropdown);
    }

    async checkSelectAllTerm() {
        await this.safeClick(this.selectAllTerm, { force: true });
    }

    async selectEndDate() {
        await this.safeClick(this.endDateDropDown);
        // await this.safeClick(this.MonthButton);
        // await this.safeClick(this.selectMonth);
        await this.safeClick(this.selectDay);
        await this.clickChoose();
    }

    async selectEndDate2() {
        await this.safeClick(this.endDateDropDown);
        await this.safeClick(this.MonthButton);
        await this.safeClick(this.selectMonth2);
        await this.safeClick(this.selectDay2);
        await this.clickChoose();
    }

    async selectStartDate() {
        await this.safeClick(this.endDateDropDown);
        await this.safeClick(this.MonthButton);
        await this.safeClick(this.selectMonth);
        await this.safeClick(this.selectDay2);
    }

    async fillSalary(salary: string) {
        await this.safeFill(this.salaryInput, salary);
    }

    async clickCollaboratorContract() {
        await this.safeClick(this.collaboratorContract);
    }

    async clickSeasonalContract() {
        await this.safeClick(this.seasonalContract);
    }

    async clickFormalContract() {
        await this.safeClick(this.formalContract);
    }

    async clickContract() {
        await this.safeClick(this.contractButton);
    }

    async fillEmployeeName() {
        await this.safeFill(this.employeeInput, "Nguyễn Văn Minh");
        await this.safeClick(this.selectEmployee);
    }

    async fillNote(note: string) {
        await this.safeFill(this.noteInput, note);
    }
}
