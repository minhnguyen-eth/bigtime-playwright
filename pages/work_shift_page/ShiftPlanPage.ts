import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class ShiftPlanPage extends BasePage {
    readonly searchButton: Locator;
    readonly shiftPlanButton: Locator;
    readonly addButton: Locator;
    readonly shiftPlanNameInput: Locator;
    readonly workShiftInput: Locator;
    readonly startDateInput: Locator;
    readonly endDateInput: Locator;
    readonly saveButton: Locator;
    readonly departmentButton: Locator;
    readonly addDepartmentButton: Locator;
    readonly departmentDropDown: Locator;
    readonly departmentOption: Locator;
    readonly saveDepartmentButton: Locator;
    readonly Day1Button: Locator;
    readonly Day31Button: Locator;
    readonly chosseButton: Locator;
    readonly workShiftOption: Locator;
    readonly searchEmployeeInput: Locator;
    readonly employeeCheckbox: Locator;
    readonly saveEmployeeButton: Locator;
    readonly requiredFieldNameShift: Locator;
    readonly requiredFieldNameWorkShift: Locator;
    readonly editButton: Locator;
    readonly deleteButton: Locator;
    readonly chosseMonthButton: Locator;
    readonly Month08: Locator;
    readonly okButton: Locator;
    readonly getToastDeleteSuccess: Locator;
    readonly chooseMonthSearch: Locator;
    readonly searchByNameInput: Locator;
    readonly searchByNameResult: Locator
    readonly workShiftDropDown: Locator;
    readonly searchWorkShiftResult: Locator;
    readonly editNameResult: Locator;

    constructor(page: Page) {
        super(page);
        this.editNameResult = page.locator("//tr[@id='row-0']//span[contains(text(),'Edited ')]")
        this.searchWorkShiftResult = page.locator("//tr[@id='row-0']//span[contains(text(),'Ca ngày')]")
        this.workShiftDropDown = page.getByRole('combobox').filter({ hasText: 'Ca làm việc' }).locator('i');
        this.searchByNameResult = page.locator("//tr[@id='row-0']//span[contains(text(),'Phân ca tháng 7')]")
        this.searchByNameInput = page.locator("//div[2]/div/div[2]/div/div/div/div[3]/div/input")
        this.chooseMonthSearch = page.locator("//div/div[1]/div/div/div/div/div[1]/div/div/div[3]/input")
        this.okButton = page.locator("//span[normalize-space()='Có']")
        this.Month08 = page.locator("//div[@class='dp__overlay_cell dp__overlay_cell_pad'][normalize-space()='Thg 8']")
        this.chosseMonthButton = page.locator("button[aria-label='Open months overlay']")
        this.deleteButton = page.locator("//tr[@id='row-0']//span[contains(text(),'Xóa')]")
        this.editButton = page.locator("//span[contains(text(),'Sửa')]")
        this.requiredFieldNameWorkShift = page.locator("//div[contains(text(),'Nhập ca làm việc')]")
        this.requiredFieldNameShift = page.locator("//div[contains(text(),'Nhập tên bảng phân ca')]")
        this.saveEmployeeButton = page.getByRole('tablist').getByRole('button', { name: 'Thêm' });
        this.employeeCheckbox = page.locator("//td[1]/div/div/div/input")
        this.searchEmployeeInput = page.locator("//div[3]/div[1]/div/div/div[2]/div/div/div/div[4]/div/input")
        this.saveButton = page.getByRole('button', { name: 'Lưu' });
        this.workShiftOption = page.locator("//div[text()='Ca ngày']")
        this.chosseButton = page.locator("//button[contains(text(),'Chọn')]")
        this.Day31Button = page.locator("//div[@class='dp__cell_inner dp__pointer dp__date_hover'][normalize-space()='31']")
        this.Day1Button = page.locator("//div[@class='dp__cell_inner dp__pointer dp__date_hover'][normalize-space()='1']")
        this.saveDepartmentButton = page.getByRole('button', { name: 'Lưu' }).nth(1);
        this.departmentOption = page.locator("//div[text()='Bộ phận IT']")
        this.departmentDropDown = page.getByRole('textbox', { name: 'Bộ phận ※' });
        this.addDepartmentButton = page.getByRole('tablist').getByRole('button', { name: 'Thêm' })
        this.departmentButton = page.locator("//div[@class='v-overlay-container']//button[@value='1']//span[1]")
        this.endDateInput = page.getByRole('textbox', { name: 'Ngày kết thúc ※' });
        this.startDateInput = page.getByRole('textbox', { name: 'Ngày bắt đầu ※' });
        this.workShiftInput = page.getByRole('textbox', { name: 'Ca làm việc ※' });
        this.shiftPlanNameInput = page.getByRole('textbox', { name: 'Tên bảng phân ca ※' });
        this.addButton = page.locator("//span[normalize-space()='Thêm']")
        this.shiftPlanButton = page.locator("//div[contains(text(),'Phân ca nhanh')]")
        this.searchButton = page.locator("//span[contains(normalize-space(),'Tìm kiếm')]")
    }

    async expectEditNameResult() {
        await this.safeVerifyTextContains(this.editNameResult, "Edited ");
    }

    async expectSearchWorkShiftResult() {
        await this.safeVerifyToHaveText(this.searchWorkShiftResult, "Ca ngày");
    }

    async clickWorkShiftDropDown() {
        await this.safeClick(this.workShiftDropDown);
    }

    async expectSearchByNameResult() {
        await this.safeVerifyToHaveText(this.searchByNameResult, "Phân ca tháng 7");
    }

    async fillSearchByNameInput(shiftPlanName: string) {
        await this.safeFill(this.searchByNameInput, shiftPlanName);
    }

    async clickChooseMonthSearch() {
        await this.safeClick(this.chooseMonthSearch);
    }

    async clickOkButton() {
        await this.safeClick(this.okButton);
    }

    async clickMonth08() {
        await this.safeClick(this.Month08);
    }

    async clickChosseMonthButton() {
        await this.safeClick(this.chosseMonthButton);
    }

    async clickDeleteButton() {
        await this.safeClick(this.deleteButton);
    }

    async clickEditButton() {
        await this.safeClick(this.editButton);
    }

    async clickSaveEmployeeButton() {
        await this.safeClick(this.saveEmployeeButton);
    }

    async clickEmployeeCheckbox() {
        await this.safeClick(this.employeeCheckbox);
    }

    async fillSearchEmployeeInput(employeeName: string) {
        await this.safeFill(this.searchEmployeeInput, employeeName);
        await this.page.keyboard.press('Enter');
    }

    async clickWorkShiftOption() {
        await this.safeClick(this.workShiftOption);
    }

    async clickChosseButton() {
        await this.safeClick(this.chosseButton);
    }

    async clickDay31Button() {
        await this.safeClick(this.Day31Button);
    }

    async clickDay1Button() {
        await this.safeClick(this.Day1Button);
    }

    async clickSearchButton() {
        await this.safeClick(this.searchButton);
    }

    async clickShiftPlanButton() {
        await this.safeClick(this.shiftPlanButton);
    }

    async clickAddButton() {
        await this.safeClick(this.addButton);
    }

    async fillShiftPlanNameInput(shiftPlanName: string) {
        await this.safeFill(this.shiftPlanNameInput, shiftPlanName);
    }

    async clickWorkShift() {
        await this.safeClick(this.workShiftInput);
    }

    async clickStartDateInput() {
        await this.safeClick(this.startDateInput);
    }

    async clickEndDateInput() {
        await this.safeClick(this.endDateInput);
    }

    async clickSaveButton() {
        await this.safeClick(this.saveButton.nth(0));
    }

    async clickDepartmentButton() {
        await this.safeClick(this.departmentButton);
    }

    async clickAddDepartmentButton() {
        await this.safeClick(this.addDepartmentButton);
    }

    async clickDepartmentDropDown() {
        await this.safeClick(this.departmentDropDown);
    }

    async clickDepartmentOption() {
        await this.safeClick(this.departmentOption);
    }

    async clickSaveDepartmentButton() {
        await this.safeClick(this.saveDepartmentButton);
    }

    async getRequiredFieldNameShift(text: string) {
        await this.safeVerifyToHaveText(this.requiredFieldNameShift, text);
    }

    async getRequiredFieldNameWorkShift(text: string) {
        await this.safeVerifyToHaveText(this.requiredFieldNameWorkShift, text);
        return this.requiredFieldNameWorkShift.textContent();
    }
}
