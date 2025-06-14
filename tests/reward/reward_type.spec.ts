import { test, expect, TestInfo } from '@playwright/test';

import { takeScreenshotOnFailure } from '../../utils/screenshotUtils';
import { LoginPage } from '..//../pages/LoginPage';
import { RewardTypePage } from '../../pages/reward_page/RewardTypePage';
import Config from '..//../utils/configUtils';
import { ToastPage } from '../../pages/ToastPage';
import { HomePage } from '../../pages/HomePage';
import { clearAllRewardType } from '../../utils/mysqlUtils';
import { allure } from 'allure-playwright';

test.describe.serial('Reward Type', () => {

    let loginPage: LoginPage;
    let rewardTypePage: RewardTypePage;
    let toast: ToastPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        allure.owner('Minh Nguyen');
        allure.feature('Reward Feature');
        allure.severity('Critical');

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

        await clearAllRewardType();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await rewardTypePage.clickRewardTypeButton();
        await rewardTypePage.clickAddButton();
        await rewardTypePage.clickSaveButton();
        await rewardTypePage.getRequiredRewardTypeName();

    });

    test('Add reward type with valid data', async ({ page }) => {
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const rewardTypeName = `Test Reward Type ${randomSuffix}`;
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await rewardTypePage.clickRewardTypeButton();
        await rewardTypePage.clickAddButton();
        await rewardTypePage.fillRewardTypeNameInput(rewardTypeName);
        await rewardTypePage.fillDescriptionInput('Test Description');
        await rewardTypePage.clickSaveButton();
        await toast.getToastAddSuccess();

    });

    test('Add reward type with duplicate name', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await rewardTypePage.clickRewardTypeButton();
        await rewardTypePage.clickAddButton();
        await rewardTypePage.fillRewardTypeNameInput('Khen thưởng 1');
        await rewardTypePage.fillDescriptionInput('Test Description');
        await rewardTypePage.clickSaveButton();
        await rewardTypePage.VerifyDuplicateNameError();
        await toast.getToastAddFailed();
    });



    test('Add Reward Type with empty description', async ({ page }) => {
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const rewardTypeName = `Test Reward Type ${randomSuffix}`;
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await rewardTypePage.clickRewardTypeButton();
        await rewardTypePage.clickAddButton();
        await rewardTypePage.fillRewardTypeNameInput(rewardTypeName);
        await rewardTypePage.clickStatusDropdownFormAdd();
        await rewardTypePage.clickStatusLock();
        await rewardTypePage.clickSaveButton();
        await toast.getToastAddSuccess();
    });

    test('Add Reward Type with lock status', async ({ page }) => {
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const rewardTypeName = `Test Reward Type ${randomSuffix}`;
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await rewardTypePage.clickRewardTypeButton();
        await rewardTypePage.clickAddButton();
        await rewardTypePage.fillRewardTypeNameInput(rewardTypeName);
        await rewardTypePage.fillDescriptionInput('Test Description');
        await rewardTypePage.clickStatusDropdownFormAdd();
        await rewardTypePage.clickStatusLock();
        await rewardTypePage.clickSaveButton();
        await toast.getToastAddSuccess();
    });


    test('Edit description', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await rewardTypePage.clickRewardTypeButton();
        await rewardTypePage.clickEditButton();
        await rewardTypePage.fillDescriptionInput('Edit Description');
        await rewardTypePage.clickSaveButton();
        await toast.getToastUpdateSuccess();
    });

    test('Edit activty status to lock', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await rewardTypePage.clickRewardTypeButton();
        await rewardTypePage.clickEditButton();

    });

    test('Delete reward type', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await rewardTypePage.clickRewardTypeButton();
        await rewardTypePage.clickDeleteButton();
        await rewardTypePage.clickYesButton();
        await toast.getToastDeleteSuccess();
    });

    test('Search by name and status', async ({ page }) => {
        await clearAllRewardType();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await homePage.clickAdmin();
        await rewardTypePage.clickRewardTypeButton();
        await rewardTypePage.fillInputSearch('Khen thưởng');
        await rewardTypePage.clickSearchButton();
        await rewardTypePage.getResultSearch();
        await rewardTypePage.clickClearSearch();

        // Search by lock status
        await rewardTypePage.clickStatusDropdownSearch();
        await rewardTypePage.clickStatusLock();
        await rewardTypePage.clickSearchButton();
        await rewardTypePage.VerifyLockStatus();
        await rewardTypePage.clickClearSearch();

        // Search by activity status
        await rewardTypePage.clickStatusDropdownSearch();
        await rewardTypePage.clickStatusActivity();
        await rewardTypePage.clickSearchButton();
        await rewardTypePage.VerifyActivityStatus();
        await rewardTypePage.clickClearSearch();

        // Search by lock status and activity status
        await rewardTypePage.clickStatusDropdownSearch();
        await rewardTypePage.clickStatusLock();
        await rewardTypePage.clickStatusActivity();
        await rewardTypePage.clickSearchButton();
        await rewardTypePage.VerifyLockStatus();
        await rewardTypePage.VerifyActivityStatus();

    });




});