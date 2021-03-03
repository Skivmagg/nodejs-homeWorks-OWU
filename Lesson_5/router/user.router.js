const router = require('express').Router();

const userController = require('../controller/user.controller');
const { userMiddlewares } = require('../middleware');

router.get('/', userController.getAllUsers);

router.get('/:userId', userMiddlewares.checkIdInBase, userMiddlewares.checkId, userController.getUserById);

router.post('/', userMiddlewares.checkIsUserValid, userMiddlewares.isUserRegistered, userController.createUser);

router.delete('/:userId', userMiddlewares.checkIdInBase, userMiddlewares.checkId, userController.deleteUser);

module.exports = router;
