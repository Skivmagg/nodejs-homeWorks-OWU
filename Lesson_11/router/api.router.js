const router = require('express').Router();

const authRouter = require('./auth.router');
const carRouter = require('./car.router');
const userRouter = require('./user.router');
const studentRouter = require('./student.router');

router.use('/users', userRouter);
router.use('/cars', carRouter);
router.use('/auth', authRouter);
router.use('/students', studentRouter);

module.exports = router;
