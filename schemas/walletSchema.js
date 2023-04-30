const Joi = require('joi');

const wallet = Joi.defaults(() =>
  Joi.object({
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
  })
);

// walidacja dla dowolnego propsa (należy tutaj podać wszystkie)
const atLeastOne = wallet
  .object()
  .or('date', 'type', 'category', 'comment', 'sum');

// walidacja dla wymaganych wszystkich propsów
const allRequired = wallet
  .object()
  .options({ presence: 'required' })
  .required();

module.exports = {
  atLeastOne,
  allRequired,
};
