const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const EmailVeri = require('../models/EmailVerification');
const sendVerificationEmail = require('../controllers/sendVeriEmail');

const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check existing user
    const existUser = await User.findOne({ email });

    if (existUser)
      return res.status(400).json({ message: 'Email already used' });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    const newEmailVeri = new EmailVeri({
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
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    console.log(user);

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
};

const loginCheck = async (req, res) => {
  const user = User.find((u) => u.id === req.user._id);
  if (!user) return res.sendStatus(404);
  res.json({ user: { id: user._id } });
};

const verifromEmail = async (req, res) => {
  const { token } = req.params;
  // const user = await User.findOne({ verificationToken: token });
  const user = await EmailVeri.findOne({ _id: token, status: 'valid' });

  if (!user) return res.status(400).send('Invalid token');

  user.verified = true;
  // user.verificationToken = null;
  await user.save();

  res.send('Email verified successfully!');
};

const forgotPass = async (req, res) => {
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
};

const resetPass = async (req, res) => {
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
};

module.exports = {
  signup,
  login,
  loginCheck,
  verifromEmail,
  forgotPass,
  resetPass,
};
