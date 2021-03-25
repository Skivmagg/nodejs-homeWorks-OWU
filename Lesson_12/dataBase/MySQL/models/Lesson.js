module.exports = (client, DataTypes) => {
    const Lesson = client.define(
        'Lesson',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            date: {
                type: DataTypes.STRING
            },
            label: {
                type: DataTypes.STRING
            },
            student_count: {
                type: DataTypes.INTEGER
            },
        },
        {
            tableName: 'students',
            timestamps: false
        }
    );

    return Lesson;
};
