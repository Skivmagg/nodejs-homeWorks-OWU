const winston = require('winston');
const path = require('path');

module.exports = () => {
    const consoleOptions = {
        level: 'info',
        format: winston.format.combine(
            winston.format.colorize({ colors: { info: 'green', error: 'red' }, all: true })
        )
    };

    const fileOptions = {
        level: 'error',
        filename: path.join(process.cwd(), 'logs', 'log.txt'),
        format: winston.format.combine(
            winston.format.json({ space: 2 })
        )
    };

    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console(consoleOptions),
            new winston.transports.File(fileOptions),

        ]
    });

    return {
        info: (message) => logger.info(message),
        error: (message) => logger.error(message)
    };
};
