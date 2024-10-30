const Joi = require("joi");

const korzinkaSchema = Joi.object({
    userID:Joi.string().required(),
    totalPrice: Joi.number()
    .positive()              
    .required()              
    .messages({
      'number.base': 'totalPrice must be a number',
      'number.positive': 'totalPrice must be a positive number',
      'any.required': 'totalPrice is required'
    })

});
module.exports = { korzinkaSchema };