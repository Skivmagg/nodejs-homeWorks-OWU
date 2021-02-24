const errorCodes = require('../constant/errorCodes.enum');
const errorMessage = require('../message/error.message');

module.exports = {
    checkIdIsValid: (req, res, next) => {
        try {
            const userId = +req.params.userId;
            const {preferL} = req.body;

            if (userId < 0 || !Number.isInteger(userId) || Number.isNaN(userId)) {
                throw new Error(errorMessage.NOT_VALID_ID[preferL]);
            }

            next();
        }
        catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    isEmailIsValid: (req, res, next) => {
        try {
            const {email, preferL} = req.body;

            if (!email || email.length < 6 || email.length > 30) {
                throw new Error(errorMessage.EMAIL_ISNT_CORRECT[preferL]);
            }

            next();
        }
        catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    isPasswordIsValid: (req, res, next) => {
        try {
            const {password, preferL} = req.body;

            if (!password) {
                throw new Error(errorMessage.ENTER_PASSWORD[preferL]);
            }

            if (password.length < 6) {
                throw new Error(errorMessage.PASSWORD_IS_WEAK[preferL]);
            }

            next();
        }
        catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }

}
