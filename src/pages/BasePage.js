/**
 * Base Page Object Model
 * Common elements for all page objects
 */

class BasePage {
    constructor(page, uiHelpers) {
      this.page = page;
      this.ui = uiHelpers; // UIHelpers fixture
  
      // Common elements
      this.body = page.locator('body');
      this.title = page.locator('h1');
    }
  
    // Validate that body contains expected text
    async validatePageContent(expectedText) {
      const bodyContent = await this.body.textContent();
      return bodyContent.includes(expectedText);
    }
  }
  
  module.exports = { BasePage };
