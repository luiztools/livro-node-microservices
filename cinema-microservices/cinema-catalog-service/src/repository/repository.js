//repository.js
const database = require("../config/database");
const { ObjectId } = require("mongodb");

async function getAllCities() {
    const db = await database.connect();
    return db.collection("cinemaCatalog").find({}).projection({ cidade: 1, uf: 1, pais: 1 }).toArray();
}

async function getCinemasByCityId(cityId) {
    const objCityId = ObjectId.createFromHexString(cityId);
    const db = await database.connect();
    return db.collection('cinemaCatalog')
        .findOne({ _id: objCityId }, { projection: { cinemas: 1 } });
}

async function disconnect() {
    return database.disconnect();
}

async function getMoviesByCinemaId(cinemaId) {
    const objCinemaId = ObjectId.createFromHexString(cinemaId);
    const db = await database.connect();
    return db.collection("cinemaCatalog").aggregate([
        { $match: { "cinemas._id": objCinemaId } },
        { $unwind: "$cinemas" },
        { $unwind: "$cinemas.salas" },
        { $unwind: "$cinemas.salas.sessoes" },
        { $group: { _id: { filme: "$cinemas.salas.sessoes.filme", idFilme: "$cinemas.salas.sessoes.idFilme" } } }
    ]).toArray();
}

async function getMoviesByCityId(cityId) {
    const objCityId = ObjectId.createFromHexString(cityId);
    const db = await database.connect();
    const sessions = await db.collection("cinemaCatalog").aggregate([
        { $match: { "_id": objCityId } },
        { $unwind: "$cinemas" },
        { $unwind: "$cinemas.salas" },
        { $unwind: "$cinemas.salas.sessoes" },
        { $group: { _id: { filme: "$cinemas.salas.sessoes.filme", idFilme: "$cinemas.salas.sessoes.idFilme" } } }
    ]).toArray();
    return sessions.map(item => item._id);
}

async function getMovieSessionsByCityId(movieId, cityId) {
    const objMovieId = ObjectId.createFromHexString(movieId);
    const objCityId = ObjectId.createFromHexString(cityId);
    const db = await database.connect();
    const sessions = await db.collection("cinemaCatalog").aggregate([
        { $match: { "_id": objCityId } },
        { $unwind: "$cinemas" },
        { $unwind: "$cinemas.salas" },
        { $unwind: "$cinemas.salas.sessoes" },
        { $match: { "cinemas.salas.sessoes.idFilme": objMovieId } },
        { $group: { _id: { filme: "$cinemas.salas.sessoes.filme", idFilme: "$cinemas.salas.sessoes.idFilme", idCinema: "$cinemas._id", sala: "$cinemas.salas.nome", sessao: "$cinemas.salas.sessoes" } } }
    ]).toArray();
    return sessions.map(item => item._id);
}

async function getMovieSessionsByCinemaId(movieId, cinemaId) {
    const objCinemaId = ObjectId.createFromHexString(cinemaId);
    const objMovieId = ObjectId.createFromHexString(movieId);
    const db = await database.connect();
    const sessions = await db.collection("cinemaCatalog").aggregate([
        { $match: { "cinemas._id": objCinemaId } },
        { $unwind: "$cinemas" },
        { $unwind: "$cinemas.salas" },
        { $unwind: "$cinemas.salas.sessoes" },
        { $match: { "cinemas.salas.sessoes.idFilme": objMovieId } },
        { $group: { _id: { filme: "$cinemas.salas.sessoes.filme", idFilme: "$cinemas.salas.sessoes.idFilme", sala: "$cinemas.salas.nome", sessao: "$cinemas.salas.sessoes" } } }
    ]).toArray();
    return sessions.map(item => item._id);
}

module.exports = { getAllCities, getCinemasByCityId, disconnect, getMoviesByCinemaId, getMoviesByCityId, getMovieSessionsByCityId, getMovieSessionsByCinemaId }
