const express = require('express');
const router = express.Router();
const walletController = require('../../controller/walletController');
const auth = require('../../middlewares/userAuth');

// router.get('/', auth, walletController.get); // przy pisaniu pomiń auth, wrzucimy go gdy przygotuję logowanie i rejestrację
router.post('/', auth, walletController.createWallet);

/**
 *  @swagger
 *  /wallet:
 *      post:
 *          tags: [Wallet Controller]
 *          summary: Create new wallet
 *          parameters:
 *              -   name: accessToken
 *                  in: header
 *                  description: Token assigned to header as bearer-token
 *                  required: true
 *          responses:
 *              201:
 *                  description: Wallet created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/Wallet'
 *              400:
 *                  description: Validation error
 *              401:
 *                  description: Not authorized
 *              409:
 *                  description: Wallet not created, try again
 */

module.exports = router;
