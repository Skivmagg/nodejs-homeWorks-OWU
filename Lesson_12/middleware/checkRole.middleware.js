const { errorCodesEnum } = require('../constant');
const { errorMessage } = require('../message');
const ErrorHandler = require('../error/ErrorHandler');

module.exports = {
    checkRole: (whoHaveAccess = []) => (req, res, next) => {
        try {
            const { role } = req.user;

            if (!whoHaveAccess.length) {
                return next();
            }

            if (!whoHaveAccess.includes(role)) {
                throw new ErrorHandler(errorCodesEnum.FORBIDDEN,
                    errorMessage.ACCESS_DENIED.customCode,
                    errorMessage.ACCESS_DENIED.message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
