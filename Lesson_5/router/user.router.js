const router = require('express').Router();

const userController = require('../controller/user.controller');
const { userMiddlewares } = require('../middleware');

router.get('/', userController.getAllUsers);

router.get('/:userId', userMiddlewares.checkIdIsValid, userController.getUserById);

router.post('/', userMiddlewares.checkIsUserValid, userMiddlewares.isUserRegistered, userController.createUser);

router.delete('/:userId', userMiddlewares.checkIdIsValid, userController.deleteUser);

module.exports = router;
