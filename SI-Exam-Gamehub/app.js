const express = require('express');
const app = express();
const fs = require('fs');                                   // Tilføjes for at kunne bruges til at læse filer.

app.use(express.static('public'));                          // Gør mappen /public tilgængelig for app.
app.use(express.json());                                    // Gør det muligt at sende data i JSON format (Bruges i post/put mappings).
app.use(express.urlencoded({extended: false}));


require('dotenv').config();                                 // Initialisering af .env filen, så dens oplysninger kan bruges i projektet.
const session = require('express-session');

// Used for collecting session cookies to store user info through different pages.
    app.use(session({
        secret: process.env.SESSION_SECRET,                     // Skal initialiseres med en secret.
        resave: false,                                          // Skal den re-sende session oplysninger ved nye routes?
        saveUninitialized: false,                               // Skal session gemmes i session store, hvis den ikke indeholder noget?
        cookie: {secure: false}                               // Skal cookie være secure? Kræver enten en proxy server eller https protokol.
    }));

    app.use(express.static(__dirname + '/public'));

// Making variables for footers and headers.
    const header = fs.readFileSync(__dirname + '/public/header/header.html').toString();
    const footer = fs.readFileSync(__dirname + '/public/footer/footer.html').toString();

// Making variables for entry points.
    const index = fs.readFileSync(__dirname + '/public/index/index.html').toString();
    const games = fs.readFileSync(__dirname + '/public/games/games.html').toString();
    const gamePage = fs.readFileSync(__dirname + '/public/game_page/game_page.html').toString();
    const search = fs.readFileSync(__dirname + '/public/search/search.html').toString();
    const login = fs.readFileSync(__dirname + '/public/login/login.html').toString();
    const signup = fs.readFileSync(__dirname + '/public/signup/signup.html').toString();
    const forgot = fs.readFileSync(__dirname + '/public/forgot/forgot.html').toString();
    const resetPassword = fs.readFileSync(__dirname + '/public/reset/reset.html').toString();

// Getting endpoints from /routes
    const auth = require('./routes/auth.js');
    app.use(auth);
    const db_games = require('./routes/db_games.js');
    app.use(db_games);
    const db_reviews = require('./routes/db_reviews.js');
    app.use(db_reviews);
    const db_users = require('./routes/db_users.js');
    app.use(db_users);
    const users = require('./routes/users.js');
    app.use(users);
    // const eureka = require('./routes/eureka-helper.js');

    app.get("/", (req, res) => {
        if (req.session.username === undefined) {
            req.session.username = 'Guest#' + Math.round((Math.random() * 899998) + 100001);      // Sætter cookie username til Guest# + et tal, til chatten.
            currentUsername = req.session.username;                                            // Bruges til at sende navn med i chatten.
        } else {
            currentUsername = req.session.username;
        }
        return res.status(200).send(header + index + footer);
    });

    app.get('/games', (req, res) => {
        return res.status(200).send(header + games + footer);
    });

    app.get('/login', isNotLoggedIn, (req, res) => {
        return res.status(200).send(header + login + footer);
    });

    app.get('/register', isNotLoggedIn, (req, res) => {
        return res.status(200).send(header + signup + footer);
    });

    app.get('/forgotPassword', isNotLoggedIn, (req, res) => {
        return res.status(200).send(header + forgot + footer);
    });

    app.get('/search/:id', (req, res) => {
        return res.status(200).send(header + search + footer);
    });

    app.get('/games/:id', (req, res) => {
        req.session.game_id = req.params.id;
        return res.status(200).send(header + gamePage + footer);
    });

    app.post("/search", (req, res) => {
        req.session.search = req.body.search;
        return res.status(200).redirect('/search/' + req.body.search);
    });

    app.get('/signout', isUser, (req, res) => {
        req.session.destroy();      // Sletter session data.
        return res.status(200).redirect('/');
    });

    app.get('/reset/:key', isNotLoggedIn, (req, res) => {
        return res.status(200).send(header + resetPassword + footer);
    })

    app.get('/*', (req, res) => {
        return res.status(501).send({data: "Could not find the page"});
    });

// Chat feature on index page
    const server = require('http').createServer(app);
    const io = require('socket.io')(server);
    const escapeHtml = require('escape-html');
    const chatUsers = {}; //Used to store users
    let currentUsername = ""; //Used for getting username to chat, is set on line 58

    io.on('connection', socket => {
        chatUsers[socket.id] = currentUsername;
        socket.on('send-chat-message', message => {
            socket.broadcast.emit('chat-message', {message: escapeHtml(message), name: chatUsers[socket.id]});
        });

        socket.on('disconnect', () => {
            socket.broadcast.emit('user-disconnected', chatUsers[socket.id]);
            delete chatUsers[socket.id];
        });
    });

    const port = process.env.PORT || 8083;

    server.listen(Number(port), (error) => {
        if (error) {
            console.log('Fejl ved opstart af server.');
        }
        console.log('Server startet på port:', port);
    });

    function isNotLoggedIn(req, res, next) {                    // Middleware to check if client is NOT logged in.
        if (req.session.user_level === undefined) {             // To be used in certain endpoints.
            return next();
        }
        return res.status(200).redirect('/');
    }

    function isUser(req, res, next) {                           // Middleware to check if client is user or admin.
        if (req.session.user_level === 'user' || 'admin') {     // To be used in certain endpoints.
            return next();
        }
        return res.status(200).redirect('/');
    }
