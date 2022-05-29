import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from './api/request';
import MainRoute from './components/Route/MainRoute';
import PrivateRoute from './components/Route/PrivateRoute';
import GuestRoute from './components/Route/GuestRoute';
import DetailPost from './pages/DetailPost/DetailPost';
import CreatePost from './pages/CreatePost/CreatePost';
import ListPostWithScroll from './pages/ListPostWithScroll/ListPostWithScroll';

import { setUserInfo } from './slices/authSlice';

const Login = lazy(() => import('./pages/Login/Login'));
const SignUp = lazy(() => import('./pages/SignUp/SignUp'));
const ListPost = lazy(() => import('./pages/ListPost/ListPost'));

export const AuthContext = React.createContext();

function App() {
  // const [userInfo, setUserInfo] = React.useState({
  //   status: 'idle',
  //   data: null
  // });
  const user = useSelector(state => state.auth.user);
  const status = useSelector(state => state.auth.status);
  const dispatch = useDispatch()

  const verifyUserInfo = React.useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // tham số đầu vào là một action => biến { type: '', payload: '' };

      dispatch(setUserInfo({ status: 'success', data: null }));
      return;
    }

    try {
      const res = await axios.get('/api/auth/verify');
      if (res.success) {
        dispatch(setUserInfo({ status: 'success', data: res.data }));
      } else {
        dispatch(setUserInfo({ status: 'success', data: null }));
      }
    } catch (err) {
      dispatch(setUserInfo({ status: 'success', data: null }));
    }
  }, [dispatch])

  React.useEffect(() => {
    verifyUserInfo();
  }, [verifyUserInfo]);

  console.log(user, status);

  if (status === "idle" || status === "loading") return <div>Loading...</div>;

  if (status === "error") return <div>Error</div>

  console.log('render')

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<MainRoute />}>
            <Route path="" element={<ListPost />} />
            <Route path="/scroll" element={<ListPostWithScroll />} />
            <Route path="posts/:postId" element={<DetailPost  />} />
            <Route element={<PrivateRoute  />}>
              <Route path="posts/create" element={<CreatePost />} />
            </Route>
          </Route>
          <Route element={<GuestRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route path="*" element={<div>404 Page</div>} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App;

/*
<MainRoute>
  <ListPost />
</MainRoute>

<MainRoute>
  <PrivateRoute>
    <CreatePost />
  </PrivateRoute>
</MainRoute>
*/

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