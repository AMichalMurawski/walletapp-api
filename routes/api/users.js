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

module.exports = router;
