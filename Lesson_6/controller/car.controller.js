const { carService } = require('../service');
const { errorCodesEnum } = require('../constant');
const { successMessage } = require('../message');

module.exports = {
    getAllCars: async (req, res) => {
        try {
            const cars = await carService.findCars();

            res.json(cars);
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).res.json(e.message);
        }
    },

    createCar: async (req, res) => {
        try {
            const { preferL } = req.query;

            await carService.createCar(req.body);

            res.json(successMessage.CAR_CREATED[preferL]);
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).res.json(e.message);
        }
    },

    deleteCar: async (req, res) => {
        try {
            const { preferL } = req.query;
            const { carId } = req.params;

            await carService.deleteCar(carId);

            res.json(successMessage.CAR_DELETED[preferL]);
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).res.json(e.message);
        }
    },

    getCarById: async (req, res) => {
        try {
            const { carId } = req.params;

            const car = await carService.getCarById(carId);

            res.json(car);
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).res.json(e.message);
        }
    }

};
