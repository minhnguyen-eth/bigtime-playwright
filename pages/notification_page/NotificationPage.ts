import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class NotificationPage extends BasePage {

    readonly notificationButton: Locator;
    readonly addButton: Locator;
    readonly notificationName: Locator;
    readonly description: Locator;
    readonly saveButton: Locator;
    readonly cancelButton: Locator;
    readonly notificationFormDropdown: Locator;
    readonly startDate: Locator;
    readonly endDate: Locator;
    readonly holiday: Locator;
    readonly workSchedule: Locator;
    readonly urgent: Locator;
    readonly existedName: Locator;
    readonly requiredName: Locator;
    readonly requiredDescription: Locator;
    readonly iconAction: Locator;
    readonly sendNotification: Locator;
    readonly department: Locator;
    readonly departmentOption: Locator;
    readonly personnal: Locator;
    readonly personnalOption: Locator;
    readonly personnalSearch: Locator;
    readonly personnalSelect: Locator;
    readonly listNotification: Locator;
    readonly deleteButton: Locator;
    readonly yesButton: Locator;
    readonly verifyNotificationDepartment: Locator;
    readonly verifyNotificationCompany: Locator;
    readonly verifyNotificationPersonnal: Locator;

    constructor(page: Page) {
        super(page);
        this.verifyNotificationPersonnal = page.locator("//strong[contains(text(),'Gửi đến: Nhân viên BAT810-Nguyễn Văn Minh')]").first();
        this.verifyNotificationCompany = page.locator("//strong[contains(text(),'Gửi đến: Toàn công ty')]").first();
        this.verifyNotificationDepartment = page.locator("//strong[contains(text(),'Gửi đến: Bộ phận Bộ phận IT')]").first();
        this.yesButton = page.locator("//span[normalize-space()='Có']");
        this.deleteButton = page.locator("//span[normalize-space()='Xóa']");
        this.listNotification = page.locator("//div[contains(text(),'Danh sách thông báo')]");
        this.personnalSelect = page.locator("//div[3]/div/div[1]/table/tbody/tr/td[1]/div/div/div/input");
        this.personnalSearch = page.locator("//div[2]/div/div/div/div[4]/div/input");
        this.personnalOption = page.locator("//tbody/tr[1]/td[1]/div[1]/div[1]/div[1]/i[1]");
        this.personnal = page.locator("//span[contains(normalize-space(),'Cá nhân')]");
        this.departmentOption = page.locator("//tr[2]/td[1]/div/div/div/input");
        this.department = page.locator("//span[contains(normalize-space(),'Bộ phận')]");
        this.sendNotification = page.locator("//span[contains(text(),'Gửi')]");
        this.iconAction = page.locator("//tr[@id='row-0']//i[@class='mdi mdi-format-list-group mdi v-icon notranslate v-theme--lightColor7 v-icon--size-default']");
        this.requiredName = page.locator("//div[contains(text(),'Nhập tên thông báo')]");
        this.requiredDescription = page.locator("//div[contains(text(),'Nhập nội dung chi tiết')]");
        this.existedName = page.locator("//li[contains(text(),'Tên đã tồn tại.')]");
        this.workSchedule = page.locator("//div[text()='Lịch làm việc']");
        this.urgent = page.locator("//div[text()='Khẩn cấp']");
        this.holiday = page.locator("//div[text()='Ngày nghỉ']");
        this.notificationFormDropdown = page.locator("//div[2]/div/div[2]/div/div/div/div[3]/div/input");
        this.startDate = page.locator("//div[3]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.endDate = page.locator("//div[4]/div/div/div/div/div[1]/div/div/div[3]/input");
        this.notificationButton = page.locator("//div[contains(text(),'Quản lý thông báo')]");
        this.addButton = page.locator("//span[normalize-space()='Thêm']");
        this.notificationName = page.locator("//div[2]/div/div[1]/div/div/div/div[3]/div/input");
        this.description = page.locator("//div[2]/div/div[5]/div/div/div/div[3]/textarea");
        this.saveButton = page.locator("//span[contains(normalize-space(),'Lưu')]");
        this.cancelButton = page.locator("//span[contains(normalize-space(),'Hủy')]");
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

    async clickOnYesButton() {
        await this.safeClick(this.yesButton);
    }

    async clickOnDeleteButton() {
        await this.safeClickFirst(this.deleteButton);
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
        await this.safeClick(this.personnalOption);
    }

    async clickOnPersonnal() {
        await this.safeClick(this.personnal);
    }

    async clickOnDepartmentOption() {
        await this.safeClick(this.departmentOption);
    }

    async clickOnDepartment() {
        await this.safeClick(this.department);
    }

    async clickOnSendNotification() {
        await this.safeClick(this.sendNotification);
    }

    async clickOnIconAction() {
        await this.safeClick(this.iconAction);
    }

    async getRequiredName() {
        await this.safeVerifyToHaveText(this.requiredName, "Nhập tên thông báo");
    }

    async getRequiredDescription() {
        await this.safeVerifyToHaveText(this.requiredDescription, "Nhập nội dung chi tiết");
    }

    async getExistedName() {
        await this.safeVerifyToHaveText(this.existedName, "Tên đã tồn tại.");
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

    async clickOnSaveButton() {
        await this.safeClick(this.saveButton);
    }

    async clickOnCancelButton() {
        await this.safeClick(this.cancelButton);
    }

    async clickOnNotification() {
        await this.safeClick(this.notificationButton);
    }
}
