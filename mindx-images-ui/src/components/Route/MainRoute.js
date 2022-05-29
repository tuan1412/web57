import { Link, Outlet } from 'react-router-dom';
import NotAuthenticated from '../Permission/NotAuthenticated';
import Button from '../../components/Button/Button';
import Authenticated from '../Permission/Authenticated';

// key
// ref
// children

function MainRoute() {
  return (
    <div className="MainRoute">
      <div className="MainRoute-navbar" style={{ display: 'flex' }}>
        <div className="MainRoute-logo">
          MindX Images
        </div>
        <NotAuthenticated>
          <Link to="/login">
            <Button label="Login"></Button>
          </Link>
          <Link to="/signup">
            <Button>Signup</Button>
          </Link>
        </NotAuthenticated>
        <Authenticated>
          {user => (
            <div> Welcome {user.username}
              <Link to="/posts/create">
                Create post
              </Link> 
            </div>
          )}
        </Authenticated>
        {/* {!isAuthenticated ? (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        ) : (
          <div>Welcome {user.username}</div>
        )} */}
      </div>
      <div className="MainRoute-content">
        <Outlet/>
      </div>
    </div>
  )
}

export default MainRoute;