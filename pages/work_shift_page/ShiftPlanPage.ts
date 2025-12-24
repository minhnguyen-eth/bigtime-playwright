import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class ShiftPlanPage extends BasePage {
    readonly SHIFT_PLAN_BUTTON: Locator;
    readonly SHIFT_PLAN_NAME_INPUT: Locator;
    readonly WORK_SHIFT_INPUT: Locator;
    readonly START_DATE_INPUT: Locator;
    readonly END_DATE_INPUT: Locator;
    readonly DEPARTMENT_BUTTON: Locator;
    readonly DEPARTMENT_DROP_DOWN: Locator;
    readonly DEPARTMENT_OPTION: Locator;
    readonly DAY_1_BUTTON: Locator;
    readonly DAY_31_BUTTON: Locator;
    readonly WORK_SHIFT_OPTION: Locator;
    readonly SEARCH_EMPLOYEE_INPUT: Locator;
    readonly EMPLOYEE_CHECKBOX: Locator;
    readonly REQUIRED_FIELD_NAME_SHIFT: Locator;
    readonly REQUIRED_FIELD_NAME_WORK_SHIFT: Locator;
    readonly SEARCH_BY_NAME_INPUT: Locator;
    readonly SEARCH_BY_NAME_RESULT: Locator;
    readonly WORK_SHIFT_DROP_DOWN: Locator;
    readonly SEARCH_WORK_SHIFT_RESULT: Locator;
    readonly EDIT_NAME_RESULT: Locator;
    readonly SEARCH_BY_WORK_SHIFT: Locator;

    constructor(page: Page) {
        super(page);
        this.SEARCH_BY_WORK_SHIFT = page.locator('div').filter({ hasText: 'Ca hành chính' }).first();
        this.EDIT_NAME_RESULT = page.locator("//tr[@id='row-0']//span[contains(text(),'Edited ')]");
        this.SEARCH_WORK_SHIFT_RESULT = page.locator("//tr[@id='row-0']//span[contains(text(),'Ca hành chính')]");
        this.WORK_SHIFT_DROP_DOWN = page.getByRole('combobox').filter({ hasText: 'Ca làm việc' }).locator('i');
        this.SEARCH_BY_NAME_RESULT = page.locator("//tr[@id='row-0']//span[contains(text(),'Test data 100')]");
        this.SEARCH_BY_NAME_INPUT = page.getByRole('textbox', { name: 'Tên bảng phân ca' });
        this.REQUIRED_FIELD_NAME_WORK_SHIFT = page.locator("//div[contains(text(),'Nhập ca làm việc')]");
        this.REQUIRED_FIELD_NAME_SHIFT = page.locator("//div[contains(text(),'Nhập tên bảng phân ca')]");
        this.EMPLOYEE_CHECKBOX = page.locator("//td[1]/div/div/div/input");
        this.SEARCH_EMPLOYEE_INPUT = page.locator("//div[3]/div[1]/div/div/div[2]/div/div/div/div[4]/div/input");
        this.WORK_SHIFT_OPTION = page.getByText('Ca hành chính (08:00:00 - 17:00:00)', { exact: true });
        this.DAY_31_BUTTON = page.locator("//div[@class='dp__cell_inner dp__pointer dp__date_hover'][normalize-space()='31']");
        this.DAY_1_BUTTON = page.locator("//div[@class='dp__cell_inner dp__pointer dp__date_hover'][normalize-space()='1']");
        this.DEPARTMENT_OPTION = page.locator("//div[text()='Bộ phận test']");
        this.DEPARTMENT_DROP_DOWN = page.getByRole('textbox', { name: 'Bộ phận ※' });
        this.DEPARTMENT_BUTTON = page.locator("//div[@class='v-overlay-container']//button[@value='1']//span[1]");
        this.END_DATE_INPUT = page.getByRole('textbox', { name: 'Ngày kết thúc ※' });
        this.START_DATE_INPUT = page.getByRole('textbox', { name: 'Ngày bắt đầu ※' });
        this.WORK_SHIFT_INPUT = page.getByRole('textbox', { name: 'Ca làm việc ※' });
        this.SHIFT_PLAN_NAME_INPUT = page.getByRole('textbox', { name: 'Tên bảng phân ca ※' });
        this.SHIFT_PLAN_BUTTON = page.locator("//div[contains(text(),'Phân ca nhanh')]");
    }

    async clickOptionSearchByWorkShift() {
        await this.safeClick(this.SEARCH_BY_WORK_SHIFT);
    }

    async clickEmployeeCheckbox() {
        await this.safeClick(this.EMPLOYEE_CHECKBOX);
    }

    async expectEditNameResult() {
        await this.safeVerifyTextContains(this.EDIT_NAME_RESULT, "Edited ");
    }

    async expectSearchWorkShiftResult(value: string) {
        const locator = this.page.locator(`//tr[@id='row-0']//span[contains(text(),'${value}')]`);
        await this.safeVerifyToHaveText(locator, value);
    }

    async clickWorkShiftDropDown() {
        await this.safeClick(this.WORK_SHIFT_DROP_DOWN);
    }

    async expectSearchByNameResult(value: string) {
        const locator = this.page.locator(`//tr[@id='row-0']//span[contains(text(),'${value}')]`);
        await this.safeVerifyToHaveText(locator, value);
    }

    async fillSearchByNameInput(shiftPlanName: string) {
        await this.safeFill(this.SEARCH_BY_NAME_INPUT, shiftPlanName);
    }

    async fillSearchEmployeeInput(employeeName: string) {
        await this.safeFill(this.SEARCH_EMPLOYEE_INPUT, employeeName);
        await this.page.keyboard.press('Enter');
    }

    async clickWorkShiftOption() {
        await this.safeClick(this.WORK_SHIFT_OPTION);
    }

    async clickDay31Button() {
        await this.safeClick(this.DAY_31_BUTTON);
    }

    async clickDay1Button() {
        await this.safeClick(this.DAY_1_BUTTON);
    }

    async clickShiftPlanButton() {
        await this.safeClick(this.SHIFT_PLAN_BUTTON);
    }

    async fillShiftPlanNameInput(shiftPlanName: string) {
        await this.safeFill(this.SHIFT_PLAN_NAME_INPUT, shiftPlanName);
    }

    async clickWorkShift() {
        await this.safeClick(this.WORK_SHIFT_INPUT);
    }

    async clickStartDateInput() {
        await this.safeClick(this.START_DATE_INPUT);
    }

    async clickEndDateInput() {
        await this.safeClick(this.END_DATE_INPUT);
    }

    async clickDepartmentButton() {
        await this.safeClick(this.DEPARTMENT_BUTTON);
    }

    async clickDepartmentDropDown() {
        await this.safeClick(this.DEPARTMENT_DROP_DOWN);
    }

    async clickDepartmentOption() {
        await this.safeClick(this.DEPARTMENT_OPTION);
    }

    async getRequiredFieldNameShift(text: string) {
        await this.safeVerifyToHaveText(this.REQUIRED_FIELD_NAME_SHIFT, text);
    }

    async getRequiredFieldNameWorkShift(text: string) {
        await this.safeVerifyToHaveText(this.REQUIRED_FIELD_NAME_WORK_SHIFT, text);
        return this.REQUIRED_FIELD_NAME_WORK_SHIFT.textContent();
    }
}