# Chức năng mindx-images
## Liệt các user story (Là ai có thể làm gì để làm gì)
Là khách thì có thể đăng kí
Là khách thì có thể đăng nhập
Là khách thì có thể xem trang chủ là danh sách bài post

Là user thì có thể tạo bài post
Là user thì có thể comment vào bài post
Là user thì có thể xem trang chủ là danh sách bài post

Danh từ => Đối tượng cần quản lý
Động từ => Nghiệp vụ mà chúng ta cần lập trình => Tương tự 1 hoặc nhiều API

# Mối quan hệ
### 1 - nhiều
Comment - User
User - Comment

1 Comment => 1 User
1 User => n Comment
=> Mối quan hệ chúng sẽ là một - nhiều

Post - Comment
Comment - Post

1 Post => nhiều comment
1 Comment => 1 Post
=> Mối quan hệ 1 nhiều

Các ví dụ khác
Shop - Product
Product - Shop
Board - Col

Col - Card

Board - Card

### nhiều nhiều
Post - Tag
Tag - Post

1 Post => Nhiều Tag
1 Tag => Nhiều Post

2 dòng đều là 1 - nhiều
=> Nhiều - nhiều

Cart - Product

Book - Category

### 1 - 1
user có thêm profile (avatar, bio, hobby, address)

User - Profile
1 User - 1 Profile
1 Profile - 1 User

2 dòng đều là 1 - 1 => quan hệ giữa chúng là 1 - 1

