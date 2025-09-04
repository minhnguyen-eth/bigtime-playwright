import { test, } from '../base-test';
import { LoginPage } from "../../pages/LoginPage";
import Config from "../../utils/configUtils";
import { ToastPage } from "../../pages/ToastPage";
import { DebtPage } from "../../pages/salary_page/DebtPage";
import { LogoutPage } from "../../pages/LogoutPage";
import { allure } from 'allure-playwright';
import { ValidationPage } from '../../pages/ValidationPage';
import { clearDebts } from '../../db/helpers/DBHelper';

test.describe.serial("Debt Tests", () => {
  let loginPage: LoginPage;
  let debtPage: DebtPage;
  let toastPage: ToastPage;
  let logoutPage: LogoutPage;
  let validationPage: ValidationPage;


  test.beforeEach(async ({ page }) => {
    allure.feature('Debt Feature');
    allure.owner('Minh Nguyen');
    allure.severity('Critical');

    validationPage = new ValidationPage(page);
    loginPage = new LoginPage(page);
    debtPage = new DebtPage(page);
    toastPage = new ToastPage(page);
    logoutPage = new LogoutPage(page);

    await loginPage.goto();
  });

  async function addDebt() {
    await loginPage.login(Config.admin_username, Config.admin_password);
    await debtPage.clickSalary();
    await debtPage.clickDebtButton();
    await debtPage.clickAdd();
    await debtPage.fillName("BAT810-Nguyễn Văn Minh");
    await debtPage.fillAmount("1000000");
    await debtPage.fillNote("add debt test for cancel");
    await debtPage.clickSave();
    await toastPage.getToastAddSuccess();
  }

  test("Max length of note 255 characters", async ({ page }) => {
    await clearDebts();
    await loginPage.login(Config.admin_username, Config.admin_password);
    await debtPage.clickSalary();
    await debtPage.clickDebtButton();
    await debtPage.clickAdd();
    await debtPage.fillName("BAT810-Nguyễn Văn Minh");
    await debtPage.fillAmount("10000000");
    await debtPage.fillNote("a".repeat(255));
    await debtPage.clickSave();
    await toastPage.getToastAddSuccess();
  });

  test("Max length of note over 255 characters", async ({ page }) => {
    await loginPage.login(Config.admin_username, Config.admin_password);
    await debtPage.clickSalary();
    await debtPage.clickDebtButton();
    await debtPage.clickAdd();
    await debtPage.fillName("BAT810-Nguyễn Văn Minh");
    await debtPage.fillAmount("10000000");
    await debtPage.fillNote("a".repeat(256));
    await debtPage.clickSave();
    await validationPage.validateMaxLength255Characters();
  });

  test("Add debt with empty value ", async ({ page }) => {
    allure.story('Validation Debt Creation');
    await allure.step('Admin logs in and attempts to add debt with empty values', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
      await debtPage.clickSalary();
      await debtPage.clickDebtButton();
      await debtPage.clickAdd();
      await debtPage.clickSave();
      await debtPage.expectFillNameError();
      await debtPage.expectFillNoteError();
    });
  });

  test("Add debt with valid value ", async ({ page }) => {
    await addDebt();
  });

  test("Add debt with value already exists ", async ({ page }) => {
    await allure.step('Admin tries to add duplicate debt', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
      await debtPage.clickSalary();
      await debtPage.clickDebtButton();
      await debtPage.clickAdd();
      await debtPage.fillName("BAT810-Nguyễn Văn Minh");
      await debtPage.fillAmount("10000000");
      await debtPage.fillNote("value already exists test");
      await debtPage.clickSave();
    });
    await toastPage.getToastAddSuccess();
  });

  test("Edit money ", async ({ page }) => {
    allure.story('Edit Debt Record');
    await allure.step('Admin edits existing debt', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
      await debtPage.clickSalary();
      await debtPage.clickDebtButton();
      await debtPage.clickIconAction();
      await debtPage.clickEdit();
      await debtPage.fillAmount("20000000");
      await debtPage.clickSave();
    });
    await toastPage.getToastUpdateSuccess();
  });

  test("Edit note", async ({ page }) => {
    allure.story('Successful Debt Edit');
    await allure.step('Admin edits debt with valid new values', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
      await debtPage.clickSalary();
      await debtPage.clickDebtButton();
      await debtPage.clickIconAction();
      await debtPage.clickEdit();
      await debtPage.fillNote("edit valid value");
      await debtPage.clickSave();
    });
    await toastPage.getToastUpdateSuccess();
  });

  test("Send debt and browse", async ({ page }) => {
    allure.story('Send and Approve Debt');
    await allure.step('Admin sends debt, Employee approves', async () => {
      await addDebt();
      await debtPage.clickIconAction();
      await debtPage.clickSendAndClickYes();
      await toastPage.getToastSendSuccess();

      await logoutPage.logout();
      await loginPage.login(Config.employee_username, Config.employee_password);
      // await debtPage.clickSalary();
      // await debtPage.clickDebtButton();
      await debtPage.clickIconAction();
      await debtPage.clickBrowse();
    });
    await toastPage.getToastBrowseSuccess();
  });

  test("Send debt and refused in employee account", async ({ page }) => {
    allure.story('Send and Refuse Debt');
    await allure.step('Admin sends debt, Employee refuses', async () => {
      await addDebt();
      await debtPage.clickIconAction();
      await debtPage.clickSendAndClickYes();
      await toastPage.getToastSendSuccess();

      await logoutPage.logout();
      await loginPage.login(Config.employee_username, Config.employee_password);
      // await debtPage.clickSalary();
      // await debtPage.clickDebtButton();
      await debtPage.clickIconAction();
      await debtPage.clickReject();
      await debtPage.fillReasonAndClickYes("refused debt test");
    });
    await toastPage.getToastRejectSuccess();
  });

  test("Send debt and cancel", async ({ page }) => {
    allure.story('Send and Cancel Debt');
    await allure.step('Admin sends debt then cancels', async () => {
      await addDebt();
      await debtPage.clickIconAction();
      await debtPage.clickSendAndClickYes();
      await toastPage.getToastSendSuccess();
      await debtPage.clickIconAction();
      await debtPage.clickCancel();
      await debtPage.fillReasonAndClickYes("cancel debt test");
    });
    await toastPage.getToastCancelSuccess();
  });

  test("Cancel debt with new status", async ({ page }) => {
    await clearDebts();
    allure.story('Cancel New Debt');
    await allure.step('Admin cancels newly added debt', async () => {
      await addDebt();
      await debtPage.clickIconAction();
      await debtPage.clickCancel();
      await debtPage.fillReasonAndClickYes("cancel debt test");
    });
    await toastPage.getToastCancelSuccess();
  });

  test("Cancel debt with empty reason", async ({ page }) => {
    await clearDebts();
    allure.story('Cancel Debt Validation');
    await allure.step('Admin attempts to cancel debt without reason', async () => {
      await addDebt();
      await debtPage.clickIconAction();
      await debtPage.clickCancel();
      await debtPage.fillReasonAndClickYes("");
    });
    await validationPage.validateRequiredFillReason();
  });
});

