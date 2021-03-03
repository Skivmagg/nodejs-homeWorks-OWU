const { userService } = require('../service');
const { errorCodesEnum } = require('../constant');
const { successMessage } = require('../message');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.findUsers();

            res.json(users);
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const { preferL } = req.query;

            await userService.createUser(req.body);

            res.json(successMessage.USER_CREATED[preferL]);
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { preferL } = req.query;
            const { userId } = req.params;

            await userService.deleteUser(userId);

            res.json(successMessage.USER_DELETED[preferL]);
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).res.json(e.message);
        }
    },

    getUserById: async (req, res) => {
        try {
            const { userId } = req.params;

            const user = await userService.getUserById(userId);

            res.json(user);
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).res.json(e.message);
        }
    }

};
