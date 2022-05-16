import { Outlet, Navigate } from 'react-router-dom';
import React from 'react';
import useAuth from '../../hooks/useAuth';
// Outlet có giá trị là element 
// có path tương ứng nằm giữa thằng GuestRoute
export default function GuestRoute() {
  const { user } = useAuth();

  if (user) return <Navigate to={'/'} replace />

  return (
    <div style={{ padding: 40 }}>
      <Outlet />
      <div> Đây là guest route</div>
    </div>
  )
}