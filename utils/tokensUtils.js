const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

require('dotenv').config();

const secretAccess = process.env.SECRET_ACCESS_TOKEN;
const secretRefresh = process.env.SECRET_REFRESH_TOKEN;

const generateTokens = async ({ user }) => {
  const payload = {
    id: user._id,
    username: user.email,
  };
  const accessToken = jwt.sign(payload, secretAccess, { expiresIn: '5m' });
  const refreshToken = jwt.sign(payload, secretRefresh, { expiresIn: '1h' });

  const addToken = await userService.updateUser({
    _id: user._id,
    body: { accessToken, refreshToken },
  });
  if (!addToken) {
    return false;
  }

  return { accessToken, refreshToken };
};

const verifyRefreshToken = async ({ refreshToken }) => {
  return new Promise((resolve, reject) => {
    const user = userService.getUserByRefreshToken({ refreshToken });
    if (!user) {
      return reject(
        new Error({
          error: true,
          message: 'Invalid refresh token',
        })
      );
    }
    jwt.verify(refreshToken, secretRefresh, (err, tokenDetails) => {
      if (err) {
        return reject(
          new Error({
            error: true,
            message: 'Invalid refresh token',
          })
        );
      }
      resolve({ tokenDetails, message: 'Valid refresh token' });
    });
  });
};

module.exports = {
  generateTokens,
  verifyRefreshToken,
};
