// const db = require('../../dataBase/MySQL');
//
// module.exports = {
//     findAll: async () => {
//         const [dbResponse] = await db.query('SELECT * FROM students') || [];
//
//         return dbResponse;
//     },
//
//     createStudent: (studentObject) => {
//         const { age, gender, name } = studentObject;
//
//         return db.query(`INSERT INTO students (age, gender, name) value ('${age}', '${gender}', '${name}')`);
//     }
// };

const db = require('../../dataBase/MySQL').getInstance();
const { STUDENT } = require('../../constant/dataBaseTables.enum');

module.exports = {
    findAll: () => {
        const Student = db.getModel(STUDENT);

        return Student.findAll();
    },

    createStudent: (studentObject) => {
        const Student = db.getModel(STUDENT);

        return Student.create(studentObject);
    },

    findOne: (studentName) => {
        const Student = db.getModel(STUDENT);

        return Student.findOne({ where: { name: `${studentName}` } });
    },

    deleteOneByName: (studentName) => {
        const Student = db.getModel(STUDENT);

        return Student.destroy({ where: { name: `${studentName}` } });
    }
};
