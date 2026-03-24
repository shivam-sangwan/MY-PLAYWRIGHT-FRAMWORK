const { test, expect } = require('../../fixtures/baseFixture');
const { LoginPage } = require('../../pages/LoginPage');
const testConfig = require('../../config/config');

test.describe('CAAS CAP Login Flow', () => {

  let loginPage;

  test.beforeEach(async ({ page, uiHelpers }) => {
    // Pass uiHelpers fixture to the page object
    loginPage = new LoginPage(page, uiHelpers);
  });

  test.only('Verify user can login successfully @smoke @critical', async () => {
    // Get login URL from config instead of hardcoding
    const loginUrl = testConfig.get().environment.baseUrl;

    // Step-by-step login flow
    await loginPage.navigateToLogin(loginUrl);
    await loginPage.enterMobileNumber('7042139289');
    await loginPage.enterDOB('13/09/1997');
    await loginPage.clickLogin();

  });

});