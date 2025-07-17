import { test, expect } from '../base-test';
import { allure } from "allure-playwright";
import Config from '../../utils/configUtils';
import { checkContractExists, clearEmploymentContract } from '../../db/DBHelper';
import { ValidationPage } from '../../pages/ValidationPage';
import { ToastPage } from '../../pages/ToastPage';
import { LoginPage } from '../../pages/LoginPage';
import { BasePage } from '../../pages/BasePage';
import { ContractPage } from '../../pages/contract_page/ContractPage';
import { createContractWithProbation } from './contractHelper';


test.describe.serial('Contract Tests', () => {
    let contractPage: ContractPage;
    let toastPage: ToastPage;
    let loginPage: LoginPage;
    let basePage: BasePage;
    let validationPage: ValidationPage;

    test.beforeEach(async ({ page }) => {
        allure.owner("Minh Nguyen");
        allure.feature("Contract Feature");
        allure.severity("Critical");

        validationPage = new ValidationPage(page);
        loginPage = new LoginPage(page);
        toastPage = new ToastPage(page);
        contractPage = new ContractPage(page);
        basePage = new BasePage(page);

        await loginPage.goto();
        await loginPage.login(Config.admin_username, Config.admin_password);
        await basePage.clickAdmin();
        await contractPage.clickContract();
    });


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
        await validationPage.validateMaxLength255Characters();
    });

    test('Create contract with no select term and blank note', async ({ page }) => {
        await clearEmploymentContract();
        await basePage.clickAdd();
        await contractPage.fillEmployeeName();
        await contractPage.fillSalary("10000000");
        await contractPage.selectEndDate();
        await contractPage.clickChoose();
        await contractPage.clickSave();
        await toastPage.getToastAddSuccess();
    });

    test('Edit contract type - Probation to Permanent', async ({ page }) => {
        await createContractWithProbation(basePage, contractPage, toastPage);
        await contractPage.clickRow0();
        await contractPage.clickEdit();
        await contractPage.clickContractTypeDropdown();
        await contractPage.clickFormalContract();
        await basePage.clickSave();
        await toastPage.getToastUpdateSuccess();
        await contractPage.verifyPermanentType();

    });

    test('Edit base salary', async ({ page }) => {
        await contractPage.clickRow0();
        await contractPage.clickEdit();
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

    test('E2E - Create contract with probation and confirm contract', async ({ page }) => {
        await createContractWithProbation(basePage, contractPage, toastPage);
        await contractPage.clickRow0();
        await contractPage.clickConfirm();
        await toastPage.getToastConfirmSuccess();

        // Check in DB, type 0 is probation, status 1 is confirmed
        const existsInDB = await checkContractExists('Automation test contract', 0, 1);
        expect(existsInDB).toBeTruthy();
    });

    test('Create with formal contract ', async ({ page }) => {
        await contractPage.clickAdd();
        await contractPage.fillEmployeeName();
        await contractPage.clickContractTypeDropdown();
        await contractPage.clickFormalContract();
        await contractPage.fillNote('Automation test');
        await contractPage.checkSelectAllTerm();
        await basePage.clickSave();
        await toastPage.getToastAddSuccess();

        const exitsInDB = await checkContractExists('Automation test', 1, 0);
        expect(exitsInDB).toBeTruthy();

        await contractPage.clickRow0();
        await contractPage.clickConfirm();
        await toastPage.getToastConfirmSuccess();

        // Check in DB, type 0 is probation, status 1 is confirmed
        const existsInDB = await checkContractExists('Automation test contract', 1, 1);
        expect(existsInDB).toBeTruthy();
    });

    test('E2E - Create a contract when there is an approved contract', async ({ page }) => {
        await basePage.clickAdd();
        await contractPage.fillEmployeeName();
        await contractPage.clickContractTypeDropdown();
        await contractPage.clickSeasonalContract();
        await contractPage.selectEndDate();
        await basePage.clickChoose();
        await contractPage.fillNote('Automation test');
        await contractPage.checkSelectAllTerm();
        await basePage.clickSave();
        await toastPage.getToastAddFailed();
        await validationPage.validateContractAlreadyApproved();

    });

    test('E2E - Create with seasonal contract and confirm contract', async ({ page }) => {
        await clearEmploymentContract();
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

        const exitsInDB = await checkContractExists('Automation test', 2, 0);
        expect(exitsInDB).toBeTruthy();

        await contractPage.clickRow0();
        await contractPage.clickConfirm();
        await toastPage.getToastConfirmSuccess();

        // Check in DB, type 0 is probation, status 1 is confirmed
        const existsInDB = await checkContractExists('Automation test contract', 2, 1);
        expect(existsInDB).toBeTruthy();
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

        const exitsInDB = await checkContractExists('Automation test', 3, 0);
        expect(exitsInDB).toBeTruthy();
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
        await validationPage.validateNoExistData();
    });

    test('Search by name', async ({ page }) => {
        await contractPage.fillSearchByName('Nguyễn Văn Minh');
        await basePage.clickSearch();
        await contractPage.verifySearchByNameResult();

        // search by name not exist
        await contractPage.fillSearchByName('Testttt258963');
        await basePage.clickSearch();
        await validationPage.validateNoExistData();
    });

    test('Delete contract', async ({ page }) => {
        await basePage.clickRow0();
        await basePage.clickDelete();
        await toastPage.getToastDeleteSuccess();
    });
});
