# Cách cách để client truyền dữ liệu lên server
+ req.query => GET ?from=0&to=10
+ req.body => POST, PUT, DELETE => body
+ req.params => Tất cả method => /posts/:postId

# REST API
Xoay quanh CRUD => create, read, update, delete
Chọn đối tưởng để CRUD

/api/posts GET => read
/api/posts/:postId GET
/api/posts POST
/api/posts/:postId PUT
/api/posts/:postId DELETE

# Demo REST API 
Qua việc dùng file để lưu trữ