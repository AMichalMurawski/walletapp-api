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
 *                  description: New user registered
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/UserLog'
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
 *                  description: New User Registered
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/UserLog'
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
 *                  description: User signed out
 *              401:
 *                  description: Not authorized
 */

module.exports = router;
