import "bootstrap/dist/css/bootstrap.min.css";
// import ListPost from './pages/ListPost/ListPost';
// import Login from './pages/Login/Login';
// import SignUp from './pages/SignUp/SignUp';
import { Routes, Route, useNavigate } from "react-router-dom";
import React, { Suspense, lazy } from 'react';
import axios from './api/request';
import PrivateRoute from './components/Route/PrivateRoute';
import GuestRoute from './components/Route/GuestRoute';
import DetailPost from './pages/DetailPost/DetailPost';
import CreatePost from './pages/CreatePost/CreatePost';
const Login = lazy(() => import('./pages/Login/Login'));
const SignUp = lazy(() => import('./pages/SignUp/SignUp'));
const ListPost = lazy(() => import('./pages/ListPost/ListPost'));

export const AuthContext = React.createContext();

function App() {
  const [userInfo, setUserInfo] = React.useState({
    status: 'idle',
    data: null
  });
  const navigate = useNavigate();

  const verifyUserInfo = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUserInfo({ status: 'success', data: null });
      return;
    }

    try {
      const res = await axios.get('/api/auth/verify');
      if (res.success) {
        setUserInfo({ status: 'success', data: res.data });
      } else {
        setUserInfo({ status: 'success', data: null });
      }
    } catch (err) {
      setUserInfo({ status: 'success', data: null });
    }
  }

  const login = ({ token, returnUrl }) => {
    localStorage.setItem('token', token);
    window.location.href = returnUrl ?? '/';
  }

  const logout = () => {
    localStorage.removeItem('token');
    setUserInfo({ status: 'success', data: null });
  }

  React.useEffect(() => {
    verifyUserInfo();
  }, []);

  if (userInfo.status === "idle" || userInfo.status === "loading") return <div>Loading...</div>;

  if (userInfo.status === "error") return <div>Error</div>

  return (
    <AuthContext.Provider value={{ user: userInfo.data, login, logout }}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="" element={<ListPost />} />
          <Route path="posts/:postId" element={<DetailPost  />} />
          <Route element={<PrivateRoute  />}>
            <Route path="posts/create" element={<CreatePost />} />
          </Route>
          <Route element={<GuestRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route path="*" element={<div>404 Page</div>} />
        </Routes>
      </Suspense>
    </AuthContext.Provider>
    

  )
}

export default App;
/*
<Route element={<GuestRoute user={userInfo.data} />}>
<Route path="login" element={<Login />} />
<Route path="signup" element={<SignUp />} />
</Route>

=> /login

<GuestRoute>
  <Login />
</GuestRoute>

=> /signup

<GuestRoute>
  <Signup />
</GuestRoute>

<Route element={<PrivateRoute user={userInfo.data} />}>
<Route path="posts/create" element={<CreatePost />} />
</Route>

/posts/create

<PrivateRoute>
  <CreatePost />
</PrivateRoute>
*/