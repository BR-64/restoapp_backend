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
  shipAddress: {
    _id: mongoose.Schema.Types.ObjectId,
    house_no: String,
    street: String,
    district: String,
    sub_district: String,
    zip: String,
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
  username: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Orders', orderSchema);
