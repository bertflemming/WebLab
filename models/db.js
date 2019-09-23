var mongoose = require( 'mongoose' );
const bcrypt = require( 'bcrypt' );

const saltRounds = 10;

const Schema = mongoose.Schema;

var dbURI = 'mongodb://localhost/StudentsWebPage';
mongoose.connect(dbURI);

//Define a schema
const StudentSchema = new Schema({
    name: String,
    grade: String
    });
    
var Student = mongoose.model('Student', StudentSchema);

const userSchema = new mongoose.Schema({
    email: {
    type: String,
    unique: true,
    required: true
    },
    name: {
    type: String,
    required: true
    },
    hash: String
    }); 


var User = mongoose.model('User', userSchema);

module.exports.validatePassword = async function (user, password) {
    console.log(`hash ${user.hash}`)
    await bcrypt.compare(password, user.hash).then(function (res) {
        if (res){
        console.log('Correct password.')
        return true;
        }
        else {
        console.log('Wrong password!')
        return false;
        }
        });
}

module.exports.createUser =  function(req, res) {
    if(!req.body.name || !req.body.email || !req.body.password) {
        res.render('register', {"errorMessage": "All fields required"});
        }
        
    bcrypt.hash(req.body.password, saltRounds).then(async function(hash) {
        // Store hash in your password DB.
        var user = new User({email: req.body.email, name: req.body.name, hash: hash});
        await user.save(function (err) {
            if (err){
                return handleError(err);
            } 
            // saved!
            else {
                res.redirect('/login');
            }
        });
    });
}

module.exports.findUser =async function(email) {
    return await User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err); }
        else return user;
});
}

module.exports.createStudent =  async function(name, grade) {
    var student = new Student({name: name, grade: grade});
    await student.save(function (err) {
        if (err) return handleError(err);
        // saved!
    });
}

module.exports.deleteStudent =  async function(id) {
    Student.findByIdAndDelete(id, function (err){
        if (err) return handleError(err);
        else{
            return true;
        }
      });
    
}

module.exports.getStudents =  async function() {
    const students = await Student.find();
    return students;
}

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// For nodemon restarts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});

// For Heroku app termination
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});

const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {
        console.log(`Mongoose disconnected through
        ${msg}`);
        callback();
    });
};

const handleError = (err) => {
    console.log(`Error: ${err}`);
    return done(err);
};

