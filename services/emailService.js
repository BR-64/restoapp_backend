const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS.replace(/\s/g, ''),
  },
  logger: true,
  debug: true,
});

async function sendOrderEmail(email, order) {
  await transporter.sendMail({
    from: `"Resto App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your order has been placed',
    html: `<p>${order}</p>`,
  });
}

module.exports = sendOrderEmail;
