//database.test.js
require('dotenv-safe').config();
const database = require('./database');

test('MongoDB Connection', async () => {
    const connection = await database.connect();
    expect(connection).toBeTruthy();
})

test('MongoDB Disconnection', async () => {
    const isDisconnected = await database.disconnect();
    expect(isDisconnected).toBeTruthy();
})