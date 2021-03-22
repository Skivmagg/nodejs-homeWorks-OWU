module.exports = {
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/sep-2020',
    JWT_SECRET: process.env.JWT_SECRET || 'SECRET',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'REFRESH SECRET',
    PORT: 5000,

    ROOT_EMAIL: process.env.ROOT_EMAIL || 'test@gmail.com',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || 'QWERTY',

    MYSQL_USERNAME: process.env.MYSQL_USERNAME || 'root',
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || '1234',
    MYSQL_NAME: process.env.MYSQL_NAME || 'june-2020'
};
