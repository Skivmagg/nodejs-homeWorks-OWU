const router = require('express').Router();

const userController = require('../controller/user.controller');
const { userMiddlewares, authMiddleware } = require('../middleware');

router.get('/', userController.getAllUsers);

router.get('/:userId', userMiddlewares.checkIdInBase, userMiddlewares.checkId, userController.getUserById);

router.post('/', userMiddlewares.checkIsUserValid, userMiddlewares.isUserRegistered, userController.createUser);

// router.delete('/:userId', userMiddlewares.checkIdInBase,
// userMiddlewares.checkId, authMiddleware.checkAccessTokenMiddleware, userController.deleteUser);
router.delete('/:userId', authMiddleware.checkAccessTokenMiddleware, userController.deleteUser);

module.exports = router;
