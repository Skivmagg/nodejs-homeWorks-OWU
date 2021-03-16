const studentService = require('../service/MySQL/student.service');
const { successMessage } = require('../message');

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
        try {
            await studentService.createStudent(req.body);

            res.json(successMessage.USER_CREATED);
        } catch (e) {
            next(e);
        }
    },
    deleteOne: async (req, res, next) => {
        try {
            const { name } = req.body;

            await studentService.deleteOneByName(name);

            res.json(successMessage.USER_DELETED);
        } catch (e) {
            next(e);
        }
    },
};
