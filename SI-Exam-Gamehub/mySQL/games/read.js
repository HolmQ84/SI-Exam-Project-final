const mysql = require('mysql');

const dotenv = require('dotenv');
dotenv.config({path: '../../.env'});

function readAllGames() {
    return new Promise((resolve, reject) => {
        try {
            const connection = mysql.createConnection({
                host     : process.env.DB_CONNECTION_URL,
                user     : process.env.DB_CONNECTION_USER,
                password : process.env.DB_CONNECTION_PASSWORD,
                database : process.env.DB_NAME
            });

            connection.connect((error) => {
                if (error) throw new Error(error);
            });

            const get_games =
                "SELECT *, ROUND((SELECT AVG(score) FROM reviews WHERE game_fk_id = game_id), 1) AS" +
                " 'score', (SELECT COUNT(*) FROM reviews WHERE game_fk_id = game_id) AS 'reviews' FROM "+
                process.env.DB_NAME + "." + process.env.DB_TABLE_GAMES;

            connection.query(get_games, (error, result) => {
                if (error) reject(console.log(error));
                resolve(result);
                connection.end();
            });
        } catch (error) {
            reject.console.log(error);
        }
    });
}

function readGame(game_id) {
    return new Promise((resolve, reject) => {
        try {
            const connection = mysql.createConnection({
                host     : process.env.DB_CONNECTION_URL,
                user     : process.env.DB_CONNECTION_USER,
                password : process.env.DB_CONNECTION_PASSWORD,
                database : process.env.DB_NAME
            });

            connection.connect((error) => {
                if (error) throw new Error(error);
            });

            const get_game =
                "SELECT *, ROUND((SELECT AVG(score) FROM reviews WHERE game_fk_id = game_id), 1) AS 'score', " +
                "(SELECT COUNT(*) FROM reviews WHERE game_fk_id = game_id) AS 'reviews' FROM " + process.env.DB_NAME +
                "." + process.env.DB_TABLE_GAMES + " WHERE game_id = ?";

            connection.query(get_game, [game_id], (error, result) => {
                if (error) reject(console.log(error));
                resolve(result);
                connection.end();
            });
        } catch (error) {
            reject.console.log(error);
        }
    });
}

function readSearchGame(name) {
    return new Promise((resolve, reject) => {
        try {
            const connection = mysql.createConnection({
                host     : process.env.DB_CONNECTION_URL,
                user     : process.env.DB_CONNECTION_USER,
                password : process.env.DB_CONNECTION_PASSWORD,
                database : process.env.DB_NAME
            });

            connection.connect((error) => {
                if (error) throw new Error(error);
            });

            const get_game =
                "SELECT *, (SELECT AVG(score) FROM reviews WHERE game_fk_id = game_id) " +
                "AS 'score', (SELECT COUNT(*) FROM reviews WHERE game_fk_id = game_id) AS 'reviews' FROM "+
                process.env.DB_NAME+"."+process.env.DB_TABLE_GAMES+" WHERE name LIKE '%"+name+"%'";

            connection.query(get_game, [name], (error, result) => {
                if (error) reject(console.log(error));
                resolve(result);
                connection.end();
            });
        } catch (error) {
            reject.console.log(error);
        }
    });
}

function getNewGame() {
    return new Promise((resolve, reject) => {
        try {
            const connection = mysql.createConnection({
                host     : process.env.DB_CONNECTION_URL,
                user     : process.env.DB_CONNECTION_USER,
                password : process.env.DB_CONNECTION_PASSWORD,
                database : process.env.DB_NAME
            });

            connection.connect((error) => {
                if (error) throw new Error(error);
            });

            const getLastGame =
                "SELECT * FROM "+ process.env.DB_NAME+"."+process.env.DB_TABLE_GAMES+" WHERE game_id = " +
                "(SELECT MAX(game_id) FROM "+ process.env.DB_NAME+"."+process.env.DB_TABLE_GAMES+")";

            connection.query(getLastGame, (error, result) => {
                if (error) reject(console.log(error));
                console.log(result)
                resolve(result);
                connection.end();
            });

        } catch (error) {
            reject.console.log(error);
        }
    });
}

module.exports = {
    readAllGames,
    readSearchGame,
    readGame,
    getNewGame
};

