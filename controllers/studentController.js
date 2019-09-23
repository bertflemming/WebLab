const db = require('../models/db');

/* GET student page */
module.exports.student = function (req, res, next) {
    res.render('student', { title: 'Student' });
    };
    
module.exports.addStudent = function (req, res, next) {
    db.createStudent(req.body.name, req.body.grade);
    res.redirect('/student')
    };

module.exports.showStudents =async function (req, res, next) {
    res.render('students', {
    title: 'Students',
    students: await db.getStudents()
    });
};

module.exports.deleteStudent = function (req, res, next) {
    db.deleteStudent(req.params.id);
    console.log(req.params.id);
    res.redirect('/students')
    };