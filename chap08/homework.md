# Ex1
Viết một middleware kiểm tra query params client gửi lên, nếu query params có biến byPast là 1 thì cho đi tiếp còn nếu khác 1 thì trả về client là ```{ success: 0, message: 'Invalid params' }```

VD: GET /api/test?byPast=0 => { success : 0, message: 'Invalid params' }

# Ex2
Giả sử document User có trường role là một trong các giá trị sau: 'admin', 'user'. Hoàn thiện hàm sau sao cho thoả mãn
```
function checkRole(role) {
  // hoàn thiện hàm
}

// Giả sử ở file post.router.js
// Hàm needAuthenticated được cài đặt như ở trên lớp
// API delete chỉ user có role là admin có quyền xoá bài
router.delete(
  '/posts', 
  needAuthenticated, 
  checkRole('admin'), 
  controller.deletePost
)

// API tạo bài chỉ user có role là user mới có quyền tạo bài
router.post('/posts', needAuthenticated, checkRole('user'), controller.deletePost)

```
# Ex3
Dựa vào loginSchema và registerSchema đã học, hãy thiết kế createPostSchema sao cho thoả mãn các điều kiện sau:

- title là chuỗi có độ dài từ 6 đến 100 kí tự
- description là chuỗi có độ dài từ 100-200 kí tự
- imageUrl là chuỗi không rỗng

# Ex4 (Nâng cao)
Với schema bài 2, sửa yêu cầu thành imageUrl là chuỗi bắt đầu bởi http


