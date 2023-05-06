const Wallet = require('../models/walletModel');

const createWallet = body => {
  try {
    return Wallet.create(body);
  } catch (err) {
    return false;
  }
};

const getWalletById = ({ _id }) => {
  try {
    return Wallet.findOne({ _id: _id });
  } catch (err) {
    return false;
  }
};

module.exports = {
  createWallet,
  getWalletById,
};
