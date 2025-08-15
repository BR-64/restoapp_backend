const Order = require('../models/Order.js');

const fetchUserOrders = async (userId) => {
  console.log('fetchUserOrders function called', userId);
  try {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return { message: 'No orders found for this user' };
    }
    // console.log('Fetched orders:', orders);

    return orders;
  } catch (error) {
    console.error(error);
    return { message: 'Server error' };
  }
};

const fetchAllOrders = async () => {
  console.log('get all orders function called');
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return { message: 'No orders found' };
    }
    // console.log('Fetched all orders:', orders);

    return orders;
  } catch (error) {
    console.error(error);
    return { message: 'Server error' };
  }
};

const fetchOrderbyId = async (orderId) => {
  console.log('get order by id function called');
  try {
    const order = await Order.findById(orderId);

    if (!order || order.length === 0) {
      return { message: 'No orders found' };
    }
    console.log('Fetched order:', order);

    return order;
  } catch (error) {
    console.error(error);
    return { message: 'Server error' };
  }
};

module.exports = {
  fetchUserOrders,
  fetchAllOrders,
  fetchOrderbyId,
};
