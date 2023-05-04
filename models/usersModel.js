const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    walletId: {
      type: String,
      required: [false, 'MachineId is required'],
    },
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
 *      User:
 *        type: object
 *        example:
 *          user:
 *            id: objectId
 *            email: string
 *            firstName: string
 *      UserLog:
 *        allOf:
 *          - $ref: '#/definitions/User'
 *          - type: object
 *            example:
 *              accessToken: string
 *      Auth:
 *        - name: accessToken
 *          in: header
 *          description: Token assigned to header as bearer-token
 *          required: true
 */
