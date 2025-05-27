import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { takeScreenshotOnFailure } from '../helpers/utils';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test.afterEach(async ({ page }, testInfo: TestInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });

  test('Login Successful With Valid Credentials', async () => {
    await loginPage.login('admin@gmail.com', '123456');
    await loginPage.expectLoginSuccess();
  });

  test('Login Unsuccessful With Invalid Credentials', async () => {
    await loginPage.login('admin@bigapptech.vn', '123456');
    await loginPage.expectLoginError();
  });
});
