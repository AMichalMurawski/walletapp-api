const Wallet = require('../models/walletModel');

const createWallet = ({ balance, transactions, owner }) => {
  try {
    return Wallet.create({ balance, transactions, owner });
  } catch (err) {
    return false;
  }
};

module.exports = { createWallet };
