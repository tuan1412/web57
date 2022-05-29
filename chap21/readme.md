# Vấn đề form có ảnh
- API upload ảnh (module upload)
+ Upload lên storage (cloudinary) => Đường dẫn ảnh
+ Save cái đường dẫn vào DB (ko lưu file vào DB, ko lưu file vào ổ đĩa của server API)

- Frontend
2 cách
Cách 1: 
+ đó là khi chọn file xong, thì upload luôn ảnh => có đường dẫn lưu vào state luôn
+ submit form => lấy đường dẫn từ state ra để call API

Một số thư viện
https://www.npmjs.com/package/react-images-uploading
https://react-dropzone.js.org/#section-basic-example
https://ant.design/components/upload/
....

Cách 2:
+ khi ta submit form => await upload file => url => call API

# Vấn đề tạo tài khoản theo role
- Mặc định API signup => role user
- Role admin
Cách 1:
Khi khởi tạo app => init tài khoản admin (check db có chưa, chưa có thì tạo, có rồi thì thôi)

Cách 2:
- Có một API riêng để tạo admin => Dev call vào tạo 1 lần

- API create user theo role (root admin) (tạo các role < admin)

