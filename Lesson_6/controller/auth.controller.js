const { User, O_Auth } = require('../dataBase/models');

const { passwordHasher, tokenizer } = require('../helpers');
const { errorCodesEnum } = require('../constant');
const { errorMessage } = require('../message');

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

            const tokens = tokenizer();

            await O_Auth.create({ ...tokens, user: user._id });

            res.json(tokens);
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).res.json(e.message);
        }
    }
};
