/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Menu,
  Input,
  Dropdown,
  Popover,
  Tooltip,
  Divider,
  Card,
  Row,
  Button,
  Badge,
} from 'antd';

import {
  AppstoreOutlined,
  SearchOutlined,
  UserDeleteOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import avatar from '../../images/avatar.png';
import { useCookies } from 'react-cookie';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { formatPrice } from '../../utils/formatPrice';
import CartItem from '../Cart/CartItem';
import * as cartApi from '../../api/cartApi';
import { logout } from '../../redux/user/userAction';

const RightMenu = ({
  search,
  onFinish,
  setSearch,
  title,
  setTitle,
  inDrawer,
}) => {
  const cartReducer = useSelector((state) => state.cart);
  const [visible, setVisible] = useState(false);
  const [cookie, setCookies, removeCookie] = useCookies(['user']);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout()).then(() => {
      removeCookie('user', { path: '/' });
    });
    navigate('/login');
  };

  const { cart, sl, isInit, total } = cartReducer;
  const navigate = useNavigate();

  const userMenu = (
    <Menu>
      <Menu.Item icon={<AppstoreOutlined />}>
        <Link to='/user/history'>History</Link>
      </Menu.Item>
      <Menu.Item icon={<UserDeleteOutlined />} onClick={logoutHandler}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  const adminMenu = (
    <Menu>
      <Menu.Item icon={<AppstoreOutlined />}>
        <Link to='/admin/dashboard'>Dashboard</Link>
      </Menu.Item>
      <Menu.Item icon={<AppstoreOutlined />}>
        <Link to='/user/history'>History</Link>
      </Menu.Item>
      <Menu.Item icon={<UserDeleteOutlined />} onClick={logoutHandler}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  const accountMenu = (
    <Menu>
      <Menu.Item>
        <Link to='/login'>
          <i className='fas fa-sign-in-alt' style={{ marginRight: '7px' }}></i>
          Đăng nhập
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/register'>
          <i className='fas fa-user-plus' style={{ marginRight: '4px' }}></i>
          Đăng ký
        </Link>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    if (isInit || inDrawer) {
      return;
    }
    setVisible(true);
    let timer = setTimeout(() => {
      setVisible(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <>
      <form
        className='d-flex justify-content-end'
        onClick={() => setSearch(true)}
        onSubmit={onFinish}
      >
        <Input
          className={`d-flex ${search ? 'search-normal' : ''}`}
          style={{
            width: '20%',
            marginRight: '0.5rem',
            borderRadius: '1rem',
          }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          size='middle'
          placeholder='Nhập nội dung tìm kiếm...'
          prefix={<SearchOutlined />}
        />
      </form>
      <div className='d-flex align-items-center'>
        <Popover
          trigger='click'
          placement='bottomLeft'
          visible={visible}
          onClick={() => setVisible(!visible)}
          onVisibleChange={(visible) => setVisible(visible)}
          title={
            <div
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#f5f8fd',
                textAlign: 'center',
                border: '1px solid #e7ebec',
                borderRadius: '4px',
              }}
            >
              Giỏ hàng
            </div>
          }
          content={
            <Card>
              {cart.length === 0 && (
                <div className='text-center mt-2'>
                  <ShoppingCartOutlined
                    style={{ display: 'block', fontSize: '2rem' }}
                  />
                  Hiện chưa có sản phẩm
                </div>
              )}
              <div
                id='style-2'
                style={{
                  maxHeight: '220px',
                  overflowY: 'scroll',
                  padding: '0.5rem',
                }}
              >
                {cart.length !== 0 &&
                  cart.map((item) => {
                    return (
                      <CartItem inPopup={true} item={item} key={item._id} />
                    );
                  })}
              </div>
              <Divider />
              <Row align='middle' justify='space-between'>
                <span>Tổng tiền</span>
                <span style={{ fontWeight: 'bold' }}>{formatPrice(total)}</span>
              </Row>
              <Row justify='space-between'>
                <Link to='/cart'>
                  <Button type='primary' danger>
                    Xem giỏ hàng
                  </Button>
                </Link>
                {cookie.user ? (
                  <Button
                    onClick={() => {
                      navigate('/checkout');
                    }}
                    type='primary'
                    danger
                    // loading={loading}
                  >
                    Thanh toán
                  </Button>
                ) : (
                  <Button type='primary' danger>
                    <Link to='/login' state={{ from: 'cart' }}>
                      Đăng nhập để thanh toán
                    </Link>
                  </Button>
                )}
              </Row>
            </Card>
          }
        >
          {cart ? (
            <Badge size='small' count={sl}>
              <span className='text-reset me-2' style={{ cursor: 'pointer' }}>
                <i className='fas fa-shopping-cart'></i>
              </span>
            </Badge>
          ) : (
            <span className='text-reset me-2' style={{ cursor: 'pointer' }}>
              <i className='fas fa-shopping-cart'></i>
            </span>
          )}
        </Popover>
        {!cookie.user && (
          <Dropdown overlay={accountMenu}>
            <div
              className='text-reset d-flex align-items-center'
              style={{ marginLeft: '0.5rem' }}
            >
              <i class='fas fa-user-circle fa-lg'></i>
            </div>
          </Dropdown>
        )}

        {cookie.user && cookie.user.role === 'subscriber' && (
          <Dropdown overlay={userMenu}>
            <div
              className='d-flex align-items-center'
              style={{ marginLeft: '0.5rem' }}
            >
              <img
                src={cookie.user.avatar || avatar}
                className='rounded-circle'
                height='25'
                alt='avatar'
                style={{ marginRight: '0.2rem' }}
              />
            </div>
          </Dropdown>
        )}
        {cookie.user && cookie.user.role === 'admin' && (
          <Dropdown overlay={adminMenu}>
            <div
              className='d-flex align-items-center'
              style={{ marginLeft: '0.5rem' }}
            >
              <img
                src={cookie.user.avatar || avatar}
                className='rounded-circle'
                height='25'
                alt='avatar'
                style={{ marginRight: '0.2rem' }}
              />
            </div>
          </Dropdown>
        )}
      </div>
    </>
  );
};

export default RightMenu;
