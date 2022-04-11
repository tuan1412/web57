# Upload ảnh
1. Client
Client ko gửi body dạng json lên mà gửi theo kiểu khác

API: json, urlencoded, xml => 
app.use(express.json()) app.use(express.urlencoded({ extend: true })

File: form data
=> Nhu cầu cần một body parser

2. Server
Thư viện để đọc đầu vào: multer, busboy

3 cách lưu ảnh
- C1: lưu vào db => Không dùng
- C2: lưu ở ổ đĩa của chính server api đấy => Ít dùng
Hạn chế: khi get ảnh về thì ảnh chiếm hết băng thông => api bị chậm
Backup file
=> FormData => multer.diskStorage (quy định thư mục rồi) => upload thành công

- C3: lưu ở trên cloud => Phổ biến nhất
Lựa chọn cloud storage S3, Google Storage, Azure, Cloudinary

FormData => multer.memoryStorage => upload.single() => req.file.buffer => đẩy lên cloud nhờ sdk
# Deploy backend

Heroku
MongoDB Atlas
=> Mở IP ra (Demo 0.0.0.0/0)

# Git flow
Git add 
git commit 
git push
git pull
git checkout
git merge
Tạo pull request (Github) (merge request - GitLab)

=> Git rebase