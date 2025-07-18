import { test, } from './base-test';
import { allure } from 'allure-playwright';
import { LoginPage } from '../pages/LoginPage';
import { TeamPage } from '../pages/TeamPage';
import { ToastPage } from '../pages/ToastPage';
import { Config } from '../utils/configUtils';
import { clearTeam } from '../db/helpers/DBHelper';
import { ValidationPage } from '../pages/ValidationPage';

test.describe.serial('Team', () => {
    let loginPage: LoginPage;
    let teamPage: TeamPage;
    let toastPage: ToastPage;
    let validation: ValidationPage;

    test.beforeEach(async ({ page }) => {
        allure.feature('Team Feature');
        allure.owner('Minh Nguyen');
        allure.severity('Critical');

        loginPage = new LoginPage(page);
        teamPage = new TeamPage(page);
        toastPage = new ToastPage(page);
        validation = new ValidationPage(page);
        await loginPage.goto();
    });

    test('Create a new team', async ({ page }) => {
        await clearTeam();
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const teamNameRandom = `team${randomSuffix}`;
        const teamCodeRandom = `code${randomSuffix}`;
        await loginPage.login(Config.admin_username, Config.admin_password);
        await teamPage.clickAdmin();
        await teamPage.clickTeamButton();
        await teamPage.clickAdd();
        await teamPage.fillTeamCode(teamCodeRandom);
        await teamPage.fillTeamName(teamNameRandom);
        await teamPage.clickSelectDepartment();
        await teamPage.fillNote('This is a note');
        await teamPage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Create a new team with existing team name', async ({ page }) => {
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const teamNameRandom = `team${randomSuffix}`;
        await loginPage.login(Config.admin_username, Config.admin_password);
        await teamPage.clickAdmin();
        await teamPage.clickTeamButton();
        await teamPage.clickAdd();
        await teamPage.fillTeamCode(teamNameRandom);
        await teamPage.fillTeamName('nhóm it1');
        await teamPage.clickSelectDepartment();
        await teamPage.clickSave();
        await toastPage.getToastAddFailed();
        await validation.validateNameAlreadyExists();
    });

    test('Create a new team with existing team code', async ({ page }) => {
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const teamNameRandom = `team${randomSuffix}`;
        await loginPage.login(Config.admin_username, Config.admin_password);
        await teamPage.clickAdmin();
        await teamPage.clickTeamButton();
        await teamPage.clickAdd();
        await teamPage.fillTeamCode('T001');
        await teamPage.fillTeamName(teamNameRandom);
        await teamPage.clickSelectDepartment();
        await teamPage.clickSave();
        await toastPage.getToastAddFailed();
        await teamPage.getValidateCodeExist();
    });

    test('Save team without filling in any information', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await teamPage.clickAdmin();
        await teamPage.clickTeamButton();
        await teamPage.clickAdd();
        await teamPage.clickSave();
        await teamPage.validateRequiredFields();
    });

    test('Edit status', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await teamPage.clickAdmin();
        await teamPage.clickTeamButton();
        await teamPage.clickEditRow0();
        await teamPage.clickDropdownStatusInForm();
        await teamPage.clickLockStatus();
        await teamPage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit team name', async ({ page }) => {
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const editTeamNameRandom = `team${randomSuffix}`;
        await loginPage.login(Config.admin_username, Config.admin_password);
        await teamPage.clickAdmin();
        await teamPage.clickTeamButton();
        await teamPage.clickEditRow0();
        await teamPage.fillTeamName(editTeamNameRandom);
        await teamPage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit team code', async ({ page }) => {
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const editTeamNameCode = `team${randomSuffix}`;
        await loginPage.login(Config.admin_username, Config.admin_password);
        await teamPage.clickAdmin();
        await teamPage.clickTeamButton();
        await teamPage.clickEditRow0();
        await teamPage.fillTeamCode(editTeamNameCode);
        await teamPage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit note', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await teamPage.clickAdmin();
        await teamPage.clickTeamButton();
        await teamPage.clickEditRow0();
        await teamPage.fillNote('Automation test edit note');
        await teamPage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Maxleght team name 255 characters', async ({ page }) => {
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const teamNameRandom = `team${randomSuffix}`;
        const teamName255 = 'a'.repeat(255);
        await loginPage.login(Config.admin_username, Config.admin_password);
        await teamPage.clickAdmin();
        await teamPage.clickTeamButton();
        await teamPage.clickAdd();
        await teamPage.fillTeamCode(teamNameRandom);
        await teamPage.fillTeamName(teamName255);
        await teamPage.clickSelectDepartment();
        await teamPage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Maxleght team name 256 characters', async ({ page }) => {
        const teamName256 = 'a'.repeat(256);
        await loginPage.login(Config.admin_username, Config.admin_password);
        await teamPage.clickAdmin();
        await teamPage.clickTeamButton();
        await teamPage.clickAdd();
        await teamPage.fillTeamName(teamName256);
        await validation.validateMaxLength255Characters();
    });

    test('Maxleght team code 100 characters', async ({ page }) => {
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const teamNameRandom = `team${randomSuffix}`;
        const teamCode255 = 'a'.repeat(100);
        await loginPage.login(Config.admin_username, Config.admin_password);
        await teamPage.clickAdmin();
        await teamPage.clickTeamButton();
        await teamPage.clickAdd();
        await teamPage.fillTeamCode(teamCode255);
        await teamPage.fillTeamName(teamNameRandom);
        await teamPage.clickSelectDepartment();
        await teamPage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Maxlenght team code 101 characters', async ({ page }) => {
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const teamNameRandom = `team${randomSuffix}`;
        const teamCode101 = 'a'.repeat(101);
        await loginPage.login(Config.admin_username, Config.admin_password);
        await teamPage.clickAdmin();
        await teamPage.clickTeamButton();
        await teamPage.clickAdd();
        await teamPage.fillTeamCode(teamCode101);
        await teamPage.fillTeamName(teamNameRandom);
        await teamPage.clickSelectDepartment();
        await teamPage.clickSave();
        await validation.validateMaxLength100Characters();
    });

    test('Maxlenght note 255 characters', async ({ page }) => {
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const teamNameRandom = `team${randomSuffix}`;
        await loginPage.login(Config.admin_username, Config.admin_password);
        await teamPage.clickAdmin();
        await teamPage.clickTeamButton();
        await teamPage.clickAdd();
        await teamPage.fillTeamCode(teamNameRandom);
        await teamPage.fillTeamName(teamNameRandom);
        await teamPage.fillNote('a'.repeat(255));
        await teamPage.clickSelectDepartment();
        await teamPage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Maxlenght note over 255 characters', async ({ page }) => {
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const teamNameRandom = `team${randomSuffix}`;
        await loginPage.login(Config.admin_username, Config.admin_password);
        await teamPage.clickAdmin();
        await teamPage.clickTeamButton();
        await teamPage.clickAdd();
        await teamPage.fillTeamCode(teamNameRandom);
        await teamPage.fillTeamName(teamNameRandom);
        await teamPage.fillNote('a'.repeat(256));
        await teamPage.clickSelectDepartment();
        await teamPage.clickSave();
        await validation.validateMaxLength255Characters();
    });

    test('Delete team', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await teamPage.clickAdmin();
        await teamPage.clickTeamButton();
        await teamPage.clickDeleteRow0();
        await toastPage.getToastDeleteSuccess();
    });

    test('Seach', async ({ page }) => {
        await loginPage.login(Config.admin_username, Config.admin_password);
        await teamPage.clickAdmin();
        await teamPage.clickTeamButton();

        // Search by name
        await teamPage.searchByTeamName('Nhóm It1');
        await teamPage.clickSearch();
        await teamPage.getResultSearchByName();
        await teamPage.clickClearSearch();

        // Search by code
        await teamPage.searchByTeamCode('T001');
        await teamPage.clickSearch();
        await teamPage.getResultSearchByCode();
        await teamPage.clickClearSearch();

        // Search by activity status
        await teamPage.clickDropdownStatusSearch();
        await teamPage.clickActivityStatus();
        await teamPage.clickSearch();
        await teamPage.verifyActivityStatusRow0();
        await teamPage.clickClearSearch();

        // Search by lock status
        await teamPage.clickDropdownStatusSearch();
        await teamPage.clickLockStatus();
        await teamPage.clickSearch();
        await teamPage.verifyLockStatusRow0();
        await teamPage.clickClearSearch();

        // Search by activity and lock status
        await teamPage.clickDropdownStatusSearch();
        await teamPage.clickActivityStatus();
        await teamPage.clickLockStatus();
        await teamPage.clickSearch();
        // await teamPage.getVerifyActivityStatus();
        // await teamPage.getVerifyLockStatus();

    });
});