// routes/auth.js
const express = require('express');
const router = express.Router();

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

module.exports = router;
