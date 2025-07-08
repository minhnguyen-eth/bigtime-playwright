import { test, TestInfo } from '@playwright/test';
import { takeScreenshotOnFailure } from '../../utils/screenshotUtils';
import { LoginPage } from '../../pages/LoginPage';
import Config from '../../utils/configUtils';
import { ToastPage } from '../../pages/ToastPage';
import { allure } from 'allure-playwright';
import { NotificationPage } from '../../pages/notification_page/NotificationPage';
import { clearAllNotifications } from '../../utils/mysqlUtils';
import { BasePage } from '../../pages/BasePage';
import { LogoutPage } from '../../pages/LogoutPage';

test.describe.serial('Notification Test Suite', () => {
    let loginPage: LoginPage;
    let notificationPage: NotificationPage;
    let toast: ToastPage;
    let basePage: BasePage;
    let logoutPage: LogoutPage;

    test.beforeEach(async ({ page }) => {
        allure.feature('Notification Feature');
        allure.owner('Minh Nguyen');
        allure.severity('High');

        logoutPage = new LogoutPage(page);
        basePage = new BasePage(page);
        toast = new ToastPage(page);
        loginPage = new LoginPage(page);
        notificationPage = new NotificationPage(page);
        await loginPage.goto();
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('Add new notification with event notification type', async ({ page }) => {
        allure.story('Add Event Notification');
        await allure.step('Clear all notifications and add new event notification', async () => {
            await clearAllNotifications();
            await loginPage.login(Config.admin_username, Config.admin_password);
            await basePage.clickAdmin();
            await notificationPage.clickOnNotification();
            await notificationPage.clickOnAddButton();
            await notificationPage.fillNotificationName('Thông báo');
            await notificationPage.fillDescription('Automation test');
            await notificationPage.clickOnSaveButton();
        });
        await toast.getToastAddSuccess();
    });

    test('Add new notification with existing name', async ({ page }) => {
        allure.story('Validation for Duplicate Notification');
        await allure.step('Try to add notification with existing name', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await basePage.clickAdmin();
            await notificationPage.clickOnNotification();
            await notificationPage.clickOnAddButton();
            await notificationPage.fillNotificationName('Thông báo');
            await notificationPage.fillDescription('Automation test');
            await notificationPage.clickOnSaveButton();
        });
        await notificationPage.getExistedName();
    });

    test('Add new notification with empty name and description', async ({ page }) => {
        allure.story('Validation for Required Fields');
        await allure.step('Try to add notification with empty fields', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await basePage.clickAdmin();
            await notificationPage.clickOnNotification();
            await notificationPage.clickOnAddButton();
            await notificationPage.clickOnSaveButton();
        });
        await notificationPage.getRequiredName();
        await notificationPage.getRequiredDescription();
    });

    test('Add new notification with holiday notification type', async ({ page }) => {
        allure.story('Add Holiday Notification');
        await allure.step('Add new holiday notification', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await basePage.clickAdmin();
            await notificationPage.clickOnNotification();
            await notificationPage.clickOnAddButton();
            await notificationPage.clickOnNotificationFormDropdown();
            await notificationPage.clickOnHoliday();
            await notificationPage.fillNotificationName('Thông báo');
            await notificationPage.fillDescription('Automation test');
            await notificationPage.clickOnSaveButton();
        });
        await toast.getToastAddSuccess();
    });

    test('Add new notification with work schedule notification type', async ({ page }) => {
        allure.story('Add Work Schedule Notification');
        await allure.step('Add new work schedule notification', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await basePage.clickAdmin();
            await notificationPage.clickOnNotification();
            await notificationPage.clickOnAddButton();
            await notificationPage.clickOnNotificationFormDropdown();
            await notificationPage.clickOnWorkSchedule();
            await notificationPage.fillNotificationName('Thông báo');
            await notificationPage.fillDescription('Automation test');
            await notificationPage.clickOnSaveButton();
        });
        await toast.getToastAddSuccess();
    });

    test('Add new notification with urgent notification type', async ({ page }) => {
        allure.story('Add Urgent Notification');
        await allure.step('Add new urgent notification', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await basePage.clickAdmin();
            await notificationPage.clickOnNotification();
            await notificationPage.clickOnAddButton();
            await notificationPage.clickOnNotificationFormDropdown();
            await notificationPage.clickOnUrgent();
            await notificationPage.fillNotificationName('Thông báo');
            await notificationPage.fillDescription('Automation test');
            await notificationPage.clickOnSaveButton();
        });
        await toast.getToastAddSuccess();
    });

    test('Send notification to company', async ({ page }) => {
        allure.story('Send Notification to Company');
        await allure.step('Send notification to entire company', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await basePage.clickAdmin();
            await notificationPage.clickOnNotification();
            await notificationPage.clickOnIconAction();
            await notificationPage.clickOnSendNotification();
            await notificationPage.clickOnSaveButton();
        });
        await toast.getToastSendNotificationSuccess();
    });

    test('Send notification to department', async ({ page }) => {
        allure.story('Send Notification to Department');
        await allure.step('Send notification to a department', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await basePage.clickAdmin();
            await notificationPage.clickOnNotification();
            await notificationPage.clickOnIconAction();
            await notificationPage.clickOnSendNotification();
            await notificationPage.clickOnDepartment();
            await notificationPage.clickOnDepartmentOption();
            await notificationPage.clickOnSaveButton();
        });
        await toast.getToastSendNotificationSuccess();
    });

    test('Send notification to personal', async ({ page }) => {
        allure.story('Send Notification to Personal');
        await allure.step('Send notification to a specific employee', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await basePage.clickAdmin();
            await notificationPage.clickOnNotification();
            await notificationPage.clickOnIconAction();
            await notificationPage.clickOnSendNotification();
            await notificationPage.clickOnPersonnal();
            await notificationPage.fillPersonnalSearch('Minh');
            await notificationPage.clickOnPersonnalSelect();
            await notificationPage.clickOnSaveButton();
        });
        await toast.getToastSendNotificationSuccess();
        await logoutPage.logout();

        // Verify notification is sent to the employee
        await allure.step('Verify notification is sent to the employee', async () => {
            await loginPage.goto();
            await loginPage.login(Config.employee_username, Config.employee_password);
            await basePage.clickAdmin();
            await notificationPage.clickOnListNotification();
            await notificationPage.getVerifyNotificationCompany();
            await notificationPage.getVerifyNotificationDepartment();
            await notificationPage.getVerifyNotificationPersonnal();
           
        });
    });

    test('Delete notification', async ({ page }) => {
        allure.story('Delete Notification');
        await allure.step('Delete notification', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await basePage.clickAdmin();
            await notificationPage.clickOnListNotification();
            await notificationPage.clickOnDeleteButton();
            await notificationPage.clickOnYesButton();
        });
        await toast.getToastDeleteSuccess();
    });
});
