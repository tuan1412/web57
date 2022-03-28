const express = require('express');
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: String,
  createdBy: {
    type: String,
    required: true
  },
});

const PostModel = mongoose.model('Post', postSchema);

mongoose.connect('mongodb://localhost:27017/demo_db', err => {
  if (err) {
    return console.lpostControllerog('Err connect mongodb', err)
  }

  console.log('Connect DB successfully')
});

const app = express();

app.use(express.json());

app.post('/api/posts', async (req, res) => {
  // sử dụng csdl
  const { content, createdBy } = req.body;

  const newPost = await PostModel.create({
    content,
    createdBy,
  });

  res.send({ success: 1, data: newPost });
})

app.get('/api/posts', async (req, res) => {
  const posts = await PostModel.find({});

  res.send({ success: 1, data: posts });
})

app.get('/api/posts/:postId', async (req, res) => {
  const { postId } = req.params;

  // Không dùng
  // const posts = await PostModel.find({});

  // const foundPost = posts.find(post => post._id === postId)

  const foundPost = await PostModel.findOne({ _id: postId });
  // const foundPost = await PostModel.findById(postId);

  res.send({ success: 1, data: foundPost });
})

app.put('/api/posts/:postId', async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  
  const updatedPost = await PostModel.findByIdAndUpdate(
    postId, 
    { content },
    { new: true }
  )

  res.send({ success: 1, data: updatedPost });
})

app.delete('/api/posts/:postId', async (req, res) => {
  const { postId } = req.params;
  
  const deletedPost = await PostModel.findByIdAndDelete(
    postId
  )

  res.send({ success: 1, data: deletedPost });
})

// api/comments

app.listen(8080, err => {
  if (err) {
    return console.log('Error start app', err);
  }
  console.log(`Server started successfully at ${8080}`);
})