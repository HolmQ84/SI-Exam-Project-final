const mysql = require('mysql');

const dotenv = require('dotenv');
dotenv.config({path: '../../.env'});

function getAllReviews(game_id) {
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

            const get_reviews =
                "SELECT review_id, score, comment, (SELECT username FROM users WHERE user_id = user_fk_id) " +
                "AS 'username' FROM " + process.env.DB_NAME + "." + process.env.DB_TABLE_REVIEWS + " WHERE game_fk_id = ?";

            connection.query(get_reviews, [game_id], (error, result) => {
                if (error) reject(console.log(error));
                resolve(result);
                connection.end();
            });
        } catch (error) {
            reject(console.log(error));
        }
    });
}

function getAllUserReviews(userId) {
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

            const getAllUserReviews = "SELECT score, comment, (SELECT name FROM games WHERE game_id = game_fk_id) as 'name' FROM reviews WHERE user_fk_id = ?";

            connection.query(getAllUserReviews, [userId], (error, result) => {
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
    getAllReviews,
    getAllUserReviews
};

