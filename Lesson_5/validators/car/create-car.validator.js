const Joi = require('joi');

const { constants } = require('../../constant');

module.exports = Joi.object({
    model: Joi.string()
        .alphanum()
        .min(1)
        .max(50)
        .required(),
    year: Joi.number()
        .max(constants.CURRENT_YEAR),
    price: Joi.number()
        .min(100)
});
