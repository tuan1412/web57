# MongoDB
Công nghệ để lưu trữ, quản lý (truy vấn, chỉnh sửa) dữ liệu: Cơ sở dữ liệu

Kiến trúc của web (hầu hết)

Client                    =>      Web Server        =>         CSDL
(Trình duyệt, app mobile)   (NodeJS, C#, Java)        (MongoDB, MySQL, SQL Server, Redis)

Document => Object
Collection => Array
Database => Array của array

# Kết nối giữa NodeJS vs MongoDB
Thư viên là mongoose

Yêu cầu nghiệp vụ => Sử dụng hàm của Model mongoose => parse hàm thành câu lệnh (ngôn ngữ truy vấn của MongoDB) => gửi lên server MongoDB => Server MongoDB trả kết quả => Mongoose parse kết quả thành biến JS => Code

# Layer và Project structure
Phụ thuộc team, cty
Layer => Mỗi layer một trách nhiệm (sẽ gọi theo một chiều) => Layer trên gọi layer dưới hoặc layer cùng cấp
=> Sẽ tái sử dụng code giữa các layer, chia nhỏ được code

Router => Quy định API ứng với nghiệp vụ gì
Controller => Xử lý nghiệp vụ
Model => Thao ác với cơ sở dữ liệu

Chia theo chiều ngang, chiều dọc => Chiều dọc

# Quan hệ giữa các thực thể, thiết kế CSDL
User story: Là ai làm gì (để làm gì)

Xác đinh mối quan hệ 1-n, n-m, 1-1

User (username, password, role: ['user', 'admin'])
Product (title, des, imageUrl, price, categoryId)
Category (title, icon)
Cart (products [], totalCost, createdBy)
Bill (products, totalCost, createdBy)

1 Product 1 Category 
1 Category nhiều Product
=> Quan hệ một nhiều
C1: Category mảng products
C2: Dùng id để mô tả quan hệ
=> Product có categoryId

1 Giỏ hàng nhiều Sản phẩm
1 Sản phẩm nhiều Giỏ hàng
=> Quan hệ nhiều - nhiều
C1: 
Cart có products => Thuận
Product có carts

Cart
{
  products: [productId]
}

C2
CartProduct (cartId, productId)

Cart userId, createdAt
CartProduct -> (cartId, productId)
Product productId

User => Cart
1 User 1 Cart
1 Cart 1 User
=> Quan hệ 1-1
User có cartId
Cart có userId => Chọn thằng con, sinh ra sau để lưu id


C1: /api/posts/abc/comments 
=> Router posts

C2: /api/comments?postId=abc
=> Router comments





