const express = require('express');
const router = express.Router();
const userController = require('../../controller/usersController');
const auth = require('../../middlewares/userAuth');

router.get('/current', auth, userController.currentUser);

/**
 *  @swagger
 *  /users/current:
 *      get:
 *          tags: [Users Controller]
 *          summary: Get current user info
 *          parameters:
 *              -   name: accessToken
 *                  in: header
 *                  description: Token assigned to header as bearer-token
 *                  required: true
 *          responses:
 *              200:
 *                  description: Logged user returned
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/User'
 *              401:
 *                  description: Not authorized
 */

router.get('/verify/:verificationToken', userController.verifyToken);

/**
 *  @swagger
 *  /verify/{verificationToken}:
 *      get:
 *          tags: [Users Controller]
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
 *                  description: User not found
 */

router.post('/verify', userController.sendVerification);

/**
 *  @swagger
 *  /verify:
 *      post:
 *          tags: [Users Controller]
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

router.post('/new-tokens', userController.newTokens);

/**
 *  @swagger
 *  /new-tokens:
 *      post:
 *          tags: [Users Controller]
 *          summary: Send new verification email
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
