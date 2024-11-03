const Joi = require("joi");

const korzinkaProductSchema = Joi.object({
    KorzinkaID:Joi.string().required(),
    ProductID:Joi.string().required(),
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
    totalPrice: Joi.number()             
    .optional()              
});

module.exports = { korzinkaProductSchema };