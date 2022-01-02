const router = require('express').Router();
const mysqlGamesRead = require('../mySQL/games/read');
const mysqlGamesCreate = require('../mySQL/games/create');
const mysqlGamesUpdate = require('../mySQL/games/update');
const mysqlGamesDelete = require('../mySQL/games/delete');
const {getNewGame} = require("../mySQL/games/read");

router.get('/getSearchParameter/:search', (req, res) => {
    res.status(200).send({
        data: req.params.search
    });
});

// Get all games from DB.
router.get('/games/', async (req, res) => {
    const allGames = await mysqlGamesRead.readAllGames();
    res.status(200).send(allGames);
});

// Get game from id
router.get('/games/:id', async (req, res) => {
    const oneGame = await mysqlGamesRead.readGame(req.params.id);
    res.status(200).send(oneGame[0]);
});


// Get games from DB with search parameter.
router.get('/games/search/:query', async (req, res) => {
    const searchResult = await mysqlGamesRead.readSearchGame(req.params.query);
    res.status(200).send(searchResult);
});

// Add game to the database.
router.post('/games', async (req, res) => {
    let status;
    try {
        const newGame = await mysqlGamesCreate.createGame(
            req.body.name,
            req.body.picture_url,
            req.body.developers,
            req.body.genre,
            req.body.platform,
            req.body.release_date,
            req.body.resume
        );
    } catch {
        status = "Failed to create game."
        res.status(403).send({
            status: status
        });
    } finally {
        if (status !== "Failed to create game.") {
            const getCreatedGame = await mysqlGamesRead.getNewGame()
            res.status(200).send(getCreatedGame[0]);
        }
    }
});

// Add game to the database.
router.put('/games/:id', async (req, res) => {
    const game = await mysqlGamesUpdate.updateGame(
        req.params.id,
        req.body.name,
        req.body.picture_url,
        req.body.developers,
        req.body.genre,
        req.body.platform,
        req.body.release_date,
        req.body.resume
    );
    res.status(200).send(game);
});

router.delete('/games/:id', async (req, res) => {
    const status = await mysqlGamesDelete.deleteGame(
        req.params.id
    );
    if (status.affectedRows === 1) {
        res.status(200).send({
            message: "Successfully deleted game with ID: " + req.params.id
        });
    } else {
        res.status(403).send({
            message: "Failed to delete game with ID: " + req.params.id
        });
    }
});

module.exports = router;

