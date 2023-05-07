const express = require('express');
const router = express.Router();
const walletController = require('../../controller/walletController');
const auth = require('../../middlewares/userAuth');

// router.get('/', auth, walletController.get); // przy pisaniu pomiń auth, wrzucimy go gdy przygotuję logowanie i rejestrację
router.post('/', auth, walletController.createWallet);

/**
 *  @swagger
 *  /api/wallet:
 *      post:
 *          tags: [Wallet Controller]
 *          summary: Create new wallet
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CreateWallet'
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
 *              API:
 *                  description: Send to database
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/WalletAPI'
 */

module.exports = router;
