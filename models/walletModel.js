const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  date: { type: Date, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  comment: { type: String },
  sum: { type: Number, required: true },
});

const walletSchema = new Schema(
  {
    balance: { type: Number },
    transactions: [transactionSchema],
    owner: { type: String },
  },
  {
    timestamps: true,
  }
);

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;
