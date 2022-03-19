# Ex1
Dựng một web app bằng Express gồm những yêu cầu sau

+ Chạy trên cổng 9000
+ npm run start để chạy webapp
+ npm run dev để chạy webapp có khả năng tự động restart khi thay đổi code

# Ex2
Cài đặt Postman, sử dụng Postman để gọi HTTP request.

Với web app ở bài 1, thêm code để web có thể xử lý được những trường hợp sau:

+ Client gọi ```GET /course``` trả về json ```{ "course": "web57" }``` 
+ Client gọi ```GET /course/random``` trả về ngẫu nhiên một trong 3 kết quả sau ```{ "course": "c4e" }```, ```{ "course": "ci" }```,```{ "course": "web57" }```
+ Client gọi ```GET /even?from=0&to=10``` trả về mảng các số chẵn từ 0 đến 10. Ví dụ: ```{"numbers": [0, 2, 4, 6, 8, 10] }```
+ Client gọi ```GET /login``` trả về file login.html có giao diện là một form đăng nhập (giao diện tuỳ ý, có 2 ô input username, password là được)
+ Client gọi ```POST /auth/login``` với body ```{"username":"admin", "password":"123456"}``` thì trả về ```{"success": true}```, nếu không phải username, password như vậy thì trả về ```{"success": false}```

Nâng cao: (Làm thêm nếu cần)

Sử dụng fetch API ở client và API /auth/login bên trên để giả lập chức năng đăng nhập. Người dùng gõ username, password rồi submit form, nếu đăng nhập thành công thì alert('Success'), nếu ko thì alert('Fail')

