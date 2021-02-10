//10.1
npm i express mongodb dotenv-safe morgan
npm i -D jest supertest

//10.2
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

//10.3
#.env, don't commit to repo 
MONGO_CONNECTION=mongodb://localhost:27017 
DATABASE_NAME=movies-service 
PORT=3000

//10.4
#.env.example, commit to repo 
MONGO_CONNECTION= 
DATABASE_NAME= 
PORT=

//10.5
//database.test.js
const database = require('./database');

test('MongoDB Connection', async () => {
    const connection = await database.connect();
    expect(connection).toBeTruthy();
})

test('MongoDB Disconnection', async () => {
    const isDisconnected = await database.disconnect();
    expect(isDisconnected).toBeTruthy();
})

//10.6
"scripts": {
    "start": "node ./src/index",
    "test": "jest"
  },

//10.7
//repository.js
const database = require("../config/database");
const { ObjectId } = require("mongodb");

async function getAllMovies() {
    const db = await database.connect();
    return db.collection("movies").find().toArray();
}

async function getMovieById(id) {
    const db = await database.connect();
    return db.collection("movies").findOne({ _id: ObjectId(id) });
}

async function getMoviePremieres() {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    const db = await database.connect();
    return db.collection("movies").find({ dataLancamento: { $gte: monthAgo } }).toArray();
}

async function disconnect() {
    return database.disconnect();
}

module.exports = { getAllMovies, getMovieById, getMoviePremieres, disconnect }

//10.8
//repository.test.js
require('dotenv-safe').config();
const repository = require('./repository');
let testId = null;

beforeAll(async () => {
    const movies = await repository.getAllMovies();
    testId = movies[0]._id;
})

test('Repository GetAllMovies', async () => {
    const movies = await repository.getAllMovies();
    expect(Array.isArray(movies)).toBeTruthy();
    expect(movies.length).toBeGreaterThan(0);
})

test('Repository GetMovieById', async () => {
    const movie = await repository.getMovieById(testId);
    expect(movie).toBeTruthy();
    expect(movie._id).toEqual(testId);
})

test('Repository GetMoviePremieres', async () => {
    const movies = await repository.getMoviePremieres();
    expect(Array.isArray(movies)).toBeTruthy();
    expect(movies.length).toBeGreaterThan(0);
})

test('Repository Disconnect', async () => {
    const isDisconnected = await repository.disconnect();
    expect(isDisconnected).toBeTruthy();
})

//10.9
db.movies.insert([{
    titulo: "Os Vingadores: Ultimato",
    sinopse: "Os heróis mais poderosos da Terra enfrentando o Thanos. De novo.",
    duracao: 181,
    dataLancamento: ISODate("2019-04-25T00:00:00Z"),
    imagem: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
    categorias: ["Aventura", "Ação"]
 },{
    titulo: "Os Vingadores: Guerra Infinita",
    sinopse: "Os heróis mais poderosos da Terra enfrentando o Thanos",
    duracao: 149,
    dataLancamento: ISODate("2018-04-26T00:00:00Z"),
    imagem: "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_UX182_CR0,0,182,268_AL_.jpg",
    categorias: ["Aventura", "Ação"]
 },{
    titulo: "Os Vingadores: Era de Ultron",
    sinopse: "Os heróis mais poderosos da Terra enfrentando o Ultron",
    duracao: 141,
    dataLancamento: ISODate("2015-04-23T00:00:00Z"),
    imagem: "https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_UX182_CR0,0,182,268_AL_.jpg",
    categorias: ["Aventura", "Ação"]
 },{
    titulo: "Os Vingadores",
    sinopse: "Os heróis mais poderosos da Terra enfrentando o Loki",
    duracao: 143,
    dataLancamento: ISODate("2012-04-27T00:00:00Z"),
    imagem: "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
    categorias: ["Aventura", "Ação"]
 }])

 //10.10
 //server.js
const express = require('express');
const morgan = require('morgan');
let server = null;

async function start(api, repository) {
    const app = express();
    app.use(morgan('dev'));

    app.use((err, req, res, next) => {
        console.error(err);
        res.sendStatus(500);
    })

    api(app, repository);

    server = app.listen(process.env.PORT);
    return server;
}

async function stop() {
    if (server) await server.close();
    return true;
}

module.exports = { start, stop }

//10.11
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

//10.12
//movies.js
module.exports = (app, repository) => {
    app.get('/movies', async (req, res, next) => {
        const movies = await repository.getAllMovies();
        if (!movies || movies.length === 0) return res.sendStatus(404);
        res.json(movies);
    })

    app.get('/movies/premieres', async (req, res, next) => {
        const movies = await repository.getMoviePremieres();
        if (!movies || movies.length === 0) return res.sendStatus(404);
        res.json(movies);
    })

    app.get('/movies/:id', async (req, res, next) => {
        const movie = await repository.getMovieById(req.params.id);
        if (!movie) return res.sendStatus(404);
        res.json(movie);
    })
}

//10.13
//movies.test.js
require('dotenv-safe').config();
const supertest = require('supertest');
const movies = require('./movies');
const server = require("../server/server");
const repository = require("../repository/repository");

var testId = null;
let app = null;

beforeAll(async () => {
    app = await server.start(movies, repository);
    const result = await repository.getAllMovies();
    testId = `${result[0]._id}`;
})

afterAll(async () => {
    await server.stop();
})

test('GET /movies', async () => {
    const response = await supertest(app)
        .get('/movies');

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
})

test('GET /movies/:id', async () => {
    const response = await supertest(app)
        .get('/movies/' + testId);

    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
    expect(response.body._id).toEqual(testId);
})

test('GET /movies/premieres', async () => {
    const response = await supertest(app)
        .get('/movies/premieres');

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
})

//10.14
//index.js
(async () => {
    require("dotenv-safe").config();
    const movies = require('./api/movies');
    const server = require("./server/server");
    const repository = require("./repository/repository");

    try {
        await server.start(movies, repository);
        console.log('Server is up and running at ' + process.env.PORT);
    } catch (error) {
        console.error(error);
    }
})();