import { Button, Result, Typography } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Page403 = () => {
  const [count, setCount] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    count === 0 && navigate('/');
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div className='container p-5 text-center'>
      <Typography.Title level={5}>
        Chuyển hướng đến trang chủ trong {count} giây
      </Typography.Title>
      <Result
        status='403'
        title='403'
        subTitle='Xin lỗi, bạn không có quyền truy cập trang này!'
        extra={
          <Link to='/'>
            <Button type='primary'>Quay lại</Button>
          </Link>
        }
      />
    </div>
  );
};

export default Page403;
