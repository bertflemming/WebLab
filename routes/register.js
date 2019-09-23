var express = require('express');
var router = express.Router();
const ctrlUser = require('../controllers/userController');


/* GET register page. */
router.get('/', ctrlUser.getRegister)

router.post('/register', ctrlUser.register);


module.exports = router;