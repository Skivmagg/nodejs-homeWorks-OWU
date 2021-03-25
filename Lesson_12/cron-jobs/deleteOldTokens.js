const authService = require('../service/auth.service');

module.exports = () => {
    authService.deleteTokens();
};
