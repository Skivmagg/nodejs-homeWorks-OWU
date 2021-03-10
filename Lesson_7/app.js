const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '../.env') });
const { PORT, MONGO_URL } = require('./config/config');

const apiRouter = require('./router/api.router');

const app = express();

_connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res.status(err.status || 500)
        .json({
            customCode: err.customCode || 0,
            message: err.message || 'Error not found'
        });
});

app.listen(PORT, () => {
    console.log('App listen 5000');
});

function _connectDB() {
    mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;

    connection.on('error', (error) => {
        console.log(error);
    });
}
