import { Page, Locator } from 'playwright/test';
import { BasePage } from './BasePage';

export class HolidayManagementPage extends BasePage {
    readonly holidayButton: Locator;
    readonly holidayName: Locator;
    readonly startDate: Locator
    readonly endDate: Locator
    readonly nameRequired: Locator;
    readonly startDateRequired: Locator;
    readonly endDateRequired: Locator;
    readonly totalHolidayResult: Locator;
    readonly timeKeeping: Locator;
    readonly checkInOutHistory: Locator;
    readonly chosseUserInput: Locator;
    readonly selectUser: Locator;
    readonly restHolidayHaveSalary: Locator;
    readonly restHolidayNoSalary: Locator;
    readonly msgNameRequired: Locator;
    readonly msgStartDateRequired: Locator;
    readonly msgEndDateRequired: Locator;
    readonly msgReasonRequired: Locator;
    readonly checkBox: Locator;
    readonly deleteRow0Button: Locator;

    constructor(page: Page) {
        super(page)
        this.deleteRow0Button = page.locator("//tr[@id='row-0']//span[contains(text(),'Xóa')]");
        this.restHolidayNoSalary = page.locator("//td[contains(text(),'Ngày lễ không lương')]");
        this.checkBox = page.locator("//input[@type='checkbox']");
        this.msgEndDateRequired = page.locator("//div[contains(text(),'Nhập đến hết ngày')]");
        this.msgStartDateRequired = page.locator("//div[contains(text(),'Nhập bắt đầu từ ngày')]");
        this.msgNameRequired = page.locator("//div[contains(text(),'Nhập tên ngày nghỉ')]");
        this.restHolidayHaveSalary = page.locator("//td[contains(text(),'Ngày lễ có lương')]");
        this.selectUser = page.locator("//div[text()='BAT810 - Nguyễn Văn Minh']")
        this.chosseUserInput = page.getByRole('textbox', { name: 'Chọn nhân viên' });
        this.checkInOutHistory = page.locator("//div[contains(text(),'Lịch sử điểm danh')]")
        this.timeKeeping = page.locator("//p[contains(text(),'Chấm công')]")
        this.totalHolidayResult = page.locator("//input[@type='number' and @value='1']")
        this.endDate = page.getByRole('textbox', { name: 'Đến hết ngày ※' })
        this.startDate = page.getByRole('textbox', { name: 'Bắt đầu từ ngày ※' })
        this.holidayButton = page.locator("//div[contains(text(),'Quản lý ngày nghỉ')]");
        this.holidayName = page.getByRole('textbox', { name: 'Tên ngày nghỉ ※' });
    }

    async clickDeleteRow0(){
        await this.safeClick(this.deleteRow0Button);
        await this.safeClick(this.yesButton, { nth: 1 });
    }

    async unCheckBox() {
        await this.checkBox.uncheck();
    }

    // VERIFY
    async expectNameRequired() {
        await this.safeVerifyTextContains(this.msgNameRequired, "Nhập tên ngày nghỉ");
    }

    async expectStartDateRequired() {
        await this.safeVerifyTextContains(this.msgStartDateRequired, "Nhập bắt đầu từ ngày");
    }

    async expectEndDateRequired() {
        await this.safeVerifyTextContains(this.msgEndDateRequired, "Nhập đến hết ngày");
    }

    async verifyRestHolidayHaveSalary() {
        await this.safeVerifyTextContains(this.restHolidayHaveSalary, "Ngày lễ có lương");
    }

    async verifyRestHolidayNoSalary() {
        await this.safeVerifyTextContains(this.restHolidayNoSalary, "Ngày lễ không lương");
    }

    // FILL
    async fillAndSelectUser() {
        await this.safeFill(this.chosseUserInput, 'BAT810 - Nguyễn Văn Minh');
        await this.safeClick(this.selectUser);
    }

    async fillHolidayName(name: string) {
        await this.safeFill(this.holidayName, name);
    }

    // CLICK
    async clickCheckInOutHistory() {
        await this.safeClick(this.checkInOutHistory);
    }

    async clickTimeKeeping() {
        await this.safeClick(this.timeKeeping);
    }

    async clickStartDate() {
        await this.safeClick(this.startDate);
    }

    async clickEndDate() {
        await this.safeClick(this.endDate);
    }

    async clickHolidayButton() {
        await this.safeClick(this.holidayButton);
    }

    // VERIFY VALUE
    async checkTotalHolidayResult() {
        await this.safeVerifyToHaveValue(this.totalHolidayResult, '1');
    }
}
