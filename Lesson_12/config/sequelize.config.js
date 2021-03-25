const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_NAME } = require('./config');

module.exports = {
    development: {
        username: MYSQL_USERNAME,
        password: MYSQL_PASSWORD,
        database: MYSQL_NAME,
        host: '127.0.0.1',
        dialect: 'mysql'
    }
};
