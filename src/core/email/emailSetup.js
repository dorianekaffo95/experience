'use strict';
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
import { emailConfig } from '../../config';

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
        user: emailConfig.email,
        pass: emailConfig.password
    },
    // tls: {
    //     // do not fail on invalid certs
    //     rejectUnauthorized: emailConfig.tls
    // }
}));

const sendEmail = (app) => {

    app.post('/sendEmail', function (req, res, next) {
        let mailOptions = req.body.mailOptions;
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error while sending link: ", error);
                res.send({ status: 400, response: error });
            }
            console.log("OK", info);
            res.send({ status: 200, response: 'email sent successfully' });
        });
    });

};

export default sendEmail;  