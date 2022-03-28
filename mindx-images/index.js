const express = require('express');
const postRouter = require('./modules/post/post.router');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mindx-images-web57', err => {
  if (err) {
    return console.log('DB connect err', err);
  }
  console.log('DB connect success');
});

const app = express();
app.use(express.json());

// Tất cả HTTP request nào có tiền tố là /api/posts => thì đi vào postRouter
app.use('/api/posts', postRouter);

app.use('*', (req, res) => {
  res.send({ message: '404 not found' })
})
app.listen(8080, (err) => {
  if (err) {
    return console.log('Server Error', err);
  }
  console.log('Server started');
})