const cron = require('node-cron');

const deleteTokens = require('./deleteOldTokens');

module.exports = () => {
    cron.schedule('0 0 * * 0', async () => {
        await deleteTokens();
    });
};
