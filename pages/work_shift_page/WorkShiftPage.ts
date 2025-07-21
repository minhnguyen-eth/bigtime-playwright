import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class WorkShiftPage extends BasePage {
    readonly workshiftButton: Locator;
    readonly workshiftNameInput: Locator;
    readonly workshiftCodeInput: Locator;
    readonly workshiftStartTimeInput: Locator;
    readonly workshiftEndTimeInput: Locator;
    readonly chosseHourPicker: Locator;
    readonly chosseMinutePicker: Locator;
    readonly chosse12HourPicker: Locator;
    readonly chosse13HourPicker: Locator;
    readonly chosse00MinutePicker: Locator;
    readonly chosseButtonPicker: Locator;
    readonly restCheckBox: Locator;
    readonly timeStartRest: Locator;
    readonly timeEndRest: Locator;
    readonly chosseHourStartPicker: Locator;
    readonly chosse08HourPicker: Locator;
    readonly chosse17HourPicker: Locator;
    readonly branchDropdown: Locator;
    readonly branchBienHoa: Locator;
    readonly workshiftNameSearchField: Locator;
    readonly workshiftCodeSearchField: Locator;
    readonly branchDropdownSearch: Locator;
    readonly branchBienHoaSearch: Locator;
    readonly verifyWorkShiftName: Locator;
    readonly verifyWorkShiftCode: Locator;
    readonly verifyBranchBienHoaSearch: Locator;
    readonly verifyWorkingTime: Locator;

    constructor(page: Page) {
        super(page);
        this.verifyWorkingTime = page.locator("//div[3]/div/input[@value='08:00']");
        this.verifyBranchBienHoaSearch = page.locator("//tr[@id='row-0']//span[contains(text(),'Biên Hòa')]");
        this.verifyWorkShiftCode = page.locator("//tr[@id='row-0']//span[contains(text(),'CN')]");
        this.verifyWorkShiftName = page.locator("//a[@class='ml-2']//span[contains(text(),'Ca ngày')]");
        this.workshiftCodeSearchField = page.getByRole('textbox', { name: 'Mã ca' });
        this.workshiftNameSearchField = page.getByRole('textbox', { name: 'Tên ca' });
        this.branchBienHoaSearch = page.locator("//div[contains(text(),'Biên Hòa')]");
        this.branchDropdownSearch = page.getByRole('combobox').filter({ hasText: 'Chi nhánh' }).locator('i');
        this.branchBienHoa = page.locator("//div[text()='Biên Hòa']");
        this.branchDropdown = page.locator("//i[@title='Open']");
        this.chosse17HourPicker = page.locator("//div[contains(@class, 'dp__overlay_cell') and normalize-space()='17']");
        this.chosse08HourPicker = page.locator("//div[contains(@class, 'dp__overlay_cell') and normalize-space()='08']");
        this.chosse13HourPicker = page.locator("//div[contains(@class, 'dp__overlay_cell') and normalize-space()='13']");
        this.timeEndRest = page.getByRole('textbox', { name: 'Thời gian kết thúc nghỉ ※' });
        this.timeStartRest = page.getByRole('textbox', { name: 'Thời gian bắt đầu nghỉ ※' });
        this.restCheckBox = page.locator("//input[@type='checkbox']");
        this.chosse00MinutePicker = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='00']");
        this.chosse12HourPicker = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='12']");
        this.chosseMinutePicker = page.getByRole('button', { name: 'Open minutes overlay' });
        this.chosseHourPicker = page.getByRole('button', { name: 'Open hours overlay' });
        this.workshiftEndTimeInput = page.getByRole('textbox', { name: 'Giờ kết thúc ※' });
        this.workshiftStartTimeInput = page.getByRole('textbox', { name: 'Giờ bắt đầu ※' });
        this.workshiftNameInput = page.getByRole('textbox', { name: 'Tên ca ※' });
        this.workshiftCodeInput = page.getByRole('textbox', { name: 'Mã ca ※' });
        this.workshiftButton = page.locator("//a[.='Ca làm việc']");
    }

    async getVerifyWorkingTime() {
        await this.safeVerifyToHaveValue(this.verifyWorkingTime, "08:00");
    }

    async getVerifyBranchBienHoaSearch() {
        await this.safeVerifyTextContains(this.verifyBranchBienHoaSearch, "Biên Hòa");
    }

    async getVerifyWorkShiftCode() {
        await this.safeVerifyTextContains(this.verifyWorkShiftCode, "CN");
    }

    async getVerifyWorkShiftName() {
        await this.safeVerifyTextContains(this.verifyWorkShiftName, "Ca ngày");
    }

    async fillWorkShiftCodeSearchField(code: string) {
        await this.safeFill(this.workshiftCodeSearchField, code);
    }

    async fillWorkShiftNameSearchField(name: string) {
        await this.safeFill(this.workshiftNameSearchField, name);
    }

    async clickOnBranchBienHoaSearch() {
        await this.safeClick(this.branchBienHoaSearch);
    }

    async clickOnBranchDropdownSearch() {
        await this.safeClick(this.branchDropdownSearch);
    }

    async clickOnBranchBienHoa() {
        await this.safeClick(this.branchBienHoa);
    }

    async clickOnBranchDropdown() {
        await this.safeClick(this.branchDropdown);
    }

    async clickOnChosse08HourPicker() {
        await this.safeClick(this.chosse08HourPicker);
    }

    async clickOnChosse17HourPicker() {
        await this.safeClick(this.chosse17HourPicker);
    }

    async clickChosse13HourPicker() {
        await this.safeClick(this.chosse13HourPicker);
    }

    async clickChosseHourPicker() {
        await this.safeClick(this.chosseHourPicker);
    }

    async fillWorkShiftName(workshiftName: string) {
        await this.safeFill(this.workshiftNameInput, workshiftName);
    }

    async fillWorkShiftCode(workshiftCode: string) {
        await this.safeFill(this.workshiftCodeInput, workshiftCode);
    }

    async clickOnTimeEndRest() {
        await this.safeClick(this.timeEndRest);
    }

    async clickOnTimeStartRest() {
        await this.safeClick(this.timeStartRest);
    }

    async clickOnRestCheckBox() {
        await this.safeClick(this.restCheckBox);
    }

    async clickOnChosse00MinutePicker() {
        await this.safeClick(this.chosse00MinutePicker);
        await this.clickChoose();
    }

    async clickOnChosse12HourPicker() {
        await this.safeClick(this.chosse12HourPicker);
    }

    async clickOnChosseMinutePicker() {
        await this.safeClick(this.chosseMinutePicker);
    }

    async clickOnChosseHourStartPicker() {
        await this.safeClick(this.chosseHourStartPicker);
    }

    async clickEndTime() {
        await this.safeClick(this.workshiftEndTimeInput);
    }

    async clickStartTime() {
        await this.safeClick(this.workshiftStartTimeInput);
    }

    async clickOnWorkShiftButton() {
        await this.safeClick(this.workshiftButton);
    }
}
