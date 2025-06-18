const mongoose = require('mongoose');

const EmailVeriSchema = new mongoose.Schema({
  userid: mongoose.Schema.Types.ObjectId,
  status: String,
  expiredDate: Date,
});

module.exports = mongoose.model('emailveri', EmailVeriSchema, 'EmailVerfi');
