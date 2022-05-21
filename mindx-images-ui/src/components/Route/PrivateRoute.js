import { Outlet, Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import React from 'react';

export default function PrivateRoute() {
  const { isAuthenticated } = useAuth()
  const location = useLocation();


  if (!isAuthenticated) return <Navigate to={`login?returnUrl=${location.pathname}`}  />

  return (
    <div style={{ padding: 30 }}>
      <Outlet />
    </div>
  )
}