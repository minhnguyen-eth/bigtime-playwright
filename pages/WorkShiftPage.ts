import { Page, Locator, expect } from '@playwright/test';
import Config from '../utils/configUtils';

export class WorkShiftPage {
    private page: Page;
    readonly  workshiftButton: Locator;
    readonly  addButton: Locator;
    readonly  editButton: Locator;
    readonly  deleteButton: Locator;
    readonly  searchButton: Locator;
    readonly  workshiftNameInput: Locator;
    readonly  workshiftCodeInput: Locator;
    readonly  workshiftDescriptionInput: Locator;
    readonly  workshiftStartTimeInput: Locator;
    readonly  workshiftEndTimeInput: Locator;
    readonly  workshiftSaveButton: Locator;
    readonly  chosseHourPicker: Locator;
    readonly  chosseMinutePicker: Locator;
    readonly  chosse12HourPicker: Locator;
    readonly  chosse13HourPicker: Locator;
    readonly  chosse00MinutePicker: Locator;
    readonly  chosseButtonPicker: Locator;
    readonly  restCheckBox: Locator;
    readonly  timeStartRest: Locator;
    readonly  timeEndRest: Locator;
    readonly  chosseHourStartPicker: Locator;
    readonly  saveButton: Locator;
    readonly  chosse08HourPicker: Locator;
    readonly  chosse17HourPicker: Locator;
    readonly  branchDropdown: Locator;
    readonly  branchBienHoa: Locator;
    readonly  toastAddSuccess: Locator;
    readonly  toastCancelSuccess: Locator;
    readonly  toastUpdateSuccess: Locator;
    readonly  statusDropdown: Locator;
    readonly  lockStatus: Locator;
    readonly  toastDeleteSuccess: Locator;
    readonly  okButton: Locator;
    readonly  verifyLockStatus: Locator;
    readonly  workshiftNameSearchField: Locator;
    readonly  workshiftCodeSearchField: Locator;
    readonly  branchDropdownSearch: Locator;
    readonly  statusDropdownSearch: Locator;
    readonly  statusActive: Locator;
    readonly  statusLock: Locator;
    readonly  branchBienHoaSearch: Locator;
    readonly  clearSearchButton: Locator;
    readonly  verifyWorkShiftName: Locator;
    readonly  verifyWorkShiftCode: Locator;
    readonly  verifyBranchBienHoaSearch: Locator;
    readonly  verifyAtiveStatusSearch: Locator;
    readonly  verifyLockStatusSearch: Locator;
    readonly  verifyLockStatusSearchRow1: Locator;
    readonly  verifyWorkingTime: Locator;






    constructor(page: Page) {
        this.page = page;


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

        this.toastAddSuccess = page.locator('//div[contains(text(),"Thêm thành công")]');
        this.toastUpdateSuccess = page.locator('//div[contains(text(),"Cập nhật thành công")]');
        this.toastCancelSuccess = page.locator('//div[contains(text(),"Hủy thành công")]');
        this.toastDeleteSuccess = page.locator('//div[contains(text(),"Xóa thành công")]');






    }
    async getVerifyWorkingTime() {
        await expect(this.verifyWorkingTime).toBeVisible();
        const value = await this.verifyWorkingTime.inputValue();
        console.log("🔍 Working time value found:", value);
        return value;
    }

    async getVerifyLockStatusSearchRow1() {
        await expect(this.verifyLockStatusSearchRow1).toBeVisible();
        const text = await this.verifyLockStatusSearchRow1.textContent();
        console.log("🔍 Lock status text found:", text);
        return text;
    }

    async getVerifyLockStatusSearch() {
        await expect(this.verifyLockStatusSearch).toBeVisible();
        const text = await this.verifyLockStatusSearch.textContent();
        console.log("🔍 Lock status text found:", text);
        return text;
    }

    async getVerifyAtiveStatusSearch() {
        const element = this.verifyAtiveStatusSearch.first();
        await expect(element).toBeVisible();
        const text = await element.textContent();
        console.log("🔍 Active status text found:", text);
        return text;
    }



    async getVerifyBranchBienHoaSearch() {
        await expect(this.verifyBranchBienHoaSearch).toBeVisible();
        const text = await this.verifyBranchBienHoaSearch.textContent();
        console.log("🔍 Branch Bien Hoa text found:", text);
        return text;
    }

    async getVerifyWorkShiftCode() {
        await expect(this.verifyWorkShiftCode).toBeVisible();
        const text = await this.verifyWorkShiftCode.textContent();
        console.log("🔍 Workshift code text found:", text);
        return text;
    }

    async getVerifyWorkShiftName() {
        await expect(this.verifyWorkShiftName).toBeVisible();
        const text = await this.verifyWorkShiftName.textContent();
        console.log("🔍 Workshift name text found:", text);
        return text;
    }

    async clickOnClearSearchButton() {
        await this.clearSearchButton.click();
    }

    async fillWorkShiftCodeSearchField(code: string) {
        await this.workshiftCodeSearchField.fill(code);
    }

    async fillWorkShiftNameSearchField(name: string) {
        await this.workshiftNameSearchField.fill(name);
    }

    async clickOnBranchBienHoaSearch() {
        await this.branchBienHoaSearch.click();
    }

    async clickOnBranchDropdownSearch() {
        await this.branchDropdownSearch.click();
    }


    async clickOnStatus(status: 'Active' | 'Lock') {
        if (status === 'Active') {
            await this.statusActive.click();
            console.log('Clicked on status: Active');
        } else if (status === 'Lock') {
            await this.statusLock.click();
            console.log('Clicked on status: Lock');
        } else {
            console.log('Invalid status value:', status);
        }
    }


    async clickOnStatusDropdownSearch() {
        await this.statusDropdownSearch.click();
    }

    async getVerifyLockStatus() {
        await expect(this.verifyLockStatus).toBeVisible();
        const text = await this.verifyLockStatus.textContent();
        console.log("🔍 Lock status text found:", text);
        return text;
    }



    async clickOkButton() {
        await this.okButton.click();
    }

    async getToastDelete(text: string) {
        await expect(this.toastDeleteSuccess).toHaveText(text);
        return this.toastDeleteSuccess.textContent();
    }

    async clickOnLockStatus() {
        await this.lockStatus.click();
    }

    async clickOnStatusDropdown() {
        await this.statusDropdown.click();
    }



    async getToastUpdate(toast: string) {
        await expect(this.toastUpdateSuccess).toHaveText(toast);
        return this.toastUpdateSuccess.textContent();
    }

    async getToastAdd(toast: string) {
        await expect(this.toastAddSuccess).toHaveText(toast);
        return this.toastAddSuccess.textContent();
    }

    async clickOnBranchBienHoa() {
        await this.branchBienHoa.click();
    }

    async clickOnSaveButton() {
        await this.saveButton.click();
    }

    async clickOnBranchDropdown() {
        await this.branchDropdown.click();
    }

    async clickOnChosse08HourPicker() {
        await this.chosse08HourPicker.click();
    }

    async clickOnChosse17HourPicker() {
        await this.chosse17HourPicker.click();
    }

    async clickChosse13HourPicker() {
        await this.chosse13HourPicker.click();
    }

    async clickChosseHourPicker() {
        await this.chosseHourPicker.click();
    }

    async fillWorkShiftName(workshiftName: string) {
        await this.workshiftNameInput.fill(workshiftName);
    }

    async fillWorkShiftCode(workshiftCode: string) {
        await this.workshiftCodeInput.fill(workshiftCode);
    }

    async clickOnTimeEndRest() {
        await this.timeEndRest.click();
    }

    async clickOnTimeStartRest() {
        await this.timeStartRest.click();
    }

    async clickOnRestCheckBox() {
        await this.restCheckBox.click();
    }

    async clickOnChosseButtonPicker() {
        await this.chosseButtonPicker.click();
    }

    async clickOnChosse00MinutePicker() {
        await this.chosse00MinutePicker.click();
    }

    async clickOnChosse12HourPicker() {
        await this.chosse12HourPicker.click();
    }

    async clickOnChosseMinutePicker() {
        await this.chosseMinutePicker.click();
    }

    async clickOnChosseHourStartPicker() {
        await this.chosseHourStartPicker.click();
    }

    async clickEndTime() {
        await this.workshiftEndTimeInput.click();
    }

    async clickStartTime() {
        await this.workshiftStartTimeInput.click();
    }

    async clickOnSearchButton() {
        await this.searchButton.click();
    }

    async clickOnEditButton() {
        await this.editButton.click();
    }
    async clickOnDeleteButton() {
        await this.deleteButton.click();
    }

    async clickOnWorkShiftButton() {
        await this.workshiftButton.click();
    }

    async clickOnAddButton() {
        await this.addButton.click();
    }


}
