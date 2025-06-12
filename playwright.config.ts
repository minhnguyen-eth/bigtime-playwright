import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  // ✅ Chạy tuần tự từng test
  workers: 2,

  // ✅ Dùng HTML reporter
  reporter: 'html',

  // Increase test timeout
  timeout: 60000,

  // ✅ Dùng chung cấu hình trace
  use: {
    trace: 'on-first-retry',
    // Increase action timeout to handle slow UI responses
    actionTimeout: 45000,
  },

  // ✅ Dự án trình duyệt
  projects: [
    {
      name: 'chromium',
      use: {
        headless: process.env.CI ? true : false,
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },
    // {
    //   name: 'firefox',
    //   use: {
    //     headless: false,
    //     viewport: null,
    //     launchOptions: {
    //       args: ['--start-maximized'],
    //     },
    //   },
    // },
    // {
    //   name: 'edge',
    //   use: {
    //     headless: false,
    //     viewport: null,
    //     channel: 'msedge',
    //     launchOptions: {
    //       args: ['--start-maximized'],
    //     },
    //   },
    // },
  ],
});
