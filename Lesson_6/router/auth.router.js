const router = require('express').Router();

const { authController } = require('../controller');
const { authMiddleware } = require('../middleware');

router.post('/', authMiddleware.isUserExist, authController.authUser);

router.post('/refresh', authMiddleware.checkRefreshTokenMiddleware, authController.createNewTokens);

module.exports = router;
