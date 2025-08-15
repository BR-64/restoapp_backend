const Order = require('../models/Order.js');
const { calculateCartTotal } = require('../services/cartService.js');
const { fetchDefualtAddress } = require('../services/addressService.js');
const { fetchUserInfo } = require('../services/userService.js');
const {
  fetchUserOrders,
  fetchAllOrders,
  fetchOrderbyId,
} = require('../services/orderServices.js');
const sendOrderEmail = require('../services/emailService.js');

const createOrder = async (req, res) => {
  console.log('createOrder function called');
  console.log('create order req', req.body);

  const userId = req.user.userId; // comes from authMiddleware

  try {
    const { cartItems } = req.body;

    if (!cartItems?.length) {
      return res.status(400).json({ message: 'Missing order data' });
    }

    // cal total price
    const totalPrice = await calculateCartTotal(cartItems);

    // get default address
    const shipAddress = await fetchDefualtAddress(userId);

    // get user email
    const email = req.user.email; // comes from authMiddleware

    // get user info
    const userinfo = await fetchUserInfo(userId);
    console.log(typeof userinfo);
    console.log('userinfo id', userinfo._id);

    // console.log('shipAddress:', shipAddress);

    const newOrder = new Order({
      items: cartItems,
      shipAddress: shipAddress,
      total: totalPrice,
      userId: userId,
      username: userinfo.username || null,
    });

    // console.log(email);

    const savedOrder = await newOrder.save();

    await sendOrderEmail(email, savedOrder);

    res.status(201).json({ message: 'Order created', order: savedOrder });
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserOrders = async (req, res) => {
  console.log('getUserOrders function called');
  const userId = req.user.userId; // comes from authMiddleware

  orders = await fetchUserOrders(userId);

  res.status(200).json({ orders });
};

const getAllOrders = async (req, res) => {
  console.log('getAllOrders function called');
  orders = await fetchAllOrders();

  res.status(200).json({ orders });
};

const getOrderbyId = async (req, res) => {
  console.log('getOrderbyId called', req.params.id);
  order = await fetchOrderbyId(req.params.id);

  res.status(200).json({ order });
};

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOrderbyId,
};
