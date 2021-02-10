//server.test.js
require('dotenv-safe').config();
const server = require('./server');

function apiMock(app, repo) {
    console.log("do nothing");
}

test('Server Start', async () => {
    const instance = await server.start(apiMock, null);
    expect(instance).toBeTruthy();
})

test('Server Stop', async () => {
    const isStopped = await server.stop();
    expect(isStopped).toBeTruthy();
})