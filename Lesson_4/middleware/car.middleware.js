const errorCodes = require('../constant/errorCodes.enum');
const errorMessage = require('../message/error.message');
const { getCarById } = require('../service/car.service');

module.exports = {
    checkIdIsValid: async (req, res, next) => {
        try {
            const { carId } = req.params;
            const { preferL } = req.query;
            const car = await getCarById(carId);

            if (carId.length !== 24) {
                throw new Error(errorMessage.NOT_VALID_ID[preferL]);
            }

            if (!car) {
                throw new Error(errorMessage.CAR_NOT_FOUND[preferL]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    checkIsCarValid: (req, res, next) => {
        try {
            const { model, year, price } = req.body;
            const { preferL } = req.query;

            if (!model || !year || !price) {
                throw new Error(errorMessage.EMPTY_FIELD[preferL]);
            }

            if (year > 2021 || price < 0) {
                throw new Error(errorMessage.NOT_VALID_YEAR[preferL]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
