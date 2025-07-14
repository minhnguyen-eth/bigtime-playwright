import { test, TestInfo } from '@playwright/test';
import { ToastPage } from '../../pages/ToastPage';
import { LoginPage } from '../../pages/LoginPage';
import { BasePage } from '../../pages/BasePage';
import { takeScreenshotOnFailure } from '../../utils/screenshotUtils';
import Config from '../../utils/configUtils';
import { clearEmploymentContract } from '../../db/DBHelper';
import { ContractPage } from '../../pages/contract_page/ContractPage';
import { allure } from "allure-playwright";

test.describe.serial('Contract Tests', () => {
    let contractPage: ContractPage;
    let toastPage: ToastPage;
    let loginPage: LoginPage;
    let basePage: BasePage;

    test.beforeEach(async ({ page }) => {
        allure.owner("Minh Nguyen");
        allure.feature("Contract Feature");
        allure.severity("Critical");

        loginPage = new LoginPage(page);
        toastPage = new ToastPage(page);
        contractPage = new ContractPage(page);
        basePage = new BasePage(page);

        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin();
        await contractPage.clickContract();
    });

    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    async function CreateContractWithProbation() {
        await clearEmploymentContract();
        await basePage.clickAdd();
        await contractPage.fillEmployeeName();
        await contractPage.fillSalary("10000000");
        await contractPage.selectEndDate();
        await basePage.clickChoose();
        await contractPage.fillNote('Automation test');
        await contractPage.checkSelectAllTerm();
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
    }

    test('Max lenghth of note is 255 characters', async ({ page }) => {
        await clearEmploymentContract();
        await basePage.clickAdd();
        await contractPage.fillEmployeeName();
        await contractPage.fillSalary("10000000");
        await contractPage.selectEndDate();
        await basePage.clickChoose();
        await contractPage.fillNote('A'.repeat(255));
        await contractPage.checkSelectAllTerm();
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Max lenghth of note over 255 characters', async ({ page }) => {
        await clearEmploymentContract();
        await basePage.clickAdd();
        await contractPage.fillEmployeeName();
        await contractPage.fillSalary("10000000");
        await contractPage.selectEndDate();
        await basePage.clickChoose();
        await contractPage.fillNote('A'.repeat(256));
        await contractPage.checkSelectAllTerm();
        await basePage.clickSave();
        await basePage.verifyMaxlenght255Charactor();
    });

    test('Create contract with no select term and blank note', async ({ page }) => {
        await clearEmploymentContract();
        await basePage.clickAdd();
        await contractPage.fillEmployeeName();
        await contractPage.fillSalary("10000000");
        await contractPage.selectEndDate();
        await basePage.clickChoose();
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Edit contract type - Probation to Permanent', async ({ page }) => {
        await CreateContractWithProbation();
        await basePage.clickRow0();
        await basePage.clickEdit();
        await contractPage.clickContractTypeDropdown();
        await contractPage.clickFormalContract();
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
        await contractPage.verifyPermanentType();
    });

    test('Edit base salary', async ({ page }) => {
        await basePage.clickRow0();
        await basePage.clickEdit();
        await contractPage.fillSalary("20000000");
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Edit note ', async ({ page }) => {
        await basePage.clickRow0();
        await basePage.clickEdit();
        await contractPage.fillNote('Automation test edit');
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Create contract with probation', async ({ page }) => {
        await CreateContractWithProbation();

    });

    test('Create with formal contract ', async ({ page }) => {
        await basePage.clickAdd();
        await contractPage.fillEmployeeName();
        await contractPage.clickContractTypeDropdown();
        await contractPage.clickFormalContract();
        await contractPage.fillNote('Automation test');
        await contractPage.checkSelectAllTerm();
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Create with seasonal contract ', async ({ page }) => {
        await basePage.clickAdd();
        await contractPage.fillEmployeeName();
        await contractPage.clickContractTypeDropdown();
        await contractPage.clickSeasonalContract();
        await contractPage.selectEndDate();
        await basePage.clickChoose();
        await contractPage.fillNote('Automation test');
        await contractPage.checkSelectAllTerm();
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Edit end date', async ({ page }) => {
        await basePage.clickRow0();
        await basePage.clickEdit();
        await contractPage.selectEndDate2();
        await basePage.clickChoose();
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
    });

    test('Create with collaborator contract ', async ({ page }) => {
        await basePage.clickAdd();
        await contractPage.fillEmployeeName();
        await contractPage.clickContractTypeDropdown();
        await contractPage.clickCollaboratorContract();
        await contractPage.selectEndDate();
        await basePage.clickChoose();
        await contractPage.fillNote('Automation test');
        await contractPage.checkSelectAllTerm();
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Search by contract type ', async ({ page }) => {
        // Search by probation type
        await contractPage.clickSearchByContractType();
        await contractPage.clickProbationType();
        await basePage.clickSearch();
        await contractPage.verifyProbationType();
        await basePage.clickClearSearch();

        // Search by permanent type
        await contractPage.clickSearchByContractType();
        await contractPage.clickPermanentType();
        await basePage.clickSearch();
        await contractPage.verifyPermanentType();
        await basePage.clickClearSearch();

        // Search by temporary type
        await contractPage.clickSearchByContractType();
        await contractPage.clickTemporaryType();
        await basePage.clickSearch();
        await contractPage.verifyTemporaryType();
        await basePage.clickClearSearch();

        // Search by freelace type
        await contractPage.clickSearchByContractType();
        await contractPage.clickFreeLanceType();
        await basePage.clickSearch();
        await contractPage.verifyFreeLanceType();
    });

    test('Search by start date', async ({ page }) => {
        await contractPage.clickStartDateSearch();
        await basePage.clickTodayDatePicker();
        await basePage.clickSearch();
        await contractPage.verifyStartDateSearchResult();
        await basePage.clickClearSearch();

    });

    test('Search by code', async ({ page }) => {
        await contractPage.fillSearchByCode('HD0001');
        await basePage.clickSearch();
        await contractPage.verifySearchByCodeResult();

        // search by code not exist
        await contractPage.fillSearchByCode('Testttt258963');
        await basePage.clickSearch();
        await basePage.verifyNoExistData();
    });

    test('Search by name', async ({ page }) => {
        await contractPage.fillSearchByName('Nguyễn Văn Minh');
        await basePage.clickSearch();
        await contractPage.verifySearchByNameResult();

        // search by name not exist
        await contractPage.fillSearchByName('Testttt258963');
        await basePage.clickSearch();
        await basePage.verifyNoExistData();
    });

    test('Delete contract', async ({ page }) => {
        await basePage.clickRow0();
        await basePage.clickDelete();
        await toastPage.getToastDeleteSuccess();
    });
});
