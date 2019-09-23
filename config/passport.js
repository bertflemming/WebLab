var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models/db');

passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    async function(email, password, done) {
    const user = await db.findUser(email);
    console.log("1");
    if (!user) {
        console.log("2");
    return done(null, false, {
    message: 'Incorrect email.'
    });
    }
    if (!db.validatePassword(user, password)) {
        console.log("3");
    return done(null, false, {
    message: 'Incorrect password.'
    });
    }
    console.log("4");
    return done(null, user);
    })
    );

    passport.serializeUser(function(user, cb) {
        cb(null, user.email);
        });

    passport.deserializeUser(function(email, cb) {
    db.users.findOne({ email: email }, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
    });
    });