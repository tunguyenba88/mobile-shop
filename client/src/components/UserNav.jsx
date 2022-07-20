import { Col, Menu } from 'antd';

import React from 'react';
import { Link } from 'react-router-dom';

const UserNav = ({ selectedKey }) => {
  return (
    <Col xs={24} sm={24} md={4}>
      <Menu defaultSelectedKeys={selectedKey} mode='inline'>
        <Menu.Item key='history'>
          <Link to='/user/history'>History</Link>
        </Menu.Item>
        <Menu.Item key='change-password'>
          <Link to='/user/change-password'>Đổi mật khẩu</Link>
        </Menu.Item>
        <Menu.Item key='wishlist'>
          <Link to='/user/wishlist'>Yêu thích</Link>
        </Menu.Item>
      </Menu>
    </Col>
  );
};

export default UserNav;
