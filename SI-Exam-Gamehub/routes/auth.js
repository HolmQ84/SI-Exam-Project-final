const router = require('express').Router();
const userDBRead = require('../mySQL/users/read');
const userDBCreate = require('../mySQL/users/create');
const userDBUpdate = require('../mySQL/users/update');
const sendNodeMail = require('../nodemailer/nodemailer');

const bcrypt = require('bcrypt');

const randomstring = require('randomstring');

router.get('/getSessionCookie', (req, res) => {
    if(req.session.username !== undefined) {
        res.send({
            user_level: req.session.user_level,
            user_id: req.session.user_id,
            email: req.session.email,
            firstname: req.session.firstname,
            lastname: req.session.lastname,
            username: req.session.username,
            gender: req.session.gender,
            phoneNumber: req.session.phone_number,
            birthdate: req.session.birthdate
        });
    } else {
        req.session.username = 'Guest#'+Math.round((Math.random()*899998)+100001);
        res.status(200).send({
            username: req.session.username
        });
    }
});

router.post('/auth/login', (req, res) => {
    userDBRead.authenticateUser(req.body.email)
        .then(user => {
            if (user[0].user_id !== undefined) {
                bcrypt.compare(req.body.password, user[0].password)
                    .then(result => {
                        if (result) {
                            req.session.user_id = user[0].user_id;
                            req.session.username = user[0].username;
                            req.session.email = user[0].email;
                            req.session.firstname = user[0].firstname;
                            req.session.lastname = user[0].lastname;
                            req.session.user_level = user[0].user_level;
                            req.session.phone_number = user[0].phone_number;
                            req.session.gender = user[0].gender;
                            req.session.birthdate = user[0].birthdate;
                            console.log('Login attempt - Success.');
                            return res.status(202).send({
                                data: 'Success.'
                            });
                        } else {
                            console.log('Login attempt - Incorrect Password.');
                            return res.status(418).send({
                                data: 'Incorrect Password/Email.'
                            });
                        }
                    });
            }
        })
        .catch(error => {
            console.log('Login attempt - Incorrect Email.');
            return res.status(404).send({ data: 'Incorrect Password/Email.' });
        });
});

router.post('/users', async (req, res) => {
    //console.log("\n Entered router.post auth/register");

    userDBCreate.createUser(
        req.body.username, req.body.firstname, req.body.lastname,
        req.body.phonenumber, req.body.gender, req.body.birthdate,
        req.body.email, req.body.password )
        .then(response => {
            console.log("respone", response);
        })
});

router.patch('/auth/setResetKey', (req, res) => {
    const generatedKey = randomstring.generate(30);
    userDBUpdate.setResetKey(req.body.email, generatedKey)
        .then(result => {
            if (result.message === '(Rows matched: 1  Changed: 1  Warnings: 0') {
                sendNodeMail(req.body.email, 'Password Retrieval Mail', generatedKey).catch(console.error);
                return res.status(200).send({
                    data: 'Key successfully stored.'
                });
            } else {
                return res.status(409).send({
                    data: 'Creating reset key failed.'
                });
            }
        });
});

module.exports = router;
