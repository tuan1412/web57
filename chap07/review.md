# Đăng nhập, Đăng kí
- Đăng nhập: R User
- Đăng kí: C User

=> Password chúng ta ko để plain text trong DB
=> Băm (Hash) password

Băm => Băm chuỗi bất kì thành một độ dài cố định và ko thể giải mã ngược lại

# Xác thực và phân quyền
Tại sao cần điều này?

=> Nghiệp vụ bài toán cần
Có rất nhiều nghiệp vụ mà chỉ có user hoặc user có quyền đặc biệt mới được thao tác

Xác thực => Định dạnh ai đang làm việc đó
Phân quyền => Xác định ai có quyền làm việc

Bài toán đặt ra HTTP nó là stateless => 2 HTTP request-response ko liên quan tới nhau

/api/login => Cần gì đó để định danh ai đang login và đính kèm vào các API sau

Định danh => Cần cơ chế đó là jsonwebtoken

