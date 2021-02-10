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