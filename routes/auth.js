const express = require('express');
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
  liffLogin,
} = require('../controllers/authController');

router.post('/signup', validatePassword, signup);
router.post('/login', login);
router.get('/verify-email/:token', verifromEmail);
router.post('/forgot-password', forgotPass);
router.post('/reset-password/:token', validatePassword, resetPass);
router.post('/liff-login', liffLogin);

module.exports = router;
