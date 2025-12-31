import { expect, test, } from './base-test';
import { LoginPage } from '../pages/LoginPage';
import { allure } from 'allure-playwright';
import { PasswordPage } from '../pages/PasswordPage';
import { ToastPage } from '../pages/ToastPage';
import { LogoutPage } from '../pages/LogoutPage';

test.describe.serial('Forgot Password Test Suite', () => {
  let loginPage: LoginPage;
  let passwordPage: PasswordPage;
  let toastPage: ToastPage;
  let logoutPage: LogoutPage;

  test.beforeEach(async ({ page }) => {
    allure.feature('Forgot Password Feature');
    allure.owner('Minh Nguyen');
    allure.severity('Critical');
    passwordPage = new PasswordPage(page);
    toastPage = new ToastPage(page);
    loginPage = new LoginPage(page);
    logoutPage = new LogoutPage(page);
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

  //Change Password failedly
  test('Test change password with wrong current password', async ({ page }) => {
    await loginPage.login('mhai1711@gmail.com', '123456');
    await passwordPage.clickAvataButton();
    await passwordPage.clickChangePassword();
    await passwordPage.changePassword('abcccc', '123456', '123456');
    await passwordPage.clickSave();
    await passwordPage.validatePasswordOldFailed();
  });
  // Password comfirmation error
  test('Test change password with mismatched new password and confirmation password', async ({ page }) => {
    await loginPage.login('mhai1711@gmail.com', '123456');
    await passwordPage.clickAvataButton();
    await passwordPage.clickChangePassword();
    await passwordPage.changePassword('1234567', '1234566', '12345678');
    await passwordPage.clickSave();
    await passwordPage.validatePasswordConfirmFailed();
  });

  //Check input password old
  test('Test change password with empty current password', async ({ page }) => {
    await loginPage.login('mhai1711@gmail.com', '123456');
    await passwordPage.clickAvataButton();
    await passwordPage.clickChangePassword();
    await passwordPage.changePassword('', '123456', '123456');
    await passwordPage.validatePasswordOldEmpty();
  });

  //Check input old password under 6 characters
  test('Test change password with current password under 6 characters', async ({ page }) => {
    await loginPage.login('mhai1711@gmail.com', '123456');
    await passwordPage.clickAvataButton();
    await passwordPage.clickChangePassword();
    await passwordPage.changePassword('123', '123456', '123456');
    await passwordPage.validatePasswordOld6Characters();
  });

  //Check new password emtpy
  test('Test change password with empty new password', async ({ page }) => {
    await loginPage.login('mhai1711@gmail.com', '123456');
    await passwordPage.clickAvataButton();
    await passwordPage.clickChangePassword();
    await passwordPage.changePassword('1234567', '', '123456');
    await passwordPage.validateNewPasswordEmpty();
  });

  //Check new password under 6 characters
  test('Test change password with new password under 6 characters', async ({ page }) => {
    await loginPage.login('mhai1711@gmail.com', '123456');
    await passwordPage.clickAvataButton();
    await passwordPage.clickChangePassword();
    await passwordPage.changePassword('1234567', '123', '123');
    await passwordPage.validatePasswordOld6Characters();
  });

  //Check new còmfirm password under 6 characters
  test('Test change password with confirmation password under 6 characters', async ({ page }) => {
    await loginPage.login('mhai1711@gmail.com', '123456');
    await passwordPage.clickAvataButton();
    await passwordPage.clickChangePassword();
    await passwordPage.changePassword('1234567', '123456', '123');
    await passwordPage.validatePasswordOld6Characters();
  });

  //Change Password successsfully
  test('Test forgot password with valid email', async ({ page }) => {
    await loginPage.login('mhai1711@gmail.com', '123456');
    await passwordPage.clickAvataButton();
    await passwordPage.clickChangePassword();
    await passwordPage.changePassword('123456', '1234567', '1234567');
    await passwordPage.clickSave();
    await toastPage.getToastChangePasswordSuccess();
    await loginPage.login('mhai1711@gmail.com', '1234567');
    await loginPage.expectLoginSuccess();
    await logoutPage.logout();
    await loginPage.login('mhai1711@gmail.com', '123456');
    await loginPage.expectLoginError();

    await loginPage.login('mhai1711@gmail.com', '1234567');
    await passwordPage.clickAvataButton();
    await passwordPage.clickChangePassword();
    await passwordPage.changePassword('1234567', '123456', '123456');
    await passwordPage.clickSave();
  });
});
