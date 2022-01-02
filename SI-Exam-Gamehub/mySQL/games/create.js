const mysql = require('mysql');

const dotenv = require('dotenv');

dotenv.config({path: '../../.env'});

function createGame(name, pictureUrl, developers, genre, platform, releaseDate, resume) {
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

            const create_game =
                "INSERT INTO "+process.env.DB_NAME+"."+process.env.DB_TABLE_GAMES +
                " (name, picture_url, developers, genre, platform, release_date, resume) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?)";

            connection.query(create_game, [[name], [pictureUrl], [developers], [genre], [platform], [releaseDate], [resume]], (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
                connection.end();
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    createGame
};
