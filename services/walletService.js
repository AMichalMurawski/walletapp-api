const Wallet = require('../models/walletModel');

const addTransaction = ({ date, type, category, comment, sum, owner }) =>
  Wallet.create({ date, type, category, comment, sum, owner });

module.exports = { addTransaction };
