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