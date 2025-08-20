import { clearEmployees, checkContractExists, importContractsFromCSV } from '../../db/helpers/DBHelper';
import { BasePage } from '../../pages/BasePage';
import { ContractPage } from '../../pages/contract_page/ContractPage';
import { ToastPage } from '../../pages/ToastPage';
import { expect } from '@playwright/test';


export async function createContractWithProbation(
    basePage: BasePage,
    contractPage: ContractPage,
    toastPage: ToastPage
) {
    await clearEmployees();
    await contractPage.clickAdd();
    await contractPage.fillEmployeeName();
    await contractPage.fillSalary("10000000");
    await contractPage.selectEndDate();
    await contractPage.fillNote('Automation test contract');
    await contractPage.clickUncheckEditor();
    await contractPage.checkSelectAllTerm();
    await contractPage.clickSave();
    await toastPage.getToastAddSuccess();

    const existsInDB = await checkContractExists('Automation test contract', 0, 0);
    expect(existsInDB).toBeTruthy();
}

export async function importContracts() {
    await importContractsFromCSV('contract.csv');
}


