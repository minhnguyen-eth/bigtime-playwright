import { Page, Locator, expect } from 'playwright/test';

export class HolidayManagementPage {
    readonly page: Page;
    readonly holidayButton: Locator;
    readonly holidayName: Locator;
    readonly startDate: Locator
    readonly endDate: Locator
    readonly reason: Locator
    readonly yesButton: Locator;
    readonly deleteButton: Locator;
    readonly nameRequired: Locator;
    readonly startDateRequired: Locator;
    readonly endDateRequired: Locator;
    readonly reasonRequired: Locator;
    readonly totalHolidayResult: Locator;
    readonly timeKeeping: Locator;
    readonly checkInOutHistory: Locator;
    readonly chosseUserInput: Locator;
    readonly selectUser: Locator;
    readonly restHolidayHaveSalary: Locator;
    readonly msgNameRequired: Locator;
    readonly msgStartDateRequired: Locator;
    readonly msgEndDateRequired: Locator;
    readonly msgReasonRequired: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.msgReasonRequired = page.locator("//div[contains(text(),'Nhập lý do')]");
        this.msgEndDateRequired = page.locator("//div[contains(text(),'Nhập đến hết ngày')]");
        this.msgStartDateRequired = page.locator("//div[contains(text(),'Nhập bắt đầu từ ngày')]");
        this.msgNameRequired = page.locator("//div[contains(text(),'Nhập tên ngày nghỉ')]");
        this.restHolidayHaveSalary = page.locator("//td[contains(text(),'Ngày lễ có lương')]");
        this.selectUser = page.locator("//div[text()='BAT810 - Nguyễn Văn Minh']")
        this.chosseUserInput = page.locator("//div[3]/div/div[1]/div/div[1]/div/div[3]/div/input")
        this.checkInOutHistory = page.locator("//div[contains(text(),'Lịch sử điểm danh')]")
        this.timeKeeping = page.locator("//p[contains(text(),'Chấm công')]")
        this.totalHolidayResult = page.locator("//input[@type='number' and @value='1']")
        this.deleteButton = page.locator("//tr[@id='row-0']//span[contains(text(),'Xóa')]");
        this.yesButton = page.locator("//span[@class='v-btn__content'][normalize-space()='Có']");
        this.reason = page.locator("//textarea[@rows='2']");
        this.endDate = page.locator("//div[5]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.startDate = page.locator("//div[4]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.holidayButton = page.locator("//div[contains(text(),'Quản lý ngày nghỉ')]");
        this.holidayName = page.locator("//div[2]/div/div[1]/div/div/div/div[3]/div/input");
    }

    async expectNameRequired() {
        await expect(this.msgNameRequired).toBeVisible();
        await expect(this.msgNameRequired).toContainText("Nhập tên ngày nghỉ");
    }

    async expectStartDateRequired() {
        await expect(this.msgStartDateRequired).toBeVisible();
        await expect(this.msgStartDateRequired).toContainText("Nhập bắt đầu từ ngày");
    }

    async expectEndDateRequired() {
        await expect(this.msgEndDateRequired).toBeVisible();
        await expect(this.msgEndDateRequired).toContainText("Nhập đến hết ngày");
    }

    async expectReasonRequired() {
        await expect(this.msgReasonRequired).toBeVisible();
        await expect(this.msgReasonRequired).toContainText("Nhập lý do");
    }

    async verifyRestHolidayHaveSalary() {
        const text = await this.restHolidayHaveSalary.textContent();
        console.log(` Rest Holiday Have Salary: ${text}`);
        await expect(this.restHolidayHaveSalary).toContainText("Ngày lễ có lương");
    }

    async fillAndSelectUser() {
        await this.chosseUserInput.fill('BAT810 - Nguyễn Văn Minh');
        await this.selectUser.click();
    }

    async clickCheckInOutHistory() {
        await this.checkInOutHistory.click();
    }

    async clickTimeKeeping() {
        await this.timeKeeping.click();
    }

    async checkTotalHolidayResult() {
        const value = await this.totalHolidayResult.inputValue();
        console.log(` Total Holiday Result: ${value}`);
        await expect(this.totalHolidayResult).toHaveValue('1');
    }


    async clickDeleteButton() {
        await this.deleteButton.click();
        await this.yesButton.click();
    }

    async clickYesButton() {
        await this.yesButton.click();
    }

    async fillReason(reason: string) {
        await this.reason.fill(reason);
    }

    async clickStartDate() {
        await this.startDate.click();
    }
    async clickEndDate() {
        await this.endDate.click();
    }

    async fillHolidayName(name: string) {
        await this.holidayName.fill(name);
    }

    async clickHolidayButton() {
        await this.holidayButton.click();
    }
}