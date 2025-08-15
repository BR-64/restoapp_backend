const Product = require('../models/Product.js');
const { calculateCartTotal } = require('../services/cartService.js');
const { checkDefaultAddress } = require('../services/addressService.js');

const cartCal = async (req, res) => {
  const userId = req.user.userId; // comes from authMiddleware

  try {
    //check if user has default address
    console.log('Checking default address for user:', userId);
    await checkDefaultAddress(userId);
    console.log(
      'Default address check completed for user:',
      checkDefaultAddress(userId)
    );

    const { cartItems } = req.body;
    console.log('Cart items:', cartItems);

    const totalPrice = await calculateCartTotal(cartItems);

    console.log('Total price:', totalPrice);

    res.status(200).json({ totalPrice });
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to calculate cart total', message: err.message });
  }
};

module.exports = {
  cartCal,
};
