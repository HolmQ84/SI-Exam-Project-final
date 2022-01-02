const mysql = require('mysql');

const dotenv = require('dotenv');

dotenv.config({path: '../../.env'});

function deleteUser(user_id){
    return new Promise((resolve, reject) => {
        try {
            const connection = mysql.createConnection({
                host: process.env.DB_CONNECTION_URL,
                user: process.env.DB_CONNECTION_USER,
                password: process.env.DB_CONNECTION_PASSWORD,
                database: process.env.DB_NAME
            });

            connection.connect((error) => {
                if (error) throw new Error(error);
            });

            const delete_user = "DELETE FROM gamehub.users WHERE user_id = ?";
            connection.query(delete_user, [user_id], (error, result) => {
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
    deleteUser,
}
