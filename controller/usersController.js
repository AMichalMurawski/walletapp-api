const userService = require('../services/userService');
const JoiSchema = require('../schemas/usersSchema');
const sgMail = require('@sendgrid/mail');
const tokensUtils = require('../utils/tokensUtils');

sgMail.setApiKey(process.env.SENDGRID_TOKEN);
const sgFrom = process.env.SENDGRID_EMAIL;
const cookieParams = {
  httpOnly: true,
  // secure: true,
  sameSite: 'Strict',
  maxAge: 604800000, // 7 days
};

require('dotenv').config();

const currentUser = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const user = await userService.getUserById({ _id });
    if (!user) {
      return res.status(401).json({
        message: 'Not authorized',
      });
    }

    const { email, firstName } = user;
    res.status(201).json({
      email,
      firstName,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const verifyToken = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const isVerify = userService.verifyToken({ verificationToken });
    if (!isVerify) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.json({ message: 'Verification completed successfully' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const sendVerification = async (req, res, next) => {
  try {
    const { email } = req.body;
    const isValid = JoiSchema.atLeastOne.validate({ email });
    if (isValid.error) {
      return res.status(400).json({
        message: isValid.error.details[0].message,
      });
    }

    const user = await userService.getUserByEmail({ email });
    if (!user) {
      return res.status(401).json({
        message: 'User with such email not existed',
      });
    }
    if (user.verify) {
      return res.status(403).json({
        message: 'User already verified',
      });
    }

    const verificationURL = `${req.protocol}://${req.get(
      'host'
    )}/api/users/verify/:${user.verificationToken}`;
    const msgMail = {
      to: email,
      from: sgFrom,
      subject: 'Please verify your email for walletapp',
      text: `Hello ${user.firstName}. You registered an account on walletapp. Before you can access, verify your email by clicking here: ${verificationURL}`,
    };
    await sgMail.send(msgMail);

    res.json({
      message: 'Verification sent',
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const newTokens = async (req, res, next) => {
  try {
    let refreshToken = req.cookies.refreshToken;

    const { tokenDetails } = await tokensUtils.verifyRefreshToken({
      refreshToken,
    });
    console.log('tokenDetails:', { ...tokenDetails });
    if (!tokenDetails) {
      return res.status(401).json({
        message: 'Not authorized',
      });
    }

    const { _id } = tokenDetails;
    const user = await userService.getUserById({
      _id,
    });
    console.log('user:', user);
    if (!user) {
      return res.status(401).json({
        message: 'Not authorized',
      });
    }

    if (refreshToken !== user.refreshToken) {
      return res.status(401).json({
        message: 'Not authorized',
      });
    }

    const tokens = await tokensUtils.generateTokens({
      user,
    });

    refreshToken = tokens.refreshToken;
    res.cookie('refreshToken', refreshToken, cookieParams);
    res.status(201).json({
      accessToken: tokens.accessToken,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  currentUser,
  verifyToken,
  sendVerification,
  newTokens,
};
