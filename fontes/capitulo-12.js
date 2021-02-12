//12.1
npm i express morgan express-http-proxy

//12.2
//index.js
const httpProxy = require('express-http-proxy');
const express = require('express');
const app = express();
var logger = require('morgan');

app.use(logger('dev'));

function selectProxyHost(req) {
    if (req.path.startsWith('/movies'))
        return 'http://localhost:3000/';
    else if (req.path.startsWith('/cinemas') || req.path.startsWith('/cities'))
        return 'http://localhost:3001/';
}

app.use((req, res, next) => {
    httpProxy(selectProxyHost(req))(req, res, next);
});

app.listen(10000, () => {
    console.log('API Gateway running!');
});

//12.3
./src/redis-server

//12.4
./src/redis-cli

//12.5
SET /movies http://localhost:3000/
SET /cities http://localhost:3001/
SET /cinemas http://localhost:3001/

//12.6
npm i promise-redis

//12.7
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

//12.8
const redis = require('./redisClient');
function selectProxyHost(req) {
    return redis.getValue(req.path);
}

app.use(async (req, res, next) => {
    httpProxy(await selectProxyHost(req))(req, res, next);
});