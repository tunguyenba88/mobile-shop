import React, { useState } from 'react';
import { notification } from 'antd';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { MDBBtn, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: `${window.location.origin}/login`,
      handleCodeInApp: true,
    };
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email, config);
      setEmail('');
      setLoading(false);
      notification.success({
        message: 'Check your email for password reset link',
        duration: 2,
      });
    } catch (error) {
      notification.error({
        message: error.message,
        duration: 2,
      });
      setLoading(false);
    }
  };

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Forgot password</h4>
          <form onSubmit={handleSubmit}>
            <MDBCol md='12' size='12' className='mb-4 mt-4 mb-md-0'>
              <MDBInput
                autoFocus
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label='Email address'
              />
            </MDBCol>
            <div className='row mt-2'>
              <div className='col d-flex justify-content-start'>
                <p>
                  Back to <Link to='/login'>Login</Link>
                </p>
              </div>
            </div>
            <MDBCol size='auto' className='mb-md-0'>
              <MDBBtn type='submit' disabled={!email}>
                {loading ? (
                  <>
                    <span
                      className='spinner-border spinner-border-sm me-2'
                      role='status'
                      aria-hidden='true'
                    ></span>
                    Loading...
                  </>
                ) : (
                  'Send password reset email'
                )}
              </MDBBtn>
            </MDBCol>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
