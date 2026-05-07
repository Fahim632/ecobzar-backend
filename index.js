require('node:dns/promises').setServers(["1.1.1.1", "8.8.8.8"])

const nodemailer = require("nodemailer");
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const dbConfig = require("./config/dbConfig");
const User = require('./models/userModel');
const jwt = require('jsonwebtoken');

const app = express();
// middlewore
app.use(express.json());
app.use(cors());

// database
dbConfig();

app.post('/registration', async (req, res) => {
    const { email, password, confirmPassword, tarms } = req.body

    let existingUser = await User.findOne({ email: email })
    if (existingUser) {
        return res.send({ message: "email already exists" });
    }

    if (!tarms) {
        return res.send({ message: "Please accept our tarms and condition" });
    }

    if (!email || !password || !confirmPassword) {
        return res.send({ message: "Please fil up the feld" });
    }

    if (password !== confirmPassword) {
        return res.send({ message: "password not match" });
    }

    let user = new User({
        email: email,
        password: password,
        tarms: tarms
    });

    user.save();

    let token = jwt.sign({
        id: User._id,
        email: User.email
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d"
    })

    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: "fahimislammd03@gmail.com",
            pass: "inocanlyegkkamvf",
        },
    });

    try {
        const info = await transporter.sendMail({
            from: 'fahimislammd03@gmail.com', // sender address
            to: email, // list of recipients
            subject: "please varify your email", // subject line
            html: `<body style=margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,sans-serif><table align=center cellpadding=0 cellspacing=0 style=max-width:600px;background:#fff;margin-top:40px;border-radius:8px;overflow:hidden width=100%><tr><td style=background-color:#28a745;padding:20px;text-align:center;color:#fff><h1 style=margin:0>EcoBazar</h1><p style=margin:0>Fresh & Organic Products<tr><td style=padding:30px;text-align:center><h2 style=color:#333>Verify Your Email Address</h2><p style=color:#555;font-size:16px>Thank you for signing up with EcoBazar! Please confirm your email address to get started.</p><a href="http://localhost:5173/varifyemail/${token}" style="display:inline-block;margin-top:20px;padding:12px 25px;background-color:#28a745;color:#fff;text-decoration:none;border-radius:5px;font-size:16px">Verify Email</a><p style=margin-top:20px;color:#777;font-size:14px>If you did not create an account, no further action is required.<tr><td style=background:#f4f4f4;padding:20px;text-align:center;font-size:12px;color:#888><p style=margin:0>© 2026 EcoBazar. All rights reserved.<p style=margin:0>Dhaka, Bangladesh</table>`, // HTML body
        });

        console.log("Message sent: %s", info.messageId);
        // Preview URL is only available when using an Ethereal test account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (err) {
        console.error("Error while sending mail:", err);
    }



    res.send({ message: "Ragistration Successful" });

})

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`servar running on port ${port}`);
})