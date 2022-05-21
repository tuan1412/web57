import useAuth from '../../hooks/useAuth';

function NotAuthenticated({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return children;
  }

  return null

}

export default NotAuthenticated;