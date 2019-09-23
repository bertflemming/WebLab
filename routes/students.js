var express = require('express');
var router = express.Router();
const ctrlStudent = require('../controllers/studentController');

/* GET home page. */
router.get('/', ctrlStudent.showStudents);
router.get('/deleteStudent/:id', ctrlStudent.deleteStudent);


module.exports = router;
