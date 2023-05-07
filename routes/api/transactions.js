const express = require('express');
const router = express.Router();
const transactionsController = require('../../controller/transactionsController');
const auth = require('../../middlewares/userAuth');

router.post(
  '/:walletId/transactions',
  auth,
  transactionsController.addTransaction
);

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

router.get(
  '/:walletId/transactions',
  auth,
  transactionsController.listTransactions
);

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
 *                  description: Transaction details
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

router.patch(
  '/:walletId/transactions/:transactionId',
  auth,
  transactionsController.updateTransaction
);

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

router.delete(
  '/:walletId/transactions/:transactionId',
  auth,
  transactionsController.deleteTransaction
);

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

module.exports = router;
