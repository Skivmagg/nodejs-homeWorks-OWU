const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '../.env') });
const { PORT, MONGO_URL } = require('./config/config');
const db = require('./dataBase/MySQL').getInstance();
const logger = require('./logger/winston')();

const apiRouter = require('./router/api.router');

const cronRun = require('./cron-jobs');

const app = express();

db.setModels();

_connectDB();

app.use(morgan('dev'));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), 'static')));

app.use('/', apiRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    logger.error({
        message: err.message
    });
    res.status(err.status || 500)
        .json({
            customCode: err.customCode || 0,
            message: err.message || 'Error not found'
        });
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
    cronRun();
});

function _connectDB() {
    mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;

    connection.on('error', (error) => {
        console.log(error);
    });
}
