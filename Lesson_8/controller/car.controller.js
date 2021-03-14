const fs = require('fs-extra').promises;

const { carService, fileService } = require('../service');
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
            const {
                photos,
                docs,
                body,
                query: { preferL }
            } = req;
            const docsArr = [];
            const photosArr = [];
            const car = await carService.createCar(body);

            if (photos) {
                for (const photo of photos) {
                    const {
                        uploadPath,
                        finalFilePath,
                        fileDir
                    } = fileService.fileDirBuilder(photo.name, 'photos', car._id, 'car');

                    // eslint-disable-next-line no-await-in-loop
                    await fs.mkdir(fileDir, { recursive: true });
                    // eslint-disable-next-line no-await-in-loop
                    await photo.mv(finalFilePath);

                    photosArr.push(uploadPath);
                }
                await carService.updateCar({ _id: car._id }, { $set: { photos: photosArr } });
            }

            if (docs) {
                for (const doc of docs) {
                    const {
                        uploadPath,
                        finalFilePath,
                        fileDir
                    } = fileService.fileDirBuilder(doc.name, 'documents', car._id, 'car');

                    // eslint-disable-next-line no-await-in-loop
                    await fs.mkdir(fileDir, { recursive: true });
                    // eslint-disable-next-line no-await-in-loop
                    await doc.mv(finalFilePath);
                    // eslint-disable-next-line no-await-in-loop
                    docsArr.push(uploadPath);
                }
                await carService.updateCar({ _id: car._id }, { $set: { docs: docsArr } });
            }

            res.json(successMessage.CAR_CREATED[preferL]);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { preferL } = req.query;
            const { car } = req;

            await carService.deleteCar(car.carId);

            res.json(successMessage.CAR_DELETED[preferL]);
        } catch (e) {
            next(e);
        }
    },

    getCarById: (req, res, next) => {
        try {
            const { car } = req;

            res.json(car);
        } catch (e) {
            next(e);
        }
    }

};
