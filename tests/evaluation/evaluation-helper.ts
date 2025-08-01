import { Page } from '@playwright/test';
import { EvaluationCriteriaPage } from '../../pages/evaluation_page/EvaluationCriteriaPage';
import { ToastPage } from '../../pages/ToastPage';
import { BasePage } from '../../pages/BasePage';

export async function createCriteria(
    basePage: BasePage,
    evaluationCriteriaPage: EvaluationCriteriaPage,
    toastPage: ToastPage
) {
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const EvaluationCriteriaNameRandom = `Automation test ${randomSuffix}`;

    await basePage.clickAdmin();
    await evaluationCriteriaPage.clickEvaluationCriteria();
    await basePage.clickAdd();
    await evaluationCriteriaPage.setEvaluationCriteriaName(EvaluationCriteriaNameRandom);
    await evaluationCriteriaPage.fillDescription('Automation Test Description');
    await evaluationCriteriaPage.clickEvaluationCriteriaNameDropDown();
    await evaluationCriteriaPage.clickEvaluationTypeOption();
    await basePage.clickSave();
    await toastPage.getToastAddSuccess();
}