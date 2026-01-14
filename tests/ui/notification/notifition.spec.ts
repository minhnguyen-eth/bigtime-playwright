import { test, } from '../base-test';
import { LoginPage } from '../../../pages/LoginPage';
import Config from '../../../utils/configUtils';
import { allure } from 'allure-playwright';
import { NotificationPage } from '../../../pages/notification_page/NotificationPage';
import { LogoutPage } from '../../../pages/LogoutPage';
import { clearNotifications } from '../../../db/helpers/DBHelper';
import { ToastMessages, ValidationMessages } from '../../../constants/MessagesCommon';

test.describe.serial('Notification Test Suite', () => {
    let loginPage: LoginPage;
    let notificationPage: NotificationPage;
    let logoutPage: LogoutPage;

    test.beforeEach(async ({ page }) => {
        allure.feature('Notification Feature');
        allure.owner('Minh Nguyen');
        allure.severity('High');

        logoutPage = new LogoutPage(page);
        loginPage = new LoginPage(page);
        notificationPage = new NotificationPage(page);
        await loginPage.goto();
    });

    test("Max length of notification name is 255 characters", async ({ page }) => {
        await clearNotifications();
        allure.story('Max Length of Notification Name');
        await allure.step('Add notification with name length 255 characters', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await notificationPage.clickAdmin();
            await notificationPage.clickNotificationButton();
            await notificationPage.clickAdd();
            await notificationPage.fillNotificationName('a'.repeat(255));
            await notificationPage.fillDescription('Automation test');
            await notificationPage.clickSave();
        });
        await notificationPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test("Max length of notification name is 256 characters", async ({ page }) => {
        allure.story('Max Length of Notification Name');
        await allure.step('Add notification with name length 256 characters', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await notificationPage.clickAdmin();
            await notificationPage.clickNotificationButton();
            await notificationPage.clickAdd();
            await notificationPage.fillNotificationName('a'.repeat(256));
            await notificationPage.fillDescription('Automation test');
            await notificationPage.clickSave();
        });
        await notificationPage.verifyRequiredField(ValidationMessages.MAX_LENGTH_255);
    });

    test("Max length of notification description is 500 characters", async ({ page }) => {
        allure.story('Max Length of Notification Description');
        await allure.step('Add notification with description length 500 characters', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await notificationPage.clickAdmin();
            await notificationPage.clickNotificationButton();
            await notificationPage.clickAdd();
            await notificationPage.fillNotificationName('Automation test max length description');
            await notificationPage.fillDescription('a'.repeat(500));
            await notificationPage.clickSave();
        });
        await notificationPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test("Max length of notification description is 501 characters", async ({ page }) => {
        allure.story('Max Length of Notification Description');
        await allure.step('Add notification with description length 501 characters', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await notificationPage.clickAdmin();
            await notificationPage.clickNotificationButton();
            await notificationPage.clickAdd();
            await notificationPage.fillNotificationName('Automation test max length description');
            await notificationPage.fillDescription('a'.repeat(501));
            await notificationPage.clickSave();
        });
        await notificationPage.verifyRequiredField(ValidationMessages.MAX_LENGTH_500);
    });

    test('Add new notification with event notification type', async ({ page }) => {
        allure.story('Add Event Notification');
        await allure.step('Clear all notifications and add new event notification', async () => {
            await clearNotifications();
            await loginPage.login(Config.admin_username, Config.admin_password);
            await notificationPage.clickAdmin();
            await notificationPage.clickNotificationButton();
            await notificationPage.clickAdd();
            await notificationPage.fillNotificationName('Thông báo');
            await notificationPage.fillDescription('Automation test');
            await notificationPage.clickSave();
        });
        await notificationPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test('Add new notification with existing name', async ({ page }) => {
        allure.story('Validation for Duplicate Notification');
        await allure.step('Try to add notification with existing name', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await notificationPage.clickAdmin();
            await notificationPage.clickNotificationButton();
            await notificationPage.clickAdd();
            await notificationPage.fillNotificationName('Thông báo');
            await notificationPage.fillDescription('Automation test');
            await notificationPage.clickSave();
        });
        await notificationPage.verifyValidationMessage(ValidationMessages.NAME_ALREADY_EXISTS);
    });

    test('Add new notification with empty name and description', async ({ page }) => {
        allure.story('Validation for Required Fields');
        await allure.step('Try to add notification with empty fields', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await notificationPage.clickAdmin();
            await notificationPage.clickNotificationButton();
            await notificationPage.clickAdd();
            await notificationPage.clickSave();
        });
        await notificationPage.verifyRequiredName();
        await notificationPage.verifyRequiredDescription();
    });

    test('Add new notification with holiday notification type', async ({ page }) => {
        allure.story('Add Holiday Notification');
        await allure.step('Add new holiday notification', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await notificationPage.clickAdmin();
            await notificationPage.clickNotificationButton();
            await notificationPage.clickAdd();
            await notificationPage.clickNotificationFormDropdown();
            await notificationPage.clickHoliday();
            await notificationPage.fillNotificationName('Thông báo');
            await notificationPage.fillDescription('Automation test');
            await notificationPage.clickSave();
        });
        await notificationPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test('Add new notification with work schedule notification type', async ({ page }) => {
        allure.story('Add Work Schedule Notification');
        await allure.step('Add new work schedule notification', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await notificationPage.clickAdmin();
            await notificationPage.clickNotificationButton();
            await notificationPage.clickAdd();
            await notificationPage.clickNotificationFormDropdown();
            await notificationPage.clickWorkSchedule();
            await notificationPage.fillNotificationName('Thông báo');
            await notificationPage.fillDescription('Automation test');
            await notificationPage.clickSave();
        });
        await notificationPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test('Add new notification with urgent notification type', async ({ page }) => {
        allure.story('Add Urgent Notification');
        await allure.step('Add new urgent notification', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await notificationPage.clickAdmin();
            await notificationPage.clickNotificationButton();
            await notificationPage.clickAdd();
            await notificationPage.clickNotificationFormDropdown();
            await notificationPage.clickUrgent();
            await notificationPage.fillNotificationName('Thông báo');
            await notificationPage.fillDescription('Automation test');
            await notificationPage.clickSave();
        });
        await notificationPage.verifyToastMessage(ToastMessages.TOAST_ADD_SUCCESS);
    });

    test('Send notification to company', async ({ page }) => {
        allure.story('Send Notification to Company');
        await allure.step('Send notification to entire company', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await notificationPage.clickAdmin();
            await notificationPage.clickNotificationButton();
            await notificationPage.clickIconAction();
            await notificationPage.clickSend();
            await notificationPage.clickSave();
        });
        await notificationPage.verifyToastMessage(ToastMessages.TOAST_SEND_NOTIFICATION_SUCCESS);
    });

    test('Send notification to department', async ({ page }) => {
        allure.story('Send Notification to Department');
        await allure.step('Send notification to a department', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await notificationPage.clickAdmin();
            await notificationPage.clickNotificationButton();
            await notificationPage.clickIconAction();
            await notificationPage.clickSend();
            await notificationPage.clickDepartmentTab();
            await notificationPage.fillPersonalSearch('IT');
            await notificationPage.clickFirstCheckbox();
            await notificationPage.clickSave();
        });
        await notificationPage.verifyToastMessage(ToastMessages.TOAST_SEND_NOTIFICATION_SUCCESS);
    });

    test('Send notification to personal', async ({ page }) => {
        allure.story('Send Notification to Personal');
        await allure.step('Send notification to a specific employee', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await notificationPage.clickAdmin();
            await notificationPage.clickNotificationButton();
            await notificationPage.clickIconAction();
            await notificationPage.clickSend();
            await notificationPage.clickPersonalTab();
            await notificationPage.fillPersonalSearch('Nguyễn Văn Minh');
            await notificationPage.clickPersonalSelect();
            await notificationPage.clickSave();
        });
        await notificationPage.verifyToastMessage(ToastMessages.TOAST_SEND_NOTIFICATION_SUCCESS);
        await logoutPage.logout();

        // Verify notification is sent to the employee
        await allure.step('Verify notification is sent to the employee', async () => {
            await loginPage.goto();
            await loginPage.login(Config.employee_username, Config.employee_password);
            await notificationPage.clickAdmin();
            await notificationPage.clickListNotification();
            await notificationPage.verifyNotificationCompany();
            await notificationPage.verifyNotificationDepartment();
            await notificationPage.verifyNotificationPersonal();

        });
    });

    test('Delete notification', async ({ page }) => {
        allure.story('Delete Notification');
        await allure.step('Delete notification', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await notificationPage.clickAdmin();
            await notificationPage.clickListNotification();
            await notificationPage.clickDelete();
        });
        await notificationPage.verifyToastMessage(ToastMessages.TOAST_DELETE_SUCCESS);
    });
});
