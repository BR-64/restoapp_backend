// routes/auth.js
const express = require('express');
const sendVerificationEmail_admin = require('../controllers/sendVeriEmail_admin');
require('dotenv').config();

const router = express.Router();
const Admin = require('../models/Admin');
const EmailVeri = require('../models/EmailVerification');
const bcrypt = require('bcrypt');

const validatePassword = require('../middleware/validatePassword');

// Dummy user

// router.post('/login', (req, res) => {
//   console.log(req);
//   const { email, password } = req.body;

//   const user = USERS.find((u) => u.email === email && u.password === password);

//   if (user) {
//     res.json({ message: 'Login successful' });
//   } else {
//     res.status(401).json({ message: 'Invalid credentials' });
//   }
// });

router.post('/signup', validatePassword, async (req, res) => {
  // console.log(req);
  const { username, email, password } = req.body;

  try {
    // check existing user
    const existEmail = await Admin.findOne({ email });
    const existUsername = await Admin.findOne({ username });

    if (existEmail)
      return res.status(400).json({ message: 'Email already used' });

    if (existUsername)
      return res.status(400).json({ message: 'Username already used' });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
      // verificationToken: token,
    });

    const newEmailVeri = new EmailVeri({
      userid: newAdmin._id,
      status: 'valid',
      expiredDate: new Date().setDate(new Date().getDate() + 5),
    });

    await newAdmin.save();
    await newEmailVeri.save();
    await sendVerificationEmail_admin(email, newEmailVeri._id);

    res.status(201).json({
      message: 'User created successfully, check you email to verify',
    });
  } catch (err) {
    res.status(500).json({ message: 'server error', error: err.message });
  }
});

router.get('/verify-email/:token', async (req, res) => {
  const { token } = req.params;
  const adminEmail = await EmailVeri.findOne({ _id: token, status: 'valid' });

  console.log(token);

  if (!adminEmail) return res.status(400).send('Invalid token');

  adminEmail.verified = true;
  await adminEmail.save();

  const admin = await Admin.findByIdAndUpdate(
    adminEmail.userid,
    {
      $set: { emailVeri: true },
    },
    { new: true }
  );

  console.log(admin);

  res.send('Admin Email verified successfully!');
});

module.exports = router;
