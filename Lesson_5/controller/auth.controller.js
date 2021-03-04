const { User } = require('../dataBase/models');

const { passwordHasher } = require('../helpers');
const { errorCodesEnum } = require('../constant');
const { errorMessage, successMessage } = require('../message');

module.exports = {
    authUser: async (req, res) => {
        try {
            const { preferL } = req.params;
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                throw new Error(errorMessage.USER_NOT_FOUND[preferL]);
            }

            await passwordHasher.compare(password, user.password);

            res.json(successMessage.USER_LOGGED[preferL]);
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).res.json(e.message);
        }
    }
};
