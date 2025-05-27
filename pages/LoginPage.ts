import { Page, Locator, expect } from '@playwright/test';
import Config from '../helpers/config';

export class LoginPage {
  private page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private profileBadge: Locator;
  private errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#input-0');
    this.passwordInput = page.locator('#input-2');
    this.loginButton = page.locator('span.v-btn__content');
    this.profileBadge = page.locator("//div[@class='v-chip__content']//span[contains(text(),'Admin')]");
    this.errorMessage = page.locator("//li[contains(text(),'Tên đăng nhập hoặc mật khẩu không đúng')]");
  }

  async goto(): Promise<void> {
    await this.page.goto(Config.urlStating);
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoginSuccess(): Promise<void> {
    await expect(this.profileBadge).toHaveText('Admin');
  }

  async expectLoginError(): Promise<void> {
    await expect(this.errorMessage).toHaveText('Tên đăng nhập hoặc mật khẩu không đúng');
  }
}
