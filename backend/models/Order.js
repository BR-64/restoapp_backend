const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      id: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  address: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Orders', orderSchema);
