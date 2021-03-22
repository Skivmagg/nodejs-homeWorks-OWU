const studentService = require('../../service/MySQL/student.service');

const { errorCodesEnum } = require('../../constant');
const { errorMessage } = require('../../message');
const ErrorHandler = require('../../error/ErrorHandler');

module.exports = {
    checkNameInBase: async (req, res, next) => {
        try {
            const { name } = req.body;

            const selectedStudent = await studentService.findOne(name);

            if (selectedStudent) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST,
                    errorMessage.USER_IS_REGISTERED.customCode,
                    errorMessage.USER_IS_REGISTERED.message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserInBase: async (req, res, next) => {
        try {
            const { name } = req.body;

            const selectedStudent = await studentService.findOne(name);

            if (!selectedStudent) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST,
                    errorMessage.USER_NOT_FOUND.customCode,
                    errorMessage.USER_NOT_FOUND.message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
