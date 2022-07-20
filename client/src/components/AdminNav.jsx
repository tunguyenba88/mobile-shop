import { Col, Menu } from 'antd';
import React from 'react';
import {
  TableOutlined,
  DatabaseOutlined,
  AppstoreOutlined,
  IdcardOutlined,
  LaptopOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const AdminNav = ({ selectedKey }) => {
  return (
    <Col xs={24} sm={24} md={4}>
      <Menu
        defaultSelectedKeys={selectedKey}
        // mode={useBreakpoint().md ? 'inline' : 'horizontal'}
        mode='inline'
        theme='light'
      >
        <Menu.Item key='dashboard' icon={<AppstoreOutlined />}>
          <Link to='/admin/dashboard'>Dashboard</Link>
        </Menu.Item>
        <Menu.Item key='products' icon={<LaptopOutlined />}>
          <Link to='/admin/product'>Sản phẩm</Link>
        </Menu.Item>
        <Menu.Item key='categories' icon={<TableOutlined />}>
          <Link to='/admin/categories'>Danh mục</Link>
        </Menu.Item>
        <Menu.Item key='sub' icon={<DatabaseOutlined />}>
          <Link to='/admin/sub'>Danh mục con</Link>
        </Menu.Item>
        <Menu.Item key='coupon' icon={<IdcardOutlined />}>
          <Link to='/admin/coupon'>Giảm giá</Link>
        </Menu.Item>
        <Menu.Item key='password' icon={<UnlockOutlined />}>
          <Link to='/admin/password'>Mật khẩu</Link>
        </Menu.Item>
      </Menu>
    </Col>
  );
};

export default AdminNav;
