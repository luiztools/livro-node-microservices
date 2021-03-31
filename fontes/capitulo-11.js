//11.1
{
    "name": "cinema-catalog-service",
        "version": "1.0.0",
            "description": "",
                "main": "index.js",
                    "scripts": {
        "start": "node ./src/index",
            "test": "jest"
    },
    "keywords": [],
        "author": "",
            "license": "ISC"
}

//11.2
npm i express morgan mongodb dotenv-safe express-async-errors
npm i -D supertest jest
jest --init

//11.3
./mongod --dbpath/pasta-do-seu-microservice/data --port 27018

//11.4
./mongo --port 27018

//11.5
use cinema-catalog-service

//11.6
db.cinemaCatalog.insert([{
    cidade: "Gravataí",
    uf: "RS",
    cinemas: []
},
{
    cidade: "Porto Alegre",
    uf: "RS",
    pais: "BR",
    cinemas: [
        {
            _id: ObjectId(),
            nome: "Cinemark Bourbon Ipiranga",
            salas: [
                {
                    nome: 'Sala 1',
                    sessoes: [
                        {
                            data: ISODate("2021-02-10T09:00:00Z"),
                            idFilme: ObjectId("5aefc5029ce83b1eb6b89e57"),
                            filme: "Vingadores: Guerra Infinita",
                            valor: 25.00,
                            assentos: [
                                { numero: 1, disponivel: true },
                                { numero: 2, disponivel: false },
                            ]
                        },
                        {
                            data: ISODate("2021-02-10T11:00:00Z"),
                            idFilme: ObjectId("5aefc5029ce83b1eb6b89e57"),
                            filme: "Vingadores: Guerra Infinita",
                            valor: 25.00,
                            assentos: [
                                { numero: 1, disponivel: true },
                                { numero: 2, disponivel: true },
                            ]
                        },
                        {
                            data: ISODate("2021-02-10T13:00:00Z"),
                            idFilme: ObjectId("5aefc5029ce83b1eb6b89e58"),
                            filme: "Vingadores: Era de Ultron",
                            valor: 20.00,
                            assentos: [
                                { numero: 1, disponivel: true },
                                { numero: 2, disponivel: false },
                                { numero: 2, disponivel: true },
                            ]
                        }
                    ]
                },
                {
                    nome: 'Sala 2',
                    sessoes: [
                        {
                            data: ISODate("2021-02-10T09:00:00Z"),
                            idFilme: ObjectId("5aefc5029ce83b1eb6b89e58"),
                            filme: "Vingadores: Era de Ultron",
                            valor: 25.00,
                            assentos: [
                                { numero: 1, disponivel: true },
                                { numero: 2, disponivel: false },
                            ]
                        },
                        {
                            data: ISODate("2021-02-10T11:00:00Z"),
                            idFilme: ObjectId("5aefc5029ce83b1eb6b89e58"),
                            filme: "Vingadores: Era de Ultron",
                            valor: 25.00,
                            assentos: [
                                { numero: 1, disponivel: true },
                                { numero: 2, disponivel: true },
                            ]
                        },
                        {
                            data: ISODate("2021-02-10T13:00:00Z"),
                            idFilme: ObjectId("5aefc5029ce83b1eb6b89e58"),
                            filme: "Vingadores: Era de Ultron",
                            valor: 20.00,
                            assentos: [
                                { numero: 1, disponivel: true },
                                { numero: 2, disponivel: false },
                                { numero: 2, disponivel: true },
                            ]
                        }
                    ]
                }
            ]
        },
        {
            _id: ObjectId(),
            nome: "GNC Lindóia",
            salas: [
                {
                    nome: 'Sala 100',
                    sessoes: [
                        {
                            data: ISODate("2021-02-10T09:00:00Z"),
                            idFilme: ObjectId("5aefc5029ce83b1eb6b89e59"),
                            filme: "Os Vingadores",
                            valor: 25.00,
                            assentos: [
                                { numero: 1, disponivel: true },
                                { numero: 2, disponivel: false },
                            ]
                        },
                        {
                            data: ISODate("2021-02-10T11:00:00Z"),
                            idFilme: ObjectId("5aefc5029ce83b1eb6b89e59"),
                            filme: "Os Vingadores",
                            valor: 25.00,
                            assentos: [
                                { numero: 1, disponivel: true },
                                { numero: 2, disponivel: true },
                            ]
                        },
                        {
                            data: ISODate("2021-02-10T13:00:00Z"),
                            idFilme: ObjectId("5aefc5029ce83b1eb6b89e58"),
                            filme: "Vingadores: Era de Ultron",
                            valor: 20.00,
                            assentos: [
                                { numero: 1, disponivel: true },
                                { numero: 2, disponivel: false },
                                { numero: 2, disponivel: true },
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}])

//11.7
#.env, don't commit to repo
MONGO_CONNECTION=mongodb://localhost:27018
DATABASE_NAME=cinema-catalog-service
PORT=3001

//11.8
//repository.js
const database = require("../config/database");
const { ObjectId } = require("mongodb");

async function getAllCities() {
    const db = await database.connect();
    return db.collection("cinemaCatalog").find({}).projection({ cidade: 1, uf: 1, pais: 1 }).toArray();
}

async function getCinemasByCityId(cityId) {
    const objCityId = new ObjectId(cityId);
    const db = await database.connect();
    const city = await db.collection("cinemaCatalog").findOne({ _id: objCityId }, {projection: { cinemas: 1 }});
    return city.cinemas;
}

async function disconnect() {
    return database.disconnect();
}

module.exports = { getAllCities, getCinemasByCityId, disconnect }

//11.9
//repository.test.js
require('dotenv-safe').config();
const repository = require('./repository');
let testCityId = null;

beforeAll(async () => {
    const cities = await repository.getAllCities();
    testCityId = cities[1]._id;//Porto Alegre
})

test('Repository getAllCities', async () => {
    const cities = await repository.getAllCities();
    expect(Array.isArray(cities)).toBeTruthy();
    expect(cities.length).toBeGreaterThan(0);
})

test('Repository getCinemasByCityId', async () => {
    const cinemas = await repository.getCinemasByCityId(testCityId);
    expect(Array.isArray(cinemas)).toBeTruthy();
    expect(cinemas.length).toBeGreaterThan(0);
})

test('Repository Disconnect', async () => {
    const isDisconnected = await repository.disconnect();
    expect(isDisconnected).toBeTruthy();
})

//11.10
async function getMoviesByCinemaId(cinemaId) {
    const objCinemaId = new ObjectId(cinemaId);
    const db = await database.connect();
    return db.collection("cinemaCatalog").aggregate([
        { $match: { "cinemas._id": objCinemaId } },
        { $unwind: "$cinemas" },
        { $unwind: "$cinemas.salas" },
        { $unwind: "$cinemas.salas.sessoes" },
        { $group: { _id: { filme: "$cinemas.salas.sessoes.filme", idFilme: "$cinemas.salas.sessoes.idFilme" } } }
    ]).toArray();
}

module.exports = { getAllCities, getCinemasByCityId, disconnect, getMoviesByCinemaId }

//11.11
async function getMoviesByCityId(cityId) {
    const objCityId = new ObjectId(cityId);
    const db = await database.connect();
    const sessions = await db.collection("cinemaCatalog").aggregate([
        { $match: { "_id": objCityId } },
        { $unwind: "$cinemas" },
        { $unwind: "$cinemas.salas" },
        { $unwind: "$cinemas.salas.sessoes" },
        { $group: { _id: { filme: "$cinemas.salas.sessoes.filme", idFilme: "$cinemas.salas.sessoes.idFilme" } } }
    ]).toArray();
    return sessions.map(item => { return { idFilme: item._id.idFilme, filme: item._id.filme } });
}

async function getMovieSessionsByCityId(movieId, cityId) {
    const objMovieId = new ObjectId(movieId);
    const objCityId = new ObjectId(cityId);
    const db = await database.connect();
    const sessions = await db.collection("cinemaCatalog").aggregate([
        { $match: { "_id": objCityId } },
        { $unwind: "$cinemas" },
        { $unwind: "$cinemas.salas" },
        { $unwind: "$cinemas.salas.sessoes" },
        { $match: { "cinemas.salas.sessoes.idFilme": objMovieId } },
        { $group: { _id: { filme: "$cinemas.salas.sessoes.filme", idFilme: "$cinemas.salas.sessoes.idFilme", idCinema: "$cinemas._id", sala: "$cinemas.salas.nome", sessao: "$cinemas.salas.sessoes" } } }
    ]).toArray();
    return sessions.map(item => { return { idFilme: item._id.idFilme, filme: item._id.filme, idCinema: item._id.idCinema, sala: item._id.sala, sessao: item._id.sessao } });
}

async function getMovieSessionsByCinemaId(movieId, cinemaId) {
    const objCinemaId = new ObjectId(cinemaId);
    const objMovieId = new ObjectId(movieId);
    const db = await database.connect();
    const sessions = await db.collection("cinemaCatalog").aggregate([
        { $match: { "cinemas._id": objCinemaId } },
        { $unwind: "$cinemas" },
        { $unwind: "$cinemas.salas" },
        { $unwind: "$cinemas.salas.sessoes" },
        { $match: { "cinemas.salas.sessoes.idFilme": objMovieId } },
        { $group: { _id: { filme: "$cinemas.salas.sessoes.filme", idFilme: "$cinemas.salas.sessoes.idFilme", sala: "$cinemas.salas.nome", sessao: "$cinemas.salas.sessoes" } } }
    ]).toArray();
    return sessions.map(item => { return { idFilme: item._id.idFilme, filme: item._id.filme, sala: item._id.sala, sessao: item._id.sessao } });
}

module.exports = { getAllCities, getCinemasByCityId, disconnect, getMoviesByCinemaId, getMoviesByCityId, getMovieSessionsByCityId, getMovieSessionsByCinemaId }

//11.12
test('Repository getMoviesByCinemaId', async () => {
    const result = await repository.getMoviesByCinemaId(testCinemaId);
    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
})

test('Repository getMoviesByCityId', async () => {
    const result = await repository.getMoviesByCityId(testCityId);
    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
})

test('Repository getMovieSessionsByCityId', async () => {
    const result = await repository.getMovieSessionsByCityId(testMovieId, testCityId);
    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
})

test('Repository getMovieSessionsByCinemaId', async () => {
    const result = await repository.getMovieSessionsByCinemaId(testMovieId, testCinemaId);
    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
})

//11.13
//repository.test.js
require('dotenv-safe').config();
const repository = require('./repository');
let testCityId = null;
let testCinemaId = null;
let testMovieId = null;

beforeAll(async () => {
    const cities = await repository.getAllCities();
    testCityId = cities[1]._id;//Porto Alegre
    testCinemaId = cities[1].cinemas[0]._id;
    testMovieId = cities[1].cinemas[0].salas[0].sessoes[0].idFilme;
})

//11.14
//cinemCatalog.js
module.exports = (app, repository) => {
    app.get('/cities', async (req, res, next) => {
        const cities = await repository.getAllCities();
        if (!cities || cities.length === 0) return res.sendStatus(404);
        res.json(cities);
    })

    app.get('/cities/:city/movies', async (req, res, next) => {
        if (!req.params.city) return res.sendStatus(400);
        const movies = await repository.getMoviesByCityId(req.params.city);
        if (!movies || movies.length === 0) return res.sendStatus(404);
        res.json(movies);
    })

    app.get('/cities/:city/movies/:movie', async (req, res, next) => {
        if (!req.params.city || !req.params.movie) return res.sendStatus(400);
        const sessions = await repository.getMovieSessionsByCityId(req.params.movie, req.params.city);
        if (!sessions || sessions.length === 0) return res.sendStatus(404);
        res.json(sessions);
    })

    app.get('/cities/:city/cinemas', async (req, res, next) => {
        if (!req.params.city) return res.sendStatus(400);
        const cinemas = await repository.getCinemasByCityId(req.params.city);
        if (!cinemas || cinemas.length === 0) return res.sendStatus(404);
        res.json(cinemas);
    })

    app.get('/cinemas/:cinema/movies', async (req, res, next) => {
        if (!req.params.cinema) return res.sendStatus(400);
        const movies = await repository.getMoviesByCinemaId(req.params.cinema);
        if (!movies || movies.length === 0) return res.sendStatus(404);
        res.json(movies);
    })

    app.get('/cinemas/:cinema/movies/:movie', async (req, res, next) => {
        if (!req.params.cinema || !req.params.movie) return res.sendStatus(400);
        const sessions = await repository.getMovieSessionsByCinemaId(req.params.movie, req.params.cinema);
        if (!sessions || sessions.length === 0) return res.sendStatus(404);
        res.json(sessions);
    })
}

//11.15
//cinemaCatalog.test.js
require('dotenv-safe').config();
const supertest = require('supertest');
const movies = require('./cinemaCatalog');
const server = require("../server/server");
const repository = require("../repository/repository");

let testCityId = null;
let testMovieId = null;
let testCinemaId = null;
let app = null;

beforeAll(async () => {
    app = await server.start(movies, repository);
    const cities = await repository.getAllCities();
    testCityId = cities[1]._id;//Porto Alegre
    testCinemaId = cities[1].cinemas[0]._id;
    testMovieId = cities[1].cinemas[0].salas[0].sessoes[0].idFilme;
})

afterAll(async () => {
    await server.stop();
    await repository.disconnect();
})

test('GET /cities', async () => {
    const response = await supertest(app)
        .get('/cities');

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
})

test('GET /cities/:city/movies', async () => {
    const response = await supertest(app)
        .get(`/cities/${testCityId}/movies`);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
})

test('GET /cities/:city/movies/:movie', async () => {
    const response = await supertest(app)
        .get(`/cities/${testCityId}/movies/${testMovieId}`);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
})

test('GET /cities/:city/cinemas', async () => {
    const response = await supertest(app)
        .get(`/cities/${testCityId}/cinemas`);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
})

test('GET /cinemas/:cinema/movies', async () => {
    const response = await supertest(app)
        .get(`/cinemas/${testCinemaId}/movies`);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
})

test('GET /cinemas/:cinema/movies/:movie', async () => {
    const response = await supertest(app)
        .get(`/cinemas/${testCinemaId}/movies/${testMovieId}`);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
})

//11.16
//index.js
(async () => {
    require("dotenv-safe").config();
    const cinemaCatalog = require('./api/cinemaCatalog');
    const server = require("./server/server");
    const repository = require("./repository/repository");

    try {
        await server.start(cinemaCatalog, repository);
        console.log('Server is up and running at ' + process.env.PORT);
    } catch (error) {
        console.error(error);
    }
})();
