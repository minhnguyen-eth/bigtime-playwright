import { Page } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';
import Config from '../../utils/configUtils';
import { EvaluationCriteriaPage } from '../../pages/evaluation_page/EvaluationCriteriaPage';
import { ToastPage } from '../../pages/ToastPage';

export async function createCriteria(page: Page) {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const evaluationCriteriaPage = new EvaluationCriteriaPage(page);
    const toastPage = new ToastPage(page);

    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const EvaluationCriteriaNameRandom = `Automation test ${randomSuffix}`;
    await homePage.clickAdmin();
    await evaluationCriteriaPage.clickEvaluationCriteria();
    await evaluationCriteriaPage.clickAddButton();
    await evaluationCriteriaPage.clickCancelAddButton();
    await evaluationCriteriaPage.clickAddButton();
    await evaluationCriteriaPage.setEvaluationCriteriaName(EvaluationCriteriaNameRandom);
    await evaluationCriteriaPage.setDescription('Automation Test Description');
    await evaluationCriteriaPage.clickEvaluationCriteriaNameDropDown();
    await evaluationCriteriaPage.clickEvaluationTypeOption();
    await evaluationCriteriaPage.clickSave();
    await toastPage.getToastAddSuccess();

}