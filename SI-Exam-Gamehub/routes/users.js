const router = require('express').Router();
const fs = require('fs');                                   // Tilføjes for at kunne bruges til at læse filer.
const path = require('path');
const mysqlUsersRead = require('../mySQL/users/read');
const mysqlUsersUpdate = require('../mySQL/users/update');

// Making variables for footers and headers.
const header = fs.readFileSync(path.join(__dirname + '/../public/header/header.html').toString());
const footer = fs.readFileSync(path.join(__dirname + '/../public/footer/footer.html').toString());

// Making variables for entry points.
const newGame = fs.readFileSync(path.join(__dirname + '/../public/new_game/new_game.html').toString());
const userSite = fs.readFileSync(path.join(__dirname + '/../public/user_site/user_site.html').toString());
const users = fs.readFileSync(path.join(__dirname + '/../public/users/users.html').toString());
const update = fs.readFileSync(path.join(__dirname + '/../public/update_user/update_user.html').toString());

router.get('/newgame', isAdmin, (req, res) => {
    return res.status(200).send( header + newGame + footer );
});

router.get('/users/:id', isUser, (req, res) => {
    return res.status(200).send( header + userSite + footer );
});

router.get('/users', isAdmin, (req, res) => {
    return res.status(200).send( header + users + footer );
});

router.get('/update/:id', (req, res) => {
    return res.status(200).send( header + update + footer );
});

function isUser(req, res, next) {                           // Middleware to check if client is user or admin.
    if (req.session.user_level === 'user' || 'admin') {     // To be used in certain endpoints.
        return next();
    }
    return res.status(200).redirect("/");
}

function isAdmin(req, res, next) {                          // Middleware to check if client is admin.
    if (req.session.user_level === 'admin') {               // To be used in certain endpoints.
        return next();
    }
    return res.redirect('/');
}

module.exports = router;