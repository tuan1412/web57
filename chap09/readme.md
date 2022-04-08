# Buổi 09
- Upload file lên server
- Upload file lên cloud storage (cloudinary)
- Deploy

## Mở đầu
Upload và lưu trữ file là tác vụ phổ biến trong bất kì một web app nào. Để upload, client sẽ gửi dữ liệu ảnh lên với body dạng *form data*. Để lưu trữ, server sẽ chọn một trong 3 cách sau:
- Lưu vào database :no_entry:
- Lưu vào disk của server :warning:
- Lưu vào cloud storage :white_check_mark:

Cách 1 không dùng => Database không thiết kế tốt để lưu trữ dạng nhị phân (base64), => hiệu năng kém, truy vấn chậm, cost cho dung lượng database đắt hơn nhiều dung lượng ổ đĩa lưu trữ

Cách 2 dùng tạm => Lưu file vào trong disk của server (server api). Cách này có hạn chế là khi client load ảnh, server api bị chiếm hết băng thông => ko thực hiện dc nhiều task vụ, ngoài ra cần có cơ chế backup file hợp lý. Để hoàn thiện một server lưu trữ file như vậy tốn nhiều công sức.

Ngoài ra, trong khuôn khổ lớp học, cuối khoá sẽ demo lên heroku. Với phiên bản free của heroku, thì sau một khoảng thời gian (tầm 2 tiếng), các file tĩnh (ngoài code) sẽ bị mất hết => Ko còn ảnh đã lưu

Cách 3 là cách sử dụng thường xuyên và phổ biến nhất trong thực tế. Cost cloud storage như Firebase, Google Storage, S3, Cloudinary có giá rất hợp lý. 

## Lưu trữ trên disk server
Để upload file lên server, ta cần đọc được dữ liệu file client gửi lên. Như đã giới thiệu, client gọi lên server với body là *form-data*, khác với dạng json như API.

Do vậy, đoạn code app.use(express.json()) ko sử dụng được nữa => cần thư viện khác. Project sẽ sử dụng [multer](https://github.com/expressjs/multer#readme)

Khi sử dụng middleware của multer, thông tin của file sẽ được nằm trong biến req.file
```
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

router.post('/', upload.single('file'), (req, res) => {
  res.send(req.file)
});
```

Đoạn code trên có ý nghĩa uploads một ảnh vào thư mục uploads. Khi này, để sử dụng ảnh, ta chỉ cần mở thư mục uploads thành public
```
app.use(express.static('uploads');
```

## Upload lên Cloudinary
Ta vẫn sử dụng thư viện multer để đọc đầu vào. Tuy nhiên thay vì upload file vào server, ta sẽ đẩy file lên cloud.

Khi này, ta không lưu trên disk nữa nên ko dùng multer.diskStorage mà sử dụng multer.memoryStorage() => dữ liệu file sẽ được lưu trữ thành dạng nhị phân và nằm trong req.file.buffer => Ta sẽ lấy buffer này để upload lên cloud

```
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

const memoryStorage = multer.memoryStorage()
const uploadWithMemoryStorage = multer({ storage: memoryStorage })

// Các biến env sẽ có khi đăng kí cloudinary
// Tương tự các cloud khác cũng như vậy
cloudinary.config({
  cloud_name: process.env.CLOUDARY_NAME,
  api_key: process.env.CLOUDARY_API_KEY,
  api_secret: process.env.CLOUDARY_SECRET,
  secure: true,
});

app.post('/upload', fileUpload.single('image'), function (req, res, next) {
    const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
              (error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              }
            );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };

    const result = await streamUpload(req);

    res.send({ success: 0, data: result })
});
```

## Deploy trang web
Hiện tại web app đang chạy trên localhost => máy khác ko thể kết nối được => Cần public lên môi trường Internet => Có 2 cái cần public (Web App + MongoDB)

MongoDB ta có thể dùng MongoDB Atlas https://www.mongodb.com/try
Wep App thì ta sẽ sử dụng Heroku https://www.heroku.com/

Chi tiết thì sẽ hướng dẫn qua video :D
