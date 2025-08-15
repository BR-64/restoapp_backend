const mongoose = require('mongoose');
const { stringify } = require('uuid');

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    house_no: String,
    street: String,
    district: String,
    sub_district: String,
    zip: String,
    tel: String,
    default: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Address', addressSchema);
