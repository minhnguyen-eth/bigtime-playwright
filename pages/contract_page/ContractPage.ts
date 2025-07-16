import { Page, Locator, expect } from 'playwright/test';
import { BasePage } from '../BasePage';

export class ContractPage extends BasePage {
    readonly contractButton: Locator;
    readonly EmployeeInput: Locator;
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

    constructor(page: Page) {
        super(page);
        this.selectDay2 = this.page.locator("//div[@class='dp__cell_inner dp__pointer dp__date_hover'][normalize-space()='30']");
        this.selectMonth2 = this.page.locator("//div[@class='dp__overlay_cell_active dp__overlay_cell_pad']")
        this.verifySearchByName = this.page.locator("//tr[@id='row-0']//span[contains(text(),'BAT810-Nguyễn Văn Minh')]");
        this.verifySearchByCode = this.page.locator("//tr/td[2][contains(normalize-space(), 'HD0001')]");
        this.startDateSearchResult = this.page.locator("//tr/td[5][contains(normalize-space(), '2025')]");
        this.startDateSearch = page.getByRole('textbox', { name: 'Ngày bắt đầu' })
        this.verifyProbationTypeResult = this.page.locator("//div[text()='Thử việc']");
        this.verifyPermanentTypeResult = this.page.locator("//div[text()='Chính thức']");
        this.verifyTemporaryTypeResult = this.page.locator("//div[text()='Thời vụ']");
        this.verifyFreeLanceTypeResult = this.page.locator("//div[text()='Cộng tác viên']");
        this.temporaryType = this.page.locator("//div[contains(text(),'Thời vụ')]");
        this.freeLanceType = this.page.locator("//div[contains(text(),'Cộng tác viên')]");
        this.permanentType = this.page.locator("//div[contains(text(),'Chính thức')]");
        this.probationType = this.page.locator("//div[contains(text(),'Thử việc')]");
        this.searchByContractType = page.getByRole('combobox').filter({ hasText: 'Loại hợp đồng' }).locator('i')
        this.searchByName = page.getByRole('textbox', { name: 'Mã - tên nhân viên' })
        this.searchByCode = page.getByRole('textbox', { name: 'Mã hợp đồng' })
        this.contractTypeDropdown = this.page.locator("//div[contains(@class, 'v-field') and contains(@class, 'v-field--active')]//i[@title='Open']");
        this.selectAllTerm = this.page.locator("//th[contains(@class, 'v-data-table__th')]//i[contains(@class, 'mdi-checkbox-blank-outline')]");
        this.noteInput = page.getByRole('textbox', { name: 'Ghi chú' });
        this.selectDay = this.page.locator("//div[@class='dp__cell_inner dp__pointer dp__date_hover'][normalize-space()='31']");
        this.selectMonth = this.page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='Thg 8']");
        this.MonthButton = page.getByRole('button', { name: 'Open months overlay' });
        this.endDateDropDown = page.getByRole('textbox', { name: 'Đến ngày ※' });
        this.salaryInput = page.getByRole('textbox', { name: 'Lương cơ bản ※' });
        this.collaboratorContract = this.page.locator("//div[text()='Cộng tác viên']");
        this.seasonalContract = this.page.locator("//div[text()='Thời vụ']");
        this.formalContract = this.page.locator("//div[text()='Chính thức']");
        this.contractButton = this.page.locator("//a[contains(.,'Hợp đồng')]");
        this.EmployeeInput = page.getByRole('textbox', { name: 'Mã - tên nhân viên ※' })
        this.selectEmployee = this.page.locator("//span[normalize-space()='Minh']");
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
        await this.safeClick(this.MonthButton);
        await this.safeClick(this.selectMonth);
        await this.safeClick(this.selectDay);
    }

    async selectEndDate2() {
        await this.safeClick(this.endDateDropDown);
        await this.safeClick(this.MonthButton);
        await this.safeClick(this.selectMonth2);
        await this.safeClick(this.selectDay2);
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
        await this.safeFill(this.EmployeeInput, "Minh");
        await this.safeClick(this.selectEmployee);
    }

    async fillNote(note: string) {
        await this.safeFill(this.noteInput, note);
    }
}
