import React from 'react';
import { useCookies } from 'react-cookie';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AuthRoute = () => {
  const location = useLocation();
  const [cookie] = useCookies();

  if (cookie.user && location?.state?.from === 'cart') {
    return <Navigate to='/cart' />;
  }

  return !cookie.user ? (
    <Outlet />
  ) : cookie.user.role === 'admin' ? (
    <Navigate to='/admin/dashboard' />
  ) : (
    <Navigate to='/user/history' />
  );
};

export default AuthRoute;
