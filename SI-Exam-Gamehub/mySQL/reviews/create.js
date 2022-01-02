const mysql = require('mysql');

const dotenv = require('dotenv');

dotenv.config({path: '../../.env'});

function createReview(score, comment, userID, gameID) {
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

            const create_review =
                "INSERT INTO " + process.env.DB_NAME + "." + process.env.DB_TABLE_REVIEWS +
                " (score, comment, user_fk_id, game_fk_id) " +
                "VALUES (?, ?, ?, ?)";

            connection.query(create_review, [[score], [comment], [userID], [gameID]], (error, result) => {
                if (error) reject(console.log(error));
                resolve(result);
                connection.end();
            });
        } catch (error) {
            reject(console.log(error));
        }
    });
}

module.exports = {
    createReview
};
