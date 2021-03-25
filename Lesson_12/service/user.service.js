const User = require('../dataBase/models/User');
const queryBuilder = require('../helpers/queryBuilder.helper');
require('../dataBase/models/Car');

module.exports = {
    findUsers: async (query = {}) => {
        const {
            limit,
            page,
            skip,
            keys,
            filterObject,
            sort,
            filters
        } = await queryBuilder(query);

        keys.forEach((key) => {
            switch (key) {
                case 'ageGte':
                    filterObject.age = Object.assign({}, filterObject.age, { $gte: filters.ageGte });
                    break;
                case 'ageLte':
                    filterObject.age = Object.assign({}, filterObject.age, { $lte: filters.ageLte });
                    break;
                case 'name':
                    filterObject.name = { $regex: filters.name, $options: 'i' };
                    break;
                case 'firstName':
                    filterObject.name = { $regex: filters.name, $options: 'i' };
                    break;
                case 'lastName':
                    filterObject.name = { $regex: filters.name, $options: 'i' };
                    break;
                default:
                    filterObject[key] = filters[key];
            }
        });

        const users = await User.find(filterObject).limit(+limit).skip(skip).sort(sort);
        const count = await User.countDocuments(filterObject);
        const countPages = Math.ceil(count / (+limit));

        return {
            data: users,
            page,
            limit,
            countPages
        };
    },

    createUser: (userObject) => User.create(userObject),

    deleteUser: (userId) => User.findByIdAndDelete(userId),

    getUserById: (userId) => User.findById(userId),

    updateUserById: (userId, updateObject) => User.updateOne({ _id: userId }, { $set: updateObject }),

    updateUser: (params, updateBody) => User.updateOne(params, updateBody),
};
