import { Page, Locator, expect } from '@playwright/test';
import Config from '../utils/configUtils';

export class LoginPage {
  readonly  page: Page;
  readonly  usernameInput: Locator;
  readonly  passwordInput: Locator;
  readonly  loginButton: Locator;
  readonly  profileBadgeAdmin: Locator;
  readonly  profileBadgeEmployee: Locator;
  readonly  errorMessage: Locator;
  readonly  dashBoard: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashBoard = page.locator("//div[contains(text(),'Bigtime Stagin Environment')]");
    this.usernameInput = page.locator('#input-0');
    this.passwordInput = page.locator('#input-2');
    this.loginButton = page.locator('span.v-btn__content');
    this.profileBadgeAdmin = page.locator("//div[@class='v-chip__content']//span[contains(text(),'Admin')]");
    this.profileBadgeEmployee = page.locator("//div[@class='v-chip__content']//span[contains(text(),'Nguyễn Văn Minh')]");
    this.errorMessage = page.locator("//li[contains(text(),'Tên đăng nhập hoặc mật khẩu không đúng')]");
  }

  async goto() {
    await this.page.goto(Config.urlStating);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginSuccess() {
    await expect(this.dashBoard).toBeVisible();
    await expect(this.dashBoard).toHaveText('Bigtime Stagin Environment');
  }
  

  async expectLoginError() {
    await expect(this.errorMessage).toHaveText('Tên đăng nhập hoặc mật khẩu không đúng');
  }
}
