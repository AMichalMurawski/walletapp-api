const walletService = require('../services/walletService');
// const walletUtils = require('../utils/walletUtils');
const JoiSchema = require('../schemas/transactionSchema');

const addTransaction = async (req, res, next) => {
  const { walletId } = req.params;
  const { date, type, categoryId, comment, sum } = req.body;
  const { _id: userId } = req.user;

  const wallet = await walletService.getWalletById({ _id: walletId });
  if (!wallet) {
    return res.status(404).json({
      message: 'Wallet with such id not exist',
    });
  }

  const { owners, categories, balance } = wallet;
  const isOwner = owners.find(e => e.id === userId.toString());
  if (!isOwner) {
    return res.status(403).json({
      message: 'User does not owns wallet',
    });
  }

  const isValid = JoiSchema.allRequired.validate({
    date,
    type,
    categoryId,
    comment,
    sum,
  });
  if (isValid.error) {
    return res.status(400).json({
      message: isValid.error.details[0].message,
    });
  }

  const isContain = categories.find(e => e.id === categoryId);
  if (!isContain) {
    return res.status(404).json({
      message: 'Transaction category not found',
    });
  }

  const isMatch = isContain.type.includes(type);
  if (!isMatch) {
    return res.status(409).json({
      message: 'Transaction category type does not match transaction type',
    });
  }

  let newBalance;
  if (type === 'expense') {
    newBalance = balance - sum;
  } else {
    newBalance = balance + sum;
  }

  await walletService.createWalletTransaction({
    _id: walletId,
    transaction: req.body,
  });

  await walletService.updateWalletBalance({
    _id: walletId,
    balance: newBalance,
  });

  res.status(201).json({
    balance: newBalance,
    transaction: req.body,
  });
};

const listTransactions = async (req, res, next) => {
  const { walletId } = req.params;
  const { _id: userId } = req.user;

  const wallet = await walletService.getWalletById({ _id: walletId });
  if (!wallet) {
    return res.status(404).json({
      message: 'Wallet with such id not exist',
    });
  }

  const { owners } = wallet;
  const isOwner = owners.find(e => e.id === userId.toString());
  if (!isOwner) {
    return res.status(403).json({
      message: 'User does not owns wallet',
    });
  }

  res.status(201).json({ wallet });
};

const updateTransaction = async (req, res, next) => {
  const { walletId, transactionId } = req.params;
  const { _id: userId } = req.user;

  const wallet = await walletService.getWalletById({ _id: walletId });
  if (!wallet) {
    return res.status(404).json({
      message: 'Wallet with such id not exist',
    });
  }

  const { owners } = wallet;
  const isOwner = owners.find(e => e.id === userId.toString());
  if (!isOwner) {
    return res.status(403).json({
      message: 'User does not owns wallet',
    });
  }

  const transaction = await walletService.getTransactionById(transactionId);
  if (!transaction) {
    return res.status(404).json({
      message: 'Transaction with such id does not exist',
    });
  }

  await walletService.updateTransaction({
    _id: walletId,
    transaction: req.body,
  });

  res.status(201).json({ transaction: req.body });
};

const deleteTransaction = async (req, res, next) => {
  const { walletId, transactionId } = req.params;
  const { _id: userId } = req.user;

  const wallet = await walletService.getWalletById({ _id: walletId });
  if (!wallet) {
    return res.status(404).json({
      message: 'Wallet with such id not exist',
    });
  }

  const { owners } = wallet;
  const isOwner = owners.find(e => e.id === userId.toString());
  if (!isOwner) {
    return res.status(403).json({
      message: 'User does not owns wallet',
    });
  }

  const transaction = await walletService.getTransactionById(transactionId);
  if (!transaction) {
    return res.status(404).json({
      message: 'Transaction with such id does not exist',
    });
  }

  await walletService.deleteTransaction({ _id: walletId });

  res
    .status(201)
    .json({ message: 'Transaction deleted', transactionId: transactionId });
};

module.exports = {
  addTransaction,
  listTransactions,
  updateTransaction,
  deleteTransaction,
};
