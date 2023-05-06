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
    return Wallet.findById({ _id: _id });
  } catch (err) {
    return false;
  }
};

const getWalletOwners = async ({ _id }) => {
  try {
    const { owners } = await Wallet.findById({ _id });
    return owners;
  } catch (err) {
    return false;
  }
};

const getWalletCategories = async ({ _id }) => {
  try {
    const { categories } = await Wallet.findById({ _id });
    return categories;
  } catch (err) {
    return false;
  }
};

const createWalletTransaction = ({ _id, transaction }) => {
  try {
    return Wallet.updateOne({ _id }, { $push: { transactions: transaction } });
  } catch (err) {
    return false;
  }
};

const updateWalletBalance = ({ _id, balance }) => {
  try {
    return Wallet.updateOne({ _id }, { balance });
  } catch (err) {
    return false;
  }
};

const getTransactionById = async ({ walletId, transactionId }) => {
  try {
    const wallet = await Wallet.findById(walletId);
    const transaction = await Wallet.find({ transactions: { transactionId } });
    return transaction ? transaction : false;
  } catch (err) {
    return false;
  }
};

const updateTransaction = async ({ transactionId, transaction }) => {
  try {
    return Wallet.updateOne(
      { transactionId },
      { $set: { transactions: [transaction] } }
    );
  } catch (err) {
    return false;
  }
};

const deleteTransaction = async ({ transactionId }) => {
  try {
    return Wallet.updateOne({ $pull: { transactions: { transactionId } } });
  } catch (err) {
    return false;
  }
};

module.exports = {
  createWallet,
  createWalletTransaction,
  getWalletById,
  getWalletOwners,
  getWalletCategories,
  updateWalletBalance,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
