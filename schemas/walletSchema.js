const Joi = require('joi');

const transactionSchema = Joi.object({
  date: Joi.date().required(),
  type: Joi.string().valid('income', 'expense').required(),
  category: Joi.string()
    .valid(
      'main expenses',
      'products',
      'car',
      'self care',
      'child care',
      'household products',
      'education',
      'leisure',
      'other expenses'
    )
    .required(),
  comment: Joi.string(),
  sum: Joi.number().min(1).required(),
});

const walletSchema = Joi.object({
  walletId: Joi.string().required(),
  balance: Joi.number().min(0).required(),
  transactions: Joi.array().items(transactionSchema),
  owners: Joi.array().items(Joi.string()),
});

module.exports = {
  walletSchema,
  transactionSchema,
};
