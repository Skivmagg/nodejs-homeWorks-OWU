const errorCodes = require('../constant/errorCodes.enum');
const errorMessage = require('../message/error.message');
const User = require('../dataBase/models/User');
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
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    checkIsUserValid: (req, res, next) => {
        try {
            const { firstName, lastName, age } = req.body;
            const { preferL } = req.query;

            if (!firstName || !lastName || !age) {
                throw new Error(errorMessage.EMPTY_FIELD[preferL]);
            }

            if (age < 0) {
                throw new Error(errorMessage.NOT_VALID_AGE[preferL]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
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
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
