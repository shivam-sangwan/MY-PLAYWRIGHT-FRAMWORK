const { test, expect } = require('../../../fixtures/fixtures');

test('Verify CAP and KFS database records', async ({ mongoDb }) => {

  // CAP database
  const capRecord = await mongoDb.findOne(
    'CAP',
    'users',
    { mobileNumber: '9876543210' }
  );

  // KFS database
  const kfsRecord = await mongoDb.findOne(
    'KFS',
    'applications',
    { applicationId: 'APP001' }
  );

  console.log(capRecord);
  console.log(kfsRecord);

});
