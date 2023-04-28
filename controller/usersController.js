const userService = require('../services/userService');
const JoiSchema = require('../schemas/usersSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const register = async (req, res, next) => {
  try {
    // uzupełnić
    res.status(201).json({ ok: 'ok' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    // uzupełnić
    res.json({ ok: 'ok' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    // uzupełnić
    res.status(204).json();
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  register,
  login,
  logout,
};
