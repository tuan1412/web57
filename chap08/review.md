# Middleware

- Là cái ở giữa và xử lý yêu cầu
```
function (req, res, next) {
  // req => Lấy thông tin từ client
  // res => Trả thông tin cho client

  next()
}
- Mỗi request => Vô hạn middleware

- 2 loại
+ Per route
+ Application route

# Ứng dụng
- needAuthenticated
- validateInput

# Error handling
function (err, req, res, next) {

}

Để vào được hàm này, tất cả các middleware => next(err)

=> express-async-errors