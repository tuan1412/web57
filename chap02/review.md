# Ôn lại kiến trúc Web
Client - Server => Hệ phân tán (2 thành phần cách xa nhau)

Frontend: JS chạy trên trình duyệt (máy tính khách hàng)
Backend: JS chạy trên máy chủ (máy tính công ty)

# NodeJS
NodeJS môi trường chạy JS trên máy tính
=> Ko là ngôn ngữ, ko là thư viện, ko là framework

# Bất đồng bộ
Mô hình Eventloop single thread
Thao tác bất đồng bộ (http, io) => NodeJS ko làm ở main thread => đẩy sang cho hệ thống làm => đẩy callback vào event queue

Eventloop lắng nghe stack và queue để chạy hàm theo thứ tự

# Những cách handle hàm bất đồng bộ
1. Callback
2. Promise
Dễ dàng convert cách viết callback => cách viết Promise
=> return new Promise((resolve, reject) => {})
3. Async Await => Syntax sugar của promise
- await đi trong hàm async function
- await thì phải await promise
- async function return một promise





