const userService = require('../services/userService');
const JoiSchema = require('../schemas/usersSchema');
const nanoid = require('nanoid');
const bcrypt = require('bcrypt');
// const sgMail = require('@sendgrid/mail');
const tokensUtils = require('../utils/tokensUtils');

// sgMail.setApiKey(process.env.SENDGRID_TOKEN);
// const sgFrom = process.env.SENDGRID_EMAIL;
const cookieParams = {
  httpOnly: true,
  // secure: true,
  sameSite: 'Strict',
  maxAge: 604800000, // 7 days
};

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
    res.cookie('refreshToken', refreshToken, cookieParams);
    res.status(201).json({ user: { ...user._doc, accessToken } });
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

    res.cookie('refreshToken', refreshToken, cookieParams);
    res.json({
      accessToken,
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
    res.cookie('refreshToken', null);
    res.status(204).json();
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  signup,
  signin,
  signout,
};
