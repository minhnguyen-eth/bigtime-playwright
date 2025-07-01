import { Page, Locator } from 'playwright';

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
    


    constructor(page: Page) {
        this.page = page;
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

    async clickContractTypeDropdown() {
        await this.contractTypeDropdown.click({ force: true });
    }

    async checkSelectAllTerm() {
        await this.selectAllTerm.click({ force: true });
    }

    async selectEndDate() {
        await this.endDateDropDown.click();
        await this.MonthButton.click();
        await this.selectMonth.click();
        await this.selectDay.click();
    }

    async fillSalary(salary: string) {
        await this.salaryInput.fill(salary);
    }

    async clickCollaboratorContract() {
        await this.collaboratorContract.click();
    }

    async clickSeasonalContract() {
        await this.seasonalContract.click();
    }

    async clickFormalContract() {
        await this.formalContract.click();
    }

    async clickContract() {
        await this.contractButton.click();
    }

    async fillEmployeeName() {
        await this.EmployeeInput.fill("Minh");
        await this.selectEmployee.click();
    }

    async fillNote(note: string) {
        await this.noteInput.fill(note);
    }
}
