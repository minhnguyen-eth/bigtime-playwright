import { defineConfig } from '@playwright/test';

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
    headless: true,                 // ✅ Headless để chạy nhanh, không lag
    viewport: { width: 1920, height: 1080 }, // ✅ Viewport lớn, đảm bảo giao diện desktop
    launchOptions: {
      args: ['--start-maximized'],  // ✅ Bổ sung args cho Chromium
    },
    trace: 'on-first-retry',
    actionTimeout: 45000,
  },

  projects: [
    {
      name: 'chromium',
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
    //   {
    //     name: 'edge',
    //     use: {
    //       headless: false,
    //       viewport: null,
    //       channel: 'msedge',
    //       launchOptions: {
    //         args: ['--start-maximized'],
    //       },
    //     },
    //   },
  ],
});
