const router = require('express').Router();

const userRouter = require('./user.router');
const carRouter = require('./car.router');
const authRouter = require('./auth.router');

router.use('/users', userRouter);
router.use('/cars', carRouter);
router.use('/auth', authRouter);

module.exports = router;
