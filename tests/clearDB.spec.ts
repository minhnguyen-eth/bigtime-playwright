import { test } from '@playwright/test';
import { clearAllEvaluationCriterias } from '../utils/mysqlUtils';

test('Clear All Evaluation Criterias', async () => {
  await clearAllEvaluationCriterias();
});
