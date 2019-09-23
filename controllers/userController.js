const db = require('../models/db');
const passport = require('passport');

module.exports.getLogin = function (req, res, next) {
    res.render('login', { title: 'Login' });
    };

module.exports.login = function (req, res, next) {
    /*passport.authenticate('local', { failureRedirect: '/login' }, function(req, res) {
        res.redirect('/')
    });*/
    };

module.exports.getRegister = function (req, res, next) {
    res.render('register', { title: 'Register' });
};

module.exports.register = function (req, res, next) {
    db.createUser(req, res);
};