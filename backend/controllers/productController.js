const Product = require('../models/Product');

const productList = async (req, res) => {
  try {
    console.log('product data fetching');
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Error fetching cases:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

const productID = async (req, res) => {
  try {
    console.log('single product fetching');
    console.log(req.params);

    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    console.error('error');
    res.status(500).json({ message: 'Failed to fetch case' });
  }
};

module.exports = {
  productList,
  productID,
};
