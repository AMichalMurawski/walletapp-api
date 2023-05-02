const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
  date: { type: Date, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  comment: { type: String },
  sum: { type: Number, required: true },
});

const walletSchema = new Schema({
  walletId: { type: String, required: true },
  balance: { type: Number, required: true },
  transactions: [transactionSchema],
  owners: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;
