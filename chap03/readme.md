# Buổi 3
- Làm quen với ExpressJS
- Làm quen với REST API
## Làm quen với Express JS
[ExpressJS](https://expressjs.com) là một framework của NodeJS để làm web. Ngoài ExpressJS, còn rất nhiều web framework khác như Koa, NestJS, Fastify

https://www.npmtrends.com/express-vs-fastify-vs-koa-vs-restify-vs-@nestjs/core
```
npm i express
```
```
// index.js
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello world'));

app.listen(8080, (err) => {
  if (err) throw err;
  console.log('Server started')
})
```

Đoạn code trên giúp khởi tạo một web app chạy trên cổng 8080 của server, sẵn sàng lắng nghe kết nối từ client.

GET là HTTP method, '/' là đường dẫn, method và đường dẫn quy định giúp định danh các cổng giao tiếp với client, res.send là hành động trả về kết quả của server. Ngoài text, Express có thể trả về nhiều dạng kết quả khác như file, JSON. Mỗi cách định nghĩa như vậy gọi là một routing
```
app.METHOD(PATH, HANDLER)
```
https://expressjs.com/en/guide/routing.html

Khi cần trả về các dạng file tĩnh khác nhau, nằm trong cùng một thư mục, ta có thể dùng [express.static](http://expressjs.com/en/starter/static-files.html#serving-static-files-in-express)

Câu hỏi:
```
Tại sao lại cần express.static trong khi đã có res.sendFile
```
### Một số tính năng thêm của npm
* devDependencies
Là các package dùng để dev dễ dàng hơn. Ví dụ nodemon, restart lại project khi code change
```
npm i -D nodemon
```
* npm script
Khi vào project thì lập trình viên chưa biết làm cách nào để chạy project (vì file bắt đầu có thể là app.js hay index.js, ...), một số project cần phải build mới run được
Cách xử lý là kiểm tra fields scripts trong file package.json. Một số câu lệnh thường gặp như:
```
{
  "scripts: {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```  
## REST API
Lập trình bản chất là quá trình tiếp nhận đầu vào, xử lý đầu vào và đưa ra đầu ra thích hợp

=> Công việc của chúng ta sẽ xoay quanh việc xác định 3 vấn đề trên

![ipo](static/inputs-process-outputs.png)

REST API (còn được biết với tên gọi RESTful API) là một giao diện lập trình ứng dụng (API) mà tuân thủ các ràng buộc và quy ước kiến trúc REST được sử dụng trong việc giao tiếp giữa client và server. 

REST API thường vẫn sử dụng giao thức HTTP/1 kèm theo các định nghĩa trước đó mà cả client và server cần tuân thủ. Chi tiết toàn bộ convention REST API https://restfulapi.net/resource-naming/

### Input
REST sử dụng HTTP nên ta có các input là đường dẫn, method, headers, body và được truy cập thông qua biến req trong hàm (req, res)
http://expressjs.com/en/5x/api.html#req

Các hàm thường dùng: [req.params](https://expressjs.com/en/5x/api.html#req.params), [req.query](https://expressjs.com/en/5x/api.html#req.query), [req.body](https://expressjs.com/en/5x/api.html#req.body)


Chú ý: để đọc được dữ liệu trong body, ta cần quy định một bộ đọc dữ liệu (hay còn gọi là body parse) là JSON hay là form (về sau có thể là file)
```
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form
```

### Process
Tuỳ vào đầu vào và nghiệp vụ bài toán, ta có các cách xử lý dữ liệu khác nhau. Thông thường, Backend sẽ xoay quanh 4 chữ CRUD (Create, Read, Update, Delete)
```
POST /v1/posts (tạo mới một bài viết)
GET /v1/posts (lấy danh sách bài viết)
GET /v1/posts/:post_id (lấy chi tiết bài viết với post_id cụ thể)
PUT /v1/posts/:post_id (update bài viết với post_id cụ thể)
DELETE /posts/:post_id (delete bài viết với post_id cụ thể)
```
### Output
REST API sẽ trả về dữ liệu dạng JSON (có thể là XML nhưng ít phổ biến hơn rất nhiều), đi kèm với status code. Ý nghĩa của status https://medium.com/@hanilim/http-codes-as-valentines-day-comics-8c03c805faa0

## Postman
Với thanh đường dẫn của trình duyệt ta chỉ có thể gọi một HTTP Request với method GET, để test các API có method khác, ta có thể dùng Postman thay vì lập trình đầy đủ một giao diện để ghép. https://www.postman.com/

Một số tính năng hay của Postman, tạo collection, sử dụng biến môi trường