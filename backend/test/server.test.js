const assert = require('node:assert/strict');
const http = require('node:http');
const test = require('node:test');

const { app } = require('../server');

function listen(appInstance) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(appInstance);
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

function close(server) {
  return new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
}

test('GET /api/status reports a healthy service', async (t) => {
  const server = await listen(app);
  t.after(() => close(server));

  const address = server.address();
  const response = await fetch(`http://127.0.0.1:${address.port}/api/status`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    status: 'ok',
    message: 'Portfolio backend is live.'
  });
});

test('GET /api/projects returns the curated project catalog', async (t) => {
  const server = await listen(app);
  t.after(() => close(server));

  const address = server.address();
  const response = await fetch(`http://127.0.0.1:${address.port}/api/projects`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(body.projects));
  assert.ok(body.projects.length >= 3);
  assert.ok(body.projects.every((project) => project.title && project.github));
});
