const router = require('express').Router();

const userController = require('../controller/user.controller');
const { userMiddlewares, fileMiddleware, authMiddleware } = require('../middleware');

router.get('/', userController.getAllUsers);

router.post('/',
    fileMiddleware.checkFileMiddleware,
   fileMiddleware.checkAvatar,
    userMiddlewares.checkIsUserValid,
    userMiddlewares.isUserRegistered,
    userController.createUser);

router.get('/:userId', userMiddlewares.checkIdInBase, userMiddlewares.checkId, userController.getUserById);

router.delete('/:userId', authMiddleware.checkAccessTokenMiddleware, userController.deleteUser);

module.exports = router;
