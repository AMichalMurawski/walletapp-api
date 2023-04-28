const User = require('../models/usersModel');

// do zrobienia rejestracja / logowanie / wylogowanie
// opcjonalnie odzyskanie hasła

const addUser = ({ email, password, firstName }) => {
  try {
    return User.create({
      email,
      password,
      firstNam: firstName,
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

module.exports = {
  addUser,
  getUserByEmail,
};
