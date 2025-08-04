const Product = require('../models/Product.js');
const { calculateCartTotal } = require('../services/cartService.js');

const cartCal = async (req, res) => {
  try {
    const { cartItems } = req.body;
    console.log('Cart items:', cartItems);

    const totalPrice = await calculateCartTotal(cartItems);

    console.log('Total price:', totalPrice);

    res.status(200).json({ totalPrice });
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to calculate cart total', details: err.message });
  }
};

module.exports = {
  cartCal,
};
