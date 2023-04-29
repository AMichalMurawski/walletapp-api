const userService = require('../services/userService');
const JoiSchema = require('../schemas/usersSchema');
const nanoid = require('nanoid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

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

    const walletId = await nanoid.nanoid();

    const hash = await bcrypt.hash(password, 15);

    const user = await userService.addUser({
      email,
      password: hash,
      firstName,
      walletId,
    });

    res.status(201).json({ user });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const login = async (req, res, next) => {
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

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        message: 'Email or password is wrong',
      });
    }

    const payload = {
      id: user._id,
      username: user.email,
    };
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    await userService.updateUserToken({ _id: user._id, body: { token } });

    const { firstName } = user;

    res.json({
      token,
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

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const user = await userService.getUserById({ _id });
    if (!user) {
      return res.status(401).json({
        message: 'Not authorized',
      });
    }

    await userService.updateUserToken({
      _id,
      body: { token: null },
    });

    res.status(204).json();
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const actualuser = async (req, res, next) => {
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

module.exports = {
  signup,
  login,
  logout,
  actualuser,
};
