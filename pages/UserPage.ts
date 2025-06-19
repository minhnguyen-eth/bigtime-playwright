import { expect, Locator, Page } from '@playwright/test';

export class UserPage {
  readonly page: Page;
  readonly userButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userButton = page.locator("//div[contains(text(),'Nhân viên')]");
  }

  async clickUser() {
    await this.userButton.click();
  }



}

