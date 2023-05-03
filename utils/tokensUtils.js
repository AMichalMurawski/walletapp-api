const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

require('dotenv').config();

const accessKey = process.env.ACCESS_TOKEN_KEY;
const refreshKey = process.env.REFRESH_TOKEN_KEY;

const generateTokens = async ({ user }) => {
  const payload = {
    id: user._id,
    username: user.email,
  };
  const accessToken = jwt.sign(payload, accessKey, { expiresIn: '5m' });
  const refreshToken = jwt.sign(payload, refreshKey, { expiresIn: '1h' });

  const addToken = await userService.updateUser({
    _id: user._id,
    body: { accessToken, refreshToken },
  });
  if (!addToken) {
    return false;
  }

  return { accessToken, refreshToken };
};

module.exports = {
  generateTokens,
};
