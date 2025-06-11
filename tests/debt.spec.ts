
import { test, expect, Page, TestInfo } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { takeScreenshotOnFailure } from "../utils/screenshotUtils";
import Config from "../utils/configUtils";
import { HomePage } from "../pages/HomePage";
import { ToastPage } from "../pages/ToastPage";
import { DebtPage } from "../pages/DebtPage";
import { throws } from "assert";

test.describe.serial("Debt Tests", () => {
  let loginPage: LoginPage;
  let debtPage: DebtPage;
  let homePage: HomePage;
  let toastPage: ToastPage;

  const randomSuffix = Math.random().toString(36).substring(2, 8);

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    debtPage = new DebtPage(page);
    homePage = new HomePage(page);
    toastPage = new ToastPage(page);
    await loginPage.goto();
  });

  test.afterEach(async ({ page }, testInfo: TestInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });

  test("empty value Test", async ({ page }) => {
    await loginPage.login(Config.admin_username, Config.admin_password);
    await homePage.clickSalary();
    await debtPage.clickDebtButton();
    await debtPage.clickAddButton();
    await debtPage.clickSaveButton();
    await debtPage.expectFillNameError();
    await debtPage.expectFillNoteError();
  });

  test("add debt Test", async ({ page }) => {
    await loginPage.login(Config.admin_username, Config.admin_password);
    await homePage.clickSalary();
    await debtPage.clickDebtButton();
    await debtPage.clickAddButton();
    await debtPage.fillName("BAT810-Nguyễn Văn Minh");
    await debtPage.fillAmount("1000000");
    await debtPage.fillNote("add debt test ");
    await debtPage.clickSaveButton();
    const successMessage = await debtPage.getToastAddSuccess();
    expect(successMessage).toContain("Thêm thành công");
  });

  test("value already exists Test", async ({ page }) => {
    await loginPage.login(Config.admin_username, Config.admin_password);
    await homePage.clickSalary();
    await debtPage.clickDebtButton();
    await debtPage.clickAddButton();
    await debtPage.fillName("BAT810-Nguyễn Văn Minh");
    await debtPage.fillAmount("1000000");
    await debtPage.fillNote("value already exists test");
    await debtPage.clickSaveButton();
    const successMessage = await debtPage.getToastAddSuccess();
    expect(successMessage).toContain("Thêm thành công");
  });

  test("edit debt Test", async ({ page }) => {
    await loginPage.login(Config.admin_username, Config.admin_password);
    await homePage.clickSalary();
    await debtPage.clickDebtButton();
    await debtPage.clickAddButton();
    await debtPage.fillName("BAT810-Nguyễn Văn Minh");
    await debtPage.fillAmount("1000000");
    await debtPage.fillNote("add debt test for edit");
    await debtPage.clickSaveButton();
    const successMessage = await debtPage.getToastAddSuccess();
    expect(successMessage).toContain("Thêm thành công");
    await debtPage.clickEditButton();
    await debtPage.clickSaveButton();
    const editSuccessMessage = await debtPage.getToastEditSuccess();
    expect(editSuccessMessage).toContain("Cập nhật thành công");
  });

  test("edit debt with empty value Test", async ({ page }) => {
    await loginPage.login(Config.admin_username, Config.admin_password);
    await homePage.clickSalary();
    await debtPage.clickDebtButton();
    await debtPage.clickAddButton();
    await debtPage.fillName("BAT810-Nguyễn Văn Minh");
    await debtPage.fillAmount("1000000");
    await debtPage.fillNote("add debt test for edit");
    await debtPage.clickSaveButton();
    const successMessage = await debtPage.getToastAddSuccess();
    expect(successMessage).toContain("Thêm thành công");
    await debtPage.clickEditButton();
    await debtPage.inputAmount.fill("");
    await debtPage.inputNote.fill("");
    await debtPage.clickSaveButton();
    await debtPage.expectFillAmountError();
    await debtPage.expectFillNoteError();
  });

  test("edit debt with valid value Test", async ({ page }) => {
    await loginPage.login(Config.admin_username, Config.admin_password);
    await homePage.clickSalary();
    await debtPage.clickDebtButton();
    await debtPage.clickAddButton();
    await debtPage.fillName("BAT810-Nguyễn Văn Minh");
    await debtPage.fillAmount("1000000");
    await debtPage.fillNote("add debt test for edit");
    await debtPage.clickSaveButton();
    const successMessage = await debtPage.getToastAddSuccess();
    expect(successMessage).toContain("Thêm thành công");
    await debtPage.clickEditButton();
    await debtPage.inputAmount.fill("2000000");
    await debtPage.inputNote.fill("edit valid value");
    await debtPage.clickSaveButton();
    const editSuccessMessage = await debtPage.getToastEditSuccess();
    expect(editSuccessMessage).toContain("Cập nhật thành công");
  });

  test("send debt and view in employee account Test", async ({ page }) => {
    await loginPage.login(Config.admin_username, Config.admin_password);
    await homePage.clickSalary();
    await debtPage.clickDebtButton();
    await debtPage.clickAddButton();
    await debtPage.fillName("BAT810-Nguyễn Văn Minh");
    await debtPage.fillAmount("1000000");
    await debtPage.fillNote("add debt test for send");
    await debtPage.clickSaveButton();
    const successMessage = await debtPage.getToastAddSuccess();
    expect(successMessage).toContain("Thêm thành công");
    await debtPage.clickActionSendButton();
    await debtPage.clickYesButton();
    const sendSuccessMessage = await debtPage.getToastSendSuccess();
    expect(sendSuccessMessage).toContain("Đã gửi thành công");

    // Login as employee to check the sent debt
    await debtPage.clickLogoutButton();
    await debtPage.clickYesButton();
    await loginPage.login(Config.employee_username, Config.employee_password);
    await homePage.clickSalary();
    await debtPage.clickDebtButton();

    // Check if the sent debt is visible
    const debtRow = page.getByRole("row", {
      name: "1 BAT810 - Nguyễn Văn Minh 1.000.000 đ add debt test for send Admin Đã gửi",
      exact: true,
    });
    await expect(debtRow).toBeVisible();
  });

  test("send debt and browse in employee account Test", async ({ page }) => {
    await loginPage.login(Config.admin_username, Config.admin_password);
    await homePage.clickSalary();
    await debtPage.clickDebtButton();
    await debtPage.clickAddButton();
    await debtPage.fillName("BAT810-Nguyễn Văn Minh");
    await debtPage.fillAmount("1000000");
    await debtPage.fillNote("add debt test for send");
    await debtPage.clickSaveButton();
    const successMessage = await debtPage.getToastAddSuccess();
    expect(successMessage).toContain("Thêm thành công");
    await debtPage.clickActionSendButton();
    await debtPage.clickYesButton();
    const sendSuccessMessage = await debtPage.getToastSendSuccess();
    expect(sendSuccessMessage).toContain("Đã gửi thành công");
    await debtPage.clickLogoutButton();
    await debtPage.clickYesButton();
    await loginPage.login(Config.employee_username, Config.employee_password);
    await homePage.clickSalary();
    await debtPage.clickDebtButton();
    await debtPage.clickActionBrowsedButton();
    await debtPage.clickYesButton();
    const browseSuccessMessage = await debtPage.getToastBrowseSuccess();
    expect(browseSuccessMessage).toContain("Đã gửi thành công");
    const debtRow = page.getByRole("row", {
      name: "1 BAT810 - Nguyễn Văn Minh 1.000.000 đ add debt test for send Admin Đã duyệt",
      exact: true,
    });
    await expect(debtRow).toBeVisible();
  });

  test("send debt and refused in employee account Test", async ({ page }) => {
    await loginPage.login(Config.admin_username, Config.admin_password);
    await homePage.clickSalary();
    await debtPage.clickDebtButton();
    await debtPage.clickAddButton();
    await debtPage.fillName("BAT810-Nguyễn Văn Minh");
    await debtPage.fillAmount("1000000");
    await debtPage.fillNote("add debt test for send");
    await debtPage.clickSaveButton();
    const successMessage = await debtPage.getToastAddSuccess();
    expect(successMessage).toContain("Thêm thành công");
    await debtPage.clickActionSendButton();
    await debtPage.clickYesButton();
    const sendSuccessMessage = await debtPage.getToastSendSuccess();
    expect(sendSuccessMessage).toContain("Đã gửi thành công");
    await debtPage.clickLogoutButton();
    await debtPage.clickYesButton();
    await loginPage.login(Config.employee_username, Config.employee_password);
    await homePage.clickSalary();
    await debtPage.clickDebtButton();
    await debtPage.clickActionRefusedButton();
    await debtPage.fillReason("refused debt test");
    await debtPage.clickYesButton();
    const refusedSuccessMessage = await debtPage.getToastRefusedSuccess();
    expect(refusedSuccessMessage).toContain("Từ chối thành công");
    const debtRow = page.getByRole("row", {
      name: "1 BAT810 - Nguyễn Văn Minh 1.000.000 đ add debt test for send Admin Từ chối",
      exact: true,
    });
    await expect(debtRow).toBeVisible();
  });

  test("send debt and cancel Test", async ({ page }) => {
    await loginPage.login(Config.admin_username, Config.admin_password);
    await homePage.clickSalary();
    await debtPage.clickDebtButton();
    await debtPage.clickAddButton();
    await debtPage.fillName("BAT810-Nguyễn Văn Minh");
    await debtPage.fillAmount("1000000");
    await debtPage.fillNote("add debt test for send");
    await debtPage.clickSaveButton();
    const successMessage = await debtPage.getToastAddSuccess();
    expect(successMessage).toContain("Thêm thành công");
    await debtPage.clickActionSendButton();
    await debtPage.clickYesButton();
    const sendSuccessMessage = await debtPage.getToastSendSuccess();
    expect(sendSuccessMessage).toContain("Đã gửi thành công");
    await debtPage.clickActionSendCancelButton();
    await debtPage.fillReason("cancel debt test");
    await debtPage.clickYesButton();
    const cancelSuccessMessage = await debtPage.getToastCancelSuccess();
    expect(cancelSuccessMessage).toContain("Hủy thành công");
    const debtRow = page.getByRole("row", {
      name: "1 BAT810 - Nguyễn Văn Minh 1.000.000 đ add debt test for send Admin Hủy",
      exact: true,
    });
    await expect(debtRow).toBeVisible();
  });

  test("cancel debt Test", async ({ page }) => {
    await loginPage.login(Config.admin_username, Config.admin_password);
    await homePage.clickSalary();
    await debtPage.clickDebtButton();
    await debtPage.clickAddButton();
    await debtPage.fillName("BAT810-Nguyễn Văn Minh");
    await debtPage.fillAmount("1000000");
    await debtPage.fillNote("add debt test for cancel");
    await debtPage.clickSaveButton();
    const successMessage = await debtPage.getToastAddSuccess();
    expect(successMessage).toContain("Thêm thành công");
    await debtPage.clickActionCancelButton();
    await debtPage.fillReason("cancel debt test");
    await debtPage.clickYesButton();
    const cancelSuccessMessage = await debtPage.getToastCancelSuccess();
    expect(cancelSuccessMessage).toContain("Hủy thành công");
  });

  test("cancel debt with empty reason Test", async ({ page }) => {
    await loginPage.login(Config.admin_username, Config.admin_password);
    await homePage.clickSalary();
    await debtPage.clickDebtButton();
    await debtPage.clickAddButton();
    await debtPage.fillName("BAT810-Nguyễn Văn Minh");
    await debtPage.fillAmount("1000000");
    await debtPage.fillNote("add debt test for cancel");
    await debtPage.clickSaveButton();
    const successMessage = await debtPage.getToastAddSuccess();
    expect(successMessage).toContain("Thêm thành công");
    await debtPage.clickActionCancelButton();
    await debtPage.fillReason("");
    await debtPage.clickYesButton();
    await debtPage.expectFillReasonError();
  });

  
});

