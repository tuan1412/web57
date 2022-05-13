# Buổi 16
- Hiểu về Server Routing vs Client Routing
- Làm quen với react-router-dom (v6)
- Xác thực và phân quyền trên client

# Phân biệt Server Routing vs Client Routing
| Server Routing | Client Routing |
| ----------- | ----------- |
| Routing phụ thuộc vào Server | Routing phụ thuộc vào client |
| Lần đăng nhập web đầu tiên => Gọi lên server trả về file HTML | Lần đăng nhập web đầu tiên => Gọi lên server trả về file HTML |
| Các lần điều hướng tiếp theo => Gọi lên server trả về file HTML | Các lần điều hướng tiếp theo => Sử dụng JS ở Client để thay đổi đường dẫn và giao diện |

Với dạng Single Page App khi tạo dự án create-react-app, ta sẽ sử dụng cơ chế Client Routing với thư viện react-router-dom

# Làm quen với React Router Dom
Hiện tại phần lớn project vẫn đang sử dụng react-router-dom version 5. Tuy nhiên, do react-router-dom version 6 vừa stable với nhiều nâng cấp nên ta sẽ sử dụng luôn.

Docs của v6: https://reactrouter.com/docs/en/v6

Docs của v5: https://v5.reactrouter.com/web/guides/quick-start

Install thư viện
```
npm install react-router-dom@6
```

Sử dụng react-router-dom trong dự án React. Gắn BrowserRouter với toàn bộ App
```
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
```

## Khai báo đường dẫn
Để xác định rằng với đường dẫn A ứng với giao diện A, đường dẫn B ứng với giao diện B, ta cần code một đoạn để gắn liên kết chúng với nhau

```
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <Routes>
      <Route path="" element={<PostList />} />
      <Route path="posts/:id" element={<PostDetail />} />
      <Route path="posts/create" element={<CreatePost />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<div>404 Page</div>} />
    </Routes>
  )
}
```

Hiểu một cách đơn giản, đoạn code khá giống với với cách cú pháp switch xử lý, react-router-dom sẽ check path và render element tướng ứng.

`Lưu ý: có thể khai báo đường dẫn động với params như posts/:id. id ở đây có thể lấy bất cứ giá trị gì trừ create do đã khai báo ở dưới`

## Một số tính năng khác
### Navigating (chuyển trang)

#### Link
Do react-router-dom dùng cơ chế Client routing nên không thể dùng thẻ a thuông thường để chuyển trang. Mặc định thẻ a default event là gọi lên server

Ta sẽ sử dụng component Link của react-router-dom
```
  import { Link } from 'react-router-dom';
  ....
  <Link to="/register">Register</Link>
```

#### Navigate Function

Một số nghiệp vụ ta cần chuyển trang mà không cần ấn vào link như tạo thành công chuyển trang sang detail hoặc ấn vào một button,... Khi đó ta sẽ sử dụng hook useNavigate của react-router-dom để chuyển trang

```
  import { useNavigate } from 'react-router-dom';
  ...
  const navigate = useNavigate();

  <form onSubmit={event => {
    event.preventDefault();
    let data = new FormData(event.target)
    let urlEncoded = new URLSearchParams(data)
    navigate("/create", { state: urlEncoded })
  }}>

```
### Navigate Component

Một số nghiệp vụ ta cần tự động chuyển trang, như khi vào trang private mà chưa đăng nhập sẽ chuyển trang Login, khi đó ta sẽ sử dụng Component Navigate để render. Khi component này được render sẽ chuyển đường dẫn sang props to tương ứng

```
export default function PrivatePage() {
  const { user } = useAuth();
  if (!user) return <Navigate to="login" />

  return <Outlet />
}
```

### Data Access (Lấy dữ liệu từ đường dẫn)

Đường dẫn có thể chứa nhiều thông tin cần thiết để render giao diện như id bài post (/posts/1234) hay query string như (/posts?sort=name) hoặc chính bản thân đường dẫn (/posts). Để lấy được những dữ liệu này ta sẽ có các hook tương ứng

```
const location = useLocation(); // lấy thông tin location (toàn bộ đường dẫn)
const urlParams = useParams(); // lấy thông tin params config động
const [urlSearchParams] = useSearchParams(); // lấy thông tin của querystring
```

Ví dụ với route /posts/:id để lấy được id ta sẽ sử dụng như sau:
```
  const { id } = useParams();
```
# Xác thực phần quyền trên client

Để xác thực phân quyền trên client, ta cũng cần định danh được user. Thứ định danh user là token, token ta sẽ lưu ở client storage (localStorage, sessionStorage, ...) để lấy lại thông tin cho lần sau

Lưu ý: không lưu toàn bộ thông tin user ở client storage do token có thể hết hạn cộng các thông tin lưu nên là các dạng public

Ta cần một request verify token '/auth/verify' và lấy được thông tin đó trước khi render các component khác

```
function App() {
  const [status, setStatus] = React.useState("idle");
  const [user, setUser] = React.useState(null);

  const fetchUserInfo = () => {};

  React.useEffect(() => fetchUserInfo(), []);

  // chặn render web app trước khi fetch xong thông tin
  if (status === "idle" || status === "loading") return <FullPageLoading />

  if (status === "error") return <div>Error</div>

  // sau khi fetch thành công (có thể là khách, member, admin, ...) render logic app
  return (
    <Routes>
      
    </Routes>
  )
}
```

Thông tin user có thể truy xuất ở bất kì component nào trong App nên ta có thể để user trong Context (tránh truyền props xuống quá nhiều component)

## Phân quyền route
Ví dụ trong project mindx-images, ta cần phần quyền như sau:
- Trang /, posts/:id thì ai cũng có thể vào
- Trang /posts/create thì member mới có thể vào, nếu chưa đăng nhập thì redirect sang trang /login
- Trang /login, /register thì khách mới có thể vào, member vào sẽ redirect sang trang /

Để làm như vậy, ta sử dụng cơ chế Outlet của react-router-dom v6. Outlet được hiểu tương như children là element nằm giữa Route

```
export default function GuestRoute() {
  const { user } = useAuth();

  if (user) return <Navigate to={/} replace />

  return <Outlet />
}
```
```
export default function PrivateRoute() {
  const { user } = useAuth();
  if (!user) return <Navigate to="login" />

  return <Outlet />
}
```
Khi này thì ta khai báo route như sau
```
<Routes>
  <Route path="" element={<PostList />} />
  <Route path="posts/:id" element={<PostDetail />} />
  <Route element={<PrivateRoute />}>
    <Route path="posts/create" element={<CreatePost />} />
  </Route>
  <Route element={<GuestRoute />}>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
  </Route>
</Routes>
```

## Phân quyền ở component
Trường hợp này tương tự Route, ta lấy user nhờ hook useAuth, sau đó nhờ vào giá trị user này để hiển thị giao diện tương ứng
```
export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <div className="d-flex">
          <Link className="navbar-brand" to="/">
            MindX Images
          </Link>
          {!user ? (
            <>
              <Link className="btn btn-link" to="/login">
                Login
              </Link>
              <Link className="btn btn-link" to="/register">
                Signup
              </Link>
            </>
          ) : (
            <div className='d-flex' style={{ alignItems: 'center'}}>
              <div>Welcome {user.username}</div>
              <Link className="btn" to="/posts/create">
                CreatePost
              </Link>
              <button className="btn" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
```

Ta có thể tái sử dụng logic bằng cách viết các component dùng chung.
