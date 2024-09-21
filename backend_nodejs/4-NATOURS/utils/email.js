const nodemailer = require("nodemailer");

const sendEmails = async (options) => {
  // 1) create a transporter
  // for email service
  // const trasnporter = nodemailer.createTransport({
  //   service: "Gmail",
  //   auth: {
  //     user: process.env.EMAIL_USERNAME,
  //     pass: process.env.EMAIL_PASSWORD,
  //   },
  //   // Activate in gmail "less secure app" option
  // });

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: "Bipul Dubey <hello@bipul.io>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: "",
  };

  // 3) Actually send email
  await transport.sendMail(mailOptions);
};

module.exports = sendEmails;
