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