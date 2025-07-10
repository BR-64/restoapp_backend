const Order = require('../models/Order.js');

const createOrder = async (req, res) => {
  try {
    const { items, address, total, userId } = req.body;

    if (!items?.length || !address || !total) {
      return res.status(400).json({ message: 'Missing order data' });
    }

    const newOrder = new Order({
      items,
      address,
      total,
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
