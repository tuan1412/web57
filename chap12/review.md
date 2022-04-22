# Declarative programing

Data (state, props - JS variable) => Giao diện

Popup đóng/mở. isShowPopup (false, true)

Load câu quote từ server (API)
- Đang load thì hiển thị icon loading
- Load thành công thì hiện thị câu danh ngôn có content, tác giả
- Load thất bại thì hiển thị dòng chữ Something wrong

isLoading: true/false
isSuccess, { content: '', author: '' }
isError

status: 'idle' => Khởi tạo
status: 'loading' => isLoading = status === 'loading'
status: 'success', data = { content: '', author: '' }
status: 'error' => isError = status == 'error'