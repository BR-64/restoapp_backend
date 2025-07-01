const express = require('express');
require('dotenv').config();
const router = express.Router();

// middleware
const validatePassword = require('../middleware/validatePassword');

//controller
const {
  signup,
  login,
  verifromEmail,
  forgotPass,
  resetPass,
} = require('../controllers/authController');

router.post('/signup', validatePassword, signup);
router.post('/login', login);
router.get('/verify-email/:token', verifromEmail);
router.post('/forgot-password', forgotPass);
router.post('/reset-password/:token', validatePassword, resetPass);

module.exports = router;
