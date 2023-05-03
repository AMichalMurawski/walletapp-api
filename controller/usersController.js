const userService = require('../services/userService');
const JoiSchema = require('../schemas/usersSchema');
const nanoid = require('nanoid');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
const tokensUtils = require('../utils/tokensUtils');

sgMail.setApiKey(process.env.SENDGRID_TOKEN);
const sgFrom = process.env.SENDGRID_EMAIL;

require('dotenv').config();

const signup = async (req, res, next) => {
  try {
    const { email, password, firstName } = req.body;

    const isValid = JoiSchema.allRequired.validate({
      email,
      password,
      firstName,
    });
    if (isValid.error) {
      return res.status(400).json({
        message: isValid.error.details[0].message,
      });
    }

    const isExist = await userService.getUserByEmail({ email });
    if (isExist) {
      return res.status(400).json({
        message: 'Email already exist',
      });
    }

    const hash = await bcrypt.hash(password, 15);

    const verificationToken = await nanoid.nanoid();

    const user = await userService.addUser({
      email,
      password: hash,
      firstName,
      verificationToken,
    });
    if (!user) {
      return res.status(409).json({
        message: 'User not created',
      });
    }

    const { accessToken, refreshToken } = await tokensUtils.generateTokens({
      user,
    });

    // const verificationURL = `${req.protocol}://${req.get(
    //   'host'
    // )}/api/users/verify/:${verificationToken}`;
    // const msgMail = {
    //   to: email,
    //   from: sgFrom,
    //   subject: 'Please verify your email for walletapp',
    //   text: `Hello ${firstName}. You registered an account on walletapp. Before you can access verify your email by clicking here: ${verificationURL}`,
    // };
    // await sgMail.send(msgMail);

    res.status(201).json({ user: { ...user._doc, accessToken, refreshToken } });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password is required',
      });
    }
    const isValid = JoiSchema.atLeastOne.validate({
      email,
      password,
    });
    if (isValid.error) {
      return res.status(400).json({
        message: isValid.error.details[0].message,
      });
    }

    const user = await userService.getUserByEmail({
      email,
    });
    if (!user) {
      return res.status(401).json({
        message: 'Email or password is wrong',
      });
    }

    // if (!user.verify) {
    //   return req.status(403).json({
    //     message: 'User not verified',
    //   });
    // }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        message: 'Email or password is wrong',
      });
    }

    const { accessToken, refreshToken } = await tokensUtils.generateTokens({
      user,
    });

    const { firstName } = user;

    res.json({
      accessToken,
      refreshToken,
      user: {
        email,
        firstName,
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const signout = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const user = await userService.getUserById({ _id });
    if (!user) {
      return res.status(401).json({
        message: 'Not authorized',
      });
    }

    await userService.updateUser({
      _id,
      body: { accessToken: null, refreshToken: null },
    });

    res.status(204).json();
  } catch (err) {
    console.error(err);
    next(err);
  }
};

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
        message: 'Wrong email',
      });
    }
    if (user.verify) {
      return res.status(400).json({
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
      message: 'Verification send',
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const newTokens = async (req, res, next) => {
  try {
    const { refreshToken, email } = req.body;

    const user = await userService.getUserByEmail({ email });
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

    res.status(201).json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  signup,
  signin,
  signout,
  currentUser,
  verifyToken,
  sendVerification,
  newTokens,
};
