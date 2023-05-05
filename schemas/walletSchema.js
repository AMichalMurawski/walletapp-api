const Joi = require('joi');

const walletSchema = Joi.defaults(() =>
  Joi.object({
    balance: Joi.number().min(0),
    transactions: Joi.array(), // tu będzie array z transactionSchema
    categories: Joi.array(),
    owners: Joi.array(),
  })
);

const atLeastOne = walletSchema
  .object()
  .or('balance', 'transactions', 'categories', 'owners');
const allRequired = walletSchema
  .object()
  .options({ presence: 'required' })
  .required();

module.exports = {
  atLeastOne,
  allRequired,
};
