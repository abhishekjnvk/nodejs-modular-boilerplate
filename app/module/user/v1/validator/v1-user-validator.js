'use strict';
const { celebrate, Joi: joi } = require('celebrate');

const validateCreateUser = celebrate(
  {
    body: joi.object({
      name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required().min(6),
    }),
  },
  { allowUnknown: false, stripUnknown: true, warnings: false },
  {},
);

const validateLogin = celebrate(
  {
    body: joi.object({
      email: joi.string().email().required(),
      password: joi.string().required().min(6),
    }),
  },
  { allowUnknown: false, stripUnknown: true, warnings: false },
  {},
);

const emailVerification = celebrate(
  {
    query: joi.object({
      token: joi.string().required(),
    }),
  },
  { allowUnknown: false, stripUnknown: true, warnings: false },
  {},
);

const resetPasswordVerification = celebrate(
  {
    body: joi.object({
      token: joi.string().required(),
      password: joi.string().required().min(6),
    }),
  },
  { allowUnknown: false, stripUnknown: true, warnings: false },
  {},
);

const forgotPasswordVerification = celebrate(
  {
    body: joi.object({
      email: joi.string().required(),
    }),
  },
  { allowUnknown: false, stripUnknown: true, warnings: false },
  {},
);

module.exports = {
  validateCreateUser,
  validateLogin,
  emailVerification,
  resetPasswordVerification,
  forgotPasswordVerification,
};
