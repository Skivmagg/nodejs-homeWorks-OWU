const Car = require('../dataBase/models/Car');

module.exports = {
    findCars: () => Car.find(),

    createCar: (carObject) => Car.create(carObject),

    deleteCar: (carId) => Car.findByIdAndDelete(carId),

    getCarById: (carId) => Car.findById(carId),

    updateCar: (params, updateBody) => Car.updateOne(params, updateBody),
};
