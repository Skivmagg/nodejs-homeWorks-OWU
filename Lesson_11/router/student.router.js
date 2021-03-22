const router = require('express').Router();

const { studentController } = require('../controller');
const { checkNameInBase, checkUserInBase } = require('../middleware/MySQLmiddleware/student.middleware');

router.get('/', studentController.getAll);

router.post('/', checkNameInBase, studentController.createOne);

router.delete('/', checkUserInBase, studentController.deleteOne);

module.exports = router;
