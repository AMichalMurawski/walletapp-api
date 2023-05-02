const Wallet = require('../models/walletModel');

const createWallet = ({ walletId, balance, transactions, owners }) => {
  try {
    return Wallet.create({ walletId, balance, transactions, owners });
  } catch (err) {
    return false;
  }
};

module.exports = { createWallet };
