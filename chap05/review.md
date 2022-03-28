# Làm quen với CSDL
MongoDB => Thân thiện và phổ biến với JS
=> Rất quan trọng trong công việc làm Backend

Cơ chế: client - server => Giao tiếp qua giao thức mạng

Client: web app, tool nosql booster, tool mongodb compass

Server: MongoDB server => 27017

Kiến trúc của web

Trình duyệt => Web Server => CSDL

Chrome, FF => Go, NodeJS, Java, ... => MongoDB, MySQL, SQL server, ...

Document => object (field, value)
Collection => array của object
Database => tập hợp các collection

# NodeJS thao tác MongoDB
Thư viện mongoose

mongoose.model('name', schema) => collection

schema do mongoose định nghĩa => MongoDB ng ta gọi là dynamic schema

Sau khi có model => Rất nhiều func để thao tác với collection 

mongoose gọi func (Ngôn ngữ JS) => parse function thành câu lệnh MongoDB (Ngôn ngữ truy vấn MongoDB) => gửi câu lệnh này lên MongoDB server => Nhận kết quả => mongoose parse kết quả thành ngôn ngữ JS



