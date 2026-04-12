const { test, expect } = require('../../fixtures/baseFixture');

test.describe('CAP API Basic Tests', () => {

  test('Fetch country codes @api', async ({ apiHelpers }) => {
    const response = await apiHelpers.get('/external/cap/api/login/country-code');

    console.log('Status:', response.status);
    console.log('Body:', response.body);

    expect(response.status).toBe(200);
    expect(response.ok).toBeTruthy();
  });

  test('Login API @api', async ({ apiHelpers }) => {        //apiHelpers fixture is used(refers to already created object in fixture) instead of creating object each time here
    const response = await apiHelpers.post('/external/cap/api/login', {
      mobileNumber: '7042139289',
      dateOfBirth: '13/09/1997'
    });

    console.log('Status:', response.status);
    console.log('Body:', response.body);

    expect(response.status).toBe(200);
    expect(response.ok).toBeTruthy();
  });

  test('Validate OTP API @api', async ({ apiHelpers }) => {
    const response = await apiHelpers.post('/external/cap/api/validate-otp', {
      sessionId: 'sample-session-id',
      otp: '123456'
    });

    console.log('Status:', response.status);
    console.log('Body:', response.body);

    expect([200, 400]).toContain(response.status);
  });

});
