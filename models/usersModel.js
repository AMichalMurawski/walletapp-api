const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    token: {
      type: String,
      default: null,
    },
    walletId: {
      type: String,
      required: [true, 'MachineId is required'],
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

const User = mongoose.model('user', user);

module.exports = User;
