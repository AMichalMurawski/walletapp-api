const Wallet = require('../models/walletModel');

const createWallet = ({ walletId, balance, transactions, owners }) =>
  Wallet.create({
    walletId,
    balance,
    transactions,
    owners,
  });

module.exports = { createWallet };
