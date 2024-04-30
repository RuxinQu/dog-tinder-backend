const router = require("express").Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

const generateHtml = (emailToken) => {
  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify your email</title>
  </head>
  
  <body>
      <h1> 🐾 Welcome to Dog Tinder! 🐾</h1>
      <p>Thank you for joining our paw-some community dedicated to finding furry friends! 🐶</p>
      <p>Before you can start matching with adorable pups, we need to verify your email address. Simply <strong> click the
              link below</strong> to complete the registration process:</p>
      <a href=https://dog-tinder-rq.netlify.app/verify?emailToken=${emailToken} style="font-size: 25px;">Verify Your Email</a>
      <p>Once verified, you'll be ready to unleash the fun and connect with fellow dog lovers!</p>
      <p>If you have any questions or need assistance, don't hesitate to reach out to our friendly support team.</p>
      <br>
      <p> Happy swiping,</p>
      <p>The Dog Tinder Team 🐾</p>
  </body>
  
  </html>`;
};

const sendEmail = async (emailToken, req, res) => {
  const html = generateHtml(emailToken);
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "Dog Tinder Email Verification",
      html,
      text: JSON.stringify(req.body),
    });
    console.log("Email sent successfully");
    res.status(200).json({ message: "Email sent." });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to send email." });
  }
};

module.exports = { sendEmail };
