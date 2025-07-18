import { test, } from '../base-test';
import { LoginPage } from '../../pages/LoginPage';
import Config from '../../utils/configUtils';
import { ToastPage } from '../../pages/ToastPage';
import { allure } from 'allure-playwright';
import { NotificationPage } from '../../pages/notification_page/NotificationPage';

import { LogoutPage } from '../../pages/LogoutPage';
import { ValidationPage } from '../../pages/ValidationPage';
import { clearNotifications } from '../../db/helpers/DBHelper';

test.describe.serial('Notification Test Suite', () => {
    let loginPage: LoginPage;
    let notificationPage: NotificationPage;
    let toast: ToastPage;
    let validation: ValidationPage;
    let logoutPage: LogoutPage;

    test.beforeEach(async ({ page }) => {
        allure.feature('Notification Feature');
        allure.owner('Minh Nguyen');
        allure.severity('High');

        logoutPage = new LogoutPage(page);
        validation = new ValidationPage(page);
        toast = new ToastPage(page);
        loginPage = new LoginPage(page);
        notificationPage = new NotificationPage(page);
        await loginPage.goto();
    });

    test("Max length of notification name is 255 characters", async ({ page }) => {
        allure.story('Max Length of Notification Name');
        await allure.step('Add notification with name length 255 characters', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await notificationPage.clickAdmin();
            await notificationPage.clickOnNotification();
            await notificationPage.clickAdd();
            await notificationPage.fillNotificationName('a'.repeat(255));
            await notificationPage.fillDescription('Automation test');
            await notificationPage.clickSave();
        });
        await toast.getToastAddSuccess();
    });

    test("Max length of notification name is 256 characters", async ({ page }) => {
        allure.story('Max Length of Notification Name');
        await allure.step('Add notification with name length 256 characters', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await notificationPage.clickAdmin();
            await notificationPage.clickOnNotification();
            await notificationPage.clickAdd();
            await notificationPage.fillNotificationName('a'.repeat(256));
            await notificationPage.fillDescription('Automation test');
            await notificationPage.clickSave();
        });
        await validation.validateMaxLength255Characters();
    });

    test("Max length of notification description is 500 characters", async ({ page }) => {
        allure.story('Max Length of Notification Description');
        await allure.step('Add notification with description length 500 characters', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await notificationPage.clickAdmin();
            await notificationPage.clickOnNotification();
            await notificationPage.clickAdd();
            await notificationPage.fillNotificationName('Automation test max length description');
            await notificationPage.fillDescription('a'.repeat(500));
            await notificationPage.clickSave();
        });
        await toast.getToastAddSuccess();
    });

    test("Max length of notification description is 501 characters", async ({ page }) => {
        allure.story('Max Length of Notification Description');
        await allure.step('Add notification with description length 501 characters', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await notificationPage.clickAdmin();
            await notificationPage.clickOnNotification();
            await notificationPage.clickAdd();
            await notificationPage.fillNotificationName('Automation test max length description');
            await notificationPage.fillDescription('a'.repeat(501));
            await notificationPage.clickSave();
        });
        await validation.validateMaxLength500Characters();
    });

    test('Add new notification with event notification type', async ({ page }) => {
        allure.story('Add Event Notification');
        await allure.step('Clear all notifications and add new event notification', async () => {
            await clearNotifications();
            await loginPage.login(Config.admin_username, Config.admin_password);
            await notificationPage.clickAdmin();
            await notificationPage.clickOnNotification();
            await notificationPage.clickAdd();
            await notificationPage.fillNotificationName('Thông báo');
            await notificationPage.fillDescription('Automation test');
            await notificationPage.clickSave();
        });
        await toast.getToastAddSuccess();
    });

    test('Add new notification with existing name', async ({ page }) => {
        allure.story('Validation for Duplicate Notification');
        await allure.step('Try to add notification with existing name', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await notificationPage.clickAdmin();
            await notificationPage.clickOnNotification();
            await notificationPage.clickAdd();
            await notificationPage.fillNotificationName('Thông báo');
            await notificationPage.fillDescription('Automation test');
            await notificationPage.clickSave();
        });
        await validation.validateNameAlreadyExists();
    });

    test('Add new notification with empty name and description', async ({ page }) => {
        allure.story('Validation for Required Fields');
        await allure.step('Try to add notification with empty fields', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await notificationPage.clickAdmin();
            await notificationPage.clickOnNotification();
            await notificationPage.clickAdd();
            await notificationPage.clickSave();
        });
        await notificationPage.getRequiredName();
        await notificationPage.getRequiredDescription();
    });

    test('Add new notification with holiday notification type', async ({ page }) => {
        allure.story('Add Holiday Notification');
        await allure.step('Add new holiday notification', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await notificationPage.clickAdmin();
            await notificationPage.clickOnNotification();
            await notificationPage.clickAdd();
            await notificationPage.clickOnNotificationFormDropdown();
            await notificationPage.clickOnHoliday();
            await notificationPage.fillNotificationName('Thông báo');
            await notificationPage.fillDescription('Automation test');
            await notificationPage.clickSave();
        });
        await toast.getToastAddSuccess();
    });

    test('Add new notification with work schedule notification type', async ({ page }) => {
        allure.story('Add Work Schedule Notification');
        await allure.step('Add new work schedule notification', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await notificationPage.clickAdmin();
            await notificationPage.clickOnNotification();
            await notificationPage.clickAdd();
            await notificationPage.clickOnNotificationFormDropdown();
            await notificationPage.clickOnWorkSchedule();
            await notificationPage.fillNotificationName('Thông báo');
            await notificationPage.fillDescription('Automation test');
            await notificationPage.clickSave();
        });
        await toast.getToastAddSuccess();
    });

    test('Add new notification with urgent notification type', async ({ page }) => {
        allure.story('Add Urgent Notification');
        await allure.step('Add new urgent notification', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await notificationPage.clickAdmin();
            await notificationPage.clickOnNotification();
            await notificationPage.clickAdd();
            await notificationPage.clickOnNotificationFormDropdown();
            await notificationPage.clickOnUrgent();
            await notificationPage.fillNotificationName('Thông báo');
            await notificationPage.fillDescription('Automation test');
            await notificationPage.clickSave();
        });
        await toast.getToastAddSuccess();
    });

    test('Send notification to company', async ({ page }) => {
        allure.story('Send Notification to Company');
        await allure.step('Send notification to entire company', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await notificationPage.clickAdmin();
            await notificationPage.clickOnNotification();
            await notificationPage.clickIconAction();
            await notificationPage.clickSend();
            await notificationPage.clickSave();
        });
        await toast.getToastSendNotificationSuccess();
    });

    test('Send notification to department', async ({ page }) => {
        allure.story('Send Notification to Department');
        await allure.step('Send notification to a department', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await notificationPage.clickAdmin();
            await notificationPage.clickOnNotification();
            await notificationPage.clickIconAction();
            await notificationPage.clickSend();
            await notificationPage.clickOnDepartment();
            await notificationPage.fillPersonnalSearch('IT');
            await notificationPage.clickOnDepartmentOption();
            await notificationPage.clickSave();
        });
        await toast.getToastSendNotificationSuccess();
    });

    test('Send notification to personal', async ({ page }) => {
        allure.story('Send Notification to Personal');
        await allure.step('Send notification to a specific employee', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await notificationPage.clickAdmin();
            await notificationPage.clickOnNotification();
            await notificationPage.clickIconAction();
            await notificationPage.clickSend();
            await notificationPage.clickOnPersonnal();
            await notificationPage.fillPersonnalSearch('Minh');
            await notificationPage.clickOnPersonnalSelect();
            await notificationPage.clickSave();
        });
        await toast.getToastSendNotificationSuccess();
        await logoutPage.logout();

        // Verify notification is sent to the employee
        await allure.step('Verify notification is sent to the employee', async () => {
            await loginPage.goto();
            await loginPage.login(Config.employee_username, Config.employee_password);
            await notificationPage.clickAdmin();
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
            await notificationPage.clickAdmin();
            await notificationPage.clickOnListNotification();
            await notificationPage.clickDeleteFirst();
        });
        await toast.getToastDeleteSuccess();
    });
});
