const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  createdAt: { type: Date, default: Date.now },
  file: Array,
});

module.exports = mongoose.model('reataurant', productSchema, 'menus');
