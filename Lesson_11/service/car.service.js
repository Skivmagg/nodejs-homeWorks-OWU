const Car = require('../dataBase/models/Car');
const queryBuilder = require('../helpers/queryBuilder.helper');

module.exports = {
    findCars: async (query = {}) => {
        const {
            limit,
            page,
            skip,
            keys,
            filterObject,
            sort,
            filters
        } = await queryBuilder(query);

        keys.forEach((key) => {
            switch (key) {
                case 'priceGte':
                    filterObject.price = { ...filterObject.price, $gte: filters.priceGte };
                    break;
                case 'priceLte':
                    filterObject.price = { ...filterObject.price, $lte: filters.priceLte };
                    break;
                case 'yearGte':
                    filterObject.year = { ...filterObject.year, $gte: filters.yearGte };
                    break;
                case 'yearLte':
                    filterObject.year = { ...filterObject.year, $lte: filters.yearLte };
                    break;
                case 'model':
                    filterObject.model = { $regex: filters.model, $options: 'i' };
                    break;
                default:
                    filterObject[key] = filters[key];
            }
        });

        const cars = await Car.find(filterObject).limit(+limit).skip(skip).sort(sort);
        const count = await Car.countDocuments(filterObject);
        const countPages = Math.ceil(count / (+limit));

        return {
            data: cars,
            page,
            limit,
            countPages
        };
    },

    createCar: (carObject) => Car.create(carObject),

    deleteCar: (carId) => Car.findByIdAndDelete(carId),

    getCarById: (carId) => Car.findById(carId),

    updateCar: (params, updateBody) => Car.updateOne(params, updateBody)
};
