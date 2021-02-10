//database.js
const MongoClient = require("mongodb").MongoClient;
let client = null;

async function connect() {
    if (client && client.isConnected()) return client.db(process.env.DATABASE_NAME);

    if (!client)
        client = MongoClient(process.env.MONGO_CONNECTION, { useUnifiedTopology: true });

    if (!client.isConnected())
        await client.connect();

    return connect();
}

async function disconnect() {
    if (!client || !client.isConnected()) return true;
    await client.close();
    client = null;
    return true;
}

module.exports = { connect, disconnect }