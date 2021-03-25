const router = require('express').Router();

const userController = require('../controller/user.controller');
const { roles } = require('../constant');
const {
    userMiddlewares, fileMiddleware, authMiddleware, checkRoleMiddlewares
} = require('../middleware');

router.get('/', userController.getAllUsers);

router.post('/',
    fileMiddleware.checkFileMiddleware,
    fileMiddleware.checkAvatar,
    userMiddlewares.checkIsUserValid,
    userController.createUser);

router.get('/:userId',
    userMiddlewares.checkIdInBase,
    userMiddlewares.checkId,
    userController.getUserById);

router.delete('/:userId',
    authMiddleware.checkAccessTokenMiddleware,
    userMiddlewares.checkIdInBase,
    checkRoleMiddlewares.checkRole([
        roles.ADMIN,
        roles.MANAGER
    ]),
    userController.deleteUser);

module.exports = router;
