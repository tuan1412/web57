# Buổi 8
Error handling and Validate Input

## Error handling
### Tại sao cần error handling
Lập trình gồm: input -> process -> output. Dù input có sai, process có bug thì vẫn cần có output tương ứng. Output này giúp lập trình viên debug, giúp người dùng biết thao tác lỗi ở đâu, tránh một thao tác mà không có phản hồi (crash app, crash server, ... gây trải nghiệm người dùng tệ cũng như ảnh hưởng tới các ng dùng khác)
=> Cần bắt các lỗi throw ra để xử lý => Error handling

### Error handling trong Express
Trước khi học bài này, ta vẫn thường bắt lỗi ở trong hàm catch của từng controller. Cách này work nhưng có nhược điểm
- duplicate code
- tái sử dụng code kém, khi cần handle thêm như kiểu lỗi nghiêm trọng thì gửi email cho admin thì cần thêm vào nhiều chỗ

Khi đó Express đã cung cấp cơ chế tập trung lỗi tại một chỗ để xử lý https://expressjs.com/en/guide/error-handling.html
```
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

Ở main task của controller thay vì catch err và gửi luôn, ta có thể next(err) để xử lý vào hàm trên.
```
const getPost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const foundPost = await PostModel.findById(postId);

    res.send({
      success: 1,
      data: foundPost,
    });
  } catch (err) {
    next(err)
  }
};
```
Ở đây, main task đóng vai trò như một middleware. Để tái sử dụng code hơn nữa ta có thể viết hàm wrapHandleError như sau
```
const wrapHandleError = (controller) => {
  return (req, res, next) => {
    controller(req, res, next).catch(next(err))
  }
}

router.post('/', isAuth, wrapHandleError(postController.createPost));

```

Hoặc sử dụng thư viện https://www.npmjs.com/package/express-async-errors (Cần hiểu bản chất là nó sẽ bắt error và ném vào next)

Để xử lý status cho error ta có thể viết thêm đối tượng HttpError extends Error có sẵn
```
class HttpError extends Error {
  status: number;

  constructor(message, status) {
    this.status = status;
  }
```
Từ đó thay vì throw error thông thương thì ta có thể throw HttpError

### Tại sao cần validate đầu vào
Lập trình bao gồm 3 thành phần input - process - output. Input mà không đúng sẽ dẫn tới chương trình phát sinh bug.
=> Do vậy cần kiểm tra dữ liệu đầu vào cẩn thận

`Câu hỏi: phía client form dữ liệu đã validate rồi thì phía server cần validate lại không?`

Câu trả lời là có và cần phải có. 

Việc validate bằng JS để gọi API chỉ có ý nghĩa về mặt giao diện và với người dùng thông thường. Chưa cần đến hacker, một dev có thể bypass code JS một cách dễ dàng qua việc chèn thêm code vào file hoặc đơn giản là gọi API qua postman

### Giới thiệu về Joi
Validate đơn giản ta có thể dùng các biểu thức rẽ nhánh như sau
```
const { username, password } = req.body;

if (!username) {
  throw new HttpError('username không được để trống', 422);
}
if (password && password.length < 6) {
  throw new HttpError('password cần ít nhất 6 kí tự', 422); // promise reject => nhảy xuống catch
}
```

Code như vậy dài dòng và khó đọc, khả năng tái sử dụng kém. Để tập trung hơn vào xử lý nghiệp vụ, ta nên đơn giản hoá việc validate này gọn nhất có thể
=> Có rất nhiều thư viện làm việc đó, trong đó có [Joi](https://joi.dev/api/?v=17.4.2)

Để sử dụng, ta cần cài đặt vào project
```
npm i joi
```
Để validate, ta sẽ khai báo một schema tương ứng. Ví dụ đoạn xử lý phía trên sẽ là
```
const loginSchema = Joi.object({ 
  username: Joi.string().required(),
  password: Joi.string().min(6).required()
}); 
const result = loginSchema.validate(req.body); 
const { value, error } = result; 
const valid = error == null; 
```
Nếu vi phạm schema thì error sẽ có giá trị, nếu không thì null

### Validation middleware
Để code gọn gàng và tái sử dụng, ta có thể viết chỗ xử lý validate vào middleware

```
// auth.validation.js
const signUpSchema = Joi.object({ 
  username: Joi.string().required(),
  password: Joi.string().min(6).required()
});
module.exports = { signUpSchema }

// validateInput.js
const validateInput = (schema, property) => { 
  return (req, res, next) => { 
  const { error } = schema.validate(req[property]); 
  const valid = error == null; 
  
  if (valid) { 
    next(); 
  } else { 
    const { details } = error; 
    const message = details.map(i => i.message).join(',');
 
    console.log("error", message);
    throw new HttpError(message, 422)
  } 
}}

// auth.router.js
app.post('/signup', validateInput(signUpSchema, 'body'), authController.signup)
```