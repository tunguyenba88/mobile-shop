import React from 'react';
import { Outlet } from 'react-router-dom';
import Page403 from '../Page403';
import { useCookies } from 'react-cookie';

const UserRoute = () => {
  const [cookies] = useCookies();
  const { user } = cookies;
  return user && user.token ? <Outlet /> : <Page403 />;
};

export default UserRoute;
