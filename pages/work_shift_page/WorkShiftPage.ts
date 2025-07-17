import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class WorkShiftPage extends BasePage {
    readonly workshiftButton: Locator;
    readonly workshiftNameInput: Locator;
    readonly workshiftCodeInput: Locator;
    readonly workshiftDescriptionInput: Locator;
    readonly workshiftStartTimeInput: Locator;
    readonly workshiftEndTimeInput: Locator;
    readonly workshiftSaveButton: Locator;
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
    readonly saveButton: Locator;
    readonly chosse08HourPicker: Locator;
    readonly chosse17HourPicker: Locator;
    readonly branchDropdown: Locator;
    readonly branchBienHoa: Locator;
    readonly lockStatus: Locator;
    readonly verifyLockStatus: Locator;
    readonly workshiftNameSearchField: Locator;
    readonly workshiftCodeSearchField: Locator;
    readonly branchDropdownSearch: Locator;
    readonly statusActive: Locator;
    readonly statusLock: Locator;
    readonly branchBienHoaSearch: Locator;
    readonly verifyWorkShiftName: Locator;
    readonly verifyWorkShiftCode: Locator;
    readonly verifyBranchBienHoaSearch: Locator;
    readonly verifyAtiveStatusSearch: Locator;
    readonly verifyLockStatusSearch: Locator;
    readonly verifyLockStatusSearchRow1: Locator;
    readonly verifyWorkingTime: Locator;

    constructor(page: Page) {
        super(page);
        this.verifyWorkingTime = page.locator("//div[3]/div/input[@value='08:00']");
        this.verifyLockStatusSearchRow1 = page.locator("//tr[@id='row-2']//span[@class='custom-size'][contains(text(),'Khóa')]");
        this.verifyLockStatusSearch = page.locator("//span[@class='custom-size'][normalize-space()='Khóa']");
        this.verifyAtiveStatusSearch = page.locator("//tr[@id='row-0']//span[@class='custom-size'][contains(text(),'Hoạt động')]");
        this.verifyBranchBienHoaSearch = page.locator("//tr[@id='row-0']//span[contains(text(),'Biên Hòa')]");
        this.verifyWorkShiftCode = page.locator("//tr[@id='row-0']//span[contains(text(),'CN')]");
        this.verifyWorkShiftName = page.locator("//a[@class='ml-2']//span[contains(text(),'Ca ngày')]");
        this.workshiftCodeSearchField = page.getByRole('textbox', { name: 'Mã ca' });
        this.workshiftNameSearchField = page.getByRole('textbox', { name: 'Tên ca' });
        this.branchBienHoaSearch = page.locator("//div[contains(text(),'Biên Hòa')]");
        this.branchDropdownSearch = page.getByRole('combobox').filter({ hasText: 'Chi nhánh' }).locator('i');
        this.statusActive = page.locator("//div[text()='Hoạt động']");
        this.statusLock = page.locator("//div[text()='Khóa']");
        this.verifyLockStatus = page.locator("//tr[@id='row-0']//span[@class='custom-size'][normalize-space()='Khóa']");
        this.lockStatus = page.locator("//div[contains(text(),'Khóa')]");
        this.branchBienHoa = page.locator("//div[text()='Biên Hòa']");
        this.branchDropdown = page.locator("//i[@title='Open']");
        this.chosse17HourPicker = page.locator("//div[contains(@class, 'dp__overlay_cell') and normalize-space()='17']");
        this.chosse08HourPicker = page.locator("//div[contains(@class, 'dp__overlay_cell') and normalize-space()='08']");
        this.chosse13HourPicker = page.locator("//div[contains(@class, 'dp__overlay_cell') and normalize-space()='13']");
        this.saveButton = page.locator("//span[.=' Lưu']");
        this.timeEndRest = page.getByRole('textbox', { name: 'Thời gian kết thúc nghỉ ※' });
        this.timeStartRest = page.getByRole('textbox', { name: 'Thời gian bắt đầu nghỉ ※' });
        this.restCheckBox = page.locator("//input[@type='checkbox']");
        this.chosseButtonPicker = page.locator("//button[contains(text(),'Chọn')]");
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

    async getVerifyLockStatusSearchRow1() {
        await this.safeVerifyTextContains(this.verifyLockStatusSearchRow1, "Khóa");
    }

    async getVerifyLockStatusSearch() {
        await this.safeVerifyTextContains(this.verifyLockStatusSearch, "Khóa");
    }

    async getVerifyAtiveStatusSearch() {
        await this.safeVerifyTextContains(this.verifyAtiveStatusSearch, "Hoạt động");
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

    async clickOnStatus(status: 'Active' | 'Lock') {
        if (status === 'Active') {
            await this.safeClick(this.statusActive);
            console.log('Clicked on status: Active');
        } else if (status === 'Lock') {
            await this.safeClick(this.statusLock);
            console.log('Clicked on status: Lock');
        } else {
            console.log('Invalid status value:', status);
        }
    }


    async getVerifyLockStatus() {
        await this.safeVerifyTextContains(this.verifyLockStatus, "Khóa");
    }

    async clickOnLockStatus() {
        await this.safeClick(this.lockStatus);
    }


    async clickOnBranchBienHoa() {
        await this.safeClick(this.branchBienHoa);
    }

    async clickOnSaveButton() {
        await this.safeClick(this.saveButton);
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

    async clickOnChosseButtonPicker() {
        await this.safeClick(this.chosseButtonPicker);
    }

    async clickOnChosse00MinutePicker() {
        await this.safeClick(this.chosse00MinutePicker);
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
