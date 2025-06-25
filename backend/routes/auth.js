// routes/auth.js
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const sendVerificationEmail = require('../controllers/sendVeriEmail');
require('dotenv').config();

const router = express.Router();
const User = require('../models/User');
const EmailVeri = require('../models/EmailVerification');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');
const crypto = require('crypto');

const validatePassword = require('../middleware/validatePassword');

// Dummy user
// const USERS = [{ email: 'user@ex.com', password: 'password' }];

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    // 3. Create JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // session duration
    );

    // 4. Send token in response (or cookie)
    res.status(200).json({
      token,
      user: { id: user._id, email: user.email },
    });

    console.log(res);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/signup', validatePassword, async (req, res) => {
  // console.log(req);
  const { email, password } = req.body;

  try {
    // check existing user
    const existUser = await User.findOne({ email });

    if (existUser)
      return res.status(400).json({ message: 'Email already used' });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // verification token
    // const token = uuidv4();

    // create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      // verificationToken: token,
    });

    const newEmailVeri = new EmailVeri({
      // userid,
      status: 'valid',
      expiredDate: new Date().setDate(new Date().getDate() + 5),
    });

    await newUser.save();
    await newEmailVeri.save();
    await sendVerificationEmail(email, newEmailVeri._id);

    res.status(201).json({
      message: 'User created successfully, check you email to verify',
    });
  } catch (err) {
    res.status(500).json({ message: 'server error', error: err.message });
  }
});

router.get('/verify-email/:token', async (req, res) => {
  const { token } = req.params;
  // const user = await User.findOne({ verificationToken: token });
  const user = await EmailVeri.findOne({ _id: token, status: 'valid' });

  if (!user) return res.status(400).send('Invalid token');

  user.verified = true;
  // user.verificationToken = null;
  await user.save();

  res.send('Email verified successfully!');
});

//request reset pasword
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  // console.log(email);
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate reset token
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    console.log(user);

    // Send email with nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS.replace(/\s/g, ''), // app password or real password
      },
    });

    const resetUrl = `http://localhost:5173/reset-password/${token}`; // frontend URL

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset',
      text: `You requested a password reset. Click here to reset your password: ${resetUrl}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Password reset email sent' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// reset password
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: 'Invalid or expired token' });

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Clear reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: 'Password has been reset successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
