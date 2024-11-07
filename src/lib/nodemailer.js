const nodemailer = require("nodemailer");
const { config } = require("../config/index");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: config.gmail,
        pass: config.gmail_Password,
    },
});

module.exports = { transporter };