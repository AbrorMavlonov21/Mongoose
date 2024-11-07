const Joi = require("joi");

const forgotPasswordSchema = Joi.object({
    gmail: Joi.string().required()
});

const verifyCodeSchema = Joi.object({
    code: Joi.string().min(4).max(4).required()
});
const changePasswordSchema = Joi.object({
    newPassword: Joi.string().min(8).required(),
    confirmPassword: Joi.any().valid(Joi.ref("newPassword")).required(),
}).with("newnewPassword", "confirmPassword")

module.exports = { forgotPasswordSchema, verifyCodeSchema, changePasswordSchema };