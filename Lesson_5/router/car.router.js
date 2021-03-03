const router = require('express').Router();

const carController = require('../controller/car.controller');
const carMiddleware = require('../middleware/car.middleware');

router.get('/', carController.getAllCars);

router.get('/:carId', carMiddleware.checkIdIsValid, carController.getCarById);

router.post('/', carMiddleware.checkIsCarValid, carController.createCar);

router.delete('/:carId', carMiddleware.checkIdIsValid, carController.deleteCar);

module.exports = router;
