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

async function sendVerificationEmail(email, token) {
  const url = `${process.env.BASE_URL}/api/auth/verify-email/${token}`;

  await transporter.sendMail({
    from: `"Resto App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify your email',
    html: `<p>Click this link to verify your email:</p><a href="${url}">${url}</a>`,
  });
}

module.exports = sendVerificationEmail;
