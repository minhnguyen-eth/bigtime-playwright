import { Locator, Page, expect } from '@playwright/test';

export class ShiftPlanPage {

    private page: Page;

    // Buttons & Inputs
    private toastAddSuccess: Locator;
    private toastCancelSuccess: Locator;
    private toastExportSuccess: Locator;
    private searchButton: Locator;
    private shiftPlanButton: Locator;
    private addButton: Locator;
    private shiftPlanNameInput: Locator;
    private workShiftInput: Locator;
    private startDateInput: Locator;
    private endDateInput: Locator;
    private saveButton: Locator;
    private departmentButton: Locator;
    private addDepartmentButton: Locator;
    private departmentDropDown: Locator;
    private departmentOption: Locator;
    private saveDepartmentButton: Locator;
    private saveWorkShiftButton: Locator;
    private Day1Button: Locator;
    private Day30Button: Locator;
    private chosseButton: Locator;
    private workShiftOption: Locator;


    constructor(page: Page) {
        this.page = page;


        this.saveButton = page.locator("//button[@class='v-btn v-btn--slim v-theme--lightColor7 bg-primary v-btn--density-default rounded-lg v-btn--size-small v-btn--variant-flat']//span[@class='v-btn__content']")
        this.workShiftOption = page.locator("//div[text()='Ca ngày']")
        this.chosseButton = page.locator("//button[contains(text(),'Chọn')]")
        this.Day30Button = page.locator("//div[@class='dp__cell_inner dp__pointer dp__date_hover'][normalize-space()='30']")
        this.Day1Button = page.locator("//div[@class='dp__cell_inner dp__pointer dp__date_hover'][normalize-space()='1']")
        this.saveWorkShiftButton = page.locator("button[class='v-btn v-btn--slim v-theme--lightColor7 bg-primary v-btn--density-default rounded-lg v-btn--size-small v-btn--variant-flat']")
        this.saveDepartmentButton = page.locator('div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > button:nth-child(1) > span:nth-child(3)')
        this.departmentOption = page.locator("//div[text()='Bộ phận IT']")
        this.departmentDropDown = page.locator("//div[@class='v-input v-input--horizontal v-input--center-affix v-input--density-compact v-theme--lightColor7 v-locale--is-ltr v-text-field v-autocomplete v-autocomplete--single autocomplete-full-width autocomplete-fixed-height py-2']//i[@title='Open']")
        this.addDepartmentButton = page.locator("//button[@class='v-btn v-theme--lightColor7 text-blue v-btn--density-default rounded-lg v-btn--size-small v-btn--variant-outlined']//span[@class='v-btn__content'][normalize-space()='Thêm']")
        this.departmentButton = page.locator("//div[@class='v-overlay-container']//button[@value='1']//span[1]")
        this.endDateInput = page.locator("//div[6]/div/div/div/div/div[1]/div/div/div[3]/input")
        this.startDateInput = page.locator("//div[5]/div/div/div/div/div[1]/div/div/div[3]/input")
        this.workShiftInput = page.locator("//div[3]/div/div/div[2]/div[1]/div[3]/div/div/div/div[3]/div/input")
        this.shiftPlanNameInput = page.locator("//div[3]/div/div/div[2]/div[1]/div[2]/div/div/div/div[3]/div/input")
        this.addButton = page.locator("//span[normalize-space()='Thêm']")
        this.shiftPlanButton = page.locator("//div[contains(text(),'Phân ca nhanh')]")
        this.searchButton = page.locator("//span[.=' Tìm kiếm']")

        // Toasts
        this.toastAddSuccess = page.locator('//div[contains(text(),"Thêm thành công")]');
        this.toastCancelSuccess = page.locator('//div[contains(text(),"Hủy thành công")]');
        this.toastExportSuccess = page.locator('//div[contains(text(),"Xuất thành công")]');

    }

    async clickWorkShiftOption() {
        await this.workShiftOption.click();
    }

    async clickChosseButton() {
        await this.chosseButton.click();
    }

    async clickDay30Button() {
        await this.Day30Button.click();
    }

    async clickDay1Button() {
        await this.Day1Button.click();
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }

    async clickShiftPlanButton() {
        await this.shiftPlanButton.click();
    }

    async clickAddButton() {
        await this.addButton.click();
    }

    async fillShiftPlanNameInput(shiftPlanName: string) {
        await this.shiftPlanNameInput.fill(shiftPlanName);
    }

    async clickWorkShift() {
        await this.workShiftInput.click();
    }

    async clickStartDateInput() {
        await this.startDateInput.click();
    }

    async clickEndDateInput() {
        await this.endDateInput.click();
    }

    async clickSaveButton() {
        await this.saveButton.nth(0).click();
    }


    async clickDepartmentButton() {
        await this.departmentButton.click();
    }

    async clickAddDepartmentButton() {
        await this.addDepartmentButton.click();
    }

    async clickDepartmentDropDown() {
        await this.departmentDropDown.click();
    }

    async clickDepartmentOption() {
        await this.departmentOption.click();
    }

    async clickSaveDepartmentButton() {
        await this.saveDepartmentButton.click();
    }

    async clickSaveWorkShiftButton() {

        await this.saveWorkShiftButton.click();
    }


    async getToastExport() {
        await expect(this.toastExportSuccess).toBeVisible();
        return this.toastExportSuccess.textContent();
    }

    async getToastCancel() {
        await expect(this.toastCancelSuccess).toBeVisible();
        return this.toastCancelSuccess.textContent();
    }

    async getToastAdd(toast: string) {
        await expect(this.toastAddSuccess).toHaveText(toast);
        return this.toastAddSuccess.textContent();
    }


}
