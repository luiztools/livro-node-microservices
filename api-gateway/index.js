//index.js
const httpProxy = require('express-http-proxy');
const express = require('express');
const app = express();
var logger = require('morgan');

app.use(logger('dev'));

const redis = require('./redisClient');
function selectProxyHost(req) {
    return redis.getValue(req.path);
}

app.use(async (req, res, next) => {
    httpProxy(await selectProxyHost(req))(req, res, next);
});

app.listen(10000, () => {
    console.log('API Gateway running!');
});