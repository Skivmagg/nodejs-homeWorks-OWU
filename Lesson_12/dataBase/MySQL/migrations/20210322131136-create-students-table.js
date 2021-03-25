module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */

        await queryInterface.createTable(
            'students2',
            {
                id: {
                    type: Sequelize.DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: Sequelize.DataTypes.STRING
                },
                age: {
                    type: Sequelize.DataTypes.INTEGER
                },
                gender: {
                    type: Sequelize.DataTypes.STRING
                },
            }
        );
    },

    down: async (queryInterface) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */

        await queryInterface.dropTable('students2');
    }
};
