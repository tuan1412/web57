# Hoàn thiện về react-router-dom
<Redirect> => render component này thì sẽ redirect về props to tương ứng
=> Phần quyền url trên client => url A (ko có quyền) => render component Component Redirect

useLocation => pathname
Nghiệp vụ khi vào đường dẫn A => không có quyền => login => đường dẫn A

đường dẫn A => pathname => login?returnUrl=/a => redirect trang A

Outlet => Component đặc biệt của react-router-dom => giá trị bằng element tương ứng path nằm trong thằng router cha
(Layout Route)

children, HOC, render Props (children as function)

# Xác thực và phân quyền trên client
Xác định được ai đang thao tác với web
=> verify token trước kia render logic chính

Chia đường dẫn theo nghiệp vụ => Cơ chế Route Layout

Hiển thị component theo nghiệp vụ => Cơ chế conditional rendering + props user

# Context
Prevent props drilling (props down quá nhiều lần)
=> Context

Cần truyền props gì => value của Context.Provider

Component cần lấy ra => useContext(Context)

# custom hook
useAuth

# config axios
config request => gắn token vào header
config response => parse response.data => response của backend
