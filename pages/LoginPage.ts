import { Page, Locator, expect } from '@playwright/test';
import Config from '../utils/configUtils';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

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
    super(page);
    this.validateUsername = page.locator("//div[contains(text(),'Nhập email hoặc số điện thoại')]");
    this.validatePassword = page.locator("//div[contains(text(),'Nhập mật khẩu')]");
    this.dashBoard = page.locator("//div[contains(text(),'BigTime')]");
    this.usernameInput = page.getByRole('textbox', { name: 'Email hoặc Số điện thoại' })
    this.passwordInput = page.getByRole('textbox', { name: 'Mật khẩu' });
    this.loginButton = page.getByRole('button', { name: 'Đăng nhập' });
    this.profileBadgeAdmin = page.locator("//div[@class='v-chip__content']//span[contains(text(),'Admin')]");
    this.profileBadgeEmployee = page.locator("//div[@class='v-chip__content']//span[contains(text(),'Nguyễn Văn Minh')]");
    this.errorMessage = page.locator("//li[contains(text(),'Tên đăng nhập hoặc mật khẩu không đúng')]");
  }

  async goto() {
    await this.page.waitForLoadState('load');
    await this.page.goto(Config.urlStaging);
  }

  async expectUsernameValidate() {
    await this.safeVerifyToHaveText(this.validateUsername, 'Nhập email hoặc số điện thoại');
  }

  async expectPasswordValidate() {
    await this.safeVerifyToHaveText(this.validatePassword, 'Nhập mật khẩu');
  }

  async login(username: string, password: string) {
    await this.safeFill(this.usernameInput, username);
    await this.safeFill(this.passwordInput, password);
    await this.safeClick(this.loginButton);
  }

  async expectLoginSuccess() {
    await this.safeVerifyTextContains(this.dashBoard, 'BigTime');
  }

  async expectLoginError() {
    await this.safeVerifyTextContains(this.errorMessage, 'Tên đăng nhập hoặc mật khẩu không đúng');
  }
}
