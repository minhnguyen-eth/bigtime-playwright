import { test, TestInfo } from '@playwright/test';
import { ToastPage } from '../../pages/ToastPage';
import { LoginPage } from '../../pages/LoginPage';
import { ContractPage } from '../../pages/contract_page/ContractPage';
import { BasePage } from '../../pages/BasePage';
import { takeScreenshotOnFailure } from '../../utils/screenshotUtils';
import Config from '../../utils/configUtils';
import { clearEmploymentContract } from '../../utils/mysqlUtils';

test.describe.serial('Contract Tests', () => {

    let contractPage: ContractPage;
    let toastPage: ToastPage;
    let loginPage: LoginPage;
    let basePage: BasePage;

    test.beforeEach(async ({ page }) => {

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

    test('Create contract with probation', async ({ page }) => {
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

});

