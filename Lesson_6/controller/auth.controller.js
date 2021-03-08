const { User } = require('../dataBase/models');

const { errorCodesEnum } = require('../constant');
const { errorMessage } = require('../message');
const { authService } = require('../service');

module.exports = {
    authUser: async (req, res) => {
        try {
            const { preferL } = req.params;
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                throw new Error(errorMessage.USER_NOT_FOUND[preferL]);
            }

            const tokens = await authService.createTokens(password, user);

            res.json(tokens);
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    createNewTokens: async (req, res) => {
        try {
            const { badTokens } = req;

            const tokens = await authService.refreshTokens(badTokens);

            res.json(tokens);
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    }

};
