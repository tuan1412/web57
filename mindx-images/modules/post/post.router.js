const express = require('express');
const router = express.Router();
const postController = require('./post.controller');
const needAuthenticated = require('../../middlewares/needAuthenticated');
const isAdmin = require('../../middlewares/isAdmin');

// const midd1 = require('../../middlewares/middleware1');

// router tập hợp các API có điểm chung 
// => cùng tiền tố
// api/posts
// router.get(
//   '/', 
//   midd1,
//   (req, res, next) => {
//     console.log('middleware2', req.originalUrl);
//     // res.send({ success: 0, message: 'Dừng ở đây thôi'})
//     next();
//   },
//   (req, res, next) => {
//     console.log('middleware3', req.query);
//     next();
//   }, 
//   postController.getPosts
// );
// router.post(
//   '/',   
//   midd1,
//   postController.createPost);
// router.put('/:postId', postController.updatePost);

router.get(
  '/',
  postController.getPosts
);
router.post(
  '/',   
  needAuthenticated,
  postController.createPost
);

router.put(
  '/:postId',
  needAuthenticated,
  postController.updatePost
);

router.delete(
  '/:postId',
  needAuthenticated,
  isAdmin,
  postController.updatePost
);

module.exports = router;