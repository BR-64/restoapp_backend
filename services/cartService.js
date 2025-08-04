const Product = require('../models/Product.js');

const calculateCartTotal = async (cartItems) => {
  // Fetch product details
  const products = await Product.find({ _id: { $in: cartItems } });

  // Map prices from product to cart items
  const cartItemsWprice = cartItems.map((cartItem) => {
    const matchingProduct = products.find(
      (product) => product._id.toString() === cartItem._id.toString()
    );

    if (matchingProduct) {
      return {
        ...cartItem,
        price: matchingProduct.price,
      };
    }

    return cartItem; // if no match
  });

  // Calculate total
  const totalPrice = cartItemsWprice.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return totalPrice;
};

module.exports = {
  calculateCartTotal,
};
