import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class WorkShiftPage extends BasePage {

    readonly workshiftButton: Locator;
    readonly addButton: Locator;
    readonly editButton: Locator;
    readonly deleteButton: Locator;
    readonly searchButton: Locator;
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
    readonly statusDropdown: Locator;
    readonly lockStatus: Locator;
    readonly okButton: Locator;
    readonly verifyLockStatus: Locator;
    readonly workshiftNameSearchField: Locator;
    readonly workshiftCodeSearchField: Locator;
    readonly branchDropdownSearch: Locator;
    readonly statusDropdownSearch: Locator;
    readonly statusActive: Locator;
    readonly statusLock: Locator;
    readonly branchBienHoaSearch: Locator;
    readonly clearSearchButton: Locator;
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
        this.statusDropdownSearch = page.locator("//div[@class='v-input v-input--horizontal v-input--center-affix v-input--density-compact v-theme--lightColor7 v-locale--is-ltr v-text-field v-select v-select--multiple custom-select multi-select-grid']");
        this.verifyLockStatusSearch = page.locator("//span[@class='custom-size'][normalize-space()='Khóa']");
        this.verifyAtiveStatusSearch = page.locator("//tr[@id='row-0']//span[@class='custom-size'][contains(text(),'Hoạt động')]");
        this.verifyBranchBienHoaSearch = page.locator("//tr[@id='row-0']//span[contains(text(),'Biên Hòa')]");
        this.verifyWorkShiftCode = page.locator("//tr[@id='row-0']//span[contains(text(),'CN')]");
        this.verifyWorkShiftName = page.locator("//a[@class='ml-2']//span[contains(text(),'Ca ngày')]");
        this.clearSearchButton = page.locator("//span[.=' Xóa']");
        this.workshiftCodeSearchField = page.locator("//form/div/div[2]/div/div/div/div[3]/div/input");
        this.workshiftNameSearchField = page.locator("//form/div/div[1]/div/div/div/div[3]/div/input");
        this.branchBienHoaSearch = page.locator("//div[contains(text(),'Biên Hòa')]");
        this.branchDropdownSearch = page.locator("//div[@class='v-field v-field--active v-field--appended v-field--center-affix v-field--dirty v-field--variant-outlined v-theme--lightColor7 v-locale--is-ltr']");
        this.statusActive = page.locator("//div[text()='Hoạt động']");
        this.statusLock = page.locator("//div[text()='Khóa']");
        this.verifyLockStatus = page.locator("//tr[@id='row-0']//span[@class='custom-size'][normalize-space()='Khóa']");
        this.okButton = page.locator("//span[normalize-space()='Có']");
        this.lockStatus = page.locator("//div[contains(text(),'Khóa')]");
        this.statusDropdown = page.locator("//div[@class='v-field v-field--active v-field--appended v-field--center-affix v-field--dirty v-field--prepended v-field--variant-outlined v-theme--lightColor7 v-locale--is-ltr']//div[@class='v-field__input']");
        this.branchBienHoa = page.locator("//div[text()='Biên Hòa']");
        this.branchDropdown = page.locator("//i[@title='Open']");
        this.chosse17HourPicker = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='17']");
        this.chosse08HourPicker = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='08']");
        this.chosse13HourPicker = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='13']");
        this.saveButton = page.locator("//span[.=' Lưu']");
        this.timeEndRest = page.locator("//div[7]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.timeStartRest = page.locator("//div[6]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.restCheckBox = page.locator("//input[@type='checkbox']");
        this.chosseButtonPicker = page.locator("//button[contains(text(),'Chọn')]");
        this.chosse00MinutePicker = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='00']");
        this.chosse12HourPicker = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='12']");
        this.chosseMinutePicker = page.locator("//div/div/div/div/div/div[3]/button[2]");
        this.chosseHourPicker = page.locator("//div/div/div/div/div/div[1]/button[2]");
        this.workshiftEndTimeInput = page.locator("//div[4]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.workshiftStartTimeInput = page.locator("//div[3]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.workshiftNameInput = page.locator("//div[2]/div/div[1]/div/div[1]/div/div[4]/div/input");
        this.workshiftCodeInput = page.locator("//div[2]/div/div[2]/div/div[1]/div/div[4]/div/input");
        this.searchButton = page.locator("//span[.=' Tìm kiếm']");
        this.workshiftButton = page.locator("//a[.='Ca làm việc']");
        this.addButton = page.locator("//span[normalize-space()='Thêm']");
        this.editButton = page.locator("//tr[@id='row-0']//span[contains(text(),'Sửa')]");
        this.deleteButton = page.locator("//tr[@id='row-0']//span[contains(text(),'Xóa')]");

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

    async clickOnClearSearchButton() {
        await this.safeClick(this.clearSearchButton);
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

    async clickOnStatusDropdownSearch() {
        await this.safeClick(this.statusDropdownSearch);
    }

    async getVerifyLockStatus() {
        await this.safeVerifyTextContains(this.verifyLockStatus, "Khóa");
    }

    async clickOkButton() {
        await this.safeClick(this.okButton);
    }

    async clickOnLockStatus() {
        await this.safeClick(this.lockStatus);
    }

    async clickOnStatusDropdown() {
        await this.safeClick(this.statusDropdown);
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

    async clickOnSearchButton() {
        await this.safeClick(this.searchButton);
    }

    async clickOnEditButton() {
        await this.safeClick(this.editButton);
    }

    async clickOnDeleteButton() {
        await this.safeClick(this.deleteButton);
    }

    async clickOnWorkShiftButton() {
        await this.safeClick(this.workshiftButton);
    }

    async clickOnAddButton() {
        await this.safeClick(this.addButton);
    }
}
