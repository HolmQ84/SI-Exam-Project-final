const mysql = require('mysql');

const dotenv = require('dotenv');

dotenv.config({path: '../../.env'});

function updateReview(reviewID, score, comment, gameID) {
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

            const update_Review = "UPDATE " + process.env.DB_NAME + "." + process.env.DB_TABLE_REVIEWS + " SET score = ?, comment = ?, " +
                "gameID = ? WHERE review_id = ?";

            connection.query(update_Review, [[reviewID], [score], [comment], [gameID]], (error, result) => {
                if (error) reject(console.log(error));
                resolve(result);
                connection.end();
            });
        } catch (error) {
            reject(console.log(error));
        }
    });
}