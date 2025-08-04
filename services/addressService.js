const Address = require('../models/Address');

const fetchDefualtAddress = async (userId) => {
  try {
    const address = await Address.findOne({ userId, default: true });

    if (!address) {
      return { message: 'No default address found' };
    }

    // console.log(address);

    return address;
  } catch (error) {
    console.error(error);
    return { message: 'Server error' };
  }
};

module.exports = {
  fetchDefualtAddress,
};
