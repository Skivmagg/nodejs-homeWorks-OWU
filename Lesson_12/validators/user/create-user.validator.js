const Joi = require('joi');

const { constants, regexpEnum } = require('../../constant');

module.exports = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(2)
        .max(50),
    lastName: Joi.string()
        .alphanum()
        .min(2)
        .max(50),
    age: Joi.number()
        .min(18)
        .max(120),
    email: Joi.string()
        .regex(regexpEnum.EMAIL_REGEXP)
        .required(),
    password: Joi.string()
        .regex(regexpEnum.PASSWORD_REGEXP)
        .required(),
    cars: Joi.string()
        .alphanum()
        .min(24)
        .max(24)
        .optional(),
    yearOfBorn: Joi.number()
        .integer()
        .min(constants.CURRENT_YEAR - 100)
        .max(constants.CURRENT_YEAR),
    role: Joi.string()
});
