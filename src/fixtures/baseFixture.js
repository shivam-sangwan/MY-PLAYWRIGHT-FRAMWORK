const { test: base, expect } = require('@playwright/test');
const { UIHelpers } = require('../utils/uiHelpers');
const { APIHelpers } = require('../utils/apiHelpers');
const { MongoDBHelper } = require('../utils/mongoHelpers');
const testConfig = require('../config/config');

const envConfig = testConfig.getEnvironmentConfig();

const test = base.extend({

  //API context fixture
  apiContext: async ({ request}, use) => {  //request is a built-in fixture provided by Playwright: used to make api calls using playwright
    const ctx = await request.newContext({
      baseURL: envConfig.apiUrl,
      timeout: env.framework.apiTimeout,  //is apicontext ki har request m ye timeout apply hoga.
    });

    await use(ctx);  //use is a function provided by Playwright that allows us to pass the created API context to the tests that need it. After the test is done, the code after use will be executed, which in this case disposes of the API context to free up resources.
    await ctx.dispose();
  },


  //UI Helpers fixture
  uiHelpers: async ({ page }, use) => {
    const helpers = new UIHelpers(page);
    await use(helpers);
  },


  //API Helpers fixture
  apiHelpers: async ({ apiContext }, use) => {
    const helpers = new APIHelpers(apiContext);
    await use(helpers);
  },


  //MongoDB fixture
  mongoDb: async ({}, use) => {
    const mongoHelper = new MongoDBHelper(envConfig.dbUrl);
    await use(mongoHelper);
    await mongoHelper.disconnect();
  },

});

module.exports = { test, expect };
