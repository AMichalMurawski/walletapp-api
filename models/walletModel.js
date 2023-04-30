const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wallet = new Schema(
  {
    date: {
      type: Date,
      required: [true, 'date is required'],
    },
    type: {
      type: String,
      required: [true, 'type is required'],
    },
    category: {
      type: String,
      required: [true, 'category is required'],
    },
    comment: {
      type: String,
    },
    sum: {
      type: Number,
      required: [true, 'sum is required'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  }
);

const Wallet = mongoose.model('wallet', wallet);

module.exports = Wallet;
