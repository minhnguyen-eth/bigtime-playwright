import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class WorkShiftPage extends BasePage {
    readonly WORKSHIFT_BUTTON: Locator;
    readonly WORKSHIFT_NAME_INPUT: Locator;
    readonly WORKSHIFT_CODE_INPUT: Locator;
    readonly WORKSHIFT_START_TIME_INPUT: Locator;
    readonly WORKSHIFT_END_TIME_INPUT: Locator;
    readonly CHOOSE_HOUR_PICKER: Locator;
    readonly CHOOSE_MINUTE_PICKER: Locator;
    readonly CHOOSE_12_HOUR_PICKER: Locator;
    readonly CHOOSE_13_HOUR_PICKER: Locator;
    readonly CHOOSE_00_MINUTE_PICKER: Locator;
    readonly REST_CHECKBOX: Locator;
    readonly TIME_START_REST: Locator;
    readonly TIME_END_REST: Locator;
    readonly CHOOSE_08_HOUR_PICKER: Locator;
    readonly CHOOSE_17_HOUR_PICKER: Locator;
    readonly BRANCH_DROPDOWN: Locator;
    readonly BRANCH_BIEN_HOA: Locator;
    readonly WORKSHIFT_NAME_SEARCH_FIELD: Locator;
    readonly WORKSHIFT_CODE_SEARCH_FIELD: Locator;
    readonly BRANCH_DROPDOWN_SEARCH: Locator;
    readonly BRANCH_BIEN_HOA_SEARCH: Locator;
    readonly VERIFY_WORKSHIFT_NAME: Locator;
    readonly VERIFY_WORKSHIFT_CODE: Locator;
    readonly VERIFY_BRANCH_BIEN_HOA_SEARCH: Locator;
    readonly VERIFY_WORKING_TIME: Locator;

    constructor(page: Page) {
        super(page);
        this.VERIFY_WORKING_TIME = page.locator("//div[3]/div/input[@value='08:00']");
        this.VERIFY_BRANCH_BIEN_HOA_SEARCH = page.locator("//tr[@id='row-0']//span[contains(text(),'Biên Hòa')]");
        this.VERIFY_WORKSHIFT_CODE = page.locator("//tr[@id='row-0']//span[contains(text(),'CN')]");
        this.VERIFY_WORKSHIFT_NAME = page.locator("//a[@class='ml-2']//span[contains(text(),'Ca ngày')]");
        this.WORKSHIFT_CODE_SEARCH_FIELD = page.getByRole('textbox', { name: 'Mã ca' });
        this.WORKSHIFT_NAME_SEARCH_FIELD = page.getByRole('textbox', { name: 'Tên ca' });
        this.BRANCH_BIEN_HOA_SEARCH = page.locator("//div[contains(text(),'Biên Hòa')]");
        this.BRANCH_DROPDOWN_SEARCH = page.getByRole('combobox').filter({ hasText: 'Chi nhánh' }).locator('i');
        this.BRANCH_BIEN_HOA = page.locator("//div[text()='Biên Hòa']");
        this.BRANCH_DROPDOWN = page.locator("//i[@title='Open']");
        this.CHOOSE_17_HOUR_PICKER = page.locator("//div[contains(@class, 'dp__overlay_cell') and normalize-space()='17']");
        this.CHOOSE_08_HOUR_PICKER = page.locator("//div[contains(@class, 'dp__overlay_cell') and normalize-space()='08']");
        this.CHOOSE_13_HOUR_PICKER = page.locator("//div[contains(@class, 'dp__overlay_cell') and normalize-space()='13']");
        this.TIME_END_REST = page.getByRole('textbox', { name: 'Thời gian kết thúc nghỉ ※' });
        this.TIME_START_REST = page.getByRole('textbox', { name: 'Thời gian bắt đầu nghỉ ※' });
        this.REST_CHECKBOX = page.locator("//input[@type='checkbox']");
        this.CHOOSE_00_MINUTE_PICKER = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='00']");
        this.CHOOSE_12_HOUR_PICKER = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='12']");
        this.CHOOSE_MINUTE_PICKER = page.getByRole('button', { name: 'Open minutes overlay' });
        this.CHOOSE_HOUR_PICKER = page.getByRole('button', { name: 'Open hours overlay' });
        this.WORKSHIFT_END_TIME_INPUT = page.getByRole('textbox', { name: 'Giờ kết thúc ※' });
        this.WORKSHIFT_START_TIME_INPUT = page.getByRole('textbox', { name: 'Giờ bắt đầu ※' });
        this.WORKSHIFT_NAME_INPUT = page.getByRole('textbox', { name: 'Tên ca ※' });
        this.WORKSHIFT_CODE_INPUT = page.getByRole('textbox', { name: 'Mã ca ※' });
        this.WORKSHIFT_BUTTON = page.locator("//a[.='Ca làm việc']");
    }

    async getVerifyWorkingTime() {
        await this.safeVerifyToHaveValue(this.VERIFY_WORKING_TIME, "08:00");
    }

    async getVerifyBranchBienHoaSearch() {
        await this.safeVerifyTextContains(this.VERIFY_BRANCH_BIEN_HOA_SEARCH, "Biên Hòa");
    }

    async getVerifyWorkShiftCode() {
        await this.safeVerifyTextContains(this.VERIFY_WORKSHIFT_CODE, "CN");
    }

    async getVerifyWorkShiftName() {
        await this.safeVerifyTextContains(this.VERIFY_WORKSHIFT_NAME, "Ca ngày");
    }

    async fillWorkShiftCodeSearchField(code: string) {
        await this.safeFill(this.WORKSHIFT_CODE_SEARCH_FIELD, code);
    }

    async fillWorkShiftNameSearchField(name: string) {
        await this.safeFill(this.WORKSHIFT_NAME_SEARCH_FIELD, name);
    }

    async clickOnBranchBienHoaSearch() {
        await this.safeClick(this.BRANCH_BIEN_HOA_SEARCH);
    }

    async clickOnBranchDropdownSearch() {
        await this.safeClick(this.BRANCH_DROPDOWN_SEARCH);
    }

    async clickOnBranchBienHoa() {
        await this.safeClick(this.BRANCH_BIEN_HOA);
    }

    async clickOnBranchDropdown() {
        await this.safeClick(this.BRANCH_DROPDOWN);
    }

    async clickOnChosse08HourPicker() {
        await this.safeClick(this.CHOOSE_08_HOUR_PICKER);
    }

    async clickOnChosse17HourPicker() {
        await this.safeClick(this.CHOOSE_17_HOUR_PICKER);
    }

    async clickChosse13HourPicker() {
        await this.safeClick(this.CHOOSE_13_HOUR_PICKER);
    }

    async clickChosseHourPicker() {
        await this.safeClick(this.CHOOSE_HOUR_PICKER);
    }

    async fillWorkShiftName(workshiftName: string) {
        await this.safeFill(this.WORKSHIFT_NAME_INPUT, workshiftName);
    }

    async fillWorkShiftCode(workshiftCode: string) {
        await this.safeFill(this.WORKSHIFT_CODE_INPUT, workshiftCode);
    }

    async clickOnTimeEndRest() {
        await this.safeClick(this.TIME_END_REST);
    }

    async clickOnTimeStartRest() {
        await this.safeClick(this.TIME_START_REST);
    }

    async clickOnRestCheckBox() {
        await this.safeClick(this.REST_CHECKBOX);
    }

    async clickOnChosse00MinutePicker() {
        await this.safeClick(this.CHOOSE_00_MINUTE_PICKER);
        await this.clickChoose();
    }

    async clickOnChosse12HourPicker() {
        await this.safeClick(this.CHOOSE_12_HOUR_PICKER);
    }

    async clickOnChosseMinutePicker() {
        await this.safeClick(this.CHOOSE_MINUTE_PICKER);
    }

    async clickEndTime() {
        await this.safeClick(this.WORKSHIFT_END_TIME_INPUT);
    }

    async clickStartTime() {
        await this.safeClick(this.WORKSHIFT_START_TIME_INPUT);
    }

    async clickOnWorkShiftButton() {
        await this.safeClick(this.WORKSHIFT_BUTTON);
    }
}
