import fs from 'fs';
import path from 'path';
import { Page, TestInfo } from '@playwright/test';

export async function takeScreenshotOnFailure(page: Page, testInfo: TestInfo): Promise<void> {
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshotsDir = path.join(__dirname, '..', 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir);
    }

    // Tạo tên file từ tên test, an toàn cho hệ thống tệp
    const safeTitle = testInfo.title.replace(/[^a-z0-9\-]/gi, '_').toLowerCase();
    const filePath = path.join(screenshotsDir, `${safeTitle}.png`);

    await page.screenshot({ path: filePath, fullPage: true });
    console.log(`📸 Screenshot saved: ${filePath}`);
  }
}
