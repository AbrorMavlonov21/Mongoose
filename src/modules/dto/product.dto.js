const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string()
    .trim()                  
    .required()              
    .messages({
      'string.empty': 'Name is required',
      'any.required': 'Name cannot be empty'
    }),
  
  price: Joi.number()
    .positive()              
    .required()              
    .messages({
      'number.base': 'Price must be a number',
      'number.positive': 'Price must be a positive number',
      'any.required': 'Price is required'
    }),
  
  count: Joi.number()
    .integer()               
    .min(0)                  
    .required()              
    .messages({
      'number.base': 'Count must be a number',
      'number.integer': 'Count must be an integer',
      'number.min': 'Count cannot be negative',
      'any.required': 'Count is required'
    }),
  
  categoryID: Joi.string()
    .required()              
});

module.exports = { productSchema };
