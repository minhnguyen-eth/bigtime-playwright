import { test, expect, Page, TestInfo } from '@playwright/test';
import { clearResignation } from '../db/DBHelper';
import { LoginPage } from '../pages/LoginPage';
import { takeScreenshotOnFailure } from '../utils/screenshotUtils';
import Config from '../utils/configUtils';
import { RegisnationPage } from '../pages/RegisnationPage';
import { ToastPage } from '../pages/ToastPage';
import { allure } from 'allure-playwright';
import { BasePage } from '../pages/BasePage';
import { LogoutPage } from '../pages/LogoutPage';


test.describe.serial('Resignation Tests', () => {
  let loginPage: LoginPage;
  let regisnationPage: RegisnationPage;
  let toastPage: ToastPage;
  let basePage: BasePage;
  let logoutPage: LogoutPage;

  const randomSuffix = Math.random().toString(36).substring(2, 8);

  test.beforeEach(async ({ page }) => {
    allure.feature('Resignation Feature');
    allure.owner('Minh Nguyen');
    allure.severity('Critical');

    loginPage = new LoginPage(page);
    basePage = new BasePage(page);
    loginPage = new LoginPage(page);
    regisnationPage = new RegisnationPage(page);
    toastPage = new ToastPage(page);
    logoutPage = new LogoutPage(page);

    await loginPage.goto();
  });

  test.afterEach(async ({ page }, testInfo: TestInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });

  async function addResignation() {
    await loginPage.login(Config.employee_username, Config.employee_password);
    await basePage.clickAdmin();
    await regisnationPage.clickRegisnationButton();
    await regisnationPage.clickAddButton();
    await regisnationPage.fillReason('Automation test');
    await regisnationPage.clickSaveButton();
    await toastPage.getToastAddSuccess();
  }

  test('Add new resignation and send', async ({ page }) => {
    await clearResignation();
    allure.story('Add new resignation Story');

    await allure.step('Employee logs in and creates resignation', async () => {
      await addResignation();

    });

    await allure.step('Employee sends resignation', async () => {
      await regisnationPage.clickRow0();
      await regisnationPage.clickSendButton();
      await regisnationPage.clickOkButton();
      await toastPage.getToastSendSuccess();
    });
  });

  test('Edit resignation reason', async ({ page }) => {
    allure.story('Edit Resignation Story');
    await allure.step('Employee edits resignation reason with valid data', async () => {
      await addResignation();
      await regisnationPage.clickRow0();
      await basePage.clickEdit();
      await regisnationPage.fillReason('Automation test edit');
      await regisnationPage.clickSaveButton();
      await toastPage.getToastUpdateSuccess();
    });
  });

  test('Edit resignation reason with blank reason', async ({ page }) => {
    allure.story('Edit resignation reason with blank reason Story');
    await allure.step('Edit with blank reason', async () => {
      await loginPage.login(Config.employee_username, Config.employee_password);
      await basePage.clickAdmin();
      await regisnationPage.clickRegisnationButton();
      await regisnationPage.clickRow0();
      await basePage.clickEdit();
      await regisnationPage.clearReason();
      await regisnationPage.clickSaveButton();
      await basePage.verifyRequiredFillReason();
    });
  });

  test('E2E - Complete resignation reject process', async ({ page }) => {
    allure.story('Full Resignation Reject Story');

    await allure.step('Employee logs in and creates resignation request', async () => {
      await addResignation();
      await regisnationPage.clickRow0();
    });

    await allure.step('Employee sends resignation request', async () => {
      await regisnationPage.clickSendButton();
      await regisnationPage.clickOkButton();
      await toastPage.getToastSendSuccess();
    });

    await allure.step('Employee browses own request', async () => {
      await regisnationPage.clickRow0();
      await regisnationPage.clickBrowseButton();
      await regisnationPage.clickOkButton();
      await toastPage.getToastBrowseSuccess();
      await logoutPage.logout();

    });

    await allure.step('Manager approves resignation request', async () => {
      await loginPage.goto();
      await loginPage.login(Config.manager_username, Config.manager_password);
      await basePage.clickAdmin();
      await regisnationPage.clickRegisnationButton();
      await regisnationPage.clickRow0();
      await regisnationPage.clickBrowseButton();
      await regisnationPage.clickOkButton();
      await toastPage.getToastBrowseSuccess();
      await logoutPage.logout();
    });

    await allure.step('Admin rejects resignation request', async () => {
      await loginPage.goto();
      await loginPage.login(Config.admin_username, Config.admin_password);
      await basePage.clickAdmin();
      await regisnationPage.clickRegisnationButton();
      await regisnationPage.clickRow0();
      await basePage.clickReject();
      await basePage.fillReason('Automation test reject');
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
      await regisnationPage.clickSendButton();
      await regisnationPage.clickOkButton();
      await toastPage.getToastSendSuccess();
    });

    await allure.step('Employee browses own request', async () => {
      await regisnationPage.clickRow0();
      await regisnationPage.clickBrowseButton();
      await regisnationPage.clickOkButton();
      await toastPage.getToastBrowseSuccess();
      await logoutPage.logout();

    });

    await allure.step('Manager approves resignation request', async () => {
      await loginPage.goto();
      await loginPage.login(Config.manager_username, Config.manager_password);
      await basePage.clickAdmin();
      await regisnationPage.clickRegisnationButton();
      await regisnationPage.clickRow0();
      await regisnationPage.clickBrowseButton();
      await regisnationPage.clickOkButton();
      await toastPage.getToastBrowseSuccess();
      await logoutPage.logout();
    });

    await allure.step('Admin approves resignation request', async () => {
      await loginPage.goto();
      await loginPage.login(Config.admin_username, Config.admin_password);
      await basePage.clickAdmin();
      await regisnationPage.clickRegisnationButton();
      await regisnationPage.clickRow0();
      await regisnationPage.clickBrowseButton();
      await regisnationPage.clickOkButton();
      await toastPage.getToastBrowseSuccess();
    });
  });

  test('Cancel resignation', async ({ page }) => {
    allure.story('Cancel Resignation Story');
    await allure.step('Employee cancels resignation request', async () => {
      await loginPage.login(Config.admin_username, Config.admin_password);
      await basePage.clickAdmin();
      await regisnationPage.clickRegisnationButton();
      await regisnationPage.clickRow0();
      await basePage.clickCancel();
      await basePage.fillReason('Automation test cancel');
      await toastPage.getToastCancelSuccess();
    });
  });

  test('Search resignation requests', async ({ page }) => {
    allure.story('Search Resignation Story');

    await loginPage.login(Config.admin_username, Config.admin_password);
    await basePage.clickAdmin();
    await regisnationPage.clickRegisnationButton();

    await allure.step('Search by employee name', async () => {
      await regisnationPage.searchEmployeeName('Nguyễn Văn Minh');
      await regisnationPage.clickSearchButton();
      await regisnationPage.getVerifyEmployeeNameSearch();
      await regisnationPage.clickClearSearchButton();
    });

    await allure.step('Search by notification of leave date', async () => {
      await regisnationPage.clickNotificaOfLeave();
      await regisnationPage.clickMonthButton();
      await regisnationPage.clickMonth06Button();
      await regisnationPage.clickDay16();
      await regisnationPage.clickChosseButton();
      await regisnationPage.clickSearchButton();
      await regisnationPage.getVerifyNotificationOfLeave();
      await regisnationPage.clickClearSearchButton();
    });

    await allure.step('Search by browsed status', async () => {
      await regisnationPage.clickStatusDropDown();
      await regisnationPage.clickBrowsedStatusOption();
      await regisnationPage.clickSearchButton();
      await regisnationPage.getVerifyBrowseStatusOption();
      await regisnationPage.clickClearSearchButton();
    });

    await allure.step('Search by submitted status', async () => {
      await regisnationPage.clickStatusDropDown();
      await regisnationPage.clickSubmittedButton();
      await regisnationPage.clickSearchButton();
      await regisnationPage.getVerifySubmittedButton();
      await regisnationPage.clickClearSearchButton();
    });

    await allure.step('Search by rejected status', async () => {
      await regisnationPage.clickStatusDropDown();
      await regisnationPage.clickRejectStatusOption();
      await regisnationPage.clickSearchButton();
      await regisnationPage.getVerifyRejectStatusOption();
      await regisnationPage.clickClearSearchButton();
    });

    await allure.step('Search by canceled status', async () => {
      await regisnationPage.clickStatusDropDown();
      await regisnationPage.clickCancelStatusOption();
      await regisnationPage.clickSearchButton();
      await regisnationPage.getVerifyCancelStatusOption();
      await regisnationPage.clickClearSearchButton();
    });
  });

  test('Export resignation requests to Excel', async ({ page }) => {
    allure.story('Export Resignation to Excel Story');

    await loginPage.login(Config.admin_username, Config.admin_password);
    await basePage.clickAdmin();
    await regisnationPage.clickRegisnationButton();

    await allure.step('Export resignation requests by date range', async () => {
      await regisnationPage.clickExportButton();
      await regisnationPage.clickStartDate();
      await basePage.clickTodayDatePicker();
      await regisnationPage.clickEndDate();
      await basePage.clickTodayDatePicker();
      await regisnationPage.clickOkButton();
      await toastPage.getToastExportSuccess();
    });
  });

  test('Export resignation with no data', async ({ page }) => {
    await clearResignation();
    allure.story('Export resignation with no data Story');

    await loginPage.login(Config.admin_username, Config.admin_password);
    await basePage.clickAdmin();
    await regisnationPage.clickRegisnationButton();

    await allure.step('Choose day with no data to export', async () => {
      await regisnationPage.clickExportButton();
      await regisnationPage.clickStartDate();
      await regisnationPage.clickDay09();
      await regisnationPage.clickChosseButton();
      await regisnationPage.clickEndDate();
      await regisnationPage.clickDay09();
      await regisnationPage.clickChosseButton();
      await regisnationPage.clickOkButton();
      await toastPage.getToastExportHaveNoData();
    });
  });
});
