# Buổi 10
- Câu lệnh update, truy vấn nâng cao trong MongoDB
- Các nghiệp vụ như pagination, sorting, populate

## Mở đầu
mongoose là một thư viện ```Javascript``` giúp lập trình viên sử dụng JS để kết nối và thao tác với MongoDB

Nhiệm vụ của nó là parse JS => MongoDB Operation

=> Ngoài doc của mongoose, ta vẫn cần đọc doc của MongoDB

## Update
https://www.mongodb.com/docs/manual/reference/operator/update-field/
https://www.mongodb.com/docs/manual/reference/operator/update-array/

Trước h, khi update ta đều set thẳng giá trị cần update vào field. Đây cũng là cách làm phổ biến.

Tuy nhiên, MongoDB còn cung cấp nhiều cơ chế khác, giúp việc update thuận tiện hơn.

Ví dụ nghiệp vụ cần tăng số like của bài post => Dùng $inc
```
  PostModel.findByIdAndUpdate(
    "6250497a2973a4001826ee29", 
    { $inc: { likeCount: 1 } 
  })
```
Hoặc ngiệp vụ thêm tag vào bài post => Dùng $push
```
  PostModel.findByIdAndUpdate(
    "6250497a2973a4001826ee29", 
    { $push: { tags: "Code" } } 
  })
```

Các operation còn lại tham khảo trong 2 đường link.

## Query
https://docs.mongodb.com/manual/tutorial/query-documents/

Giả sử dữ liệu mẫu như sau:
```
// Post collection
[
  {
    title: "Mặt trời",
    description: "Chói",
    likeCount: 3,
    imageUrl: "http://example.png",
    tags: ["thiên nhiên", "hành tinh", "sáng"]
    createdBy: ObjectId("61979b27d9a8a7d221213aa2")
  },
  {
    title: "Mặt trăng",
    description: "tối",
    likeCount: 10,
    imageUrl: "http://example.png",
    tags: ["thiên nhiên", "hành tinh"]
    createdBy: ObjectId("61979b27d9a8a7d221213aa2")
  },
  {
    title: "Cây cối",
    description: "Xanh",
    likeCount: 2,
    imageUrl: "http://example.png",
    tags: ["Xanh"]
    createdBy: ObjectId("61893a7d4b9eb7c6de02dae9")
  },
]
```
## Equality Condition
Query theo điều kiện bằng cũng thuộc phần Condition with operator nhưng do độ phổ biến nên ta tách ra một phần riêng

```
<field>: value
```
Tìm tất cả các post có người tạo với id 61893a7d4b9eb7c6de02dae9
```
const posts = await PostModel.find({ createdBy: "61893a7d4b9eb7c6de02dae9" })
```
`Chú ý: mongoose đã tự động convert string thành ObjectId để so sánh. Cơ chế này ko có sẵn trong MongoDB hoặc một số thư viện khác. Khi sử dụng aggregate của mongoose cũng không có cơ chế này`

## Condition with operator

### Điều kiện hơn kém, không bằng
https://www.mongodb.com/docs/manual/reference/operator/query-comparison/
Tìm hiểu về $lt, $gt, $ne, $lte, $gte
```
// Tìm tất cả các post có số like lớn hơn 10
const posts = await PostModel.find({ likeCount: { $gt: 10 } })
```

### Điều kiện với tập hợp
Tìm hiểu về $in, $nin
```
// Tìm tất cả các post được tạo bởi 61979b27d9a8a7d221213aa2 hoặc 61893a7d4b9eb7c6de02dae9
const posts = await PostModel.find({ createdBy: { $in: ["61979b27d9a8a7d221213aa2, "61893a7d4b9eb7c6de02dae9"] } })
```

### Lọc chuỗi với regex
https://docs.mongodb.com/manual/reference/operator/query/regex/

Một trong những tác vụ thường gặp là tìm kiếm theo keyword
Tìm hiểu về $regex
```
// Tìm tất cả các post mà title có chữ mặt (không phân biệt chữ hoa, thường)
const posts = await PostModel.find({ title: { $regex: new RegExp('mặt', i) } })
```

### Điều kiện logic
https://www.mongodb.com/docs/manual/reference/operator/query-logical/
Thông thường object trong hàm find đã bao gồm logic $and. Trong phần này ta chỉ cần quan tâm tới các logic khác và chủ yếu là logic $or

Ví dụ nghiệp vụ tìm kiếm bài post có title hoặc description chứa chữ mặt
```
const posts = await PostModel.find({ 
  $or: [
    { title: { $regex: new RegExp('mặt', i) } }) },
    { title: { $regex: new RegExp('mặt', i) } }) }, 
  ]

```

### Query Embed Documents
Phù hợp với bài toán trường cần filter là trường embed các documents khác, trong đó với dữ liệu mẫu trên là mảng tags
https://docs.mongodb.com/manual/tutorial/query-embedded-documents/

```
// Tìm tất cả các post được tag "Thiên nhiên" (mảng tag có ít nhất một tag là "Thiên nhiên")
const posts = await PostModel.find({ tags: "Thiên nhiên" })
```

## Pagination
Khi dữ liệu còn ít, việc lấy tất cả dữ liệu sẽ không gặp vấn đề gì. Tuy nhiên, khi dữ liệu nhiều lên, 1000, 100000 documents việc lấy toàn bộ dữ liệu như vậy khiến câu query trở lên chậm chạp.

Mặc khác, ở client, tại một thời điểm nhất định cũng không hiển thị cũng như xử lý hết dữ liệu, mà thường sẽ hiển thị theo trang, thể hiện rõ các hành động như chuyển trang (pagination per page) hoặc cuộn xuống load thêm dữ liệu (infinite scroll)

Để xử lý được task vụ này, thông thường dữ liệu sẽ được mô tả như sau:

* Input: trang hiện tại (có thể đánh số từ 1 hoặc 0), số phần tử trên một trang
* Output: Các phần tử trên trang hiện tại, tổng số phần tử (để hiển thị số trang tối da)

Khi đó, với mongoose ta xử lý như sau
```
// Để lấy phần tử số trang hiện tại
PostModel.find().skip(offset).limit(limit)
```
Trong đó offset là phần tử bắt đầu cần lấy (MongoDB sẽ đánh phần tử từ 0), limit là số phần tử cần lấy. Do đó, giả sử page được đánh bắt đầu từ 1, số phần tử một trang là 10 thì offset được tính như sau:
```
const offset = (pageCurrent - 1) * sizeOfPage
```
Để lấy toàn bộ số phần tử, ta có hàm countDocuments
```
const total = await Post.countDocuments()
```
Ta có thể dùng Promise.all để chạy song song các thao tác bất đồng bộ trên
```
 const [posts, total] = await Promise.all([
    PostModel
      .find()
      .skip(offset)
      .limit(limit),
    PostModel.countDocuments()
  ])
```
## Sort
Dữ liệu trả về có thể được sort. Ví dụ với bài toán lấy bài post được sắp xếp theo ngày tạo giảm dần
```
const posts = await PostModel.find().sort({ createdAt: -1 });
```
Tương tự như vậy với chiều tăng dần là 1 và các field khác nếu cần sắp xếp
## Populate
Populate là cơ chế mongoose cung cấp (không phải có sẵn của MongoDB), cũng chưa chắc có trên các thư viện khác để kết nối dữ liệu giữa collection này sang collection khác
https://mongoosejs.com/docs/populate.html

Bản chất của cơ chế populate là cơ chế lookup trong MongoDB. Mọi người tham khảo thêm ở https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/

Ví dụ: 
- API get posts ta cần thêm thông tin người tạo (username) thay vì chỉ có mỗi createBy là ObjectId
- API get posts ta cần thêm tags (title) thay vì có mỗi tagId

### Populate
Để populate được ta cần tạo ref. Ví dụ
```
const PostSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  likeCount: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, {
  timestamps: true
});
```
createdBy theo ý nghĩa là userId, ref tới collection User, để populate được ta thêm trường ref với value là 'User'. 'User' này tương ứng với tên model User

Khi đó để lấy thêm thông tin user, khi chủ thể query là PostModel, ta làm như sau:
```
PostModel.find().populate({ path: 'createdBy' }),     
```

Bây h trong trường hợp ngược lại, API gọi bài post ta cần populate để lấy ra list comments thì làm thế nào khi Schema Post không có trường comments

Trong trường hợp này, thông thường client sẽ gọi API lấy comments thay vì dùng luôn API /posts/:id

Còn nếu vẫn muốn dùng 1 API thì ta có thể làm 2 cách

C1: Dễ nhất. Thêm một câu lệnh ```Comments.find({ postId })``` rồi dùng JS đính kèm => Nên dùng cách này cho đỡ phức tạp

C2: Dùng cơ chế vitrual field để populate https://mongoosejs.com/docs/populate.html
