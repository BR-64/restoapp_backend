// routes/auth.js
const express = require('express');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const sendVerificationEmail = require('../controllers/sendVeriEmail');
require('dotenv').config();

const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Dummy user
const USERS = [{ email: 'user@ex.com', password: 'password' }];

router.post('/login', (req, res) => {
  console.log(req);
  const { email, password } = req.body;

  const user = USERS.find((u) => u.email === email && u.password === password);

  if (user) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

router.post('/signup', async (req, res) => {
  console.log(req);
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

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'server error', error: err.message });
  }
});

module.exports = router;
