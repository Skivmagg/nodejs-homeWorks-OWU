const router = require('express').Router();

const { carController } = require('../controller');
const { carMiddlewares } = require('../middleware');

router.get('/', carController.getAllCars);

router.get('/:carId', carMiddlewares.checkIdIsValid, carController.getCarById);

router.post('/', carMiddlewares.checkIsCarValid, carController.createCar);

router.delete('/:carId', carMiddlewares.checkIdIsValid, carController.deleteCar);

module.exports = router;
