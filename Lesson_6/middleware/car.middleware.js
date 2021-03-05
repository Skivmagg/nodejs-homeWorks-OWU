const { errorCodesEnum } = require('../constant');
const { errorMessage } = require('../message');
const { Car } = require('../dataBase/models');
const { carValidator } = require('../validators');

module.exports = {
    checkIdIsValid: async (req, res, next) => {
        try {
            const { carId } = req.params;
            const { preferL } = req.query;
            const car = await Car.findById(carId);

            if (!car) {
                throw new Error(errorMessage.CAR_NOT_FOUND[preferL]);
            }

            next();
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    checkIsCarValid: async (req, res, next) => {
        try {
            const { error } = await carValidator.createCarValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    }
};
