const express = require('express');
const router = express.Router();
const walletController = require('../../controller/walletController');
// const auth = require('../../middlewares/userAuth');

// router.get('/', auth, walletController.get); // przy pisaniu pomiń auth, wrzucimy go gdy przygotuję logowanie i rejestrację
router.post('/:userId', walletController.createWallet);

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

router.post('/:walletId/transactions');

/**
 *  @swagger
 *  /api/wallet/{walletId}/transactions:
 *      post:
 *          tags: [Transactions Controller]
 *          summary: Create new transaction for logged in user in specified wallet
 *          parameters:
 *              -   name: walletId
 *                  in: path
 *                  description: walletId
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AddTransaction'
 *          responses:
 *              201:
 *                  description: Transaction created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/AddTransaction'
 *              400:
 *                  description: Validation error
 *              401:
 *                  description: Not authorized
 *              403:
 *                  description: User does not owns wallet
 *              404:
 *                  description: Transaction category not found
 *              409:
 *                  description: Transaction category type does not match transaction type
 *              API:
 *                  description: Send to database
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/AddTransactionAPI'
 */

router.get('/:walletId/transactions');

/**
 *  @swagger
 *  /api/wallet/{walletId}/transactions:
 *      get:
 *          tags: [Transactions Controller]
 *          summary: Get all transactions for logged in user in specified wallet
 *          parameters:
 *              -   name: walletId
 *                  in: path
 *                  description: walletId
 *                  required: true
 *          responses:
 *              201:
 *                  description: Transaction created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/GetTransactions'
 *              400:
 *                  description: Validation error
 *              401:
 *                  description: Not authorized
 *              403:
 *                  description: User does not owns wallet
 */

router.patch('/:walletId/transactions/:transactionId');

/**
 *  @swagger
 *  /api/wallet/{walletId}/transactions/{transactionId}:
 *      patch:
 *          tags: [Transactions Controller]
 *          summary: Update transaction
 *          parameters:
 *              -   name: walletId
 *                  in: path
 *                  description: walletId
 *                  required: true
 *              -   name: transactionId
 *                  in: path
 *                  description: transactionId
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/EditTransaction'
 *          responses:
 *              201:
 *                  description: Transaction created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/AddTransaction'
 *              400:
 *                  description: Validation error
 *              401:
 *                  description: Not authorized
 *              403:
 *                  description: User does not owns wallet
 *              404:
 *                  description: Transaction or transaction category not found
 */

router.delete('/:walletId/transactions/:transactionId');

/**
 *  @swagger
 *  /api/wallet/{walletId}/transactions/{transactionId}:
 *      delete:
 *          tags: [Transactions Controller]
 *          summary: Delete transaction
 *          parameters:
 *              -   name: walletId
 *                  in: path
 *                  description: walletId
 *                  required: true
 *              -   name: transactionId
 *                  in: path
 *                  description: transactionId
 *                  required: true
 *          responses:
 *              204:
 *                  description: Transaction deleted
 *              400:
 *                  description: Validation error
 *              401:
 *                  description: Not authorized
 *              403:
 *                  description: User does not owns wallet
 *              404:
 *                  description: Transaction not found
 */

router.get('/:walletId/transaction-categories');

/**
 *  @swagger
 *  /api/wallet/{walletId}/transaction-categories:
 *      get:
 *          tags: [Transactions Categories]
 *          summary: Get transaction categories
 *          parameters:
 *              -   name: walletId
 *                  in: path
 *                  description: walletId
 *                  required: true
 *          responses:
 *              200:
 *                  description: Transaction deleted
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/TransactionCategories'
 *              401:
 *                  description: Not authorized
 *              403:
 *                  description: User does not owns wallet
 *              404:
 *                  description: Transaction not found
 */

router.get('/:walletId/transactions-summary');

/**
 *  @swagger
 *  /api/wallet/{walletId}/transactions-summary:
 *      get:
 *          tags: [Transactions Summary]
 *          summary: Get transactions summary for period
 *          parameters:
 *              -   name: walletId
 *                  in: path
 *                  description: walletId
 *                  required: true
 *              -   name: month
 *                  in: query
 *                  description: month
 *                  required: true
 *              -   name: year
 *                  in: query
 *                  description: year
 *                  required: true
 *          responses:
 *              200:
 *                  description: Transaction deleted
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/TransactionsSummary'
 *              400:
 *                  description: Validation error
 *              401:
 *                  description: Not authorized
 *              403:
 *                  description: User does not owns wallet
 */

module.exports = router;
