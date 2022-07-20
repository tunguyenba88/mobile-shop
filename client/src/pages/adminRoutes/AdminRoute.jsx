import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import * as api from '../../api/authApi';
import Page403 from '../Page403';
import { useCookies } from 'react-cookie';

import Loader from '../../components/Loader';

const AdminRoute = () => {
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies();
  const { user } = cookies;
  useEffect(() => {
    if (user && user.token) {
      api
        .currentAdmin(user.token)
        .then((_res) => {
          setLoading(false);
        })
        .catch((_error) => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  return user?.role === 'admin' ? <Outlet /> : <Page403 />;
};

export default AdminRoute;
