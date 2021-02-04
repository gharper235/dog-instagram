const express = require('express');
const router = express.Router();

const {post} = require('../controllers');

router.post('/post', post.newPost);
router.put('/updatepost', post.updatePost);
router.delete('/deletepost', post.deletePost);

// router.get( '/:postId', ctrls.post.show );

module.exports = router;