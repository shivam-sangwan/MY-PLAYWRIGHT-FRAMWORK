// global-setup.js
const { MongoDBHelper } = require('../utils/mongoHelpers');
const testConfig = require('../config/config');

module.exports = async () => {
  console.log('Running Global Setup...');

  const config = testConfig.get();

  console.log(`[ENV] Active Environment: ${config.env}`);
  console.log(`[ENV] baseUrl: ${config.environment.baseUrl}`);
  console.log(`[ENV] apiBaseUrl: ${config.environment.apiBaseUrl}`);
  console.log(`[Framework] timeout: ${config.framework.timeout}`);

  const mongoHelper = new MongoDBHelper();

  try {
    await mongoHelper.connect();
    console.log('[MongoDB] Connection successful');
  } catch (err) {
    console.warn('[MongoDB] Setup failed:', err.message);
  } finally {
    await mongoHelper.disconnect();
  }
};