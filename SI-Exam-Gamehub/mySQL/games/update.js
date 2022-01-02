const mysql = require('mysql');

const dotenv = require('dotenv');

dotenv.config({path: '../../.env'});

function updateGame(game_id, name, pictureUrl, developers, genre, platform, releaseDate, resume) {
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

            const update_game = "UPDATE gamehub.games SET name = ?, picture_url = ?, developers = ?, genre = ?, " +
                "platform = ?, release_date = ?, resume = ? WHERE game_id = ?";

            connection.query(update_game, [[name], [pictureUrl], [developers], [genre], [platform], [releaseDate], [resume], [game_id]], (error, result) => {
                if (error) reject(console.log(error));
                if (result.affectedRows === 0) {
                    resolve("No game found with ID: "+game_id)
                }
                resolve({
                    game_id: game_id,
                    name: name,
                    picture_url: pictureUrl,
                    developers: developers,
                    genre: genre,
                    platform: platform,
                    release_date: releaseDate,
                    resume: resume
                });
                connection.end();
            });
        } catch (error) {
            reject(console.log(error));
        }
    });
}

module.exports = {
    updateGame
};
