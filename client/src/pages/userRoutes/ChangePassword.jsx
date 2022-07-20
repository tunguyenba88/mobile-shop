import { Alert, Col, notification, Row, Spin } from 'antd';
import { MDBInput } from 'mdb-react-ui-kit';

import React, { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import UserNav from '../../components/UserNav';
import { getAuth, updatePassword } from 'firebase/auth';

const ChangePassword = () => {
  const [error, setError] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [loading, setLoading] = useState(false);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const handleSubmit = async (e) => {
    const auth = getAuth();
    const user = auth.currentUser;

    e.preventDefault();
    if (newPw !== confirmPw) {
      setError('Mật khẩu không khớp');
      setTimeout(() => {
        setError('');
      }, 2000);
    } else {
      try {
        setLoading(true);
        await updatePassword(user, newPw);
        notification.success({
          message: 'Cập nhật mật khẩu thành công',
          duration: 5,
        });
        setNewPw('');
        setConfirmPw('');
        setLoading(false);
      } catch (error) {
        notification.error({
          message: error.message,
          duration: 5,
        });
        setLoading(false);
      }
    }
  };

  return (
    <Row
      style={{
        padding: '1.5rem 0',
        backgroundColor: 'rgb(245, 248, 253)',
        minHeight: '90vh',
      }}
    >
      <UserNav selectedKey='change-password' />

      <Col
        sm={24}
        xs={24}
        md={{ span: 14, offset: 3 }}
        style={{ padding: '0 24px', minHeight: 280 }}
      >
        <form onSubmit={handleSubmit}>
          <div className='form-outline mb-4'>
            <MDBInput
              required
              label='Mật khẩu mới'
              type='password'
              className='form-control'
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
            />
          </div>
          <div className='form-outline mb-4'>
            <MDBInput
              required
              label='Xác nhận mật khẩu'
              type='password'
              className='form-control'
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
            />
          </div>
          {error && (
            <Alert showIcon className='mt-2' message={error} type='error' />
          )}

          <button type='submit' className='btn btn-primary btn-block mb-4 mt-2'>
            {loading ? (
              <span>
                Chờ chút{' '}
                <Spin
                  size='small'
                  style={{ color: '#fff' }}
                  indicator={antIcon}
                />
              </span>
            ) : (
              'Cập nhật mật khẩu'
            )}
          </button>
        </form>
      </Col>
    </Row>
  );
};

export default ChangePassword;
