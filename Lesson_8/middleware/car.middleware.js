const { errorCodesEnum } = require('../constant');
const { errorMessage } = require('../message');
const ErrorHandler = require('../error/ErrorHandler');
const { Car } = require('../dataBase/models');
const { carValidator } = require('../validators');

module.exports = {
    checkIdIsValid: async (req, res, next) => {
        try {
            const { carId } = req.params;
            const car = await Car.findById(carId);

            if (!car) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST,
                    errorMessage.CAR_NOT_FOUND.customCode,
                    errorMessage.CAR_NOT_FOUND.message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsCarValid: async (req, res, next) => {
        try {
            const { error } = await carValidator.createCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST,
                    errorMessage.BAD_REQUEST.customCode,
                    errorMessage.BAD_REQUEST.message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
