import { test, } from '../base-test';
import { LoginPage } from "../../pages/LoginPage";
import Config from "../../utils/configUtils";
import { ToastPage } from "../../pages/ToastPage";
import { DebtPage } from "../../pages/salary_page/DebtPage";
import { LogoutPage } from "../../pages/LogoutPage";
import { allure } from 'allure-playwright';
import { BasePage } from "../../pages/BasePage";
import { clearDebts } from '../../db/DBHelper';

test.describe.serial("Debt Tests", () => {
  let loginPage: LoginPage;
  let debtPage: DebtPage;
  let toastPage: ToastPage;
  let logoutPage: LogoutPage;
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    allure.feature('Debt Feature');
    allure.owner('Minh Nguyen');
    allure.severity('Critical');

    loginPage = new LoginPage(page);
    debtPage = new DebtPage(page);
    toastPage = new ToastPage(page);
    logoutPage = new LogoutPage(page);
    basePage = new BasePage(page);
    await loginPage.goto();
  });

  test("Max length of note 255 characters", async ({ page }) => {
    await clearDebts();
    await loginPage.login(Config.admin_username, Config.admin_password);
    await basePage.clickSalary();
    await debtPage.clickDebtButton();
    await basePage.clickAdd();
    await debtPage.fillName("BAT810-Nguyễn Văn Minh");
    await debtPage.fillAmount("10000000");
    await debtPage.fillNote("a".repeat(255));
    await basePage.clickSave();
    await toastPage.getToastAddSuccess();
  });

  test("Max length of note over 255 characters", async ({ page }) => {
    await loginPage.login(Config.admin_username, Config.admin_password);
    await basePage.clickSalary();
    await debtPage.clickDebtButton();
    await basePage.clickAdd();
    await debtPage.fillName("BAT810-Nguyễn Văn Minh");
    await debtPage.fillAmount("10000000");
    await debtPage.fillNote("a".repeat(256));
    await basePage.clickSave();
    await basePage.verifyMaxlenght255Charactor();
  });

  test("Add debt with empty value ", async ({ page }) => {
    allure.story('Validation Debt Creation');
    await allure.step('Admin logs in and attempts to add debt with empty values', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
      await basePage.clickSalary();
      await debtPage.clickDebtButton();
      await basePage.clickAdd();
      await basePage.clickSave();
    });
    await debtPage.expectFillNameError();
    await debtPage.expectFillNoteError();
  });

  test("Add debt with valid value ", async ({ page }) => {
    allure.story('Add Debt Successfully');
    await allure.step('Admin logs in and adds a valid debt record', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
      await basePage.clickSalary();
      await debtPage.clickDebtButton();
      await basePage.clickAdd();
      await debtPage.fillName("BAT810-Nguyễn Văn Minh");
      await debtPage.fillAmount("10000000");
      await debtPage.fillNote("add debt test ");
      await basePage.clickSave();
    });
    await toastPage.getToastAddSuccess();
  });

  test("Add debt with value already exists ", async ({ page }) => {
    allure.story('Duplicate Debt Entry');
    await allure.step('Admin tries to add duplicate debt', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
      await basePage.clickSalary();
      await debtPage.clickDebtButton();
      await basePage.clickAdd();
      await debtPage.fillName("BAT810-Nguyễn Văn Minh");
      await debtPage.fillAmount("10000000");
      await debtPage.fillNote("value already exists test");
      await basePage.clickSave();
    });
    await toastPage.getToastAddSuccess();
  });

  test("Edit money ", async ({ page }) => {
    allure.story('Edit Debt Record');
    await allure.step('Admin edits existing debt', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
      await basePage.clickSalary();
      await debtPage.clickDebtButton();
      await basePage.clickIconAction();
      await basePage.clickEdit();
      await debtPage.fillAmount("20000000");
      await basePage.clickSave();
    });
    await toastPage.getToastUpdateSuccess();
  });

  test("Edit note", async ({ page }) => {
    allure.story('Successful Debt Edit');
    await allure.step('Admin edits debt with valid new values', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
      await basePage.clickSalary();
      await debtPage.clickDebtButton();
      await basePage.clickIconAction();
      await basePage.clickEdit();
      await debtPage.fillNote("edit valid value");
      await basePage.clickSave();
    });
    await toastPage.getToastUpdateSuccess();
  });

  test("Send debt and browse", async ({ page }) => {
    allure.story('Send and Approve Debt');
    await allure.step('Admin sends debt, Employee approves', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
      await basePage.clickSalary();
      await debtPage.clickDebtButton();
      await basePage.clickAdd();
      await debtPage.fillName("BAT810-Nguyễn Văn Minh");
      await debtPage.fillAmount("10000000");
      await debtPage.fillNote("add debt test for send");
      await basePage.clickSave();
      await toastPage.getToastAddSuccess();
      await debtPage.clickIconAction();
      await debtPage.clickSend();
      await toastPage.getToastSendSuccess();

      await logoutPage.logout();
      await loginPage.login(Config.employee_username, Config.employee_password);
      await basePage.clickSalary();
      await debtPage.clickDebtButton();
      await debtPage.clickIconAction();
      await debtPage.clickBrowse();
    });
    await toastPage.getToastBrowseSuccess();
  });

  test("Send debt and refused in employee account", async ({ page }) => {
    allure.story('Send and Refuse Debt');
    await allure.step('Admin sends debt, Employee refuses', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
      await basePage.clickSalary();
      await debtPage.clickDebtButton();
      await basePage.clickAdd();
      await debtPage.fillName("BAT810-Nguyễn Văn Minh");
      await debtPage.fillAmount("1000000");
      await debtPage.fillNote("add debt test for send");
      await basePage.clickSave();
      await toastPage.getToastAddSuccess();
      await debtPage.clickIconAction();
      await debtPage.clickSend();
      await toastPage.getToastSendSuccess();

      await logoutPage.logout();
      await loginPage.login(Config.employee_username, Config.employee_password);
      await basePage.clickSalary();
      await debtPage.clickDebtButton();
      await debtPage.clickIconAction();
      await debtPage.clickReject();
      await debtPage.fillReason("refused debt test");
    });
    await toastPage.getToastRejectSuccess();
  });

  test("Send debt and cancel", async ({ page }) => {
    allure.story('Send and Cancel Debt');
    await allure.step('Admin sends debt then cancels', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
      await basePage.clickSalary();
      await debtPage.clickDebtButton();
      await basePage.clickAdd();
      await debtPage.fillName("BAT810-Nguyễn Văn Minh");
      await debtPage.fillAmount("1000000");
      await debtPage.fillNote("add debt test for send");
      await basePage.clickSave();
      await toastPage.getToastAddSuccess();
      await debtPage.clickIconAction();
      await debtPage.clickSend();
      await toastPage.getToastSendSuccess();
      await debtPage.clickIconAction();
      await debtPage.clickCancelNth1();
      await debtPage.fillReason("cancel debt test");
    });
    await toastPage.getToastCancelSuccess();
  });

  test("Cancel debt with new status", async ({ page }) => {
    allure.story('Cancel New Debt');
    await allure.step('Admin cancels newly added debt', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
      await basePage.clickSalary();
      await debtPage.clickDebtButton();
      await basePage.clickAdd();
      await debtPage.fillName("BAT810-Nguyễn Văn Minh");
      await debtPage.fillAmount("1000000");
      await debtPage.fillNote("add debt test for cancel");
      await basePage.clickSave();
      await toastPage.getToastAddSuccess();
      await basePage.clickIconAction();
      await basePage.clickCancel();
      await debtPage.fillReason("cancel debt test");
    });
    await toastPage.getToastCancelSuccess();
  });

  test("Cancel debt with empty reason", async ({ page }) => {
    allure.story('Cancel Debt Validation');
    await allure.step('Admin attempts to cancel debt without reason', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
      await basePage.clickSalary();
      await debtPage.clickDebtButton();
      await basePage.clickAdd();
      await debtPage.fillName("BAT810-Nguyễn Văn Minh");
      await debtPage.fillAmount("1000000");
      await debtPage.fillNote("add debt test for cancel");
      await basePage.clickSave();
      await toastPage.getToastAddSuccess();
      await basePage.clickIconAction();
      await basePage.clickCancel();
      await debtPage.fillReason("");
    });
    await debtPage.expectFillReasonError();
  });
});