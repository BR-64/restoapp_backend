const express = require('express');
const router = express.Router();
const { cartCal } = require('../controllers/cartController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/cal', authMiddleware, cartCal);

module.exports = router;
