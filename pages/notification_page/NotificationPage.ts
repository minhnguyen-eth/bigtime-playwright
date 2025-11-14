import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

export class NotificationPage extends BasePage {
    readonly NOTIFICATION_BUTTON: Locator;
    readonly NOTIFICATION_NAME_INPUT: Locator;
    readonly DESCRIPTION_INPUT: Locator;
    readonly NOTIFICATION_FORM_DROPDOWN: Locator;
    readonly START_DATE_INPUT: Locator;
    readonly END_DATE_INPUT: Locator;
    readonly HOLIDAY_OPTION: Locator;
    readonly WORK_SCHEDULE_OPTION: Locator;
    readonly URGENT_OPTION: Locator;
    readonly REQUIRED_NAME: Locator;
    readonly REQUIRED_DESCRIPTION: Locator;
    readonly DEPARTMENT_TAB: Locator;
    readonly PERSONAL_TAB: Locator;
    readonly CHECKBOX_PERSONAL_OR_DEPARTMENT: Locator;
    readonly PERSONAL_SEARCH_INPUT: Locator;
    readonly PERSONAL_SELECT: Locator;
    readonly LIST_NOTIFICATION: Locator;
    readonly VERIFY_NOTIFICATION_PERSONAL: Locator;
    readonly VERIFY_NOTIFICATION_DEPARTMENT: Locator;
    readonly VERIFY_NOTIFICATION_COMPANY: Locator;

    constructor(page: Page) {
        super(page);
        this.NOTIFICATION_BUTTON = page.locator("//div[contains(text(),'Quản lý thông báo')]");
        this.NOTIFICATION_NAME_INPUT = page.getByRole('textbox', { name: 'Tên thông báo ※' });
        this.DESCRIPTION_INPUT = page.getByRole('textbox', { name: 'Nội dung chi tiết ※' });
        this.NOTIFICATION_FORM_DROPDOWN = page.locator("//div[2]/div/div[2]/div/div/div/div[3]/div/input");
        this.START_DATE_INPUT = page.getByRole('textbox', { name: 'Thời gian bắt đầu ※' });
        this.END_DATE_INPUT = page.getByRole('textbox', { name: 'Thời gian kết thúc ※' });
        this.HOLIDAY_OPTION = page.locator("//div[text()='Ngày nghỉ']");
        this.WORK_SCHEDULE_OPTION = page.locator("//div[text()='Lịch làm việc']");
        this.URGENT_OPTION = page.locator("//div[text()='Khẩn cấp']");
        this.REQUIRED_NAME = page.locator("//div[contains(text(),'Nhập tên thông báo')]");
        this.REQUIRED_DESCRIPTION = page.locator("//div[contains(text(),'Nhập nội dung chi tiết')]");
        this.DEPARTMENT_TAB = page.locator("//span[contains(normalize-space(),'Bộ phận')]");
        this.PERSONAL_TAB = page.locator("//span[contains(normalize-space(),'Cá nhân')]");
        this.CHECKBOX_PERSONAL_OR_DEPARTMENT = page.locator("//td[contains(@class, 'v-data-table__td--select-row')]//input[@type='checkbox']");
        this.PERSONAL_SEARCH_INPUT = page.locator("//div[2]/div/div/div/div[4]/div/input");
        this.PERSONAL_SELECT = page.locator("(//input[@type='checkbox'])[2]");
        this.LIST_NOTIFICATION = page.locator("//div[contains(text(),'Danh sách thông báo')]");
        this.VERIFY_NOTIFICATION_PERSONAL = page.locator("//strong[contains(text(),'Gửi đến: Nhân viên BAT810-Nguyễn Văn Minh')]").first();
        this.VERIFY_NOTIFICATION_DEPARTMENT = page.locator("//strong[contains(text(),'Gửi đến: Bộ phận Bộ phận IT')]").first();
        this.VERIFY_NOTIFICATION_COMPANY = page.locator("//strong[contains(text(),'Gửi đến: Toàn công ty')]").first();
    }

    // ========================= Click Actions =========================
    async clickNotificationButton() {
        await this.safeClick(this.NOTIFICATION_BUTTON);
    }

    async clickListNotification() {
        await this.safeClick(this.LIST_NOTIFICATION);
    }

    async clickPersonalTab() {
        await this.safeClick(this.PERSONAL_TAB);
    }

    async clickDepartmentTab() {
        await this.safeClick(this.DEPARTMENT_TAB);
    }

    async clickCheckboxPersonalOrDepartment() {
        await this.safeClick(this.CHECKBOX_PERSONAL_OR_DEPARTMENT);
    }

    async clickPersonalSelect() {
        await this.safeClick(this.PERSONAL_SELECT);
    }

    async clickNotificationFormDropdown() {
        await this.safeClick(this.NOTIFICATION_FORM_DROPDOWN);
    }

    async clickStartDate() {
        await this.safeClick(this.START_DATE_INPUT);
    }

    async clickEndDate() {
        await this.safeClick(this.END_DATE_INPUT);
    }

    async clickHoliday() {
        await this.safeClick(this.HOLIDAY_OPTION);
    }

    async clickWorkSchedule() {
        await this.safeClick(this.WORK_SCHEDULE_OPTION);
    }

    async clickUrgent() {
        await this.safeClick(this.URGENT_OPTION);
    }

    // ========================= Fill Actions =========================
    async fillNotificationName(name: string) {
        await this.safeFill(this.NOTIFICATION_NAME_INPUT, name);
    }

    async fillDescription(description: string) {
        await this.safeFill(this.DESCRIPTION_INPUT, description);
    }

    async fillPersonalSearch(personnel: string) {
        await this.safeFill(this.PERSONAL_SEARCH_INPUT, personnel);
        await this.page.keyboard.press('Enter');
    }

    // ========================= Verification =========================
    async verifyNotificationPersonal(expectedText: string = "Gửi đến: Nhân viên BAT810-Nguyễn Văn Minh") {
        await this.safeVerifyToHaveText(this.VERIFY_NOTIFICATION_PERSONAL, expectedText);
    }

    async verifyNotificationDepartment(expectedText: string = "Gửi đến: Bộ phận Bộ phận IT") {
        await this.safeVerifyToHaveText(this.VERIFY_NOTIFICATION_DEPARTMENT, expectedText);
    }

    async verifyNotificationCompany(expectedText: string = "Gửi đến: Toàn công ty") {
        await this.safeVerifyToHaveText(this.VERIFY_NOTIFICATION_COMPANY, expectedText);
    }

    async verifyRequiredName() {
        await this.safeVerifyToHaveText(this.REQUIRED_NAME, "Nhập tên thông báo");
    }

    async verifyRequiredDescription() {
        await this.safeVerifyToHaveText(this.REQUIRED_DESCRIPTION, "Nhập nội dung chi tiết");
    }
}
