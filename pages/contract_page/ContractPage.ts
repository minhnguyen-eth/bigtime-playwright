import { Page, Locator, expect } from 'playwright/test';
import { BasePage } from '../BasePage';

export class ContractPage extends BasePage {
    readonly CONTRACT_BUTTON: Locator;
    readonly TERMINATE_BUTTON: Locator;
    readonly EXTENSION_BUTTON: Locator;
    readonly EMPLOYEE_INPUT: Locator;
    readonly SELECT_EMPLOYEE: Locator;
    readonly FORMAL_CONTRACT: Locator;
    readonly SEASONAL_CONTRACT: Locator;
    readonly COLLABORATOR_CONTRACT: Locator;
    readonly SALARY_INPUT: Locator;
    readonly END_DATE_DROPDOWN: Locator;
    readonly MONTH_BUTTON: Locator;
    readonly SELECT_MONTH: Locator;
    readonly SELECT_DAY: Locator;
    readonly NOTE_INPUT: Locator;
    readonly SELECT_ALL_TERM: Locator;
    readonly CONTRACT_TYPE_DROPDOWN: Locator;
    readonly SEARCH_BY_CODE: Locator;
    readonly SEARCH_BY_NAME: Locator;
    readonly SEARCH_BY_CONTRACT_TYPE: Locator;
    readonly PROBATION_TYPE: Locator;
    readonly PERMANENT_TYPE: Locator;
    readonly TEMPORARY_TYPE: Locator;
    readonly FREELANCE_TYPE: Locator;
    readonly VERIFY_PROBATION_TYPE_RESULT: Locator;
    readonly VERIFY_PERMANENT_TYPE_RESULT: Locator;
    readonly VERIFY_TEMPORARY_TYPE_RESULT: Locator;
    readonly VERIFY_FREELANCE_TYPE_RESULT: Locator;
    readonly START_DATE_SEARCH: Locator;
    readonly START_DATE_SEARCH_RESULT: Locator;
    readonly VERIFY_SEARCH_BY_CODE: Locator;
    readonly VERIFY_SEARCH_BY_NAME: Locator;
    readonly SELECT_MONTH_2: Locator;
    readonly SELECT_DAY_2: Locator;
    readonly EMPLOYEE_DROPDOWN: Locator;
    readonly NEW_STATUS_SEARCH: Locator;
    readonly TERMINATED_STATUS_SEARCH: Locator;
    readonly CONFIRMED_STATUS_SEARCH: Locator;
    readonly CANCELED_STATUS_SEARCH: Locator;
    readonly VERIFY_CANCELED_STATUS_SEARCH: Locator;
    readonly VERIFY_TERMINATED_STATUS_SEARCH: Locator;
    readonly VERIFY_CONFIRMED_STATUS_SEARCH: Locator;
    readonly VERIFY_NEW_STATUS_SEARCH: Locator;
    readonly UNCHECK_EDITOR: Locator;

    constructor(page: Page) {
        super(page);
        this.UNCHECK_EDITOR = page.getByRole('checkbox', { name: 'Có' });
        this.EXTENSION_BUTTON = page.locator("//span[contains(text(),'Gia hạn')]");
        this.TERMINATE_BUTTON = page.locator("//span[contains(text(),'Chấm dứt')]");
        this.VERIFY_CANCELED_STATUS_SEARCH = page.locator('#row-0').getByText('Đã hủy');
        this.VERIFY_TERMINATED_STATUS_SEARCH = page.locator('#row-0').getByText('Đã chấm dứt');
        this.VERIFY_CONFIRMED_STATUS_SEARCH = page.locator('#row-0').getByText('Đã xác nhận');
        this.VERIFY_NEW_STATUS_SEARCH = page.locator('#row-0').getByText('Mới tạo');
        this.CANCELED_STATUS_SEARCH = page.getByRole('option', { name: 'Đã hủy' });
        this.CONFIRMED_STATUS_SEARCH = page.getByRole('option', { name: 'Đã xác nhận' });
        this.TERMINATED_STATUS_SEARCH = page.getByRole('option', { name: 'Đã chấm dứt' });
        this.NEW_STATUS_SEARCH = page.getByRole('option', { name: 'Mới tạo' });
        this.SELECT_DAY_2 = page.locator("//div[@class='dp__cell_inner dp__pointer dp__date_hover'][normalize-space()='30']");
        this.SELECT_MONTH_2 = page.locator("//div[@class='dp__overlay_cell_active dp__overlay_cell_pad']");
        this.VERIFY_SEARCH_BY_NAME = page.locator("//tr[@id='row-0']//span[contains(text(),'BAT810-Nguyễn Văn Minh')]");
        this.VERIFY_SEARCH_BY_CODE = page.locator("//tr[@id='row-0']//td[2][contains(normalize-space(), 'HD0001')]");
        this.START_DATE_SEARCH_RESULT = page.locator("//tr/td[5][contains(normalize-space(), '2025')]");
        this.START_DATE_SEARCH = page.getByRole('textbox', { name: 'Ngày bắt đầu' });
        this.VERIFY_PROBATION_TYPE_RESULT = page.locator("//tr[@id='row-0']//div[text()='Thử việc']");
        this.VERIFY_PERMANENT_TYPE_RESULT = page.locator("//tr[@id='row-0']//div[text()='Chính thức']");
        this.VERIFY_TEMPORARY_TYPE_RESULT = page.locator("//tr[@id='row-0']//div[text()='Thời vụ']");
        this.VERIFY_FREELANCE_TYPE_RESULT = page.locator("//tr[@id='row-0']//div[text()='Cộng tác viên']");
        this.TEMPORARY_TYPE = page.locator("//div[contains(text(),'Thời vụ')]");
        this.FREELANCE_TYPE = page.locator("//div[contains(text(),'Cộng tác viên')]");
        this.PERMANENT_TYPE = page.locator("//div[contains(text(),'Chính thức')]");
        this.PROBATION_TYPE = page.locator("//div[contains(text(),'Thử việc')]");
        this.SEARCH_BY_CONTRACT_TYPE = page.getByRole('combobox').filter({ hasText: 'Loại hợp đồng' }).locator('i');
        this.SEARCH_BY_NAME = page.getByRole('textbox', { name: 'Mã - tên nhân viên' });
        this.SEARCH_BY_CODE = page.getByRole('textbox', { name: 'Mã hợp đồng' });
        this.CONTRACT_TYPE_DROPDOWN = page.locator("(//div[contains(@class, 'v-field') and contains(@class, 'v-field--active')]//i[@title='Open'])[2]");
        this.SELECT_ALL_TERM = page.locator("//th[contains(@class, 'v-data-table__th')]//i[contains(@class, 'mdi-checkbox-blank-outline')]");
        this.NOTE_INPUT = page.getByRole('textbox', { name: 'Ghi chú' });
        this.SELECT_DAY = page.locator("//div[@class='dp__cell_inner dp__pointer dp__date_hover'][normalize-space()='31']");
        this.SELECT_MONTH = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='Thg 8']");
        this.MONTH_BUTTON = page.getByRole('button', { name: 'Open months overlay' });
        this.END_DATE_DROPDOWN = page.getByRole('textbox', { name: 'Ngày kết thúc ※' });
        this.SALARY_INPUT = page.getByRole('textbox', { name: 'Lương cơ bản ※' });
        this.COLLABORATOR_CONTRACT = page.getByRole('option', { name: 'Cộng tác viên' });
        this.SEASONAL_CONTRACT = page.getByRole('option', { name: 'Thời vụ' });
        this.FORMAL_CONTRACT = page.getByRole('option', { name: 'Chính thức' });
        this.CONTRACT_BUTTON = page.locator("//a[contains(.,'Hợp đồng')]");
        this.EMPLOYEE_DROPDOWN = page.getByRole('combobox').filter({ hasText: 'Mã - tên nhân viên ※' }).getByLabel('Open');
        this.EMPLOYEE_INPUT = page.getByRole('textbox', { name: 'Mã - tên nhân viên ※' });
        this.SELECT_EMPLOYEE = page.getByRole('option', { name: 'BAT810-Nguyễn Văn Minh' });
    }

    async clickUncheckEditor() {
        await this.safeClick(this.UNCHECK_EDITOR);
    }

    async handleTerminateContract() {
        await this.clickRow0();
        await this.safeClick(this.TERMINATE_BUTTON);
        await this.fillReasonAndClickYes("Test terminate contract");
    }

    async handleExtensionContract() {
        await this.clickRow0();
        await this.safeClick(this.EXTENSION_BUTTON);
        await this.clickSave();
        await this.clickYes();
    }

    async verifyNewStatusSearchResult() {
        await this.safeVerifyToHaveText(this.VERIFY_NEW_STATUS_SEARCH, 'Mới tạo');
    }

    async verifyConfirmedStatusSearchResult() {
        await this.safeVerifyToHaveText(this.VERIFY_CONFIRMED_STATUS_SEARCH, 'Đã xác nhận');
    }

    async verifyTerminatedStatusSearchResult() {
        await this.safeVerifyToHaveText(this.VERIFY_TERMINATED_STATUS_SEARCH, 'Đã chấm dứt');
    }

    async verifyCanceledStatusSearchResult() {
        await this.safeVerifyToHaveText(this.VERIFY_CANCELED_STATUS_SEARCH, 'Đã hủy');
    }

    async clickNewStatusSearch() {
        await this.safeClick(this.NEW_STATUS_SEARCH);
    }

    async clickCanceledStatusSearch() {
        await this.safeClick(this.CANCELED_STATUS_SEARCH);
    }

    async clickTerminatedStatusSearch() {
        await this.safeClick(this.TERMINATED_STATUS_SEARCH);
    }

    async clickConfirmedStatusSearch() {
        await this.safeClick(this.CONFIRMED_STATUS_SEARCH);
    }

    async clickSelectMonth2() {
        await this.safeClick(this.SELECT_MONTH_2);
    }

    async verifySearchByNameResult() {
        await this.safeVerifyToHaveText(this.VERIFY_SEARCH_BY_NAME, 'BAT810-Nguyễn Văn Minh');
    }

    async verifySearchByCodeResult() {
        await this.safeVerifyTextContains(this.VERIFY_SEARCH_BY_CODE, 'HD0001');
    }

    async verifyStartDateSearchResult() {
        const firstResult = this.START_DATE_SEARCH_RESULT.nth(0);
        await this.safeVerifyTextContains(firstResult, '2025');
    }

    async clickStartDateSearch() {
        await this.safeClick(this.START_DATE_SEARCH);
    }

    async verifyProbationType() {
        const firstResult = this.VERIFY_PROBATION_TYPE_RESULT.first();
        await this.safeVerifyToHaveText(firstResult, 'Thử việc');
    }

    async verifyPermanentType() {
        const firstResult = this.VERIFY_PERMANENT_TYPE_RESULT.first();
        await this.safeVerifyToHaveText(firstResult, 'Chính thức');
    }

    async verifyTemporaryType() {
        const firstResult = this.VERIFY_TEMPORARY_TYPE_RESULT.first();
        await this.safeVerifyToHaveText(firstResult, 'Thời vụ');
    }

    async verifyFreelanceType() {
        const firstResult = this.VERIFY_FREELANCE_TYPE_RESULT.first();
        await this.safeVerifyToHaveText(firstResult, 'Cộng tác viên');
    }

    async clickProbationType() {
        await this.safeClick(this.PROBATION_TYPE);
    }

    async clickPermanentType() {
        await this.safeClick(this.PERMANENT_TYPE);
    }

    async clickTemporaryType() {
        await this.safeClick(this.TEMPORARY_TYPE);
    }

    async clickFreelanceType() {
        await this.safeClick(this.FREELANCE_TYPE);
    }

    async clickSearchByContractType() {
        await this.safeClick(this.SEARCH_BY_CONTRACT_TYPE);
    }

    async fillSearchByName(name: string) {
        await this.safeFill(this.SEARCH_BY_NAME, name);
    }

    async fillSearchByCode(code: string) {
        await this.safeFill(this.SEARCH_BY_CODE, code);
    }

    async clickContractTypeDropdown() {
        await this.safeClick(this.CONTRACT_TYPE_DROPDOWN);
    }

    async checkSelectAllTerm() {
        await this.safeClick(this.SELECT_ALL_TERM, { force: true });
    }

    async selectEndDate() {
        await this.safeClick(this.END_DATE_DROPDOWN);
        // await this.safeClick(this.MONTH_BUTTON);
        // await this.safeClick(this.SELECT_MONTH);
        // await this.safeClick(this.SELECT_DAY);
        await this.clickTodayDatePicker();
    }

    async selectEndDate2() {
        await this.safeClick(this.END_DATE_DROPDOWN);
        await this.safeClick(this.MONTH_BUTTON);
        await this.safeClick(this.SELECT_MONTH_2);
        await this.safeClick(this.SELECT_DAY_2);
        await this.clickChoose();
    }

    async selectStartDate() {
        await this.safeClick(this.END_DATE_DROPDOWN);
        await this.safeClick(this.MONTH_BUTTON);
        await this.safeClick(this.SELECT_MONTH);
        await this.safeClick(this.SELECT_DAY_2);
    }

    async fillSalary(salary: string) {
        await this.safeFill(this.SALARY_INPUT, salary);
    }

    async clickCollaboratorContract() {
        await this.safeClick(this.COLLABORATOR_CONTRACT);
    }

    async clickSeasonalContract() {
        await this.safeClick(this.SEASONAL_CONTRACT);
    }

    async clickFormalContract() {
        await this.safeClick(this.FORMAL_CONTRACT);
    }

    async clickContract() {
        await this.safeClick(this.CONTRACT_BUTTON);
    }

    async fillEmployeeName() {
        await this.safeFill(this.EMPLOYEE_INPUT, "Nguyễn Văn Minh");
        await this.safeClick(this.SELECT_EMPLOYEE);
    }

    async fillNote(note: string) {
        await this.safeFill(this.NOTE_INPUT, note);
    }
}