const { test, expect } = require('../../fixtures/testFixtures');
const { LoginPage } = require('../../pages/LoginPage');
const config = require('../../config/config');
const loginData = require('../../testdata/ui/loginTestData.json');

const envConfig = config.getEnvironmentConfig();

let loginPage;

test.beforeEach(async ({ page, uiHelpers }, testInfo) => {  //testInfo: built-in Playwright object, provides information about the currently executing test => title, passed, failed
    console.log(`Running Test: ${testInfo.title}`);
    loginPage = new LoginPage(page, uiHelpers);
});

test('Verify successful login', async ({ page }) => {
    await loginPage.navigateToLogin(envConfig.uiUrl);
    await loginPage.enterMobileNumber(loginData.validLogin.mobileNumber);
    await loginPage.enterDOB(loginData.validLogin.dob);
    await loginPage.clickLogin();
    await expect(page).not.toHaveURL(/\/login/);
});

test('Verify login with invalid credentials', async ({ page }) => {
    await loginPage.navigateToLogin(envConfig.uiUrl);
    await loginPage.enterMobileNumber(loginData.invalidLogin.mobileNumber);
    await loginPage.enterDOB(loginData.invalidLogin.dob);
    await loginPage.clickLogin();
    await expect(page).toHaveURL(/\/login/);
});

test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === testInfo.expectedStatus) {
        console.log(`Passed: ${testInfo.title}`);
    } else {
        console.error(`Failed: ${testInfo.title}`);
    }
});
