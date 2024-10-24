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
    .length(24)              
    .required()              
    .messages({
      'string.base': 'Category ID must be a string',
      'string.length': 'Category ID must be 24 characters long',
      'any.required': 'Category ID is required'
    })
});

module.exports = { productSchema };
