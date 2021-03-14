const router = require('express').Router();

const { carController } = require('../controller');
const { carMiddlewares, fileMiddleware } = require('../middleware');

router.get('/', carController.getAllCars);

router.use('/:carId', carMiddlewares.checkIdIsValid);

router.get('/:carId', carController.getCarById);

router.post('/',
    carMiddlewares.checkIsCarValid,
    fileMiddleware.checkFileMiddleware,
    carController.createCar);

router.delete('/:carId', carController.deleteCar);

module.exports = router;
