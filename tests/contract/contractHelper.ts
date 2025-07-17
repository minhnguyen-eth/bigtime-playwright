import { BasePage } from '../../pages/BasePage';
import { ContractPage } from '../../pages/contract_page/ContractPage';
import { ToastPage } from '../../pages/ToastPage';
import { checkContractExists, clearEmploymentContract } from '../../db/DBHelper';
import { expect } from '@playwright/test';

export async function createContractWithProbation(
    basePage: BasePage,
    contractPage: ContractPage,
    toastPage: ToastPage
) {
    await clearEmploymentContract();
    await basePage.clickAdd();
    await contractPage.fillEmployeeName();
    await contractPage.fillSalary("10000000");
    await contractPage.selectEndDate();
    await basePage.clickChoose();
    await contractPage.fillNote('Automation test contract');
    await contractPage.checkSelectAllTerm();
    await basePage.clickSave();
    await toastPage.getToastAddSuccess();

    const existsInDB = await checkContractExists('Automation test contract', 0, 0);
    expect(existsInDB).toBeTruthy();
}
