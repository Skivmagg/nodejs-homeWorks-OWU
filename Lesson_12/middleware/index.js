module.exports = {
    userMiddlewares: require('./user.middleware'),
    fileMiddleware: require('./file.middleware'),
    carMiddlewares: require('./car.middleware'),
    checkRoleMiddlewares: require('./checkRole.middleware'),
    authMiddleware: require('./auth.middleware')
};
