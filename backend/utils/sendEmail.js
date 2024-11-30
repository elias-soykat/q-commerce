const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: "Elite Sneakers | No Reply <eliasmd624@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  });
};

module.exports = sendEmail;
