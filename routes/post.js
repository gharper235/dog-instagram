const express = require('express');
const router = express.Router();

const PostCtrl = require('../controllers/postCtrl');

router.post('/post', PostCtrl.newPost);
router.put('/updatepost', PostCtrl.updatePost);
router.delete('/deletepost', PostCtrl.deletePost);

// router.get( '/:postId', ctrls.post.show );

module.exports = router;