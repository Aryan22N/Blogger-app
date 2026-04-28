const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/Auther-controller');
const Auth = require('../helper/auth');

router.get('/authlist', Auth.verifyToken, AuthController.getAutherDetail)

router.post('/addauth', Auth.verifyToken, AuthController.addAutherDetail)

router.put('/updateauth/:cid', Auth.verifyToken, AuthController.updateAutherDetail)

router.delete('/deleteauth/:cid', Auth.verifyToken, AuthController.deleteAutherDetail)

module.exports = router;