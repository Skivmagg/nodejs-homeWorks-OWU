module.exports = (client, DataTypes) => {
    const Rating = client.define(
        'Rating',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            student_id: {
                type: DataTypes.INTEGER
            },
            lesson_id: {
                type: DataTypes.INTEGER
            },
            rating: {
                type: DataTypes.INTEGER
            },
        },
        {
            tableName: 'students',
            timestamps: false
        }
    );

    return Rating;
};
