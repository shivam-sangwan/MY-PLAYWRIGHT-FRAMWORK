const { test: base, expect } = require('@playwright/test');
const { UIHelpers } = require('../utils/uiHelpers');
const { APIHelpers } = require('../utils/apiHelpers');
const { MongoDBHelper } = require('../utils/mongoHelpers');
const testConfig = require('../config/config');

const test = base.extend({

  //Environment fixture (worker scoped)
  env: [async ({}, use) => {
    const config = testConfig.get();

    console.log(`[ENV] Active environment: ${config.env}`);
    console.log(`[ENV] baseUrl: ${config.environment.baseUrl} | apiBaseUrl: ${config.environment.apiBaseUrl}`);

    await use({
      name: config.env,
      config: config.environment,   // baseUrl + apiBaseUrl
      framework: config.framework  // framework settings
    });

  }, { scope: 'worker' }],


  //API context fixture
  apiContext: async ({ request, env }, use) => {  //request is a built-in fixture provided by Playwright: used to make api ca;ls using playwright, and env is our custom environment fixture
    const ctx = await request.newContext({
      baseURL: env.config.apiBaseUrl,
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
    const mongoHelper = new MongoDBHelper();
    await use(mongoHelper);
    await mongoHelper.disconnect();
  },

});

module.exports = { test, expect };
