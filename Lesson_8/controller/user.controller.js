const fs = require('fs-extra').promises;

const { userService, mailService, fileService } = require('../service');
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
            const { body: { password, email }, avatar, docs } = req;
            const { preferL } = req.query;
            const hashPassword = await passwordHasher.hash(password);
            const docsArr = [];
            const user = await userService.createUser({ ...req.body, password: hashPassword });

            if (avatar) {
                const {
                    uploadPath,
                    finalFilePath,
                    fileDir
                } = fileService.fileDirBuilder(avatar.name, 'photos', user._id, 'user');

                await fs.mkdir(fileDir, { recursive: true });
                await avatar.mv(finalFilePath);

                await userService.updateUserById(user._id, { avatar: uploadPath });
            }

            if (docs) {
                for (const doc of docs) {
                    const {
                        uploadPath,
                        finalFilePath,
                        fileDir
                    } = fileService.fileDirBuilder(doc.name, 'documents', user._id, 'user');

                    // eslint-disable-next-line no-await-in-loop
                    await fs.mkdir(fileDir, { recursive: true });
                    // eslint-disable-next-line no-await-in-loop
                    await avatar.mv(finalFilePath);
                    // eslint-disable-next-line no-await-in-loop
                    docsArr.push(uploadPath);
                }
                await userService.updateUser({ _id: user._id }, { $set: { docs: docsArr } });
            }

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
