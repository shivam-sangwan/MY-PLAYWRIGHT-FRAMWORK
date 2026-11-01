
const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './src/tests',
  timeout: 120000,  //timeout of a test method (default 30 seconds)
  expect: { timeout: 30000 },
  fullyParallel: true,
  retries: 0,
  workers: 5,
  forbidOnly: process.env.CI? true : false, // Prevent test.only() from running in CI
  failOnFlakyTests: true, // Fail the test run if any test passes only after a retry
  maxFailures: process.env.CI ? 10 : 0, // Stop execution after 10 failures in CI
  globalTimeout: 0, // No overall timeout for the complete test suite
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['allure-playwright', { detail: true, outputFolder: 'allure-results' }]
  ],
  use: {
    baseURL: process.env.UI_BASE_URL,
    browserName: 'chromium',
    headless: true,
    viewport: { width: 1920, height: 1080 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 30000  // timeout of perticular action like click(),fill() etc.
  },
  outputDir: 'test-results/'
});
