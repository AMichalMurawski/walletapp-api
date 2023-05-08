const express = require('express');
const router = express.Router();
const authController = require('../../controller/authController');
const auth = require('../../middlewares/userAuth');

router.post('/sign-up', authController.signup);

/**
 *  @swagger
 *  /auth/sign-up:
 *      post:
 *          tags: [Auth Controller]
 *          summary: Sign up new user
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Sign-up'
 *          responses:
 *              201:
 *                  description:
 *                      New user registered
 *                      (refreshToken add to cookies)
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/UserLog'
 *                      cookies:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  refreshToken:
 *                                      type: string
 *              400:
 *                  description: Validation error
 *              409:
 *                  description:
 *                      User with such email already exists
 *                      OR
 *                      User not created, try again
 */

router.post('/sign-in', authController.signin);

/**
 *  @swagger
 *  /auth/sign-in:
 *      post:
 *          tags: [Auth Controller]
 *          summary: Sign in existing user
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Sign-in'
 *          responses:
 *              201:
 *                  description:
 *                      New User Registered
 *                      (refreshToken add to cookies)
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/UserLog'
 *                      cookies:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  refreshToken:
 *                                      type: string
 *              400:
 *                  description: Validation error
 *              403:
 *                  description: User not verified
 *              404:
 *                  description: Provided email or password is incorrect
 */

router.get('/sign-out', auth, authController.signout);

/**
 *  @swagger
 *  /auth/sign-out:
 *      get:
 *          tags: [Auth Controller]
 *          summary: Sign out user
 *          parameters:
 *              -   name: accessToken
 *                  in: header
 *                  description: Token assigned to header as bearer-token
 *                  required: true
 *          responses:
 *              204:
 *                  description:
 *                      User signed out
 *                      (refreshToken clear in cookies)
 *                  content:
 *                      cookies:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  refreshToken:
 *                                      example: null
 *              401:
 *                  description: Not authorized
 */

router.get('/verify/:verificationToken', authController.verifyToken);

/**
 *  @swagger
 *  /auth/verify/{verificationToken}:
 *      get:
 *          tags: [Auth Controller]
 *          summary: Verify user account
 *          parameters:
 *              -   in: path
 *                  name: verificationToken
 *                  type: string
 *                  required: true
 *                  description: Verification token for verify user account
 *          responses:
 *              200:
 *                  description: Verification completed successfully
 *              404:
 *                  description: This verification is not exist
 */

router.post('/verify', authController.sendVerification);

/**
 *  @swagger
 *  /auth/verify:
 *      post:
 *          tags: [Auth Controller]
 *          summary: Send new verification email
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SendVerify'
 *          responses:
 *              200:
 *                  description: Verification sent
 *              400:
 *                  description: Validation error
 *              401:
 *                  description: User with such email not existed
 *              403:
 *                  description: User already verified
 */

router.post('/refresh-tokens', authController.refreshTokens);

/**
 *  @swagger
 *  /auth/refresh-tokens:
 *      post:
 *          tags: [Auth Controller]
 *          summary: Send new tokens
 *          parameters:
 *              -   in: cookies
 *                  name: refreshToken
 *                  type: string
 *                  required: true
 *                  description: Verification token for verify user account
 *          responses:
 *              201:
 *                  description:
 *                      Tokens sent
 *                      (refreshToken add to cookies)
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example:
 *                                  accessToken: string
 *                      cookies:
 *                          schema:
 *                              type: object
 *                              example:
 *                                  refreshToken: string
 *              401:
 *                  description: Not authorized
 */

module.exports = router;
