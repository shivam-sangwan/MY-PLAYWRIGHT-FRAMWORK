// playwright.config.js
const { defineConfig } = require('@playwright/test');
const testConfig = require('./src/config/config'); // Unified TestConfig

const framework = testConfig.get().framework;
const env = testConfig.get().environment;

module.exports = defineConfig({
  testDir: './src/tests',

  // Global test timeout (per test)
  timeout: framework.testTimeout,

  // Global expect timeout (for assertions)
  expect: { timeout: framework.expectTimeout },

  // Test execution
  fullyParallel: true,
  retries: framework.retries,
  workers: framework.workers,

  // Reporting
  reporter: [
    ['list'],
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['allure-playwright', { detail: true, outputFolder: 'allure-results' }]
  ],

  // Shared settings for all tests
  use: {
    baseURL: env.baseUrl,
    headless: framework.headless,
    ignoreHTTPSErrors: true,
    viewport: framework.viewport,
    screenshot: framework.screenshot,
    video: framework.video,
    trace: framework.trace,
    actionTimeout: framework.actionTimeout,
  },

  // Define projects for UI / API / DB tests
  projects: [
    {
      name: 'ui-tests',
      testMatch: '**/ui/**',
      use: { browserName: 'chromium' },
    },
    {
      name: 'api-tests',
      testMatch: '**/api/**',
      use: { browserName: 'chromium' },
    },
    {
      name: 'db-tests',
      testMatch: '**/db/**',
      use: { browserName: 'chromium' },
    }
  ],

  // Global setup for environment initialization
  globalSetup: require.resolve('./src/setup/global-setup.js'),

  // Test output directory
  outputDir: 'test-results/',
});