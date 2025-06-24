const mongoose = require('mongoose');

const emailveriSchema = new mongoose.Schema({
  userid: mongoose.Schema.Types.ObjectId,
  status: String,
  createdAt: { type: Date, default: Date.now },
  expiredDate: Date,
});

module.exports = mongoose.model('emailveri', emailveriSchema, 'EmailVerfi');
