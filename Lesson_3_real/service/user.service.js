const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const dataBasePath = path.join(process.cwd(), 'dataBase', 'users.json');

module.exports = {
    findUsers: async () => {
        const users = await readFile(dataBasePath);

        return JSON.parse(users.toString());
    },

    createUser: async (user) => {
        const users = await readFile(dataBasePath);
        const usersParse = JSON.parse(users.toString());

        usersParse.push(user);

        await writeFile(dataBasePath, JSON.stringify(usersParse));
    },

    deleteUser: async (userId) => {
        const users = await readFile(dataBasePath);
        const usersParse = JSON.parse(users.toString());

        usersParse.splice(userId, 1);

        await writeFile(dataBasePath, JSON.stringify(usersParse));
    },

    getUserById: async (userId) => {
        const users = await readFile(dataBasePath);
        const usersParse = JSON.parse(users.toString());

        return usersParse[userId];
    }
};
