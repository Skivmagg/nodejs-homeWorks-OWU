const studentService = require('../service/MySQL/student.service');
const { successMessage } = require('../message');

const { transactionInstance } = require('../dataBase/MySQL').getInstance();

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const students = await studentService.findAll();

            res.json(students);
        } catch (e) {
            next(e);
        }
    },
    createOne: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            await studentService.createStudent(req.body, transaction);

            await transaction.commit();
            res.json(successMessage.USER_CREATED);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },
    deleteOne: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const { name } = req.body;

            await studentService.deleteOneByName(name, transaction);

            await transaction.commit();
            res.json(successMessage.USER_DELETED);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },
};
