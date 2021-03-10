const { userService, mailService } = require('../service');
const { emailActionsEnum } = require('../constant');
const { successMessage } = require('../message');
const { passwordHasher } = require('../helpers');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findUsers();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { password, email } = req.body;
            const { preferL } = req.query;

            const hashPassword = await passwordHasher.hash(password);

            await userService.createUser({ ...req.body, password: hashPassword });

            await mailService.sendMail(email, emailActionsEnum.WELCOME, { userName: email });

            res.json(successMessage.USER_CREATED[preferL]);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { preferL } = req.query;
            const { userId } = req.params;
            const { email } = req.body;

            await userService.deleteUser(userId);

            await mailService.sendMail(email, emailActionsEnum.USER_DELETED);

            res.json(successMessage.USER_DELETED[preferL]);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const user = await userService.getUserById(userId);

            res.json(user);
        } catch (e) {
            next(e);
        }
    }

};
