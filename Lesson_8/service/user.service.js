const User = require('../dataBase/models/User');
require('../dataBase/models/Car');

module.exports = {
    findUsers: () => User.find(),

    createUser: (userObject) => User.create(userObject),

    deleteUser: (userId) => User.findByIdAndDelete(userId),

    getUserById: (userId) => User.findById(userId),

    updateUserById: (userId, updateObject) => User.updateOne({ _id: userId }, { $set: updateObject }),

    updateUser: (params, updateBody) => User.updateOne(params, updateBody),
};
