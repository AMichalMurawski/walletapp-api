const Joi = require('joi');

const custom = Joi.defaults(() =>
  Joi.object({
    // do uzupełnienia
  })
);

// walidacja dla dowolnego propsa (należy tutaj podać wszystkie)
const atLeastOne = custom.object().or();

// walidacja dla wymaganych wszystkich propsów
const allRequired = custom
  .object()
  .options({ presence: 'required' })
  .required();

module.exports = {
  atLeastOne,
  allRequired,
};
