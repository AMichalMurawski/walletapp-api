const User = require('../models/usersModel');

// do zrobienia rejestracja / logowanie / wylogowanie
// opcjonalnie odzyskanie hasła

const addUser = ({ email, password, firstName, walletId }) => {
  try {
    return User.create({
      email,
      password,
      firstName,
      walletId,
    });
  } catch (err) {
    return false;
  }
};

const getUserByEmail = ({ email }) => {
  try {
    return User.findOne({ email });
  } catch (err) {
    return false;
  }
};

const getUserById = ({ _id }) => {
  try {
    return User.findOne({ _id });
  } catch (err) {
    return false;
  }
};

const updateUserToken = ({ _id, body }) => {
  try {
    return User.findOneAndUpdate({ _id }, body, { new: true });
  } catch (err) {
    return false;
  }
};

module.exports = {
  addUser,
  getUserByEmail,
  getUserById,
  updateUserToken,
};
