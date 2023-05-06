const express = require('express');
const router = express.Router();
const categoriesController = require('../../controller/categoriesController');

router.get(
  '/:walletId/transaction-categories',
  categoriesController.categoriesList
);

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
 *                  description: Transactions categories returned
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/TransactionCategories'
 *              401:
 *                  description: Not authorized
 *              403:
 *                  description: User does not owns wallet
 *              404:
 *                  description:
 *                      Wallet not found
 *                      OR
 *                      Categories not found
 */

router.get(
  '/:walletId/transactions-summary',
  categoriesController.transactionsSummary
);

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
 *              404:
 *                  description: Wallet not found
 *              409:
 *                  description: Transactions summary not calculated
 */

module.exports = router;
