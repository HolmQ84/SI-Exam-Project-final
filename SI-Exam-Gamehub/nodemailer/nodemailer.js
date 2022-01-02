const nodemailer = require('nodemailer');

async function mail(userEmail, mailOption, key) {
    let mailSubject;
    let mailContent;

    if (mailOption === 'Welcome Mail') {
        mailSubject = 'Welcome to Gamehub.';
        mailContent = '<h1 style="text-align: center;color: #779fe5">Account successfully created!</h1>\n' +
            '<br>\n' +
            '<h3 style="text-align: center">We hereby welcome you to our community, Gamehub.</h3>\n' +
            '<br>\n' +
            '<h3 style="text-align: center">The place for games!</h3>\n' +
            '<br>\n' +
            '<h3 style="text-align: center">We hope you will have fun, and should you run into any problems - you\'re always welcome to email us with\n' +
            '    questions or tips of changes.</h3>\n' +
            '<br>\n' +
            '<h3 style="text-align: center">Have a nice day.</h3>\n' +
            '<br>\n' +
            '<h3 style="text-align: center">Greetings from all of us on Gamehub.</h3>'
    }
    if (mailOption === 'Password Retrieval Mail') {
        mailSubject = 'Password Retrieval Mail';
        mailContent = '<h1 style="text-align: center;color: #779fe5">Password Retrieval!</h1>\n' +
            '<br>\n' +
            '<h3 style="text-align: center">You recently send a password change request, based on a forgotten password.</h3>\n' +
            '<br>\n' +
            '<h3 style="text-align: center">To reset your password, click the link below and follow the instructions.</h3>\n' +
            '<br>\n' +
            '<a href="http://localhost/reset/'+key+'"><h3 style="text-align: center">Click here to reset your password</h3></a>\n' +
            '<br>\n' +
            '<h3 style="text-align: center">Have a nice day.</h3>\n' +
            '<br>\n' +
            '<h3 style="text-align: center">Greetings from Gamehub.</h3>' +
            ''
    }

//Transport module for nodemailer
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        },
    });

//Sender information
    let mailOptions = {
        from: '"Gamehub" <patr180499@gmail.com>',
        to: userEmail,
        subject: mailSubject,
        html: mailContent
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Nodemailer: Email sent to user - '+mailOption);
        }
    });
}

module.exports = mail;
