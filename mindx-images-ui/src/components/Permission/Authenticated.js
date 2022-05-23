import useAuth from '../../hooks/useAuth';

// render as props + children as function
function Authenticated({ children }) {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    return children(user);
  }

  return null

}

export default Authenticated;