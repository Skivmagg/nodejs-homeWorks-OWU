const jwt = require('jsonwebtoken');

const { O_Auth } = require('../dataBase/models');

module.exports = {
    checkAccessTokenMiddleware: async (req, res, next) => {
        try {
            const access_token = req.get('Authorization');

            if (!access_token) {
                throw new Error('Token required');
            }

            const tokens = await O_Auth.findOne({ access_token }).populate('user');

            console.log(tokens);

            if (!tokens) {
                throw new Error('Token not valid');
            }

            jwt.verify(access_token, 'JWT_SECRET', (err) => {
                if (err) {
                    throw new Error('Token not valid');
                }
            });

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
