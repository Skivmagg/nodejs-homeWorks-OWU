const User = require('../dataBase/models/User');

module.exports = () => {
    const count = User.countDocuments();
    console.log(count);
};
