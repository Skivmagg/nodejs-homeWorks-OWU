const { errorCodesEnum } = require('../constant');
const { errorMessage } = require('../message');
const ErrorHandler = require('../error/ErrorHandler');
const { User } = require('../dataBase/models');
const { userValidator } = require('../validators');

module.exports = {
    checkId: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const { error } = await userValidator.userIdValidator.validate(userId);

            if (error) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST,
                    errorMessage.BAD_REQUEST.customCode,
                    errorMessage.BAD_REQUEST.message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIdInBase: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = await User.findById(userId);

            if (!user) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST,
                    errorMessage.USER_NOT_FOUND.customCode,
                    errorMessage.USER_NOT_FOUND.message);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsUserValid: (req, res, next) => {
        try {
            const { error } = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST,
                    errorMessage.BAD_REQUEST.customCode,
                    errorMessage.BAD_REQUEST.message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserRegistered: async (req, res, next) => {
        try {
            const { email } = req.body;

            const user = await User.findOne({ email });

            if (user) {
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
