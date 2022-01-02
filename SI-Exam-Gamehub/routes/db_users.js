const router = require('express').Router();
const mysqlUsersCreate = require('../mySQL/users/create');
const mysqlUsersRead = require('../mySQL/users/read');
const mysqlUsersUpdate = require('../mySQL/users/update');
const mysqlUsersDelete = require('../mySQL/users/delete');

const bcrypt = require('bcrypt');
const saltRounds = 10;

// Get all users from DB
router.get('/dbCalls/allUsers', async (req, res) => {
    const getAllUsers = await mysqlUsersRead.getAllUsers();
    res.send({
        data: getAllUsers
    });
});


router.delete('/users/:id', (req, res) => {
    mysqlUsersDelete.deleteUser(req.params.id)
        .then(result => {
            if (result.message === '(Rows matched: 1  Changed: 0  Warnings: 0') {
                return res.status(500).send({
                    data: 'Something went wrong.'
                });
            } else {
                return res.status(200).send({
                    data: 'User successfully deleted.'
                });
            }
        });
});

router.patch('/users/promote/:id', (req, res) => {
    mysqlUsersUpdate.promoteUser(req.params.id)
        .then(result => {
            if (result.message === '(Rows matched: 1  Changed: 0  Warnings: 0') {
                return res.status(409).send({
                    data: 'User already administrator.'
                });
            } else {
                return res.status(200).send({
                    data: 'User promoted to administrator.'
                });
            }
        });
});

router.patch('/users/resetpassword/', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    mysqlUsersUpdate.updatePassword(req.body.resetKey, hashedPassword)
        .then(result => {
            if (result.message === '(Rows matched: 1  Changed: 1  Warnings: 0') {
                req.session.username = req.body.username;
                return res.status(200).send({
                    data: 'Success'
                });
            } else {
                return res.status(400).send({
                    data: 'Something went wrong'
                });
            }
        });
});

router.patch('/users/:id', isUser, (req, res) => {
    mysqlUsersUpdate.updateUser(req.body.user_id, req.body.username, req.body.firstname, req.body.lastname, req.body.phoneNumber, req.body.gender, req.body.birthdate, req.body.email, req.body.userId)
        .then(result => {
            if (result.message === '(Rows matched: 1  Changed: 0  Warnings: 0') {
                return res.status(400).send({
                    data: "Something went wrong."
                });
            } else if (result.message === '(Rows matched: 0  Changed: 0  Warnings: 0') {
                return res.status(400).send({
                    data: "Couldnt find user."
                });
            } else {
                req.session.username = req.body.username;
                req.session.firstname = req.body.firstname;
                req.session.lastname = req.body.lastname;
                req.session.phone_number = req.body.phoneNumber;
                req.session.gender = req.body.gender;
                req.session.birthdate = req.body.birthdate;
                req.session.email = req.body.email;
                return res.status(200).send({
                    data: "Success: Userdata updated."
                });
            }
        });
});

function isUser(req, res, next) {                           // Middleware to check if client is user or admin.
    if (req.session.user_level === 'user' || 'admin') {     // To be used in certain endpoints.
        return next();
    }
    return res.status(200).redirect("/");
}

module.exports = router;