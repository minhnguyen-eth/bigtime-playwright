import { Page, Locator, expect } from '@playwright/test';
import Config from '../utils/configUtils';

export class WorkShiftPage {
    private page: Page;
    private workshiftButton: Locator;
    private addButton: Locator;
    private editButton: Locator;
    private deleteButton: Locator;
    private searchButton: Locator;
    private workshiftNameInput: Locator;
    private workshiftCodeInput: Locator;
    private workshiftDescriptionInput: Locator;
    private workshiftStartTimeInput: Locator;
    private workshiftEndTimeInput: Locator;
    private workshiftSaveButton: Locator;
    private chosseHourPicker: Locator;
    private chosseMinutePicker: Locator;
    private chosse12HourPicker: Locator;
    private chosse13HourPicker: Locator;
    private chosse00MinutePicker: Locator;
    private chosseButtonPicker: Locator;
    private restCheckBox: Locator;
    private timeStartRest: Locator;
    private timeEndRest: Locator;
    private chosseHourStartPicker: Locator;
    private saveButton: Locator;
    private chosse08HourPicker: Locator;
    private chosse17HourPicker: Locator;
    private branchDropdown: Locator;
    private branchBienHoa: Locator;
    private toastAddSuccess: Locator;
    private toastCancelSuccess: Locator;
    private toastUpdateSuccess: Locator;
    private statusDropdown: Locator;
    private lockStatus: Locator;
    private toastDeleteSuccess: Locator;
    private okButton: Locator;
    private verifyLockStatus: Locator;






    constructor(page: Page) {
        this.page = page;

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

        this.searchButton
        this.workshiftButton = page.locator("//a[.='Ca làm việc']");
        this.addButton = page.locator("//span[normalize-space()='Thêm']");
        this.editButton = page.locator("//tr[@id='row-0']//span[contains(text(),'Sửa')]");
        this.deleteButton = page.locator("//tr[@id='row-0']//span[contains(text(),'Xóa')]");

        this.toastAddSuccess = page.locator('//div[contains(text(),"Thêm thành công")]');
        this.toastUpdateSuccess = page.locator('//div[contains(text(),"Cập nhật thành công")]');
        this.toastCancelSuccess = page.locator('//div[contains(text(),"Hủy thành công")]');
        this.toastDeleteSuccess = page.locator('//div[contains(text(),"Xóa thành công")]');



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
