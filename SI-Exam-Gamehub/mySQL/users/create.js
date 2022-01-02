const mysql = require('mysql');

const dotenv = require('dotenv');
const sendNodeMail = require('../../nodemailer/nodemailer');

dotenv.config({path: '../../.env'});

const bcrypt = require('bcrypt');
const saltRounds = 10;

async function registerUser(req, res) {
    console.log('Entered registerUser');
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

        // variables from signup form.
        const formUsername = req.body.username;
        const formFirstname = req.body.firstname;
        const formLastname = req.body.lastname;
        const formPhonenumber = req.body.phonenumber;
        const formGender = req.body.gender;
        const formBirthdate = req.body.birthdate;
        const formEmail = req.body.email;
        const formPassword = req.body.password;

        //checks if user is already signed up
        connection.query('SELECT * FROM users WHERE email = ?', [formEmail], async (error, results) => {

            if (error) {
                req.redirect("/signup");
                throw new Error(error);
            }

            const dbUser = await results;

            //checks if user exist
            if (dbUser[0] !== undefined) return res.status(403).send( {message: 'User with that email is already registered.'} );


            //Hashes the password based on saltRounds
            const hashedPassword = await bcrypt.hash(formPassword, saltRounds);

            //Inserts the formData into users tabel
            connection.query('INSERT INTO users (username, password, firstname, lastname, phone_number, gender, birthdate, email, user_level) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [formUsername, hashedPassword, formFirstname, formLastname, formPhonenumber, formGender, formBirthdate, formEmail, "user"], async (error, results) => {
                if (error) {
                    res.status(500).send( {message: 'Server error. Please try again later :)'} );
                    throw new Error(error);
                }
                sendNodeMail(formEmail, 'Welcome Mail', '').catch(console.error);
                console.log(results);
                res.status(200).send(res.redirect('/login'));
            });
        });

    } catch (error) {
        if (error) throw new Error(error);

        return res.status(500).send({ message: 'Server error. Please try again later :)' });
    }
}

function createUser(username, firstname, lastname, phonenumber, gender, birthdate, email, password) {
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

            const hashedPassword = () => {
                return new Promise((done) => {
                    done(bcrypt.hash(password, saltRounds));
                })
            }

            const createUser =
                "INSERT INTO " + process.env.DB_NAME + "." + process.env.DB_TABLE_USERS +
                " (username, firstname, lastname, phone_number, gender, birthdate, email, password) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

            connection.query(createUser, [username, firstname, lastname, phonenumber, gender, birthdate, email, hashedPassword], (error, result) => {
               /*
                if (error.code === 'ER_DUP_ENTRY' && error.sqlMessage.includes( 'users.email')) {
                    reject({message: 'User with that email is already registered.' });
                } else if (error.code === 'ER_DUP_ENTRY' && error.sqlMessage.includes( 'users.username' )) {
                    reject( {message: 'Username already exists.' });
                } else if (error.code === 'ER_DUP_ENTRY' && error.sqlMessage.includes( 'users.phone_number' )) {
                    reject( {message: 'User with that phone number is already registered.' });
                }

                */

                if (error) console.log(error);
                console.log(result)
                resolve(result);
                connection.end();
            });
        } catch (error) {
            reject(console.log(error));
        }
    });
}

module.exports = {
    registerUser,
    createUser
};
