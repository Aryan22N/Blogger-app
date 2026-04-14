let express = require('express');
let router = express.Router();
let commentController = require('../controllers/comments-controller')

router.get('/commentsdata',commentController.getAllCommentList);
router.post('/Postcommnents',commentController.InsertComment);
router.put('/Putcomments/:cid',commentController.UpdateComment);
router.delete('/deletecommnents/:cid',commentController.deleteComment);


module.exports= router;