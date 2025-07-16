import { test as base, expect, type Page, type TestInfo } from '@playwright/test';
import { takeScreenshotOnFailure } from '../utils/screenshotUtils';

// Có thể extend thêm fixture ở đây nếu cần sau này
const test = base.extend<{}>({});

// Đặt hook sau khi extend
test.afterEach(async ({ page }, testInfo: TestInfo) => {
  await takeScreenshotOnFailure(page, testInfo);
});

export { test, expect };
