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

const checkDefaultAddress = async (userId) => {
  try {
    const address = await Address.findOne({ userId, default: true });

    if (!address) {
      throw new Error('No default address found'); // ❌ Throw instead of returning false
      // return false; // No default address found
    }
    console.log(address);

    return true; // Default address exists
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message || 'Server error while checking default address'
    );
  }
};

module.exports = {
  fetchDefualtAddress,
  checkDefaultAddress,
};
