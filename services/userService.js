const User = require('../models/User');
const mongoose = require('mongoose');

const fetchUserInfo = async (userId) => {
  console.log('fetchUserInfo function called', userId);
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return { message: 'Invalid user ID format' };
    }

    // const user = await User.findById({ _id: ObjectId(userId) });
    const user = await User.findById(userId);

    if (!user) {
      return { message: 'User not found' };
    }

    console.log(user);

    return user;
  } catch (error) {
    console.error(error);
    return { message: 'Server error' };
  }
};

module.exports = {
  fetchUserInfo,
};
