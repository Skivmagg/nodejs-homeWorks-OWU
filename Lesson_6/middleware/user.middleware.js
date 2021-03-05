const { errorCodesEnum } = require('../constant');
const { errorMessage } = require('../message');
const { User } = require('../dataBase/models');
const { userValidator } = require('../validators');

module.exports = {
    checkId: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const { error } = await userValidator.userIdValidator.validate(userId);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    checkIdInBase: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { preferL } = req.query;
            const user = await User.findById(userId);

            if (!user) {
                throw new Error(errorMessage.USER_NOT_FOUND[preferL]);
            }

            next();
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    checkIsUserValid: (req, res, next) => {
        try {
            const { error } = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    isUserRegistered: async (req, res, next) => {
        try {
            const { email } = req.body;
            const { preferL } = req.query;

            const user = await User.findOne({ email });

            if (user) {
                throw new Error(errorMessage.USER_IS_REGISTERED[preferL]);
            }

            next();
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    }
};
