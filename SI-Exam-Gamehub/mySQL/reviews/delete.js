const mysql = require('mysql');

const dotenv = require('dotenv');

dotenv.config({path: '../../.env'});

function deleteReview(reviewID) {
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

            const delete_review =
                "DELETE FROM review WHERE review_id = ?";

            connection.query(delete_review, [reviewID], (error, result) => {
                if (error) reject(console.log(error));
                resolve(result);
                connection.end();
            });
        } catch (error) {
            reject(console.log(error));
        }
    });
}

