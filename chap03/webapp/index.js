const express = require('express');
const random = require('./random');

const app = express();

// btn.onClick((e) => { });

app.use(express.static('public'));
app.use(express.json());

// với mỗi đường dẫn => mò vào thư mục public => tìm file tồn tại ko

app.get('/hello', (req, res) => {
  // req chứa toàn bộ thông tin của người gửi
  // res chứa thông tin trả về
  console.log(req.query);
  res.send('Hello world');
})

app.get('/hi', (req, res) => {
  res.send('Greeting');
})

app.get('/test', (req, res) => {
  res.send({ test: '3' })
})

app.get('/number', (req, res) => {
  res.json(3)
})

app.get('/home', (req, res) => {
  console.log(__dirname);

  res.sendFile(__dirname + '/home.html')
})

app.get('/style.css', (req, res) => {
  res.sendFile(__dirname + '/style.css')
})

// query string
// /random?min=0&max=100
app.get('/random', (req, res) => {
  const { min, max } = req.query

  console.log(min, max);
  res.json(random(Number(min), Number(max)));
})

app.post('/sum', (req, res) => {
  const { numbers } = req.body;

  const sum = numbers.reduce((acc, cur) => acc + cur, 0);

  res.send({ sum });
})

app.listen(8080, err => {
  if (err) {
    return console.log(err);
  }

  console.log('Server started');
})