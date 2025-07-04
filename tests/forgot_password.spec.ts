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
        await page.locator("//a[contains(text(),'Quên mật khẩu')]").click();
        await page.locator("//span[.=' Quên mật khẩu']").click();

        // Check validate "Nhập email"
        const emailLocator = page.locator("//div[contains(text(),'Nhập email')]");
        await expect(emailLocator).toBeVisible();
        await expect(emailLocator).toHaveText("Nhập email");
    });

    test('Test forgot password with wrong format email', async ({ page }) => {
        // Click on "Forgot Password"
        await page.locator("//a[contains(text(),'Quên mật khẩu')]").click();
        await page.locator("//span[.=' Quên mật khẩu']").click();

        // Input wrong format email
        await page.locator("//label[@class='v-label v-field-label']").fill("abc@abc");

        // Click on forget password button
        await page.locator("//span[.=' Quên mật khẩu']").click();

        // Check validate wrong format email
        const emailLocator = page.locator("//div[contains(text(),'Định dạng email không chính xác')]");
        await expect(emailLocator).toBeVisible();
        await expect(emailLocator).toHaveText("Định dạng email không chính xác");

    });

    test('Test forgot password with valid email', async ({ page }) => {
        // Click on "Forgot Password"
        await page.locator("//a[contains(text(),'Quên mật khẩu')]").click();
        await page.locator("//span[.=' Quên mật khẩu']").click();

        // Input correct format email
        await page.locator("//label[@class='v-label v-field-label']").fill("minh@gmail.com");

    });
});

