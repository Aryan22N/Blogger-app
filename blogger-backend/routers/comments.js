let express = require('express');
let router = express.Router();
let commentController = require('../controllers/comments-controller')
let auth = require('../helper/auth');

router.get('/commentsdata', auth.verifyToken, commentController.getAllCommentList);
router.post('/Postcommnents', auth.verifyToken, commentController.InsertComment);
router.put('/Putcomments/:cid', auth.verifyToken, commentController.UpdateComment);
router.delete('/deletecommnents/:cid', auth.verifyToken, commentController.deleteComment);


module.exports= router;