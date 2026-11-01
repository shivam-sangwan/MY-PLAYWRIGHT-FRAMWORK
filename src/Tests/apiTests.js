
const { test, expect } = require('../../../fixtures/fixtures');

const headers = {
  Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
  'Content-Type': 'application/json'
};

const getParams = {
  status: 'active',
  page: 1
};

const postData = {
  name: 'Shivam',
  email: 'shivam@example.com',
  status: 'active'
};

test('Verify GET API response', async ({ apiHelpers }) => {
  const response = await apiHelpers.get('/users', {
    headers,
    params: getParams
  });
  expect(response.status).toBe(200);
  expect(response.ok).toBeTruthy();
  console.log(response.body);
});

test('Verify POST API response', async ({ apiHelpers }) => {
  const response = await apiHelpers.post('/users', {
    headers,
    data: postData
  });
  expect(response.status).toBe(201);
  expect(response.ok).toBeTruthy();
  console.log(response.body);
});
