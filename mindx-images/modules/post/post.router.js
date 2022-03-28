const express = require('express');
const router = express.Router();
const postController = require('./post.controller');

// router tập hợp các API có điểm chung 
// => cùng tiền tố
// api/posts
router.get('/', postController.getPosts);
router.post('/', postController.createPost);
router.put('/:postId', postController.updatePost);

module.exports = router;