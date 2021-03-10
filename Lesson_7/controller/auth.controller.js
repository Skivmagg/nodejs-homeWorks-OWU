const { User } = require('../dataBase/models');

const { errorCodesEnum } = require('../constant');
const ErrorHandler = require('../error/ErrorHandler');
const { errorMessage } = require('../message');
const { emailActionsEnum } = require('../constant');
const { authService, mailService } = require('../service');

module.exports = {
    authUser: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST,
                    errorMessage.USER_NOT_FOUND.customCode,
                    errorMessage.USER_NOT_FOUND.message);
            }

            const tokens = await authService.createTokens(password, user);

            await mailService.sendMail(email, emailActionsEnum.AUTHORIZED, { userName: user.firstName });

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },

    createNewTokens: async (req, res, next) => {
        try {
            const { badTokens } = req;

            const tokens = await authService.refreshTokens(badTokens);

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    }

};
