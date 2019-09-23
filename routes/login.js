var express = require('express');
var router = express.Router();
const ctrlUser = require('../controllers/userController');


/* GET login page. */
router.get('/', ctrlUser.getLogin)

//router.post('/login', ctrlUser.login);

module.exports = router;