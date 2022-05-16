# Routing
Điều hướng trên client

Gọi sang đường dẫn /abc => màn hình A
Gọi sang đường dẫn /xyz => màn hình B
Từ màn A => gọi sang đường dẫn /xyz

# Server routing
/abc => một mapping ở server (app.get('/abc') => sendFile(html)) (có thể đi kèm việc convert template => html)
/xyz => một mapping ở server (app.get('/xyz'))....


# Client routing
Lần đầu tiên /abc, /xyz, ... => index.html
```
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
```

Lần routing tiếp theo => đổi đường dẫn bằng JS (cụ thể window.history)
JS sẽ dựa vào đường dẫn để render lại màn hình 

Nhấn mạnh: ko hề gọi lên server để lấy html, mà cùng lắm nếu làm một cách tối ưu thì gọi thêm file css, file js

=> react-router

# Khai báo đường dẫn
Y hệt như việc khai báo api trên server

# Điều hướng
- Link
+ Nghiệp vụ là click vào gì đó => chuyển trang (ko nên dùng button và sự kiện onClick để chuyển)
+ Không dùng thẻ a vì default của a là gọi lên method GET lên server

- Navigate (useNavigate)
+ Khi đăng nhập
+ Khi xử lý form thành công

# Lấy data từ đường dẫn
+ path params tương tự như req.params => useParams()+
+ searchParams: const [urlSearchParams, setUrlSearchParams] = useSearchParams()
+ useLocation() => lấy đường dẫn