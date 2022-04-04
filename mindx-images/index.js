require('dotenv').config();
require('express-async-errors');

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

//express.json là một hàm
// express.json() => req.body có value => return middleware
app.use((req, res, next) => {
  console.log('Time', Date.now(), req.method, req.originalUrl);
  next();
})

// Tất cả HTTP request nào có tiền tố là /api/posts => thì đi vào postRouter
app.use('/api/posts', postRouter);
app.use('/api/auth', authRouter);

app.use('*', (req, res, next) => {
  res.send({ message: '404 not found' })
})

// bắt toàn bộ các middleware mà gọi hàm next(error);
app.use(function (err, req, res, next) {
  // if (err.priority == 'high') {
    // sendEmailToAdmin
  // }  
  res.status(err.status || 500).send({ success: 0, message: err.message });
})

app.listen(process.env.PORT || 8080, (err) => {
  if (err) {
    return console.log('Server Error', err);
  }
  console.log('Server started');
})