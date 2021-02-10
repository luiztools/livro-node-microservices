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