const express = require('express')
const router = express.Router()
const catController = require('../controllers/category-controller');
const auth = require('../helper/auth');

router.get('/catlist', auth.verifyToken, catController.getAllCatList)

router.post('/addcat',catController.addCategory)

router.put('/updatecat/:cid', catController.updatecat)

router.delete('/deletecat/:cid', catController.deletecat)

module.exports = router;