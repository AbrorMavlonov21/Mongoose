const Joi = require("joi");

const categorySchema = Joi.object({
  name: Joi.string().max(20).required(),
  // password: Joi.string().min(8).required(),
  // age: Joi.number().min(1).max(100).required(),
});

module.exports = { categorySchema };
