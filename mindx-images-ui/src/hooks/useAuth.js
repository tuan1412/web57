import React from 'react';
import { AuthContext } from '../App';

function useAuth() {
  const { user, login, logout } = React.useContext(AuthContext);
  const isAuthenticated = !!user;

  return {
    user,
    login,
    logout,
    isAuthenticated
  }
}

export default useAuth;
