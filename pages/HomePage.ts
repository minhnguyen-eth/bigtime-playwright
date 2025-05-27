import { Locator, Page } from "@playwright/test";

export class HomePage {
    private page: Page;
    private Admin_Button: Locator;
    private TimeKeepingManagement_Button: Locator;
    private Salary_Button: Locator;
    private Setting_Button: Locator;

constructor(page: Page) {
     this.page = page;
     this.Admin_Button = page.locator("//span[normalize-space()='Quản lý']");
     this.TimeKeepingManagement_Button = page.locator("//span[normalize-space()='Quản lý chấm công']");
     this.Salary_Button = page.locator("//span[normalize-space()='Lương']");
    this.Setting_Button = page.locator("//span[normalize-space()='Cài đặt']");
}

async clickAdmin() {
    await this.Admin_Button.click();
}

async clickTimeKeepingManagement() {
    await this.TimeKeepingManagement_Button.click();
}

async clickSalary() {
    await this.Salary_Button.click();
}

async clickSetting() {
    await this.Setting_Button.click();
}



}