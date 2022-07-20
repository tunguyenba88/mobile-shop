import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import ForgotPassword from './pages/auth/ForgotPassword';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import HomePage from './pages/HomePage';
import { unsubscribe } from './redux/user/userAction';
import UserRoute from './pages/userRoutes/UserRoute';
import Wishlist from './pages/userRoutes/Wishlist';
import ChangePassword from './pages/userRoutes/ChangePassword';
import UserHistory from './pages/userRoutes/UserHistory';
import AdminDashboard from './pages/adminRoutes/AdminDashboard';
import Category from './pages/adminRoutes/Category';
import SubCategory from './pages/adminRoutes/SubCategory';
import Coupon from './pages/adminRoutes/Coupon';
import ProductCreate from './pages/adminRoutes/ProductCreate';
import ProductUpdate from './pages/adminRoutes/ProductUpdate';
import SingleProduct from './pages/SingleProduct';
import AllProduct from './pages/AllProduct';
import ProductByCategory from './pages/ProductByCategory';
import { BackTop } from 'antd';
import ProductBySub from './pages/ProductBySub';
import Page404 from './pages/Page404';
import Header from './components/Header';
import { cartInit } from './redux/cart/cartAction';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import Payment from './pages/Payment';
import UserOrder from './pages/userRoutes/UserOrder';
import AuthRoute from './pages/auth/AuthRoute';
import AdminRoute from './pages/adminRoutes/AdminRoute';
import ProductList from './pages/adminRoutes/ProductList';

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(['user']);

  useEffect(() => {
    dispatch(unsubscribe());
    dispatch(cartInit());
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setCookie('user', user, { path: '/' });
    }
  }, [setCookie, user]);

  return (
    <>
      <Header />
      <div style={{ backgroundColor: '#f5f8fd' }}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/:slug' element={<SingleProduct />} />
          <Route path='/category/:slug' element={<ProductByCategory />} />
          <Route path='/sub/:slug' element={<ProductBySub />} />
          <Route path='/product' element={<AllProduct />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/checkout' element={<UserRoute />}>
            <Route path='/checkout' element={<CheckoutPage />} />
          </Route>
          <Route path='/payment' element={<UserRoute />}>
            <Route path='/payment' element={<Payment />} />
          </Route>
          <Route path='/login' element={<AuthRoute />}>
            <Route path='/login' element={<Login />} />
          </Route>
          <Route path='/register' element={<AuthRoute />}>
            <Route path='/register' element={<Register />} />
          </Route>
          <Route path='/register/complete' element={<AuthRoute />}>
            <Route path='/register/complete' element={<RegisterComplete />} />
          </Route>
          <Route path='/forgot-password' element={<AuthRoute />}>
            <Route path='/forgot-password' element={<ForgotPassword />} />
          </Route>
          <Route path='/user/history' element={<UserRoute />}>
            <Route path='/user/history' element={<UserHistory />} />
          </Route>
          <Route path='/user/order/:id' element={<UserRoute />}>
            <Route path='/user/order/:id' element={<UserOrder />} />
          </Route>
          <Route path='/user/change-password' element={<UserRoute />}>
            <Route path='/user/change-password' element={<ChangePassword />} />
          </Route>
          <Route path='/user/wishlist' element={<UserRoute />}>
            <Route path='/user/wishlist' element={<Wishlist />} />
          </Route>
          <Route path='/admin/dashboard' element={<AdminRoute />}>
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
          </Route>
          <Route path='/admin/categories' element={<AdminRoute />}>
            <Route path='/admin/categories' element={<Category />} />
          </Route>
          <Route path='/admin/sub' element={<AdminRoute />}>
            <Route path='/admin/sub' element={<SubCategory />} />
          </Route>
          <Route path='/admin/product/create' element={<AdminRoute />}>
            <Route path='/admin/product/create' element={<ProductCreate />} />
          </Route>
          <Route path='/admin/product' element={<AdminRoute />}>
            <Route path='/admin/product' element={<ProductList />} />
          </Route>
          <Route path='/admin/product/:slug' element={<AdminRoute />}>
            <Route path='/admin/product/:slug' element={<ProductUpdate />} />
          </Route>
          <Route path='/admin/coupon' element={<AdminRoute />}>
            <Route path='/admin/coupon' element={<Coupon />} />
          </Route>
          <Route path='*' element={<Page404 />} />
        </Routes>
      </div>
      <BackTop />
    </>
  );
};

export default App;
