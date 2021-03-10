const User = require('../dataBase/models/User');
require('../dataBase/models/Car');

module.exports = {
    findUsers: () => User.find(),

    createUser: (userObject) => User.create(userObject),

    deleteUser: (userId) => User.findByIdAndDelete(userId),

    getUserById: (userId) => User.findById(userId)
};
