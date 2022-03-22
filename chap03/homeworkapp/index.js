const express = require('express');
const postModel = require('./post');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// url: '/'
app.get('/', (req, res) => {
  res.send('<h1>Trang chủ</h1>')
})

app.get('/course', (req, res) => {
  res.send({ course: "web57" })
})

// Method GET query param
// /even?from=0&to=10
// /even
// /event?from=0
// string
app.get('/even', (req, res) => {
  const { from, to } = req.query;

  const begin = from ? Number(from) : 0;
  const end = to ? Number(to) : 10;

  let evenNumbers = [];
  for (let i = begin; i <= end; i+= 2) {
    evenNumbers.push(i);
  }

  res.send({ numbers: evenNumbers });
})

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
})

app.post('/auth/login', (req, res) => {
  console.log(req.body);

  const { username, password } = req.body;

  if (username === 'admin' && password === '123456') {
    res.send({ success: 1 });
  } else {
    res.send({ success: 0 });
  }
})

// post: { id, content, createdBy }
app.post('/create_post', async (req, res) => {
  const { content, createdBy } = req.body;

  try {
    const newPost = await postModel
      .createPost({ content, createdBy });
    res.send({ success: 1, data: newPost })
  } catch (err) {
    res.send({ success: 0, data: null, message: err.message })
  }
})

// app.post('/api/comments')
// POST => create, 
app.post('/api/posts', async (req, res) => {
  const { content, createdBy } = req.body;

  try {
    const newPost = await postModel
      .createPost({ content, createdBy });
    res.send({ success: 1, data: newPost })
  } catch (err) {
    res.send({ success: 0, data: null, message: err.message })
  }
})

app.get('/api/posts', async (req, res) => {
  try {
    const allPosts = await postModel.getPosts();

    res.send({ success: 1, data: allPosts })
  } catch (err) {
    res.send({ success: 0, data: null, message: err.message })
  }
})

app.get('/api/posts/:postId', async (req, res) => {
  try {
    // path param
    const { postId } = req.params;

    const foundPost = await postModel.getPost(postId)
  
    res.send({ success: 1, data: foundPost })
  } catch (err) {
    res.send({ success: 0, data: null, message: err.message })
  }
})

app.put('/api/posts/:postId', async (req, res) => {
  try {
    // path param
    const { postId } = req.params;
    const { content } = req.body;

    await postModel.updatePost({ content, postId })
  
    res.send({ success: 1 })
  } catch (err) {
    res.send({ success: 0, data: null, message: err.message })
  }
})

app.use('*', (req, res) => {
  res.send({ message: '404 not found' });
})

app.listen(9000, err => {
  if (err) {
    console.log(err)
    return;
  }
  console.log('Server started')
})