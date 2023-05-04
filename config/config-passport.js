const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('../models/usersModel');
require('dotenv').config();
const secret = process.env.SECRET_ACCESS_TOKEN;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

// JWT Strategy
passport.use(
  new Strategy(params, function (payload, done) {
    User.find({ _id: payload.id })
      .then(([user]) => {
        if (!user) {
          return done(new Error('User not found'));
        }
        return done(null, user);
      })
      .catch(err => done(err));
  })
);

/**
 * @swagger
 *  definitions:
 *    authorization:
 *      Auth:
 *        - name: accessToken
 *          in: header
 *          description: Token assigned to header as bearer-token
 *          required: true
 *      Auth2:
 *        - name: x-api-token
 *          description: Token for authorization
 *          in:  head
 *          required: true
 *          type: string
 */
