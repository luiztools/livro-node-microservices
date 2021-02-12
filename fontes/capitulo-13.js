//13.1
$2y$12$0dUJn..Q0hbk0EWS14DRpeh0NQtkE.NApQO5xoGIigqDuGR9AdeyK 

//13.2
SET luiztools $2y$12$0dUJn..Q0hbk0EWS14DRpeh0NQtkE.NApQO5xoGIigqDuGR9AdeyK

//13.3
npm i bcryptjs

//13.4
const redis = require('./redisClient');
const bcrypt = require('bcryptjs');
app.post('/login', express.json(), async (req, res, next) => {
    const value = await redis.getValue(req.body.username);
    const isValid = bcrypt.compareSync(req.body.password, value);
    if (isValid)
        res.sendStatus(200);
    else
        res.sendStatus(401);
})

//13.5
npm i jsonwebtoken dotenv-safe

//13.6
# .env.example, commit to repo
SECRET=

//13.7
# .env, don't commit to repo
SECRET=mysecret

//13.8
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

//13.9
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

//13.10
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