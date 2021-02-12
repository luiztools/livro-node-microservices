//redisClient.js
const redis = require('promise-redis')();
let client = null;

function getConnection() {
    if (client) return client;
    client = redis.createClient();

    client.on("error", (error) => {
        console.error(error);
    });

    return client;
}

function getValue(key) {
    return getConnection().get(key);
}

module.exports = { getValue }