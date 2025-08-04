const express = require('express');
const router = express.Router();
const {
  addAddress,
  getUserAddresses,
  setDefaultAddress,
  deleteAddress,
  getDefaultAddress,
} = require('../controllers/addressController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, addAddress);
router.get('/', authMiddleware, getUserAddresses);
router.put('/default/:addressId', authMiddleware, setDefaultAddress);
router.delete('/delete/:addressId', authMiddleware, deleteAddress);
router.get('/default_address', authMiddleware, getDefaultAddress);

module.exports = router;
