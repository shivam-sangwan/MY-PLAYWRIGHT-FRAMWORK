//config file of project

//setting environment variables
const dotenv = require('dotenv');
dotenv.config();

//selecting ui,api,db base urls based on environment
class TestConfig {
    getEnvironmentConfig() {
        const env = (process.env.TEST_ENV || 'qa').toUpperCase();
        const config = {
            env: env.toLowerCase(),
            uiUrl: process.env[`${env}_BASE_URL`],
            apiUrl: process.env[`${env}_API_BASE_URL`],
            dbUrl: process.env[`${env}_MONGODB_URL`]
        };

        if (!config.uiUrl) throw new Error(`UI URL not defined for ${env}`);
        if (!config.apiUrl) throw new Error(`API URL not defined for ${env}`);
        if (!config.dbUrl) throw new Error(`MongoDB URL not defined for ${env}`);

        console.log('\n========== TEST CONFIGURATION ==========');
        console.log(`Environment : ${config.env.toUpperCase()}`);
        console.log(`UI URL      : ${config.uiUrl}`);
        console.log(`API URL     : ${config.apiUrl}`);
        console.log(`DB URL      : ${config.dbUrl.replace(/\/\/.*@/, '//***:***@')}`);
        console.log('========================================\n');

        return config;
    }
}

module.exports = new TestConfig();
