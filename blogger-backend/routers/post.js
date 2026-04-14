const express = require('express')
const router = express.Router()
const postController  = require("../controllers/post-controller");


router.get('/posts', postController.getpostsdetails);
router.post('/addpost', postController.addPosts);
router.put('/updatepost/:cid', postController.updatePosts);
router.delete('/deletepost/:cid', postController.deletePosts);






module.exports = router;