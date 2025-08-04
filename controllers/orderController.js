const Order = require('../models/Order.js');
const { calculateCartTotal } = require('../services/cartService.js');
const { fetchDefualtAddress } = require('../services/addressService.js');

const createOrder = async (req, res) => {
  console.log('createOrder function called');
  console.log('create order req', req.body);

  userId = req.user.userId; // comes from authMiddleware

  try {
    const { cartItems } = req.body;

    // console.log(cartItems);

    if (!cartItems?.length) {
      return res.status(400).json({ message: 'Missing order data' });
    }

    // cal total price
    const totalPrice = await calculateCartTotal(cartItems);

    // get default address
    const shipAddress = await fetchDefualtAddress(userId);

    console.log('shipAddress:', shipAddress);

    const newOrder = new Order({
      items: cartItems,
      shipAddress: shipAddress,
      total: totalPrice,
      userId: userId || null,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({ message: 'Order created', order: savedOrder });
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createOrder,
};
