const Joi = require('joi');

const authSchema = Joi.object({
  login: Joi.string()
    .trim()               
    .required()           
    .messages({
      'string.empty': 'Login is required',
      'any.required': 'Login cannot be empty'
    }),
  
  password: Joi.string()
    .required()           
    .messages({
      'string.empty': 'Password is required',
      'any.required': 'Password cannot be empty'
    }),
  
});

module.exports = { authSchema };
