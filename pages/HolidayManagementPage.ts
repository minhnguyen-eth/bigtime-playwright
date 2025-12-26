import { Page, Locator } from 'playwright/test';
import { BasePage } from './BasePage';

export class HolidayManagementPage extends BasePage {
    readonly HOLIDAY_BUTTON: Locator;
    readonly HOLIDAY_NAME: Locator;
    readonly START_DATE: Locator;
    readonly END_DATE: Locator;
    readonly TOTAL_HOLIDAY_RESULT: Locator;
    readonly TIME_KEEPING: Locator;
    readonly CHECK_IN_OUT_HISTORY: Locator;
    readonly CHOOSE_USER_INPUT: Locator;
    readonly SELECT_USER: (user: string) => Locator;
    readonly REST_HOLIDAY_HAVE_SALARY: Locator;
    readonly REST_HOLIDAY_NO_SALARY: Locator;
    readonly MSG_NAME_REQUIRED: Locator;
    readonly MSG_START_DATE_REQUIRED: Locator;
    readonly MSG_END_DATE_REQUIRED: Locator;
    readonly CHECKBOX: Locator;
    readonly DELETE_ROW_0_BUTTON: Locator;

    constructor(page: Page) {
        super(page);
        this.DELETE_ROW_0_BUTTON = page.locator("//tr[@id='row-0']//span[contains(text(),'Xóa')]");
        this.REST_HOLIDAY_NO_SALARY = page.locator("//td[contains(text(),'Ngày lễ không lương')]");
        this.CHECKBOX = page.locator("//input[@type='checkbox']");
        this.MSG_END_DATE_REQUIRED = page.locator("//div[contains(text(),'Nhập đến hết ngày')]");
        this.MSG_START_DATE_REQUIRED = page.locator("//div[contains(text(),'Nhập bắt đầu từ ngày')]");
        this.MSG_NAME_REQUIRED = page.locator("//div[contains(text(),'Nhập tên ngày lễ')]");
        this.REST_HOLIDAY_HAVE_SALARY = page.locator("//td[contains(text(),'Ngày lễ có lương')]");
        this.SELECT_USER = (user: string) => page.locator(`//div[text()='${user}']`);
        this.CHOOSE_USER_INPUT = page.getByRole('textbox', { name: 'Chọn nhân viên' });
        this.CHECK_IN_OUT_HISTORY = page.locator("//div[contains(text(),'Lịch sử điểm danh')]");
        this.TIME_KEEPING = page.locator("//p[contains(text(),'Chấm công')]");
        this.TOTAL_HOLIDAY_RESULT = page.locator("//input[@type='number' and @value='1']");
        this.END_DATE = page.getByRole('textbox', { name: 'Đến hết ngày ※' });
        this.START_DATE = page.getByRole('textbox', { name: 'Bắt đầu từ ngày ※' });
        this.HOLIDAY_BUTTON = page.locator("//div[contains(text(),'Quản lý nghỉ lễ')]");
        this.HOLIDAY_NAME = page.getByRole('textbox', { name: 'Tên ngày lễ ※' });
    }

    async clickDeleteRow0() {
        await this.safeClick(this.DELETE_ROW_0_BUTTON);
        await this.safeClick(this.YES_BUTTON, { nth: 1 });
    }

    async uncheckCheckbox() {
        await this.CHECKBOX.uncheck();
    }

    // VERIFY
    async expectNameRequired() {
        await this.safeVerifyTextContains(this.MSG_NAME_REQUIRED, "Nhập tên ngày lễ");
    }

    async expectStartDateRequired() {
        await this.safeVerifyTextContains(this.MSG_START_DATE_REQUIRED, "Nhập bắt đầu từ ngày");
    }

    async expectEndDateRequired() {
        await this.safeVerifyTextContains(this.MSG_END_DATE_REQUIRED, "Nhập đến hết ngày");
    }

    async verifyRestHolidayHaveSalary() {
        await this.safeVerifyTextContains(this.REST_HOLIDAY_HAVE_SALARY, "Ngày lễ có lương");
    }

    async verifyRestHolidayNoSalary() {
        await this.safeVerifyTextContains(this.REST_HOLIDAY_NO_SALARY, "Ngày lễ không lương");
    }

    // FILL
    async fillAndSelectUser(user: string) {
        await this.safeFill(this.CHOOSE_USER_INPUT, 'BAT300 - Test quản lý nghỉ lễ');
        await this.safeClick(this.SELECT_USER(user));
    }

    async fillHolidayName(name: string) {
        await this.safeFill(this.HOLIDAY_NAME, name);
    }

    // CLICK
    async clickCheckInOutHistory() {
        await this.safeClick(this.CHECK_IN_OUT_HISTORY);
    }

    async clickTimeKeeping() {
        await this.safeClick(this.TIME_KEEPING);
    }

    async clickStartDate() {
        await this.safeClick(this.START_DATE);
    }

    async clickEndDate() {
        await this.safeClick(this.END_DATE);
    }

    async clickHolidayButton() {
        await this.safeClick(this.HOLIDAY_BUTTON);
    }

    // VERIFY VALUE
    async checkTotalHolidayResult() {
        await this.safeVerifyToHaveValue(this.TOTAL_HOLIDAY_RESULT, '1');
    }
}