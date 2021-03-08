const jwt = require('jsonwebtoken');

const { O_Auth, User } = require('../dataBase/models');
const { JWT_SECRET, JWT_REFRESH_SECRET } = require('../config/config');
const { constants } = require('../constant');
const { errorCodesEnum } = require('../constant');
const { errorMessage } = require('../message');

module.exports = {
    checkAccessTokenMiddleware: async (req, res, next) => {
        try {
            const access_token = req.get(constants.AUTHORIZATION);

            if (!access_token) {
                throw new Error(errorMessage.TOKEN_IS_REQUIRED);
            }

            jwt.verify(access_token, JWT_SECRET, (err) => {
                if (err) {
                    throw new Error(errorMessage.TOKEN_NOT_VALID);
                }
            });

            const tokens = await O_Auth.findOne({ access_token }).populate('user');

            if (!tokens) {
                throw new Error(errorMessage.TOKEN_NOT_VALID);
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    checkRefreshTokenMiddleware: async (req, res, next) => {
        try {
            const refresh_token = req.get(constants.AUTHORIZATION);

            if (!refresh_token) {
                throw new Error(errorMessage.TOKEN_IS_REQUIRED);
            }

            jwt.verify(refresh_token, JWT_REFRESH_SECRET, (err) => {
                if (err) {
                    throw new Error(errorMessage.TOKEN_NOT_VALID);
                }
            });

            const tokens = await O_Auth.findOne({ refresh_token });

            if (!tokens) {
                throw new Error(errorMessage.TOKEN_NOT_VALID);
            }

            req.badTokens = tokens;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isUserExist: async (req, res, next) => {
        try {
            const { preferL } = req.query;
            const { email } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                throw new Error(errorMessage.USER_NOT_FOUND[preferL]);
            }

            next();
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    }
};
