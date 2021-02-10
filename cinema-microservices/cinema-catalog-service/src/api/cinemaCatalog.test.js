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