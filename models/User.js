const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    lineUserId: { type: String, unique: true},
    displayName:String,
    pictureUrl:String,
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Users', userSchema);
