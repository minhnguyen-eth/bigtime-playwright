import { Page } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import Config from '../../utils/configUtils';
import { EvaluationCriteriaPage } from '../../pages/evaluation_page/EvaluationCriteriaPage';
import { ToastPage } from '../../pages/ToastPage';
import { BasePage } from '../../pages/BasePage';



export async function createCriteria(page: Page) {


    const evaluationCriteriaPage = new EvaluationCriteriaPage(page);
    const toastPage = new ToastPage(page);
    const basePage = new BasePage(page);

    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const EvaluationCriteriaNameRandom = `Automation test ${randomSuffix}`;
    await basePage.clickAdmin();
    await evaluationCriteriaPage.clickEvaluationCriteria();
    await basePage.clickAdd();
    await evaluationCriteriaPage.clickCancelAddButton();
    await basePage.clickAdd();
    await evaluationCriteriaPage.setEvaluationCriteriaName(EvaluationCriteriaNameRandom);
    await evaluationCriteriaPage.setDescription('Automation Test Description');
    await evaluationCriteriaPage.clickEvaluationCriteriaNameDropDown();
    await evaluationCriteriaPage.clickEvaluationTypeOption();
    await basePage.clickSave();
    await toastPage.getToastAddSuccess();

}