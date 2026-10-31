/**
 * Base Page Object Model
 * Common elements for all page objects
 */

class BasePage {
    constructor(page, uiHelpers) {
      //common variables
      this.page = page;
      this.ui = uiHelpers; // UIHelpers fixture
  
    }
  
    //common methods
   async getCurrentURL() {
        return await this.uiHelpers.getCurrentURL();
    }

    async refreshPage() {
        await this.uiHelpers.refreshPage();
    }
  }
  
  module.exports = { BasePage };
