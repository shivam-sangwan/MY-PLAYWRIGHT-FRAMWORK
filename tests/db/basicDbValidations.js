const { test, expect } = require('../../fixtures/baseFixture');

test.describe.configure({ mode: 'parallel' });

test.describe('CAP API Tests - MongoDB', () => {

  const SERVICE = 'CAP'; // Explicit service selection

  test('Fetch retryLock document @mongodb', async ({ mongoDb }) => {
    const doc = await mongoDb.findOne(
      'retryShedlock',
      { _id: 'retryLock' },
      SERVICE
    );

    if (doc) console.log('[INFO] Found retryLock document:', doc);
    else console.warn('[WARN] retryLock document not found');

    expect(doc).not.toBeNull();
  });

  test('Insert new retryLock document @mongodb', async ({ mongoDb }) => {

    const newRetryLock = {
      _id: 'retryLock_test',
      lockUntil: new Date(Date.now() + 60000),
      lockedAt: new Date(),
      lockedBy: 'playwright-test',
      createdBy: 'automation'
    };

    const result = await mongoDb.insertOne(
      'retryShedlock',
      newRetryLock,
      SERVICE
    );

    console.log('[INFO] Inserted new document with _id:', result.insertedId);

    expect(result.insertedId).toBe('retryLock_test');
  });

  test('Update environment field @mongodb', async ({ mongoDb }) => {

    const updateResult = await mongoDb.updateOne(
      'retryShedlock',
      { _id: 'retryLock_test' },
      { $set: { environment: 'UAT Update' } },
      {},
      SERVICE
    );

    console.log(`[INFO] Updated ${updateResult.modifiedCount} document(s)`);

    expect(updateResult.modifiedCount).toBe(1);
  });

  test('Delete environment field @mongodb', async ({ mongoDb }) => {

    const updateResult = await mongoDb.updateOne(
      'retryShedlock',
      { _id: 'retryLock_test' },
      { $unset: { environment: '' } },
      {},
      SERVICE
    );

    console.log('[INFO] Deleted environment field from document');

    expect(updateResult.modifiedCount).toBe(1);
  });

});