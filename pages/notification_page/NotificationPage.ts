import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class NotificationPage extends BasePage {

    readonly notificationButton: Locator;
    readonly notificationName: Locator;
    readonly description: Locator;
    readonly notificationFormDropdown: Locator;
    readonly startDate: Locator;
    readonly endDate: Locator;
    readonly holiday: Locator;
    readonly workSchedule: Locator;
    readonly urgent: Locator;
    readonly requiredName: Locator;
    readonly requiredDescription: Locator;
    readonly sendNotification: Locator;
    readonly department: Locator;
    readonly checkBoxPersonalOrDepartment: Locator;
    readonly departmentOption: Locator;
    readonly personnal: Locator;
    readonly personnalOption: Locator;
    readonly personnalSearch: Locator;
    readonly personnalSelect: Locator;
    readonly listNotification: Locator;
    readonly verifyNotificationDepartment: Locator;
    readonly verifyNotificationCompany: Locator;
    readonly verifyNotificationPersonnal: Locator;

    constructor(page: Page) {
        super(page);
        this.verifyNotificationPersonnal = page.locator("//strong[contains(text(),'Gửi đến: Nhân viên BAT810-Nguyễn Văn Minh')]").first();
        this.verifyNotificationCompany = page.locator("//strong[contains(text(),'Gửi đến: Toàn công ty')]").first();
        this.verifyNotificationDepartment = page.locator("//strong[contains(text(),'Gửi đến: Bộ phận Bộ phận IT')]").first();
        this.listNotification = page.locator("//div[contains(text(),'Danh sách thông báo')]");
        this.personnalSelect = page.locator("//div[3]/div/div[1]/table/tbody/tr/td[1]/div/div/div/input");
        this.personnalSearch = page.locator("//div[2]/div/div/div/div[4]/div/input");
        this.personnal = page.locator("//span[contains(normalize-space(),'Cá nhân')]");
        this.checkBoxPersonalOrDepartment = page.locator("//td[contains(@class, 'v-data-table__td--select-row')]//input[@type='checkbox']");
        this.department = page.locator("//span[contains(normalize-space(),'Bộ phận')]");
        this.requiredName = page.locator("//div[contains(text(),'Nhập tên thông báo')]");
        this.requiredDescription = page.locator("//div[contains(text(),'Nhập nội dung chi tiết')]");
        this.workSchedule = page.locator("//div[text()='Lịch làm việc']");
        this.urgent = page.locator("//div[text()='Khẩn cấp']");
        this.holiday = page.locator("//div[text()='Ngày nghỉ']");
        this.notificationFormDropdown = page.locator("//div[2]/div/div[2]/div/div/div/div[3]/div/input");
        this.startDate = page.getByRole('textbox', { name: 'Thời gian bắt đầu ※' })
        this.endDate = page.getByRole('textbox', { name: 'Thời gian kết thúc ※' })
        this.notificationButton = page.locator("//div[contains(text(),'Quản lý thông báo')]");
        this.notificationName = page.getByRole('textbox', { name: 'Tên thông báo ※' })
        this.description = page.getByRole('textbox', { name: 'Nội dung chi tiết ※' })
    }

    async getVerifyNotificationPersonnal() {
        await this.safeVerifyToHaveText(this.verifyNotificationPersonnal, "Gửi đến: Nhân viên BAT810-Nguyễn Văn Minh");
    }

    async getVerifyNotificationCompany() {
        await this.safeVerifyToHaveText(this.verifyNotificationCompany, "Gửi đến: Toàn công ty");
    }

    async getVerifyNotificationDepartment() {
        await this.safeVerifyToHaveText(this.verifyNotificationDepartment, "Gửi đến: Bộ phận Bộ phận IT");
    }

    async clickOnListNotification() {
        await this.safeClick(this.listNotification);
    }

    async clickOnPersonnalSelect() {
        await this.safeClick(this.personnalSelect);
    }

    async fillPersonnalSearch(personnel: string) {
        await this.safeFill(this.personnalSearch, personnel);
        await this.page.keyboard.press('Enter');
    }

    async clickOnPersonnelOption() {
        await this.safeClick(this.checkBoxPersonalOrDepartment);
    }

    async clickOnPersonnal() {
        await this.safeClick(this.personnal);
    }

    async clickOnDepartmentOption() {
        await this.safeClick(this.checkBoxPersonalOrDepartment);
    }

    async clickOnDepartment() {
        await this.safeClick(this.department);
    }

    async getRequiredName() {
        await this.safeVerifyToHaveText(this.requiredName, "Nhập tên thông báo");
    }

    async getRequiredDescription() {
        await this.safeVerifyToHaveText(this.requiredDescription, "Nhập nội dung chi tiết");
    }

    async clickOnNotificationFormDropdown() {
        await this.safeClick(this.notificationFormDropdown);
    }
    async clickOnStartDate() {
        await this.safeClick(this.startDate);
    }

    async clickOnEndDate() {
        await this.safeClick(this.endDate);
    }

    async clickOnWorkSchedule() {
        await this.safeClick(this.workSchedule);
    }

    async clickOnUrgent() {
        await this.safeClick(this.urgent);
    }
    async clickOnHoliday() {
        await this.safeClick(this.holiday);
    }

    async fillNotificationName(name: string) {
        await this.safeFill(this.notificationName, name);
    }

    async fillDescription(description: string) {
        await this.safeFill(this.description, description);
    }

    async clickOnNotification() {
        await this.safeClick(this.notificationButton);
    }
}
