const nodemailer = require("nodemailer");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async(subject, message, send_to, sent_from,) => {
    const msg = {
        to: send_to, // Change to your recipient
        from: sent_from, // Change to your verified sender
        subject: subject,
        text: ' ',
        html: message,
      }
    
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error.response.body.errors)
      })
}

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
})

const sendEmail_ = async(subject, message, send_to, sent_from,) => {
    const options = {
        from: sent_from,
        to: send_to,
        subject: subject,
        html: message,
    }
    transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });
    transporter.sendMail(options, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.message);
            transport.close();
        }
    })
}

module.exports = sendMail;