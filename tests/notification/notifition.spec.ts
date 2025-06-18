import { test, expect, TestInfo } from '@playwright/test';

import { takeScreenshotOnFailure } from '../../utils/screenshotUtils';
import { LoginPage } from '..//../pages/LoginPage';
import Config from '..//../utils/configUtils';
import { ToastPage } from '../../pages/ToastPage';
import { HomePage } from '../../pages/HomePage';
import { allure } from 'allure-playwright';
import { NotificationPage } from '../../pages/notification_page/NotificationPage';
import { clearAllNotifications } from '../../utils/mysqlUtils';

test.describe.serial('Notification Test Suite', () => {

    let loginPage: LoginPage;
    let notificationPage: NotificationPage;
    let toast: ToastPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        allure.owner('Minh Nguyen');
        allure.feature('Notification Feature');
        allure.severity('Normal');

        homePage = new HomePage(page);
        toast = new ToastPage(page);
        loginPage = new LoginPage(page);
        notificationPage = new NotificationPage(page);
        await loginPage.goto();
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('Add new notification with event notification type', async ({ page }) => {
        await clearAllNotifications();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await notificationPage.clickOnNotification();
        await notificationPage.clickOnAddButton();
        await notificationPage.fillNotificationName('Thông báo');
        await notificationPage.fillDescription('Automation test');
        await notificationPage.clickOnSaveButton();
        await toast.getToastAddSuccess();


    });

    test('Add new notification with existing name  ', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await notificationPage.clickOnNotification();
        await notificationPage.clickOnAddButton();
        await notificationPage.fillNotificationName('Thông báo');
        await notificationPage.fillDescription('Automation test');
        await notificationPage.clickOnSaveButton();
        await notificationPage.getExistedName();

    });

    test('Add new notification with empty name and description  ', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await notificationPage.clickOnNotification();
        await notificationPage.clickOnAddButton();
        await notificationPage.clickOnSaveButton();
        await notificationPage.getRequiredName();
        await notificationPage.getRequiredDescription();

    });

    test('Add new notification with holiday notification type', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await notificationPage.clickOnNotification();
        await notificationPage.clickOnAddButton();
        await notificationPage.clickOnNotificationFormDropdown();
        await notificationPage.clickOnHoliday();
        await notificationPage.fillNotificationName('Thông báo');
        await notificationPage.fillDescription('Automation test');
        await notificationPage.clickOnSaveButton();
        await toast.getToastAddSuccess();
    });

    test('Add new notification with work schedule notification type', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await notificationPage.clickOnNotification();
        await notificationPage.clickOnAddButton();
        await notificationPage.clickOnNotificationFormDropdown();
        await notificationPage.clickOnWorkSchedule();
        await notificationPage.fillNotificationName('Thông báo');
        await notificationPage.fillDescription('Automation test');
        await notificationPage.clickOnSaveButton();
        await toast.getToastAddSuccess();
    });

    test('Add new notification with urgent notification type', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await notificationPage.clickOnNotification();
        await notificationPage.clickOnAddButton();
        await notificationPage.clickOnNotificationFormDropdown();
        await notificationPage.clickOnUrgent();
        await notificationPage.fillNotificationName('Thông báo');
        await notificationPage.fillDescription('Automation test');
        await notificationPage.clickOnSaveButton();
        await toast.getToastAddSuccess();
    });

    test('Send notification to company', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await notificationPage.clickOnNotification();
        await notificationPage.clickOnIconAction();
        await notificationPage.clickOnSendNotification();
        await notificationPage.clickOnSaveButton();
        await toast.getToastSendNotificationSuccess();
    });

    test('Send notification to department', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await notificationPage.clickOnNotification();
        await notificationPage.clickOnIconAction();
        await notificationPage.clickOnSendNotification();
        await notificationPage.clickOnDepartment();
        await notificationPage.clickOnDepartmentOption();
        await notificationPage.clickOnSaveButton();
        await toast.getToastSendNotificationSuccess();
    });

    test('Send notification to personal', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await notificationPage.clickOnNotification();
        await notificationPage.clickOnIconAction();
        await notificationPage.clickOnSendNotification();
        await notificationPage.clickOnPersonnal();
        await notificationPage.fillPersonnalSearch('Minh');
        await notificationPage.clickOnPersonnalSelect();
        await notificationPage.clickOnSaveButton();
        await toast.getToastSendNotificationSuccess();
    });


});