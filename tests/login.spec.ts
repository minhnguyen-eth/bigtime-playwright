import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { takeScreenshotOnFailure } from '../utils/screenshotUtils';
import Config from '../utils/configUtils';
import { allure } from 'allure-playwright';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    allure.owner('Minh Nguyen');
    allure.feature('Login Feature');
    allure.severity('Critical');
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test.afterEach(async ({ page }, testInfo: TestInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });

  test('Login Successful With Valid Credentials', async () => {
    await loginPage.login(Config.admin_username, Config.admin_password);
    await loginPage.expectLoginAdminSuccess();
  });

  test('Login Successful With Employee Account', async () => {
    await loginPage.login(Config.employee_username, Config.employee_password);
    await loginPage.expectLoginEmployeeSuccess();
  });

  test('Login Unsuccessful With Invalid Credentials', async () => {
    await loginPage.login('admin@bigapptech.vn', '123456');
    await loginPage.expectLoginError();
  });
});
