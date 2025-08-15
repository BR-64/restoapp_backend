const Address = require('../models/Address');
const { fetchDefualtAddress } = require('../services/addressService');

const addAddress = async (req, res) => {
  const { house_no, street, district, sub_district, zip, tel } = req.body;

  // Optional: check if it's the first address for the user
  const existingAddresses = await Address.find({ userId: req.userId });

  let isPrimary = false;

  if (existingAddresses.length === 0) {
    await Address.updateMany({ userId: req.user.userId }, { default: false });
  }

  try {
    const newAddress = new Address({
      userId: req.user.userId,
      house_no,
      street,
      district,
      sub_district,
      zip,
      tel,
      default: true, // default is false by default});
    });
    // console.log('req.user:', req.user);

    // console.log(newAddress);

    const savedAddress = await newAddress.save();
    res.status(201).json({ message: 'Address added', address: savedAddress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserAddresses = async (req, res) => {
  console.log('request for fetching user addresses received');
  try {
    const userId = req.user.userId; // comes from authMiddleware
    const addresses = await Address.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ addresses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getDefaultAddress = async (req, res) => {
  console.log('request for fetching default address received');

  const address = await fetchDefualtAddress(req.user.userId);

  //   console.log('default address:', address);

  res.status(200).json({ address });
};

const setDefaultAddress = async (req, res) => {
  const { addressId } = req.params;
  const userId = req.user.userId;

  console.log('set default address request received');

  try {
    await Address.updateMany({ userId }, { default: false });

    const updatedAddress = await Address.findByIdAndUpdate(
      { _id: addressId, userId },
      { default: true },
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res
      .status(200)
      .json({ message: 'Default address updated', address: updatedAddress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error' });
  }
};

const deleteAddress = async (req, res) => {
  console.log('request for address deleted received');
  const { addressId } = req.params;

  console.log(addressId);
  try {
    const address = await Address.findOneAndDelete({
      _id: addressId,
      userId: req.user.userId, // make sure user owns the address
    });

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.json({ message: 'Address deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addAddress,
  getUserAddresses,
  setDefaultAddress,
  deleteAddress,
  getDefaultAddress,
};
