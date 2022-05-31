Email => sendgrid

Khi ng dùng click forgotPassword => cần nhập mail để gửi cái link đó => gửi

API forgotpasword => sinh ngẫu nhiên password cho họ => gửi vào email => ng dùng vào email, lấy password mới => đăng nhập
=> Cách này sẽ bị phá hoại bằng cách nhập email ngẫu nhiên, nếu trúng thì nick kia bị đổi mật khẩu

Khi ng dùng click forgotPassword => cần nhập mail để gửi cái link đó => gửi
server gen token (jwt userId, ext), token này thì hết hạn ngắn thôi (15 phút đổ lại) => http://server_frontend/forgot-password?token=abc => gửi vào email

Ng dùng click vào link => ra màn hình web => Frontend lấy token từ đường dẫn (urlSearchParams)
=> gọi lên backend để validate (verifyInfo) => form đổi mật khẩu => gọi API đổi mật khẩu (token)


Khi ng dùng click forgotPassword => gửi trang đổi mật khẩu => server gửi code về email, sdt
+ Trường OTP (code)
+ Mật khẩu mới


