const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const walletSchema = new Schema({
  _id: false,
  id: { type: String, required: true },
  role: { type: String, required: true },
});

const user = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    wallets: [walletSchema.obj],
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  }
);

const User = mongoose.model('user', user);

module.exports = User;

/**
 * @swagger
 *  components:
 *    schemas:
 *      Sign-up:
 *        type: object
 *        required:
 *          - email
 *          - password
 *          - firstName
 *        properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *            firstName:
 *              type: string
 *      Sign-in:
 *        type: object
 *        required:
 *          - email
 *          - password
 *          - firstName
 *        properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *            firstName:
 *              type: string
 *      SendVerify:
 *        type: object
 *        required:
 *          - email
 *        properties:
 *            email:
 *              type: string
 */

/**
 * @swagger
 *  definitions:
 *      UserWallet:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *          role:
 *            type: string
 *
 *      User:
 *        type: object
 *        properties:
 *          user:
 *            type: object
 *            properties:
 *              id:
 *                type: objectId
 *              email:
 *                type: string
 *              firstName:
 *                type: string
 *              wallets:
 *                type: array
 *                items:
 *                  $ref: '#/definitions/UserWallet'
 *
 *
 *      UserLog:
 *        type: object
 *        properties:
 *          user:
 *            type: object
 *            properties:
 *              id:
 *                type: objectId
 *              email:
 *                type: string
 *              firstName:
 *                type: string
 *              wallets:
 *                type: array
 *                items:
 *                  $ref: '#/definitions/UserWallet'
 *          accessToken:
 *            type: string
 *      Auth:
 *        - name: accessToken
 *          in: header
 *          description: Token assigned to header as bearer-token
 *          required: true
 */
