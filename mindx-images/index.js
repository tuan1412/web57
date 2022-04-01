require('dotenv').config()
const express = require('express');
const authRouter = require('./modules/auth/auth.router');
const postRouter = require('./modules/post/post.router');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, err => {
  if (err) {
    return console.log('DB connect err', err);
  }
  console.log('DB connect success');
});

const app = express();
app.use(express.json());

// Tất cả HTTP request nào có tiền tố là /api/posts => thì đi vào postRouter
app.use('/api/posts', postRouter);
app.use('/api/auth', authRouter);

app.use('*', (req, res) => {
  res.send({ message: '404 not found' })
})

app.listen(process.env.PORT || 8080, (err) => {
  if (err) {
    return console.log('Server Error', err);
  }
  console.log('Server started');
})