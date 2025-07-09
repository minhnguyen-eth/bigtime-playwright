import { defineConfig } from '@playwright/test';

const isHeadless = process.env.HEADLESS !== 'false';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 2,
  workers: 1,
  timeout: 60000,

  reporter: [
    ['list'],
    ['allure-playwright'],
    ['html', { open: 'never' }]
  ],

  use: {
    headless: isHeadless, // true run in headless mode. false run with browser window opened.
    viewport: isHeadless ? { width: 1920, height: 1080 } : null,
    launchOptions: {
      args: ['--start-maximized'],
    },
    trace: 'on-first-retry',
    actionTimeout: 45000,
  },

  projects: [
    {
      name: 'chromium',
    },
  ],
});
