import { test, TestInfo } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { takeScreenshotOnFailure } from "../../utils/screenshotUtils";
import Config from "../../utils/configUtils";
import { HomePage } from "../../pages/HomePage";
import { ToastPage } from "../../pages/ToastPage";
import { DebtPage } from "../../pages/salary_page/DebtPage";
import { throws } from "assert";
import { LogoutPage } from "../../pages/LogoutPage";
import { allure } from 'allure-playwright';

test.describe.serial("Debt Tests", () => {

  let loginPage: LoginPage;
  let debtPage: DebtPage;
  let homePage: HomePage;
  let toastPage: ToastPage;
  let logoutPage: LogoutPage;

  test.beforeEach(async ({ page }) => {
   
    allure.feature('Debt Feature');
    allure.owner('Minh Nguyen');
    allure.severity('Critical');

    loginPage = new LoginPage(page);
    debtPage = new DebtPage(page);
    homePage = new HomePage(page);
    toastPage = new ToastPage(page);
    logoutPage = new LogoutPage(page);
    await loginPage.goto();
  });

  test.afterEach(async ({ page }, testInfo: TestInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });

  test("Add debt with empty value ", async ({ page }) => {
    allure.story('Validation Debt Creation');
    await allure.step('Admin logs in and attempts to add debt with empty values', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
      await homePage.clickSalary();
      await debtPage.clickDebtButton();
      await debtPage.clickAddButton();
      await debtPage.clickSaveButton();
    });
    await debtPage.expectFillNameError();
    await debtPage.expectFillNoteError();
  });

  test("Add debt with valid value ", async ({ page }) => {
    allure.story('Add Debt Successfully');
    await allure.step('Admin logs in and adds a valid debt record', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
      await homePage.clickSalary();
      await debtPage.clickDebtButton();
      await debtPage.clickAddButton();
      await debtPage.fillName("BAT810-Nguyễn Văn Minh");
      await debtPage.fillAmount("10000000");
      await debtPage.fillNote("add debt test ");
      await debtPage.clickSaveButton();
    });
    await toastPage.getToastAddSuccess();
  });

  test("Add debt with value already exists ", async ({ page }) => {
    allure.story('Duplicate Debt Entry');
    await allure.step('Admin tries to add duplicate debt', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
      await homePage.clickSalary();
      await debtPage.clickDebtButton();
      await debtPage.clickAddButton();
      await debtPage.fillName("BAT810-Nguyễn Văn Minh");
      await debtPage.fillAmount("10000000");
      await debtPage.fillNote("value already exists test");
      await debtPage.clickSaveButton();
    });
    await toastPage.getToastAddSuccess();
  });

  test("Edit debt", async ({ page }) => {
    allure.story('Edit Debt Record');
    await allure.step('Admin edits existing debt', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
      await homePage.clickSalary();
      await debtPage.clickDebtButton();
      await debtPage.clickAddButton();
      await debtPage.fillName("BAT810-Nguyễn Văn Minh");
      await debtPage.fillAmount("1000000");
      await debtPage.fillNote("add debt test for edit");
      await debtPage.clickSaveButton();
      await toastPage.getToastAddSuccess();
      await debtPage.clickEditButton();
      await debtPage.clickSaveButton();
    });
    await toastPage.getToastUpdateSuccess();
  });

  test("Edit debt with empty value", async ({ page }) => {
    allure.story('Validation on Debt Edit');
    await allure.step('Admin tries to edit debt with empty fields', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
      await homePage.clickSalary();
      await debtPage.clickDebtButton();
      await debtPage.clickAddButton();
      await debtPage.fillName("BAT810-Nguyễn Văn Minh");
      await debtPage.fillAmount("1000000");
      await debtPage.fillNote("add debt test for edit");
      await debtPage.clickSaveButton();
      await toastPage.getToastAddSuccess();
      await debtPage.clickEditButton();
      await debtPage.inputAmount.fill("");
      await debtPage.inputNote.fill("");
      await debtPage.clickSaveButton();
    });
    await debtPage.expectFillAmountError();
    await debtPage.expectFillNoteError();
  });

  test("Edit debt with valid value", async ({ page }) => {
    allure.story('Successful Debt Edit');
    await allure.step('Admin edits debt with valid new values', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
      await homePage.clickSalary();
      await debtPage.clickDebtButton();
      await debtPage.clickAddButton();
      await debtPage.fillName("BAT810-Nguyễn Văn Minh");
      await debtPage.fillAmount("1000000");
      await debtPage.fillNote("add debt test for edit");
      await debtPage.clickSaveButton();
      await toastPage.getToastAddSuccess();
      await debtPage.clickEditButton();
      await debtPage.inputAmount.fill("2000000");
      await debtPage.inputNote.fill("edit valid value");
      await debtPage.clickSaveButton();
    });
    await toastPage.getToastUpdateSuccess();
  });

  test("Send debt and browse", async ({ page }) => {
    allure.story('Send and Approve Debt');
    await allure.step('Admin sends debt, Employee approves', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
      await homePage.clickSalary();
      await debtPage.clickDebtButton();
      await debtPage.clickAddButton();
      await debtPage.fillName("BAT810-Nguyễn Văn Minh");
      await debtPage.fillAmount("10000000");
      await debtPage.fillNote("add debt test for send");
      await debtPage.clickSaveButton();
      await toastPage.getToastAddSuccess();
      await debtPage.clickIconAction();
      await debtPage.clickSendButton();
      await debtPage.clickYesButton();
      await toastPage.getToastSendSuccess();

      await debtPage.clickLogoutButton();
      await debtPage.clickYesButton();
      await loginPage.login(Config.employee_username, Config.employee_password);
      await homePage.clickSalary();
      await debtPage.clickDebtButton();
      await debtPage.clickIconAction();
      await debtPage.clickBrowseButton();
      await debtPage.clickYesButton();
    });
    await toastPage.getToastBrowseSuccess();
  });

  test("Send debt and refused in employee account", async ({ page }) => {
    allure.story('Send and Refuse Debt');
    await allure.step('Admin sends debt, Employee refuses', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
      await homePage.clickSalary();
      await debtPage.clickDebtButton();
      await debtPage.clickAddButton();
      await debtPage.fillName("BAT810-Nguyễn Văn Minh");
      await debtPage.fillAmount("1000000");
      await debtPage.fillNote("add debt test for send");
      await debtPage.clickSaveButton();
      await toastPage.getToastAddSuccess();
      await debtPage.clickIconAction();
      await debtPage.clickSendButton();
      await debtPage.clickYesButton();
      await toastPage.getToastSendSuccess();

      await debtPage.clickLogoutButton();
      await debtPage.clickYesButton();
      await loginPage.login(Config.employee_username, Config.employee_password);
      await homePage.clickSalary();
      await debtPage.clickDebtButton();
      await debtPage.clickActionRefusedButton();
      await debtPage.fillReason("refused debt test");
      await debtPage.clickYesButton();
    });
    await toastPage.getToastRefuseSuccess();
  });

  test("Send debt and cancel", async ({ page }) => {
    allure.story('Send and Cancel Debt');
    await allure.step('Admin sends debt then cancels', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
      await homePage.clickSalary();
      await debtPage.clickDebtButton();
      await debtPage.clickAddButton();
      await debtPage.fillName("BAT810-Nguyễn Văn Minh");
      await debtPage.fillAmount("1000000");
      await debtPage.fillNote("add debt test for send");
      await debtPage.clickSaveButton();
      await toastPage.getToastAddSuccess();
      await debtPage.clickIconAction();
      await debtPage.clickSendButton();
      await debtPage.clickYesButton();
      await toastPage.getToastSendSuccess();
      await debtPage.clickActionSendCancelButton();
      await debtPage.fillReason("cancel debt test");
      await debtPage.clickYesButton();
    });
    await toastPage.getToastCancelSuccess();
  });

  test("Cancel debt with new status", async ({ page }) => {
    allure.story('Cancel New Debt');
    await allure.step('Admin cancels newly added debt', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
      await homePage.clickSalary();
      await debtPage.clickDebtButton();
      await debtPage.clickAddButton();
      await debtPage.fillName("BAT810-Nguyễn Văn Minh");
      await debtPage.fillAmount("1000000");
      await debtPage.fillNote("add debt test for cancel");
      await debtPage.clickSaveButton();
      await toastPage.getToastAddSuccess();
      await debtPage.clickActionCancelButton();
      await debtPage.fillReason("cancel debt test");
      await debtPage.clickYesButton();
    });
    await toastPage.getToastCancelSuccess();
  });

  test("Cancel debt with empty reason", async ({ page }) => {
    allure.story('Cancel Debt Validation');
    await allure.step('Admin attempts to cancel debt without reason', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
      await homePage.clickSalary();
      await debtPage.clickDebtButton();
      await debtPage.clickAddButton();
      await debtPage.fillName("BAT810-Nguyễn Văn Minh");
      await debtPage.fillAmount("1000000");
      await debtPage.fillNote("add debt test for cancel");
      await debtPage.clickSaveButton();
      await toastPage.getToastAddSuccess();
      await debtPage.clickActionCancelButton();
      await debtPage.fillReason("");
      await debtPage.clickYesButton();
    });
    await debtPage.expectFillReasonError();
  });

});