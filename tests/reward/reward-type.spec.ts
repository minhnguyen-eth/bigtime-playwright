import { test, expect, TestInfo } from '@playwright/test';
import { takeScreenshotOnFailure } from '../../utils/screenshotUtils';
import { LoginPage } from '../../pages/LoginPage';
import { RewardTypePage } from '../../pages/reward_page/RewardTypePage';
import Config from '../../utils/configUtils';
import { ToastPage } from '../../pages/ToastPage';
import { clearAllRewardType } from '../../db/DBHelper';
import { allure } from 'allure-playwright';
import { BasePage } from '../../pages/BasePage';

test.describe.serial('Reward Type Tests', () => {
    let loginPage: LoginPage;
    let rewardTypePage: RewardTypePage;
    let toastPage: ToastPage;
    let basePage: BasePage;

    test.beforeEach(async ({ page }) => {

        allure.feature('Reward Type Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        basePage = new BasePage(page);
        toastPage = new ToastPage(page);
        loginPage = new LoginPage(page);
        rewardTypePage = new RewardTypePage(page);

        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin();
        await rewardTypePage.clickRewardTypeButton();
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test("Max length of reward type name is 255 characters", async ({ page }) => {
        await clearAllRewardType();
        allure.story('Validation for Max Length of Reward Type Name');
        await allure.step('Add reward type with name length 255 characters', async () => {
            await basePage.clickAdd();
            await rewardTypePage.fillRewardTypeNameInput('z'.repeat(255));
            await basePage.clickSave();
        });
        await toastPage.getToastAddSuccess();
    });

    test("Max length of reward type name is 256 characters", async ({ page }) => {
        allure.story('Validation for Max Length of Reward Type Name');
        await allure.step('Add reward type with name length 256 characters', async () => {
            await basePage.clickAdd();
            await rewardTypePage.fillRewardTypeNameInput('z'.repeat(256));
            await basePage.clickSave();
        });
        await basePage.verifyMaxlenght255Charactor();
    });

    test("Max length of reward type description is 500 characters", async ({ page }) => {
        allure.story('Validation for Max Length of Reward Type Description');
        await allure.step('Add reward type with description length 255 characters', async () => {
            await basePage.clickAdd();
            await rewardTypePage.fillRewardTypeNameInput('Test Reward Type');
            await rewardTypePage.fillDescriptionInput('z'.repeat(500));
            await basePage.clickSave();
        });
        await toastPage.getToastAddSuccess();
    });

    test("Max length of reward type description is 501 characters", async ({ page }) => {
        allure.story('Validation for Max Length of Reward Type Description');
        await allure.step('Add reward type with description length 256 characters', async () => {
            await basePage.clickAdd();
            await rewardTypePage.fillRewardTypeNameInput('Test Reward Type');
            await rewardTypePage.fillDescriptionInput('z'.repeat(501));
            await basePage.clickSave();
        });
        await basePage.verifyMaxlenght500Charactor();
    });


    test('Add reward type with empty name', async ({ page }) => {
        allure.story('Validation for Required Fields');
        await allure.step('Clear all reward types', async () => {
            await clearAllRewardType();
        });
        await allure.step('Try to add reward type with empty name', async () => {

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

            await basePage.clickAdd();
            await rewardTypePage.fillRewardTypeNameInput(rewardTypeName);
            await rewardTypePage.fillDescriptionInput('Test Description');
            await basePage.clickSave();
        });
        await toastPage.getToastAddSuccess();
    });

    test('Add reward type with duplicate name', async ({ page }) => {
        allure.story('Validation for Duplicate Reward Type');

        await allure.step('Try to add reward type with an existing name', async () => {

            await basePage.clickAdd();
            await rewardTypePage.fillRewardTypeNameInput('Khen thưởng 1');
            await rewardTypePage.fillDescriptionInput('Test Description');
            await basePage.clickSave();
        });
        await rewardTypePage.VerifyDuplicateNameError();
        await toastPage.getToastAddFailed();
    });


    test('Add Reward Type with lock status', async ({ page }) => {
        allure.story('Add Reward Type with Lock Status');
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const rewardTypeName = `Test Reward Type ${randomSuffix}`;

        await allure.step('Add reward type with lock status', async () => {

            await basePage.clickAdd();
            await rewardTypePage.fillRewardTypeNameInput(rewardTypeName);
            await rewardTypePage.fillDescriptionInput('Test Description');
            await rewardTypePage.clickStatusDropdownFormAdd();
            await rewardTypePage.clickStatusLock();
            await basePage.clickSave();
        });
        await toastPage.getToastAddSuccess();
    });

    test('Add Reward Type with empty description', async ({ page }) => {
        allure.story('Add Reward Type Without Description');
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const rewardTypeName = `Test Reward Type ${randomSuffix}`;

        await allure.step('Add reward type with empty description and lock status', async () => {

            await basePage.clickAdd();
            await rewardTypePage.fillRewardTypeNameInput(rewardTypeName);
            await basePage.clickSave();
        });
        await toastPage.getToastAddSuccess();
    });

    test('Edit description', async ({ page }) => {
        allure.story('Edit Reward Type Description');
        await allure.step('Edit reward type description', async () => {

            await basePage.clickEditRow0();
            await rewardTypePage.fillDescriptionInput('Edit Description');
            await basePage.clickSave();
        });
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit activity status to lock', async ({ page }) => {
        allure.story('Edit Reward Type Status');
        await allure.step('Open reward type edit form', async () => {

            await basePage.clickEditRow0();
            await rewardTypePage.clickStatusDropdownFormAdd();
            await rewardTypePage.clickStatusLock();
            await basePage.clickSave();
            await toastPage.getToastUpdateSuccess();
        });

    });

    test('Delete reward type', async ({ page }) => {
        allure.story('Delete Reward Type');
        await allure.step('Delete a reward type', async () => {

            await basePage.clickDeleteRow0();
        });
        await toastPage.getToastDeleteSuccess();
    });

    test('Search by name and status', async ({ page }) => {
        allure.story('Search by name and status');


        await allure.step('Search by name', async () => {

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
