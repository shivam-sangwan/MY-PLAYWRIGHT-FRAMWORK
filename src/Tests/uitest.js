const { test, expect } = require('../../fixtures/testFixtures');
const { LoginPage } = require('../../pages/LoginPage');
const config = require('../../config/config');
const loginData = require('../../testdata/ui/loginTestData.json');

// Get environment configuration
const envConfig = config.getEnvironmentConfig();

test('Verify successful login', async ({ page, uiHelpers }) => {

    const loginPage = new LoginPage(page, uiHelpers);

    await loginPage.navigateToLogin(envConfig.uiUrl);

    await loginPage.enterMobileNumber(loginData.validLogin.mobileNumber);

    await loginPage.enterDOB(loginData.validLogin.dob);

    await loginPage.clickLogin();

    await expect(page).not.toHaveURL(/\/login/);

});
