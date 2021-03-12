const router = require('express').Router();

const { carController } = require('../controller');
const { carMiddlewares, fileMiddleware } = require('../middleware');

router.get('/', carController.getAllCars);

router.get('/:carId', carMiddlewares.checkIdIsValid, carController.getCarById);

router.post('/', carMiddlewares.checkIsCarValid, fileMiddleware.checkFileMiddleware, carController.createCar);

router.delete('/:carId', carMiddlewares.checkIdIsValid, carController.deleteCar);

module.exports = router;
