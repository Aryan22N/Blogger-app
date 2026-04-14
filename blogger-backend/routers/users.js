let express = require('express');
let router = express.Router();
let userController = require('../controllers/users-controller')
let validation = require('../helper/validation')
// http://localhost:5000/user/login
router.post('/login',userController.userLogin);
router.post('/adduser',  validation.userValidation ,userController.addUserDetail);
router.get('/getuser',userController.getUserDetail);


module.exports= router;
