const Joi = require('joi');

const transactionSchema = Joi.object({
  date: Joi.date(),
  type: Joi.string().valid('income', 'expense'),
  category: Joi.string().valid(
    'main expenses',
    'products',
    'car',
    'self care',
    'child care',
    'household products',
    'education',
    'leisure',
    'other expenses'
  ),
  comment: Joi.string(),
  sum: Joi.number().min(1),
});

const walletSchema = Joi.defaults(() =>
  Joi.object({
    balance: Joi.number().min(0),
    transactions: Joi.string(), // tu będzie array z transactionSchema
    owner: Joi.string(),
  })
);

const atLeastOne = walletSchema.object().or('balance', 'transactions', 'owner');
const allRequired = walletSchema
  .object()
  .options({ presence: 'required' })
  .required();

module.exports = {
  atLeastOne,
  allRequired,
};
