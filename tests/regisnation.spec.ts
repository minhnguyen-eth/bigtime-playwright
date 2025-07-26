import { test, } from './base-test';
import { clearResignation } from '../db/helpers/DBHelper';
import { LoginPage } from '../pages/LoginPage';
import Config from '../utils/configUtils';
import { RegisnationPage } from '../pages/RegisnationPage';
import { ToastPage } from '../pages/ToastPage';
import { allure } from 'allure-playwright';
import { ValidationPage } from '../pages/ValidationPage';
import { LogoutPage } from '../pages/LogoutPage';

test.describe.serial('Resignation Tests', () => {
  let loginPage: LoginPage;
  let regisnationPage: RegisnationPage;
  let toastPage: ToastPage;
  let validation: ValidationPage;
  let logoutPage: LogoutPage;

  const randomSuffix = Math.random().toString(36).substring(2, 8);

  test.beforeEach(async ({ page }) => {
    allure.feature('Resignation Feature');
    allure.owner('Minh Nguyen');
    allure.severity('Critical');

    loginPage = new LoginPage(page);
    validation = new ValidationPage(page);
    loginPage = new LoginPage(page);
    regisnationPage = new RegisnationPage(page);
    toastPage = new ToastPage(page);
    logoutPage = new LogoutPage(page);

    await loginPage.goto();
  });

  async function addResignation() {
    await loginPage.login(Config.employee_username, Config.employee_password);
    await regisnationPage.clickAdmin();
    await regisnationPage.clickRegisnationButton();
    await regisnationPage.clickAdd();
    await regisnationPage.fillReason('Automation test');
    await regisnationPage.clickSave();
    await toastPage.getToastAddSuccess();
  }

  async function beforTestMaxLength() {
    await loginPage.login(Config.employee_username, Config.employee_password);
    await regisnationPage.clickAdmin();
    await regisnationPage.clickRegisnationButton();
    await regisnationPage.clickAdd();
  }

  test("Max length of reason ", async ({ page }) => {
    await clearResignation();
    await beforTestMaxLength();
    await regisnationPage.fillReason("z".repeat(255));
    await regisnationPage.clickSave();
    await toastPage.getToastAddSuccess();
  });

  test("Max length of reason over 255 characters", async ({ page }) => {
    await beforTestMaxLength();
    await regisnationPage.fillReason("z".repeat(256));
    await regisnationPage.clickSave();
    await validation.validateMaxLength255Characters();
  });

  test('Add new resignation and send', async ({ page }) => {
    await clearResignation();
    allure.story('Add new resignation Story');

    await allure.step('Employee logs in and creates resignation', async () => {
      await addResignation();

    });

    await allure.step('Employee sends resignation', async () => {
      await regisnationPage.clickRow0();
      await regisnationPage.clickSendAndClickYes();
      await toastPage.getToastSendSuccess();
    });
  });

  test('Edit resignation reason', async ({ page }) => {
    allure.story('Edit Resignation Story');
    await allure.step('Employee edits resignation reason with valid data', async () => {
      await addResignation();
      await regisnationPage.clickRow0();
      await regisnationPage.clickEdit();
      await regisnationPage.fillReason('Automation test edit');
      await regisnationPage.clickSave();
      await toastPage.getToastUpdateSuccess();
    });
  });

  test('Edit resignation reason with blank reason', async ({ page }) => {
    allure.story('Edit resignation reason with blank reason Story');
    await allure.step('Edit with blank reason', async () => {
      await loginPage.login(Config.employee_username, Config.employee_password);
      await regisnationPage.clickAdmin();
      await regisnationPage.clickRegisnationButton();
      await regisnationPage.clickRow0();
      await regisnationPage.clickEdit();
      await regisnationPage.fillReason('');
      await regisnationPage.clickSave();
      await validation.validateRequiredFillReason();
    });
  });

  test('E2E - Complete resignation reject process', async ({ page }) => {
    allure.story('Full Resignation Reject Story');

    await allure.step('Employee logs in and creates resignation request', async () => {
      await addResignation();
      await regisnationPage.clickRow0();
    });

    await allure.step('Employee sends resignation request', async () => {
      await regisnationPage.clickSendAndClickYes();
      await toastPage.getToastSendSuccess();
      await logoutPage.logout();
    });

    // await allure.step('Employee browses own request', async () => {
    //   await regisnationPage.clickRow0();
    //   await regisnationPage.clickBrowse();
    //   await toastPage.getToastBrowseSuccess();
    //   await logoutPage.logout();

    // });

    // await allure.step('Manager approves resignation request', async () => {
    //   await loginPage.goto();
    //   await loginPage.login(Config.manager_username, Config.manager_password);
    //   await regisnationPage.clickAdmin();
    //   await regisnationPage.clickRegisnationButton();
    //   await regisnationPage.clickRow0();
    //   await regisnationPage.clickBrowse();
    //   await toastPage.getToastBrowseSuccess();
    //   await logoutPage.logout();
    // });

    await allure.step('Admin rejects resignation request', async () => {
      await loginPage.goto();
      await loginPage.login(Config.admin_username, Config.admin_password);
      await regisnationPage.clickAdmin();
      await regisnationPage.clickRegisnationButton();
      await regisnationPage.clickRow0();
      await regisnationPage.clickReject();
      await regisnationPage.fillReasonAndClickYes('Automation test reject');
      await toastPage.getToastRejectSuccess();
    });
  });

  test('E2E - Complete resignation approval process', async ({ page }) => {
    allure.story('Full Resignation Process Story');

    await allure.step('Employee logs in and creates resignation request', async () => {
      await addResignation();
      await regisnationPage.clickRow0();
    });

    await allure.step('Employee sends resignation request', async () => {
      await regisnationPage.clickSendAndClickYes();
      await toastPage.getToastSendSuccess();
       await logoutPage.logout();
    });

    // await allure.step('Employee browses own request', async () => {
    //   await regisnationPage.clickRow0();
    //   await regisnationPage.clickBrowse();
    //   await toastPage.getToastBrowseSuccess();
    //   await logoutPage.logout();

    // });

    // await allure.step('Manager approves resignation request', async () => {
    //   await loginPage.goto();
    //   await loginPage.login(Config.manager_username, Config.manager_password);
    //   await regisnationPage.clickAdmin();
    //   await regisnationPage.clickRegisnationButton();
    //   await regisnationPage.clickRow0();
    //   await regisnationPage.clickBrowse();
    //   await toastPage.getToastBrowseSuccess();
    //   await logoutPage.logout();
    // });

    await allure.step('Admin approves resignation request', async () => {
      await loginPage.goto();
      await loginPage.login(Config.admin_username, Config.admin_password);
      await regisnationPage.clickAdmin();
      await regisnationPage.clickRegisnationButton();
      await regisnationPage.clickRow0();
      await regisnationPage.clickBrowse();
      await toastPage.getToastBrowseSuccess();
    });
  });

  test('Cancel resignation', async ({ page }) => {
    allure.story('Cancel Resignation Story');
    await allure.step('Employee cancels resignation request', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
      await regisnationPage.clickAdmin();
      await regisnationPage.clickRegisnationButton();
      await regisnationPage.clickRow0();
      await regisnationPage.clickCancel();
      await regisnationPage.fillReasonAndClickYes('Automation test cancel');
      await toastPage.getToastCancelSuccess();
    });
  });

  test('Search resignation requests', async ({ page }) => {
    allure.story('Search Resignation Story');

    await loginPage.login(Config.admin_username, Config.admin_password);
    await regisnationPage.clickAdmin();
    await regisnationPage.clickRegisnationButton();

    await allure.step('Search by employee name', async () => {
      await regisnationPage.searchEmployeeName('Nguyễn Văn Minh');
      await regisnationPage.clickSearch();
      await regisnationPage.getVerifyEmployeeNameSearch();
      await regisnationPage.clickClearSearch();
    });

    await allure.step('Search by notification of leave date', async () => {
      await regisnationPage.clickNotificaOfLeave();
      await regisnationPage.clickMonthButton();
      await regisnationPage.clickMonth06Button();
      await regisnationPage.clickDay16();
      await regisnationPage.clickChoose();
      await regisnationPage.clickSearch();
      await regisnationPage.getVerifyNotificationOfLeave();
      await regisnationPage.clickClearSearch();
    });

    await allure.step('Search by browsed status', async () => {
      await regisnationPage.clickDropdownStatusSearch();
      await regisnationPage.clickBrowsedStatusOption();
      await regisnationPage.clickSearch();
      await regisnationPage.getVerifyBrowseStatusOption();
      await regisnationPage.clickClearSearch();
    });

    await allure.step('Search by submitted status', async () => {
      await regisnationPage.clickDropdownStatusSearch();
      await regisnationPage.clickSubmittedButton();
      await regisnationPage.clickSearch();
      await regisnationPage.getVerifySubmittedButton();
      await regisnationPage.clickClearSearch();
    });

    await allure.step('Search by rejected status', async () => {
      await regisnationPage.clickDropdownStatusSearch();
      await regisnationPage.clickRejectStatusOption();
      await regisnationPage.clickSearch();
      await regisnationPage.getVerifyRejectStatusOption();
      await regisnationPage.clickClearSearch();
    });

    await allure.step('Search by canceled status', async () => {
      await regisnationPage.clickDropdownStatusSearch();
      await regisnationPage.clickCancelStatusOption();
      await regisnationPage.clickSearch();
      await regisnationPage.getVerifyCancelStatusOption();
      await regisnationPage.clickClearSearch();
    });
  });

  test('Export resignation requests to Excel', async ({ page }) => {
    allure.story('Export Resignation to Excel Story');

    await loginPage.login(Config.admin_username, Config.admin_password);
    await regisnationPage.clickAdmin();
    await regisnationPage.clickRegisnationButton();

    await allure.step('Export resignation requests by date range', async () => {
      await regisnationPage.clickExportButton();
      await regisnationPage.clickStartDate();
      await regisnationPage.clicktodayDatePicker();
      await regisnationPage.clickEndDate();
      await regisnationPage.clicktodayDatePicker();
      await regisnationPage.clickYes();
      await toastPage.getToastExportSuccess();
    });
  });

  test('Export resignation with no data', async ({ page }) => {
    await clearResignation();
    allure.story('Export resignation with no data Story');

    await loginPage.login(Config.admin_username, Config.admin_password);
    await regisnationPage.clickAdmin();
    await regisnationPage.clickRegisnationButton();

    await allure.step('Choose day with no data to export', async () => {
      await regisnationPage.clickExportButton();
      await regisnationPage.clickStartDate();
      await regisnationPage.clickDay09();
      await regisnationPage.clickChoose();
      await regisnationPage.clickEndDate();
      await regisnationPage.clickDay09();
      await regisnationPage.clickChoose();
      await regisnationPage.clickYes();
      await toastPage.getToastExportHaveNoData();
    });
  });
});
