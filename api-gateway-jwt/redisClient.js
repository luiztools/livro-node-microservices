//redisClient.js
const redis = require('redis');
let client = null;

function getConnection() {
    if (client) return client;
    client = redis.createClient();

    this.client.on("error", (error) => {
        logger('system', error);
    })

    this.client.connect();

    return client;
}

function getValue(key) {
    return getConnection().get(key);
}

module.exports = { getValue }