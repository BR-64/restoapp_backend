const mongoose = require('mongoose');

const admintokenSchema = new mongoose.Schema({
  adminid: mongoose.Schema.Types.ObjectId,
  status: String,
  createdAt: { type: Date, default: Date.now },
  expiredDate: Date,
});

module.exports = mongoose.model('admintokens', EmailVeriSchema, 'EmailVerfi');
