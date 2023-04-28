const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wallet = new Schema(
  {
    // do uzupełnienia
  },
  { versionKey: false, timestamps: true }
);

const Wallet = mongoose.model('wallet', wallet);

module.exports = Wallet;
