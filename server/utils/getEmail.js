const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config({ path: '../.env' })


const getEmail = async (name, email, message) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const getMail = {
        from: process.env.EMAIL_RECEIVER,
        to: process.env.EMAIL_RECEIVER,
        subject: `New Contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };
    const sendEmail = {
        from: process.env.EMAIL_RECEIVER,
        to: email,
        Subject: "Thank You for Reaching Out",
        text: `Hi ${name},\nThank you for getting in touch with me through my website! I’ve received your message and will get back to you as soon as possible.`
    }; try {
        await transporter.sendMail(getMail),
        await transporter.sendMail(sendEmail)
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}


module.exports = getEmail