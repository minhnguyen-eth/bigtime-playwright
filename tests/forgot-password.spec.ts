import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { allure } from 'allure-playwright';

test.describe('Forgot Password Test Suite', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    allure.feature('Forgot Password Feature');
    allure.owner('Minh Nguyen');
    allure.severity('Critical');

    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Test forgot password with empty email', async ({ page }) => {
    // Click on "Forgot Password"
    const forgotLink = page.locator("//a[contains(text(),'Quên mật khẩu')]");
    await forgotLink.waitFor({ state: 'visible', timeout: 10000 });
    await forgotLink.click();

    const forgotButton = page.locator("//span[.=' Quên mật khẩu']");
    await forgotButton.waitFor({ state: 'visible', timeout: 10000 });
    await forgotButton.click();

    // Check validate "Nhập email"
    const emailLocator = page.locator("//div[contains(text(),'Nhập email')]");
    await emailLocator.waitFor({ state: 'visible', timeout: 10000 });
    await expect(emailLocator).toHaveText("Nhập email");
  });

  test('Test forgot password with wrong format email', async ({ page }) => {
    await page.locator("//a[contains(text(),'Quên mật khẩu')]").click();

    const forgotButton = page.locator("//span[.=' Quên mật khẩu']");
    await forgotButton.waitFor({ state: 'visible', timeout: 10000 });
    await forgotButton.click();

    const emailInput = page.getByRole('textbox', { name: 'Email ※ Email ※' });
    await emailInput.waitFor({ state: 'visible', timeout: 10000 });
    await emailInput.fill("abc@abc");

    await forgotButton.click();

    const emailFormatError = page.locator("//div[contains(text(),'Định dạng email không chính xác')]");
    await emailFormatError.waitFor({ state: 'visible', timeout: 10000 });
    await expect(emailFormatError).toHaveText("Định dạng email không chính xác");
  });
});
