/**
 * Unified Test Configuration (Framework + Env + DB Support)
 */

const dotenv = require('dotenv');
dotenv.config();

class TestConfig {
  constructor() {
    this.env = (process.env.TEST_ENV || 'qa').toLowerCase(); 
    this.framework = this.getFrameworkConfig();     //stores object containing: timeouts, retries, workers, headless etc.
    this.environment = this.getEnvironmentConfig();  //stores object containing: baseUrl, apiBaseUrl 
    this.database = this.getDatabaseConfig();        //stores object containing: mongoUrl, databases (cap-service, kfs-service)
  }

  // ===============================
  // Framework Defaults
  // ===============================
  getFrameworkConfig() {
    return {
      // ===============================
      // Core Timeouts
      // ===============================
      testTimeout: process.env.CI ? 180000 : 90000,       // CI pr time zyada lgta h
      actionTimeout: process.env.CI ? 60000 : 30000,      
      expectTimeout: process.env.CI ? 15000 : 5000,   
      apiTimeout: process.env.CI ? 30000 : 10000,         //maximum waiting time for a response. If the server takes longer than the specified timeout to respond, the request will be aborted and an error will be thrown.
  
      // ===============================
      // Execution Controls
      // ===============================
      retries: process.env.CI ? 2 : 0,
      workers: process.env.CI ? 1 : undefined,  //CI me single thread me run krna h taki logs easily samajh aaye, local me jitne cores honge system m(macbbok m4 m 11 cores h) utne threads chalenge.
      headless: process.env.CI ? true : false,
  
      // ===============================
      // Viewport & Media Settings
      // ===============================
      viewport: {
        width: process.env.CI ? 1920 : 1280,   // CI: full HD | Local: default 1280
        height: process.env.CI ? 1080 : 720
      },
  
      // ===============================
      // Capture & Debugging
      // ===============================
      screenshot: process.env.CI ? 'on' : 'only-on-failure',
      video: process.env.CI ? 'on' : 'retain-on-failure',
      trace: process.env.CI ? 'on' : 'on-first-retry',
    };
  }

  // ===============================
  // Environment URLs
  // ===============================
  getEnvironmentConfig() {
    const environments = {

      dev: {
        baseUrl: process.env.DEV_BASE_URL || 'https://dev.shivam.com/external/shivam/login',
        apiBaseUrl: process.env.DEV_API_BASE_URL || 'https://apidev.shivam.com'
      },

      qa: {
        baseUrl: process.env.QA_BASE_URL || 'https://qa.shivam.com/external/shivam/login',  //this fallback value is getting used when we are running test on jenkins, as in jenkinsfile environments section we havent defined QA_BASE_URL variable.
        apiBaseUrl: process.env.QA_API_BASE_URL || 'https://apiqa.shivam.com'
      },

      uat: {
        baseUrl: process.env.UAT_BASE_URL || 'https://uat.shivam.com/external/shivam/login',
        apiBaseUrl: process.env.UAT_API_BASE_URL || 'https://apiuat.shivam.com'
      },

    };

    if (!environments[this.env]) {
      throw new Error(`Invalid TEST_ENV: ${this.env}`);
    }

    return environments[this.env];
  }

  // ===============================
  // Database Configuration
  // ===============================
  getDatabaseConfig() {
    const mongoUrl = process.env[`${this.env.toUpperCase()}_MONGODB_URL`];

    if (!mongoUrl) {
      throw new Error(`MongoDB URL not defined for environment: ${this.env}`);
    }

    return {
        mongoUrl,
        // Multiple service databases
        databases: {
          CAP: 'cap-service',
          KFS: 'kfs-service'
                   }
            };
  }

  // ===============================
  // Unified Getter
  // ===============================
  get() {
    return {
      env: this.env,
      framework: this.framework,
      environment: this.environment,
      database: this.database
    };
  }
}

module.exports = new TestConfig();