const { carService } = require('../service');
const { successMessage } = require('../message');

module.exports = {
    getAllCars: async (req, res, next) => {
        try {
            const cars = await carService.findCars();

            res.json(cars);
        } catch (e) {
            next(e);
        }
    },

    createCar: async (req, res, next) => {
        try {
            const { preferL } = req.query;

            await carService.createCar(req.body);

            res.json(successMessage.CAR_CREATED[preferL]);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { preferL } = req.query;
            const { carId } = req.params;

            await carService.deleteCar(carId);

            res.json(successMessage.CAR_DELETED[preferL]);
        } catch (e) {
            next(e);
        }
    },

    getCarById: async (req, res, next) => {
        try {
            const { carId } = req.params;

            const car = await carService.getCarById(carId);

            res.json(car);
        } catch (e) {
            next(e);
        }
    }

};
