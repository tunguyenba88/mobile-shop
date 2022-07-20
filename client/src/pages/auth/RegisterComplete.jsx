import React, { useEffect, useState } from 'react';
import { MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailLink, updatePassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { userActionType } from '../../redux/user/userType';
import * as api from '../../api/userApi';

const RegisterComplete = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !email) {
      notification.error({
        message: 'Email and password is required',
        duration: 3,
      });
      return;
    }
    if (password.length < 6) {
      notification.error({
        message: 'Password must be at least 6 characters',
        duration: 3,
      });
      return;
    }
    try {
      const auth = getAuth();
      const result = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        window.localStorage.removeItem('emailForRegistration');
        const user = auth.currentUser;
        await updatePassword(user, password);

        const idToken = await user.getIdToken();

        const { data } = await api.createOrUpdateUser(idToken);
        console.log(data);

        dispatch({
          type: userActionType.LOGGED_IN_SUCCESS,
          payload: {
            _id: data._id,
            name: data.name,
            email: data.email,
            token: idToken,
            role: data.role,
          },
        });

        notification.success({
          message: 'Register successfully',
          duration: 2,
        });
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 2000);
      }
    } catch (error) {
      notification.error({
        message: error.message,
        duration: 3,
      });
    }
  };

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, []);

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Continue Register</h4>
          <form onSubmit={handleSubmit}>
            <MDBCol md='12' size='12' className='mt-4'>
              <MDBInput type='email' value={email} disabled className='mb-2' />
              <MDBInput
                autoFocus
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
              />
            </MDBCol>
            <MDBCol size='auto' className='mt-3 mb-md-0'>
              <MDBBtn type='submit'>Complete Registration</MDBBtn>
            </MDBCol>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
