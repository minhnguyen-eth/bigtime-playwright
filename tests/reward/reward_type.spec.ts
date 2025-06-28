import { test, expect, TestInfo } from '@playwright/test';
import { takeScreenshotOnFailure } from '../../utils/screenshotUtils';
import { LoginPage } from '../../pages/LoginPage';
import { RewardTypePage } from '../../pages/reward_page/RewardTypePage';
import Config from '../../utils/configUtils';
import { ToastPage } from '../../pages/ToastPage';
import { HomePage } from '../../pages/HomePage';
import { clearAllRewardType } from '../../utils/mysqlUtils';
import { allure } from 'allure-playwright';
import { BasePage } from '../../pages/BasePage';

test.describe.serial('Reward Type Tests', () => {
    let loginPage: LoginPage;
    let rewardTypePage: RewardTypePage;
    let toast: ToastPage;
    let homePage: HomePage;
    let basePage: BasePage;

    test.beforeEach(async ({ page }) => {

        allure.feature('Reward Type Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        basePage = new BasePage(page);
        homePage = new HomePage(page);
        toast = new ToastPage(page);
        loginPage = new LoginPage(page);
        rewardTypePage = new RewardTypePage(page);

        await loginPage.goto();
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('Add reward type with empty name', async ({ page }) => {
        allure.story('Validation for Required Fields');
        await allure.step('Clear all reward types', async () => {
            await clearAllRewardType();
        });
        await allure.step('Try to add reward type with empty name', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await homePage.clickAdmin();
            await rewardTypePage.clickRewardTypeButton();
            await basePage.clickAdd();
            await basePage.clickSave();
            await rewardTypePage.getRequiredRewardTypeName();
        });
    });

    test('Add reward type with valid data', async ({ page }) => {
        allure.story('Add Reward Type Successfully');
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const rewardTypeName = `Test Reward Type ${randomSuffix}`;

        await allure.step('Add new reward type with valid data', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await homePage.clickAdmin();
            await rewardTypePage.clickRewardTypeButton();
            await basePage.clickAdd();
            await rewardTypePage.fillRewardTypeNameInput(rewardTypeName);
            await rewardTypePage.fillDescriptionInput('Test Description');
            await basePage.clickSave();
        });
        await toast.getToastAddSuccess();
    });

    test('Add reward type with duplicate name', async ({ page }) => {
        allure.story('Validation for Duplicate Reward Type');

        await allure.step('Try to add reward type with an existing name', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await homePage.clickAdmin();
            await rewardTypePage.clickRewardTypeButton();
            await basePage.clickAdd();
            await rewardTypePage.fillRewardTypeNameInput('Khen thưởng 1');
            await rewardTypePage.fillDescriptionInput('Test Description');
            await basePage.clickSave();
        });
        await rewardTypePage.VerifyDuplicateNameError();
        await toast.getToastAddFailed();
    });

    test('Add Reward Type with empty description', async ({ page }) => {
        allure.story('Add Reward Type Without Description');
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const rewardTypeName = `Test Reward Type ${randomSuffix}`;

        await allure.step('Add reward type with empty description and lock status', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await homePage.clickAdmin();
            await rewardTypePage.clickRewardTypeButton();
            await basePage.clickAdd();
            await rewardTypePage.fillRewardTypeNameInput(rewardTypeName);
            await rewardTypePage.clickStatusDropdownFormAdd();
            await rewardTypePage.clickStatusLock();
            await basePage.clickSave();
        });
        await toast.getToastAddSuccess();
    });

    test('Add Reward Type with lock status', async ({ page }) => {
        allure.story('Add Reward Type with Lock Status');
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const rewardTypeName = `Test Reward Type ${randomSuffix}`;

        await allure.step('Add reward type with lock status', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await homePage.clickAdmin();
            await rewardTypePage.clickRewardTypeButton();
            await basePage.clickAdd();
            await rewardTypePage.fillRewardTypeNameInput(rewardTypeName);
            await rewardTypePage.fillDescriptionInput('Test Description');
            await rewardTypePage.clickStatusDropdownFormAdd();
            await rewardTypePage.clickStatusLock();
            await basePage.clickSave();
        });
        await toast.getToastAddSuccess();
    });

    test('Edit description', async ({ page }) => {
        allure.story('Edit Reward Type Description');
        await allure.step('Edit reward type description', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await homePage.clickAdmin();
            await rewardTypePage.clickRewardTypeButton();
            await basePage.clickEdit();
            await rewardTypePage.fillDescriptionInput('Edit Description');
            await basePage.clickSave();
        });
        await toast.getToastUpdateSuccess();
    });

    test('Edit activity status to lock', async ({ page }) => {
        allure.story('Edit Reward Type Status');
        await allure.step('Open reward type edit form', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await homePage.clickAdmin();
            await rewardTypePage.clickRewardTypeButton();
            await basePage.clickEdit();
        });

    });

    test('Delete reward type', async ({ page }) => {
        allure.story('Delete Reward Type');
        await allure.step('Delete a reward type', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await homePage.clickAdmin();
            await rewardTypePage.clickRewardTypeButton();
            await basePage.clickDelete();
        });
        await toast.getToastDeleteSuccess();
    });

    test('Search by name and status', async ({ page }) => {
        allure.story('Search by name and status');


        await allure.step('Search by name', async () => {
            await loginPage.login(Config.admin_username, Config.admin_password);
            await homePage.clickAdmin();
            await rewardTypePage.clickRewardTypeButton();
            await rewardTypePage.fillInputSearch('Khen thưởng');
            await basePage.clickSearch();
            await rewardTypePage.getResultSearch();
            await basePage.clickClearSearch();
        });

        await allure.step('Search by lock status', async () => {
            await rewardTypePage.clickStatusDropdownSearch();
            await rewardTypePage.clickStatusLock();
            await basePage.clickSearch();
            await rewardTypePage.VerifyLockStatus();
            await basePage.clickClearSearch();
        });

        await allure.step('Search by activity status', async () => {
            await rewardTypePage.clickStatusDropdownSearch();
            await rewardTypePage.clickStatusActivity();
            await basePage.clickSearch();
            await rewardTypePage.VerifyActivityStatus();
            await basePage.clickClearSearch();
        });

        await allure.step('Search by lock & activity status', async () => {
            await clearAllRewardType();
            await rewardTypePage.clickStatusDropdownSearch();
            await rewardTypePage.clickStatusLock();
            await rewardTypePage.clickStatusActivity();
            await basePage.clickSearch();
            await rewardTypePage.VerifyLockStatusRow1();
            await rewardTypePage.VerifyActivityStatus();

        });
    });
});
