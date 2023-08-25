'use strict';
const { celebrate, Joi: joi } = require('celebrate');

const validateCreateUser = celebrate(
  {
    body : joi.object({
      name     : joi.string().required(),
      email    : joi.string().email().required(),
      password : joi.string().required().length(6)
    }),
  },
  { allowUnknown: false, stripUnknown: true, warnings: false },
  {}
);

const validateLogin = celebrate(
  {
    body : joi.object({
      email    : joi.string().email().required(),
      password : joi.string().required().length(6)
    }),
  },
  { allowUnknown: false, stripUnknown: true, warnings: false },
  {}
);

module.exports = { validateCreateUser, validateLogin };
