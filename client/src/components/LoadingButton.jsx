import { Button } from 'antd';
import React from 'react';

const LoadingButton = ({ loading, type }) => {
  return (
    <Button type='primary' htmlType='submit' loading={loading}>
      {type === 'create' && 'Tạo'}
      {type === 'update' && 'Cập nhật'}
    </Button>
  );
};

export default LoadingButton;
