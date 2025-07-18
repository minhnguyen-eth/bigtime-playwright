import { test, } from '../base-test';
import { LoginPage } from '../../pages/LoginPage';
import { RewardTypePage } from '../../pages/reward_page/RewardTypePage';
import Config from '../../utils/configUtils';
import { ToastPage } from '../../pages/ToastPage';
import { allure } from 'allure-playwright';
import { ValidationPage } from '../../pages/ValidationPage';
import { clearRewardType } from '../../db/helpers/DBHelper';

test.describe.serial('Reward Type Tests', () => {
    let loginPage: LoginPage;
    let rewardTypePage: RewardTypePage;
    let toastPage: ToastPage;
    let validation: ValidationPage;

    test.beforeEach(async ({ page }) => {
        allure.feature('Reward Type Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        validation = new ValidationPage(page);
        toastPage = new ToastPage(page);
        loginPage = new LoginPage(page);
        rewardTypePage = new RewardTypePage(page);

        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await rewardTypePage.clickAdmin();
        await rewardTypePage.clickRewardTypeButton();
    });

    test("Max length of reward type name is 255 characters", async ({ page }) => {
        await clearRewardType();
        allure.story('Validation for Max Length of Reward Type Name');
        await allure.step('Add reward type with name length 255 characters', async () => {
            await rewardTypePage.clickAdd();
            await rewardTypePage.fillRewardTypeNameInput('z'.repeat(255));
            await rewardTypePage.clickSave();
        });
        await toastPage.getToastAddSuccess();
    });

    test("Max length of reward type name is 256 characters", async ({ page }) => {
        allure.story('Validation for Max Length of Reward Type Name');
        await allure.step('Add reward type with name length 256 characters', async () => {
            await rewardTypePage.clickAdd();
            await rewardTypePage.fillRewardTypeNameInput('z'.repeat(256));
            await rewardTypePage.clickSave();
        });
        await validation.validateMaxLength255Characters();
    });

    test("Max length of reward type description is 500 characters", async ({ page }) => {
        allure.story('Validation for Max Length of Reward Type Description');
        await allure.step('Add reward type with description length 255 characters', async () => {
            await rewardTypePage.clickAdd();
            await rewardTypePage.fillRewardTypeNameInput('Test Reward Type');
            await rewardTypePage.fillDescription('z'.repeat(500));
            await rewardTypePage.clickSave();
        });
        await toastPage.getToastAddSuccess();
    });

    test("Max length of reward type description is 501 characters", async ({ page }) => {
        allure.story('Validation for Max Length of Reward Type Description');
        await allure.step('Add reward type with description length 256 characters', async () => {
            await rewardTypePage.clickAdd();
            await rewardTypePage.fillRewardTypeNameInput('Test Reward Type');
            await rewardTypePage.fillDescription('z'.repeat(501));
            await rewardTypePage.clickSave();
        });
        await validation.validateMaxLength500Characters();
    });


    test('Add reward type with empty name', async ({ page }) => {
        allure.story('Validation for Required Fields');
        await allure.step('Clear all reward types', async () => {
            await clearRewardType();
        });
        await allure.step('Try to add reward type with empty name', async () => {

            await rewardTypePage.clickRewardTypeButton();
            await rewardTypePage.clickAdd();
            await rewardTypePage.clickSave();
            await rewardTypePage.getRequiredRewardTypeName();
        });
    });

    test('Add reward type with valid data', async ({ page }) => {
        allure.story('Add Reward Type Successfully');
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const rewardTypeName = `Test Reward Type ${randomSuffix}`;

        await allure.step('Add new reward type with valid data', async () => {

            await rewardTypePage.clickAdd();
            await rewardTypePage.fillRewardTypeNameInput(rewardTypeName);
            await rewardTypePage.fillDescription('Test Description');
            await rewardTypePage.clickSave();
        });
        await toastPage.getToastAddSuccess();
    });

    test('Add reward type with duplicate name', async ({ page }) => {
        allure.story('Validation for Duplicate Reward Type');

        await allure.step('Try to add reward type with an existing name', async () => {

            await rewardTypePage.clickAdd();
            await rewardTypePage.fillRewardTypeNameInput('Khen thưởng 1');
            await rewardTypePage.fillDescription('Test Description');
            await rewardTypePage.clickSave();
        });
        await validation.validateNameAlreadyExists();
        await toastPage.getToastAddFailed();
    });


    test('Add Reward Type with lock status', async ({ page }) => {
        allure.story('Add Reward Type with Lock Status');
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const rewardTypeName = `Test Reward Type ${randomSuffix}`;

        await allure.step('Add reward type with lock status', async () => {

            await rewardTypePage.clickAdd();
            await rewardTypePage.fillRewardTypeNameInput(rewardTypeName);
            await rewardTypePage.fillDescription('Test Description');
            await rewardTypePage.clickDropdownStatusInForm();
            await rewardTypePage.clickLockStatus();
            await rewardTypePage.clickSave();
        });
        await toastPage.getToastAddSuccess();
    });

    test('Add Reward Type with empty description', async ({ page }) => {
        allure.story('Add Reward Type Without Description');
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const rewardTypeName = `Test Reward Type ${randomSuffix}`;

        await allure.step('Add reward type with empty description and lock status', async () => {

            await rewardTypePage.clickAdd();
            await rewardTypePage.fillRewardTypeNameInput(rewardTypeName);
            await rewardTypePage.clickSave();
        });
        await toastPage.getToastAddSuccess();
    });

    test('Edit description', async ({ page }) => {
        allure.story('Edit Reward Type Description');
        await allure.step('Edit reward type description', async () => {

            await rewardTypePage.clickEditRow0();
            await rewardTypePage.fillDescription('Edit Description');
            await rewardTypePage.clickSave();
        });
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit activity status to lock', async ({ page }) => {
        allure.story('Edit Reward Type Status');
        await allure.step('Open reward type edit form', async () => {

            await rewardTypePage.clickEditRow0();
            await rewardTypePage.clickDropdownStatusInForm();
            await rewardTypePage.clickLockStatus();
            await rewardTypePage.clickSave();
            await toastPage.getToastUpdateSuccess();
        });

    });

    test('Delete reward type', async ({ page }) => {
        allure.story('Delete Reward Type');
        await allure.step('Delete a reward type', async () => {

            await rewardTypePage.clickDeleteRow0();
        });
        await toastPage.getToastDeleteSuccess();
    });

    test('Search by name and status', async ({ page }) => {
        allure.story('Search by name and status');


        await allure.step('Search by name', async () => {

            await rewardTypePage.fillInputSearch('Khen thưởng');
            await rewardTypePage.clickSearch();
            await rewardTypePage.getResultSearch();
            await rewardTypePage.clickClearSearch();
        });

        await allure.step('Search by lock status', async () => {
            await rewardTypePage.clickDropdownStatusSearch();
            await rewardTypePage.clickLockStatus();
            await rewardTypePage.clickSearch();
            await rewardTypePage.verifyLockStatusRow0();
            await rewardTypePage.clickClearSearch();
        });

        await allure.step('Search by activity status', async () => {
            await rewardTypePage.clickDropdownStatusSearch();
            await rewardTypePage.clickActivityStatus();
            await rewardTypePage.clickSearch();
            await rewardTypePage.verifyActivityStatusRow0();
            await rewardTypePage.clickClearSearch();
        });
    });
});
