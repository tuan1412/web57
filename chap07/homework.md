# Ex1
Dựa vào cách lấy token và verify ở API POST /api/posts, ta chỉnh sửa API PUT /api/posts sao cho thoả mãn nghiệp vụ sau

Chỉ User tạo bài post đó, mới có quyền chỉnh sửa bài Post đó

# Ex2
Với thư viện jsonwebtoken, sinh ra token với các tham số sau: 
data là { username: web@gmail.com }, secretKey là webfullstack, thời gian hết hạn là 3 ngày
