import React, { useState } from 'react';
import { MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { notification } from 'antd';
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');

  console.log(process.env);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: `${window.location.origin}/register/complete`,
      handleCodeInApp: true,
    };
    const auth = getAuth();
    await sendSignInLinkToEmail(auth, email, config);
    notification.success({
      message: `Email is sent to ${email}. Click the link to complete your registration. `,
      duration: 3,
    });
    window.localStorage.setItem('emailForRegistration', email);
    setEmail('');
  };

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Register</h4>
          <form onSubmit={handleSubmit}>
            <MDBCol md='12' size='12' className='mb-4 mt-4 mb-md-0'>
              <MDBInput
                autoFocus
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label='Email address'
                required
              />
            </MDBCol>
            <div className='row mt-2'>
              <div className='col d-flex justify-content-start'>
                <p>
                  Have an account? <Link to='/login'>Login</Link>
                </p>
              </div>
            </div>
            <MDBCol size='auto' className='mb-md-0'>
              <MDBBtn type='submit'>Register</MDBBtn>
            </MDBCol>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
