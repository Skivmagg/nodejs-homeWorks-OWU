const router = require('express').Router();

const userController = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');

router.get('/', userController.getAllUsers);

router.get('/:userId', userController.getUserById);

router.post('/', userMiddleware.isEmailIsValid, userMiddleware.isPasswordIsValid, userController.createUser);

router.delete('/:userId', userMiddleware.checkIdIsValid, userController.deleteUser);

module.exports = router;
