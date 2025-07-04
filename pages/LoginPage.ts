import { Page, Locator, expect } from '@playwright/test';
import Config from '../utils/configUtils';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly profileBadgeAdmin: Locator;
  readonly profileBadgeEmployee: Locator;
  readonly errorMessage: Locator;
  readonly dashBoard: Locator;
  readonly validateUsername: Locator;
  readonly validatePassword: Locator;

  constructor(page: Page) {
    this.page = page;
    this.validateUsername = page.locator("//div[contains(text(),'Nhập tên đăng nhập / email hoặc số điện thoại')]");
    this.validatePassword = page.locator("//div[contains(text(),'Nhập mật khẩu')]");
    this.dashBoard = page.locator("//div[contains(text(),'Bigtime')]");
    this.usernameInput = page.locator('#input-0');
    this.passwordInput = page.locator('#input-2');
    this.loginButton = page.locator('span.v-btn__content');
    this.profileBadgeAdmin = page.locator("//div[@class='v-chip__content']//span[contains(text(),'Admin')]");
    this.profileBadgeEmployee = page.locator("//div[@class='v-chip__content']//span[contains(text(),'Nguyễn Văn Minh')]");
    this.errorMessage = page.locator("//li[contains(text(),'Tên đăng nhập hoặc mật khẩu không đúng')]");
  }

  async goto() {
    await this.page.waitForLoadState('load');
    await this.page.goto(Config.urlStaging);
  }

  async expectUsernameValidate() {
    await expect(this.validateUsername).toBeVisible();
    await expect(this.validateUsername).toHaveText('Nhập tên đăng nhập / email hoặc số điện thoại');
  }

  async expectPasswordValidate() {
    await expect(this.validatePassword).toBeVisible();
    await expect(this.validatePassword).toHaveText('Nhập mật khẩu');
  }

  async login(username: string, password: string) {
    await this.page.waitForLoadState('domcontentloaded');
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginSuccess() {
    await expect(this.dashBoard).toBeVisible();
    await expect(this.dashBoard).toHaveText('Bigtime');
  }


  async expectLoginError() {
    await expect(this.errorMessage).toHaveText('Tên đăng nhập hoặc mật khẩu không đúng');
  }
}
