// const mysql2 = require('mysql2');
//
// const connection = mysql2.createConnection({
//     user: 'root',
//     password: '1234',
//     database: 'june-2020',
//     host: 'localhost'
// });
//
// module.exports = connection.promise();
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const fs = require('fs');

const { MYSQL_USERNAME, MYSQL_PASSWORD } = require('../../config/config');

module.exports = (() => {
    let instance;

    const initConnection = () => {
        const client = new Sequelize('june-2020', MYSQL_USERNAME, MYSQL_PASSWORD, { dialect: 'mysql' });

        const models = {};
        const modelsPath = path.join(process.cwd(), 'dataBase', 'MySQL', 'models');

        const getModels = () => {
            fs.readdir(modelsPath, (err, files) => {
                files.forEach((file) => {
                    const [model] = file.split('.');
                    // eslint-disable-next-line import/no-dynamic-require
                    const modelFile = require(path.join(modelsPath, model));

                    models[model] = modelFile(client, DataTypes);
                });
            });
        };

        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName]
        };
    };

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection();
            }
            return instance;
        }
    };
})();
