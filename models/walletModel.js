const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  id: { type: String, required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true },
  categoryId: { type: String, required: true },
  comment: { type: String, required: true },
  sum: { type: Number, required: true },
});

const categorySchema = new Schema({
  _id: false,
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: Array, required: true },
});

const ownerSchema = new Schema({
  _id: false,
  id: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
});

const walletSchema = new Schema(
  {
    balance: { type: Number, required: true },
    transactions: [transactionSchema.obj],
    categories: [categorySchema.obj],
    owners: [ownerSchema.obj],
  },
  {
    timestamps: true,
  }
);

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;

/**
 * @swagger
 *  components:
 *    schemas:
 *
 *      CreateWallet:
 *        type: object
 *        required:
 *          - userId
 *        properties:
 *            userId:
 *              type: string
 *
 *      AddTransaction:
 *        allOf:
 *          - required:
 *            - date
 *            - type
 *            - categoryId
 *            - sum
 *          - $ref: '#/definitions/Transaction'
 *
 *      EditTransaction:
 *        $ref: '#/definitions/Transaction'
 *
 */

/**
 * @swagger
 *  definitions:
 *
 *      WalletUser:
 *        type: object
 *        example:
 *          id: string
 *          name: string
 *          role: string
 *
 *      Wallet:
 *        type: object
 *        example:
 *          walletId: string
 *
 *      AddTransaction:
 *        type: object
 *        properties:
 *          balance:
 *            type: number
 *          transaction:
 *            $ref: '#/definitions/Transaction'
 *
 *      GetTransactions:
 *        type: object
 *        properties:
 *          transactions:
 *            type: array
 *            items:
 *              $ref: '#/definitions/Transaction'
 *
 *      TransactionCategories:
 *        type: array
 *        items:
 *          $ref: '#/definitions/Categories'
 *
 *      TransactionsSummary:
 *        type: object
 *        properties:
 *          categorySummary:
 *            type: array
 *            items:
 *              $ref: '#/definitions/Categories'
 *          incomeSummary:
 *            type: number
 *          expenseSummary:
 *            type: number
 *          periodTotal:
 *            type: number
 *          year:
 *            type: number
 *          month:
 *            type: number
 *
 *      Categories:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *          name:
 *            type: string
 *          type:
 *            type: array
 *            items:
 *              string:
 *
 *      Transaction:
 *        type: object
 *        properties:
 *          date:
 *            type: string
 *          type:
 *            type: string
 *          categoryId:
 *            type: string
 *          comment:
 *            type: string
 *          sum:
 *            type: number
 */

/**
 * @swagger
 *  definitions:
 *
 *      WalletUserAPI:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *          name:
 *            type: string
 *          role:
 *            type: string
 *
 *      CategoriesAPI:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *          name:
 *            type: string
 *          type:
 *            type: array
 *            items:
 *              string:
 *
 *      TransactionAPI:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *          date:
 *            type: string
 *          type:
 *            type: string
 *          categoryId:
 *            type: string
 *          comment:
 *            type: string
 *          sum:
 *            type: number
 *
 *      WalletAPI:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *          balance:
 *            type: number
 *          categories:
 *            type: array
 *            items:
 *              $ref: "#/definitions/CategoriesAPI"
 *          transactions:
 *            type: array
 *            items:
 *              type: object
 *          owners:
 *            type: array
 *            items:
 *              $ref: "#/definitions/WalletUserAPI"
 *
 *      AddTransactionAPI:
 *        type: object
 *        properties:
 *          balance:
 *            type: string
 *          transactions:
 *            type: array
 *            items:
 *              $ref: '#/definitions/TransactionAPI'
 */
