const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  date: { type: Date, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  comment: { type: String },
  sum: { type: Number, required: true },
});

const walletSchema = new Schema(
  {
    balance: { type: Number },
    transactions: [transactionSchema],
    owner: { type: String },
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
 *          userId: string
 *          userRole: string
 *
 *      Wallet:
 *        type: object
 *        example:
 *          id: string
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
 *            type: string
 *
 *      Transaction:
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
 */

/**
 * @swagger
 *  definitions:
 *
 *      WalletUserAPI:
 *        type: object
 *        properties:
 *          userId:
 *            type: string
 *          userRole:
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
 *            type: string
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
 *              $ref: '#/definitions/Transaction'
 */
