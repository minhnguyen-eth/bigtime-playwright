import { Page, Locator } from '@playwright/test';

export class NotificationPage {
    readonly page: Page;
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




    constructor(page: Page) {
        this.page = page;

        this.personnalSelect = page.locator("//div[3]/div/div[1]/table/tbody/tr/td[1]/div/div/div/input");
        this.personnalSearch = page.locator("//div[2]/div/div/div/div[4]/div/input");
        this.personnalOption = page.locator("//tbody/tr[1]/td[1]/div[1]/div[1]/div[1]/i[1]");
        this.personnal = page.locator("//span[contains(normalize-space(),'Cá nhân')]");
        this.departmentOption = page.locator("//tbody/tr[1]/td[1]/div[1]/div[1]/div[1]/i[1]");
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

    async clickOnPersonnalSelect() {
        await this.personnalSelect.click();
    }

    async fillPersonnalSearch(personnel: string) {
        await this.personnalSearch.fill(personnel);
        await this.page.keyboard.press('Enter');
    }

    async clickOnPersonnelOption() {
        await this.personnalOption.click();
    }

    async clickOnPersonnal() {
        await this.personnal.click();
    }

    async clickOnDepartmentOption() {
        await this.departmentOption.click({force: true});
    }

    async clickOnDepartment() {
        await this.department.click();
    }

    async clickOnSendNotification() {
        await this.sendNotification.click();
    }

    async clickOnIconAction() {
        await this.iconAction.click();
    }

    async getRequiredName() {
        const requiredName = await this.requiredName.textContent();
        console.log("Required name is " + requiredName);
        return requiredName;
    }

    async getRequiredDescription() {
        const requiredDescription = await this.requiredDescription.textContent();
        console.log("Required description is " + requiredDescription);
        return requiredDescription;
    }

    async getExistedName() {
        const existedName = await this.existedName.textContent();
        console.log("Existed name is " + existedName);
        return existedName;
    }

    async clickOnNotificationFormDropdown() {
        await this.notificationFormDropdown.click();
    }
    async clickOnStartDate() {
        await this.startDate.click();
    }

    async clickOnEndDate() {
        await this.endDate.click();
    }
    async clickOnWorkSchedule() {
        await this.workSchedule.click();
    }
    async clickOnUrgent() {
        await this.urgent.click();
    }
    async clickOnHoliday() {
        await this.holiday.click();
    }

    async fillNotificationName(name: string) {
        await this.notificationName.fill(name);
    }

    async fillDescription(description: string) {
        await this.description.fill(description);
    }

    async clickOnSaveButton() {
        await this.saveButton.click();
    }

    async clickOnCancelButton() {
        await this.cancelButton.click();
    }

    async clickOnAddButton() {
        await this.addButton.click();
    }

    async clickOnNotification() {
        await this.notificationButton.click();
    }
}
