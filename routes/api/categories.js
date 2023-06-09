const express = require('express');
const router = express.Router();
const categoriesController = require('../../controller/categoriesController');
const auth = require('../../middlewares/userAuth');

router.get(
  '/:walletId/transaction-categories',
  auth,
  categoriesController.categoriesList
);

/**
 *  @swagger
 *  /wallet/{walletId}/transaction-categories:
 *      get:
 *          tags: [Transactions Categories]
 *          summary: Get transaction categories (for logged in user in specified wallet)
 *          parameters:
 *              -   name: accessToken
 *                  in: header
 *                  description: Token assigned to header as bearer-token
 *                  required: true
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
  auth,
  categoriesController.transactionsSummary
);

/**
 *  @swagger
 *  /wallet/{walletId}/transactions-summary:
 *      get:
 *          tags: [Transactions Summary]
 *          summary: Get transactions summary for period (for logged in user in specified wallet)
 *          parameters:
 *              -   name: accessToken
 *                  in: header
 *                  description: Token assigned to header as bearer-token
 *                  required: true
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
 *                  description: Transactions sumnmary returned
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
