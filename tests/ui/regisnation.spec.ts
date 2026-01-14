import { test, } from './base-test';
import { clearResignation } from '../../db/helpers/DBHelper';
import { LoginPage } from '../../pages/LoginPage';
import Config from '../../utils/configUtils';
import { RegisnationPage } from '../../pages/RegisnationPage';
import { allure } from 'allure-playwright';
import { LogoutPage } from '../../pages/LogoutPage';
import { ToastMessages, ValidationMessages } from '../../constants/MessagesCommon';

test.describe.serial('Resignation Tests', () => {
  let loginPage: LoginPage;
  let regisnationPage: RegisnationPage;
  let logoutPage: LogoutPage;

  test.beforeEach(async ({ page }) => {
    allure.feature('Resignation Feature');
    allure.owner('Minh Nguyen');
    allure.severity('Critical');

    loginPage = new LoginPage(page);
    loginPage = new LoginPage(page);
    regisnationPage = new RegisnationPage(page);
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
    await regisnationPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
  }

  async function beforTestMaxLength() {
    await loginPage.login(Config.employee_username, Config.employee_password);
    await regisnationPage.clickAdmin();
    await regisnationPage.clickRegisnationButton();
    await regisnationPage.clickAdd();
  }

  test("Add with Max length 255 characters of reason ", async ({ page }) => {
    await clearResignation();
    await beforTestMaxLength();
    await regisnationPage.fillReason("z".repeat(255));
    await regisnationPage.clickSave();
    await regisnationPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
  });

  test("Add with Max length of reason over 255 characters", async ({ page }) => {
    await beforTestMaxLength();
    await regisnationPage.fillReason("z".repeat(256));
    await regisnationPage.clickSave();
    await regisnationPage.verifyRequiredField(ValidationMessages.MAX_LENGTH_255);
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
      await regisnationPage.verifyToastMessage(ToastMessages.TOAST_SEND_SUCCESS);
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
      await regisnationPage.verifyToastMessage(ToastMessages.TOAST_UPDATE_SUCCESS);
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
      await regisnationPage.verifyRequiredField(ValidationMessages.REQUIRED_FILL_REASON);
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
      await regisnationPage.verifyToastMessage(ToastMessages.TOAST_SEND_SUCCESS);
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
      await regisnationPage.verifyToastMessage(ToastMessages.TOAST_REJECT_SUCCESS);
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
      await regisnationPage.verifyToastMessage(ToastMessages.TOAST_SEND_SUCCESS);
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
      await regisnationPage.verifyToastMessage(ToastMessages.TOAST_BROWSE_SUCCESS);
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
      await regisnationPage.verifyToastMessage(ToastMessages.TOAST_CANCEL_SUCCESS);
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
      await regisnationPage.clickChosseMonthPicker(6);
      await regisnationPage.clickDay16();
      await regisnationPage.clickChoose();
      await regisnationPage.clickSearch();
      await regisnationPage.verifyNotificationOfLeave('16-06-2026');
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
      await regisnationPage.clickTodayDatePicker();
      await regisnationPage.clickEndDate();
      await regisnationPage.clickTodayDatePicker();
      await regisnationPage.clickYes();
      await regisnationPage.verifyToastMessage(ToastMessages.TOAST_EXPORT_SUCCESS);
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
      await regisnationPage.verifyToastMessage(ToastMessages.TOAST_EXPORT_HAVE_NO_DATA);
    });
  });
});
