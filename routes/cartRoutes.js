const express = require('express');
const router = express.Router();
const { cartCal } = require('../controllers/cartController');

router.post('/cal', cartCal);

module.exports = router;
