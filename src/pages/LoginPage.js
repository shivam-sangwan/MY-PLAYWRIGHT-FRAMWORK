/**
 * Login Page Object
 * Uses BasePage + simplified UIHelpers fixture
 */

const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page, uiHelpers) {
    super(page);
    this.ui = uiHelpers; // UIHelpers fixture

    // Locators
    this.mobileNumberInput = page.getByLabel('Mobile Number');
    this.dobInput = page.getByLabel('DATE OF BIRTH');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  // Navigate to login page
  async navigateToLogin(url) {
    await this.ui.goto(url);
  }

  // Fill mobile number
  async enterMobileNumber(number) {
    await this.ui.fill(this.mobileNumberInput, number);
  }

  // Fill date of birth
  async enterDOB(dob) {
    await this.ui.fill(this.dobInput, dob);
  }

  // Click Login
  async clickLogin() {
    await this.ui.click(this.loginButton);
  }
}

module.exports = { LoginPage };