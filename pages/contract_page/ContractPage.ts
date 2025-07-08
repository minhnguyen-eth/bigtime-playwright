import { Page, Locator, expect } from 'playwright/test';

export class ContractPage {
    readonly page: Page;
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


        this.page = page;
        this.selectDay2 = this.page.locator("//div[@class='dp__cell_inner dp__pointer dp__date_hover'][normalize-space()='30']");
        this.selectMonth2 = this.page.locator("//div[@class='dp__overlay_cell_active dp__overlay_cell_pad']")
        this.verifySearchByName = this.page.locator("//tr[@id='row-0']//span[contains(text(),'BAT810-Nguyễn Văn Minh')]");
        this.verifySearchByCode = this.page.locator("//tr/td[2][contains(normalize-space(), 'HD0001')]");
        this.startDateSearchResult = this.page.locator("//tr/td[5][contains(normalize-space(), '2025')]");
        this.startDateSearch = this.page.locator("//form/div/div[3]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.verifyProbationTypeResult = this.page.locator("//div[text()='Thử việc']");
        this.verifyPermanentTypeResult = this.page.locator("//div[text()='Chính thức']");
        this.verifyTemporaryTypeResult = this.page.locator("//div[text()='Thời vụ']");
        this.verifyFreeLanceTypeResult = this.page.locator("//div[text()='Cộng tác viên']");
        this.temporaryType = this.page.locator("//div[contains(text(),'Thời vụ')]");
        this.freeLanceType = this.page.locator("//div[contains(text(),'Cộng tác viên')]");
        this.permanentType = this.page.locator("//div[contains(text(),'Chính thức')]");
        this.probationType = this.page.locator("//div[contains(text(),'Thử việc')]");
        this.searchByContractType = this.page.locator("//form/div/div[4]/div/div/div/div[4]/i");
        this.searchByName = this.page.locator("//form/div/div[2]/div/div/div/div[3]/div/input");
        this.searchByCode = this.page.locator("//form/div/div[1]/div/div/div/div[3]/div/input");
        this.contractTypeDropdown = this.page.locator("//div[@class='v-field v-field--active v-field--appended v-field--center-affix v-field--dirty v-field--variant-outlined v-theme--lightColor7 v-locale--is-ltr']//i[@title='Open']");
        this.selectAllTerm = this.page.locator("//th[@class='v-data-table__td v-data-table-column--no-padding v-data-table-column--align-start v-data-table__th']//i[@class='mdi-checkbox-blank-outline mdi v-icon notranslate v-theme--lightColor7 v-icon--size-default']");
        this.noteInput = this.page.locator("//div[2]/div[4]/div[1]/div/div/div/div[3]/textarea");
        this.selectDay = this.page.locator("//div[@class='dp__cell_inner dp__pointer dp__date_hover'][normalize-space()='31']");
        this.selectMonth = this.page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='Thg 8']");
        this.MonthButton = this.page.locator("//div[2]/div/div[1]/div/div[1]/div/button[1]");
        this.endDateDropDown = this.page.locator("//div[3]/div[3]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.salaryInput = this.page.locator("//div[2]/div[2]/div[2]/div/div/div/div[3]/input");
        this.collaboratorContract = this.page.locator("//div[text()='Cộng tác viên']");
        this.seasonalContract = this.page.locator("//div[text()='Thời vụ']");
        this.formalContract = this.page.locator("//div[text()='Chính thức']");
        this.contractButton = this.page.locator("//a[contains(.,'Hợp đồng')]");
        this.EmployeeInput = this.page.locator("//div[2]/div[1]/div[1]/div/div/div/div[3]/div/input");
        this.selectEmployee = this.page.locator("//span[normalize-space()='Minh']");


    }

    async clickSelectMonth2() {
        await expect(this.selectMonth2).toBeVisible();
        await this.selectMonth2.click();
    }

    async verifySearchByNameResult() {
        await expect(this.verifySearchByName).toBeVisible();
        await expect(this.verifySearchByName).toHaveText('BAT810-Nguyễn Văn Minh');
    }

    async verifySearchByCodeResult() {
        await expect(this.verifySearchByCode).toBeVisible();
        await expect(this.verifySearchByCode).toContainText('HD0001');
    }

    async verifyStartDateSearchResult() {
        const firstResult = this.startDateSearchResult.nth(0);
        await expect(firstResult).toBeVisible();
        await expect(firstResult).toContainText('2025');
    }


    async clickStartDateSearch() {
        await expect(this.startDateSearch).toBeVisible();
        await this.startDateSearch.click();
    }

    async verifyProbationType() {
        const firstResult = this.verifyProbationTypeResult.first();
        await expect(firstResult).toBeVisible();
        await expect(firstResult).toHaveText('Thử việc');
    }

    async verifyPermanentType() {
        const firstResult = this.verifyPermanentTypeResult.first();
        await expect(firstResult).toBeVisible();
        await expect(firstResult).toHaveText('Chính thức');
    }

    async verifyTemporaryType() {
        const firstResult = this.verifyTemporaryTypeResult.first();
        await expect(firstResult).toBeVisible();
        await expect(firstResult).toHaveText('Thời vụ');
    }

    async verifyFreeLanceType() {
        const firstResult = this.verifyFreeLanceTypeResult.first();
        await expect(firstResult).toBeVisible();
        await expect(firstResult).toHaveText('Cộng tác viên');
    }

    async clickProbationType() {
        await expect(this.probationType).toBeVisible();
        await this.probationType.click();
    }
    async clickPermanentType() {
        await expect(this.permanentType).toBeVisible();
        await this.permanentType.click();
    }
    async clickTemporaryType() {
        await expect(this.temporaryType).toBeVisible();
        await this.temporaryType.click();
    }
    async clickFreeLanceType() {
        await expect(this.freeLanceType).toBeVisible();
        await this.freeLanceType.click();
    }

    async clickSearchByContractType() {
        await expect(this.searchByContractType).toBeVisible();
        await this.searchByContractType.click();
    }

    async fillSearchByName(name: string) {
        await expect(this.searchByName).toBeVisible();
        await this.searchByName.fill(name);
    }

    async fillSearchByCode(code: string) {
        await expect(this.searchByCode).toBeVisible();
        await this.searchByCode.fill(code);
    }

    async clickContractTypeDropdown() {
        await expect(this.contractTypeDropdown).toBeVisible();
        await this.contractTypeDropdown.click();
    }

    async checkSelectAllTerm() {
        await expect(this.selectAllTerm).toBeVisible();
        await this.selectAllTerm.click({ force: true });
    }

    async selectEndDate() {
        await expect(this.endDateDropDown).toBeVisible();
        await this.endDateDropDown.click();
        await this.MonthButton.click();
        await this.selectMonth.click();
        await this.selectDay.click();
    }

    async selectEndDate2() {
        await expect(this.endDateDropDown).toBeVisible();
        await this.endDateDropDown.click();
        await this.MonthButton.click();
        await this.selectMonth2.click();
        await this.selectDay2.click();
    }

    async fillSalary(salary: string) {
        await expect(this.salaryInput).toBeVisible();
        await this.salaryInput.fill(salary);
    }

    async clickCollaboratorContract() {
        await expect(this.collaboratorContract).toBeVisible();
        await this.collaboratorContract.click();
    }

    async clickSeasonalContract() {
        await expect(this.seasonalContract).toBeVisible();
        await this.seasonalContract.click();
    }

    async clickFormalContract() {
        await expect(this.formalContract).toBeVisible();
        await this.formalContract.click();
    }

    async clickContract() {
        await expect(this.contractButton).toBeVisible();
        await this.contractButton.click();
    }

    async fillEmployeeName() {
        await expect(this.EmployeeInput).toBeVisible();
        await this.EmployeeInput.fill("Minh");
        await this.selectEmployee.click();
    }

    async fillNote(note: string) {
        await expect(this.noteInput).toBeVisible();
        await this.noteInput.fill(note);
    }
}
