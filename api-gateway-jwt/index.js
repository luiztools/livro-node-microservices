//index.js
require("dotenv-safe").config();
const redis = require('./redisClient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const httpProxy = require('express-http-proxy');

const express = require('express');
const app = express();

const logger = require('morgan');
app.use(logger('dev'));

app.post('/login', express.json(), async (req, res, next) => {
    const value = await redis.getValue(req.body.username);
    const isValid = bcrypt.compareSync(req.body.password, value);
    if (isValid) {
        const expiresIn = parseInt(process.env.EXPIRES);
        const token = jwt.sign({ username: value }, process.env.SECRET, { expiresIn });
        res.json({ token });
    }
    else
        res.sendStatus(401);
})

function selectProxyHost(req) {
    return redis.getValue(req.path);
}

function verifyJWT(req, res, next) {
    let token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);
    console.log(token);
    token = token.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        console.log(decoded);
        res.locals.username = decoded.username;
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(401);
    }
}

app.use(verifyJWT);

app.use(async (req, res, next) => {
    httpProxy(await selectProxyHost(req))(req, res, next);
});

app.listen(10000, () => {
    console.log('API Gateway running!');
});