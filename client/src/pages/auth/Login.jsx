import { Alert } from 'antd';
import { MDBInput } from 'mdb-react-ui-kit';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import {
  loginWithEmailAndPassword,
  loginWithGoogle,
} from '../../redux/user/userAction';
import { userActionType } from '../../redux/user/userType';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isSigningIn, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginWithEmailAndPassword(email, password));
  };

  const signInWithGoogleHandler = () => {
    dispatch(loginWithGoogle());
  };

  useEffect(() => {
    return () => {
      dispatch({ type: userActionType.CLEAN_STATE });
    };
  }, [dispatch]);

  if (user && user.role === 'admin') {
    return <Navigate to='/admin/dashboard' />;
  }

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h3 className='mb-4'>Đăng nhập</h3>
          <form onSubmit={handleSubmit}>
            <div className='form-outline mb-4'>
              <MDBInput
                autoFocus
                label='Email'
                type='email'
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='form-outline mb-4'>
              <MDBInput
                label='Mật khẩu'
                type='password'
                className='form-control'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <Alert showIcon className='mt-2' message={error} type='error' />
              )}
            </div>

            <div className='row mb-4'>
              <div className='col d-flex justify-content-between'>
                <p>
                  Không phải thành viên? <Link to='/register'>Đăng ký</Link>
                </p>
                <Link to='/forgot-password'>Quên mật khẩu?</Link>
              </div>
            </div>

            <button type='submit' className='btn btn-primary btn-block mb-4'>
              {isSigningIn ? 'Chờ chút...' : 'Đăng nhập'}
            </button>

            <div className='divider d-flex align-items-center my-4'>
              <p className='text-center fw-bold mx-3 mb-0 text-muted'>Hoặc</p>
            </div>
            <></>
          </form>
          <button
            className='btn btn-primary btn-lg btn-block'
            style={{ backgroundColor: '#1266f1' }}
            onClick={signInWithGoogleHandler}
          >
            <i className='fab fa-google me-2'></i>Đăng nhập với Google
          </button>
          {/* <button
            className='btn btn-primary btn-lg btn-block'
            style={{ backgroundColor: '#3b5998' }}
            onClick={signInWithFacebookHandler}
          >
            <i className='fab fa-facebook-f me-2'></i>Continue with Facebook
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
