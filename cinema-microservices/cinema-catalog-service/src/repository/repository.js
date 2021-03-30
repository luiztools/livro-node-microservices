//repository.js
const database = require("../config/database");
const { ObjectId } = require("mongodb");

async function getAllCities() {
    const db = await database.connect();
    return db.collection("cinemaCatalog").find({}).projection({ cidade: 1, uf: 1, pais: 1 }).toArray();
}

async function getCinemasByCityId(cityId) {
    const objCityId = ObjectId(cityId);
    const db = await database.connect();
    const cities = await db.collection("cinemaCatalog").find({ _id: objCityId }).projection({ cinemas: 1 }).toArray();
    return cities[0].cinemas;
}

async function disconnect() {
    return database.disconnect();
}

async function getMoviesByCinemaId(cinemaId) {
    const objCinemaId = ObjectId(cinemaId);
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
    const objCityId = ObjectId(cityId);
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
    const objMovieId = ObjectId(movieId);
    const objCityId = ObjectId(cityId);
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
    const objCinemaId = ObjectId(cinemaId);
    const objMovieId = ObjectId(movieId);
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
