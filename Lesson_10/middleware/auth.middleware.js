const jwt = require('jsonwebtoken');

const { O_Auth, User } = require('../dataBase/models');
const { JWT_SECRET, JWT_REFRESH_SECRET } = require('../config/config');
const { constants } = require('../constant');
const { errorCodesEnum } = require('../constant');
const { errorMessage } = require('../message');
const ErrorHandler = require('../error/ErrorHandler');

module.exports = {
    checkAccessTokenMiddleware: async (req, res, next) => {
        try {
            const access_token = req.get(constants.AUTHORIZATION);

            if (!access_token) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST,
                    errorMessage.TOKEN_IS_REQUIRED.customCode,
                    errorMessage.TOKEN_IS_REQUIRED.message);
            }

            jwt.verify(access_token, JWT_SECRET, (err) => {
                if (err) {
                    throw new ErrorHandler(errorCodesEnum.BAD_REQUEST,
                        errorMessage.TOKEN_NOT_VALID.customCode,
                        errorMessage.TOKEN_NOT_VALID.message);
                }
            });

            const tokens = await O_Auth.findOne({ access_token }).populate('user');

            if (!tokens) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST,
                    errorMessage.TOKEN_IS_REQUIRED.customCode,
                    errorMessage.TOKEN_IS_REQUIRED.message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshTokenMiddleware: async (req, res, next) => {
        try {
            const refresh_token = req.get(constants.AUTHORIZATION);

            if (!refresh_token) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST,
                    errorMessage.TOKEN_IS_REQUIRED.customCode,
                    errorMessage.TOKEN_IS_REQUIRED.message);
            }

            jwt.verify(refresh_token, JWT_REFRESH_SECRET, (err) => {
                if (err) {
                    throw new ErrorHandler(errorCodesEnum.BAD_REQUEST,
                        errorMessage.TOKEN_NOT_VALID.customCode,
                        errorMessage.TOKEN_NOT_VALID.message);
                }
            });

            const tokens = await O_Auth.findOne({ refresh_token });

            if (!tokens) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST,
                    errorMessage.TOKEN_IS_REQUIRED.customCode,
                    errorMessage.TOKEN_IS_REQUIRED.message);
            }

            req.badTokens = tokens;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserExist: async (req, res, next) => {
        try {
            const { email } = req.body;

            const user = await User.findOne({ email });

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
    }
};
