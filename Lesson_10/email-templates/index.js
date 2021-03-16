const emailActionsEnum = require('../constant/emailActions.enum');

module.exports = {
    [emailActionsEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome, your account was created'
    },

    [emailActionsEnum.USER_DELETED]: {
        templateName: 'deleted',
        subject: 'User was deleted'
    },

    [emailActionsEnum.AUTHORIZED]: {
        templateName: 'authorized',
        subject: 'You was authorized'
    }
};
