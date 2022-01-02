const mysql = require("mysql");

const dotenv = require("dotenv");

dotenv.config({path: '../../.env'});

function authenticateUser(email) {
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

            const get_user = "SELECT * FROM users WHERE email = ?";

            connection.query(get_user, [email], (error, result) => {
                if (error) reject(console.log(error));
                resolve(result);
                connection.end();
            });
        } catch (error) {
            reject(console.log(error));
        }
    });
}

function getOneUser(){
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
            const getUser = "SELECT * FROM users WHERE email = ?";

            connection.query(getUser, (error, result) => {
                if (error) reject(console.log(error));
                resolve(result);
                connection.end();
            });
        } catch (error) {
            reject(console.log(error));
        }
    });
}

function getAllUsers() {
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
            const getUsers = "SELECT * FROM gamehub.users";

            connection.query(getUsers, (error, result) => {
                if (error) reject(console.log(error));
                resolve(result);
                connection.end();
            });
        } catch (error) {
            reject(console.log(error));
        }
    });
}

//makes method accessible
module.exports = {
    authenticateUser,
    getOneUser,
    getAllUsers
};