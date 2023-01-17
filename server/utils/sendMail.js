const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: "Zk2805#@",
    },
    tls: {
        rejectUnauthorized: false
    }
})

const sendEmail = async(subject, message, send_to, sent_from,) => {
    const options = {
        from: sent_from,
        to: send_to,
        subject: subject,
        html: message,
    }

    transporter.sendMail(options, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent.');
            transport.close();
        }
    })
}

module.exports = sendEmail;