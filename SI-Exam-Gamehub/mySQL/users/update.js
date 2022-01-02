const mysql = require('mysql');

const dotenv = require('dotenv');

dotenv.config({path: '../../.env'});

function updateUser(user_id, username, firstname, lastname, phone_number, gender, birthdate, email, userId) {
    return new Promise((resolve, reject) => {
        try{
            const connection = mysql.createConnection({
                host     : process.env.DB_CONNECTION_URL,
                user     : process.env.DB_CONNECTION_USER,
                password : process.env.DB_CONNECTION_PASSWORD,
                database : process.env.DB_NAME
            });

            connection.connect((error) => {
                if (error) throw new Error(error);
            });

            const getUser = "SELECT * FROM users WHERE user_id = ?";

            connection.query(getUser, [userId], (error, result) => {
                if (error) reject(console.log(error));

                const updateUser = "UPDATE gamehub.users SET username = ?, firstname = ?, lastname = ?, phone_number = ?, gender = ?, birthdate = ?, email = ? WHERE user_id = ?;";

                connection.query(updateUser, [username, firstname, lastname, phone_number, gender, birthdate, email, userId], (error, result) => {
                    if (error) throw new Error(error);
                    resolve(result);
                });

            });

        } catch (error) {
            reject(console.log(error));
        }
    });
}

function promoteUser(user_id) {
    return new Promise((resolve, reject) => {
        try{
            const connection = mysql.createConnection({
                host     : process.env.DB_CONNECTION_URL,
                user     : process.env.DB_CONNECTION_USER,
                password : process.env.DB_CONNECTION_PASSWORD,
                database : process.env.DB_NAME
            });

            connection.connect((error) => {
                if (error) throw new Error(error);
            });

            const promoteUser = "UPDATE gamehub.users SET user_level = ? WHERE user_id = ?";

            connection.query(promoteUser, [['admin'], [user_id]], (error, result) => {
                if (error) reject(console.log(error));
                resolve(result);
                connection.end();
            });
        } catch (error) {
            reject(console.log(error));
        }
    });
}

function setResetKey(email, key) {
    return new Promise((resolve, reject) => {
        try{
            const connection = mysql.createConnection({
                host     : process.env.DB_CONNECTION_URL,
                user     : process.env.DB_CONNECTION_USER,
                password : process.env.DB_CONNECTION_PASSWORD,
                database : process.env.DB_NAME
            });

            connection.connect((error) => {
                if (error) throw new Error(error);
            });

            const resetKey = "UPDATE gamehub.users SET reset_key = ? WHERE email = ?";

            connection.query(resetKey, [[key], [email]], (error, result) => {
                if (error) reject(console.log(error));
                resolve(result);
                connection.end();
            });
        } catch (error) {
            reject(console.log(error));
        }
    });
}

function updatePassword(key, password) {
    return new Promise((resolve, reject) => {
        try{
            const connection = mysql.createConnection({
                host     : process.env.DB_CONNECTION_URL,
                user     : process.env.DB_CONNECTION_USER,
                password : process.env.DB_CONNECTION_PASSWORD,
                database : process.env.DB_NAME
            });

            connection.connect((error) => {
                if (error) throw new Error(error);
            });

            const updatePassword = "UPDATE gamehub.users SET password = ?, reset_key = ? WHERE reset_key = ?";

            connection.query(updatePassword, [ [password], [null], [key] ], (error, result) => {
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
    updateUser,
    promoteUser,
    setResetKey,
    updatePassword
}
