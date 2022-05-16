# Form
Rất quan trọng trong lập trình giao diện => Gặp rất nhiều

Có rất nhiều nghiệp vụ con
- Validate: sai điều kiện thì hiển thị trường error (khi nào validate onSubmit, onBlur, ...)
- Có trường A không có trường B
- Button Submit disabled hay không
...

# Xử lý form như nào
Output: data để submit lên server (call API)

Xưa: submit => load lại trang (action mặc đinh => gọi lên server và lấy về file HTML mới)

Bây h:  event.preventDefault() => lấy data => call http request (axios, ajax, fetch)

Cách 1: sử dụng một state form => lắng nghe sự kiện thay đổi của component => đổi state form => submit state

- Xử lý nghiệp vụ khó và mất thời gian
- Rerender (VD một ô input khi gõ => formState => cả form bị render lại)

Cách 2: sử dụng thư viện => Bản chất kết hợp được controlled component và uncontrolled component

react-hook-form, formik, react-final-form
- Hạn chế re-render (VD một ô input khi gõ => ô input đó render => cả form ko bị render)
- Xử lý nghiệp vụ đơn giản rất nhiều


Antd Design có sẵn thư viện xử lý form của nó => tư tưởng giống => ko phải cài thư viện
