import { test, expect, Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { takeScreenshotOnFailure } from '../utils/screenshotUtils';
import Config from '../utils/configUtils';
import { allure } from 'allure-playwright';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
  
    allure.feature('Login Feature');
    allure.owner('Minh Nguyen');
    allure.severity('Critical');

    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test.afterEach(async ({ page }, testInfo: TestInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });

  test('Login Successful With Valid Credentials', async () => {
    allure.story('Valid Admin Login Story');

    await allure.step('Login with admin account', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
    });

    await allure.step('Verify successful admin login', async () => {
      await loginPage.expectLoginAdminSuccess();
    });
  });

  test('Login Successful With Employee Account', async () => {
    allure.story('Valid Employee Login Story');

    await allure.step('Login with employee account', async () => {
      await loginPage.login(Config.employee_username, Config.employee_password);
    });

    await allure.step('Verify successful employee login', async () => {
      await loginPage.expectLoginEmployeeSuccess();
    });
  });

  test('Login Unsuccessful With Invalid Credentials', async () => {
    allure.story('Invalid Login Story');

    await allure.step('Login with invalid credentials', async () => {
      await loginPage.login('admin@bigapptech.vn', '123456');
    });

    await allure.step('Verify login failure message', async () => {
      await loginPage.expectLoginError();
    });
  });
});
