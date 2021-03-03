const { errorCodesEnum } = require('../constant');
const { errorMessage } = require('../message');
const User = require('../dataBase/models/User');
const { userValidator } = require('../validators');
const { getUserById } = require('../service/user.service');

module.exports = {
    checkIdIsValid: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { preferL } = req.query;
            const user = await getUserById(userId);

            if (userId.length !== 24) {
                throw new Error(errorMessage.NOT_VALID_ID[preferL]);
            }

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
