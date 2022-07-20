import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
const SubMenu = Menu.SubMenu;

const LeftMenu = ({ loading, menuItem, hidden }) => {
  const [screenSize, setScreenSize] = useState({
    dWidth: window.innerWidth,
    dHeight: window.innerHeight,
  });

  const [current, setCurrent] = useState('');

  const setDimension = () => {
    setScreenSize({
      dWidth: window.innerWidth,
      dHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', setDimension);
    return () => {
      window.removeEventListener('resize', setDimension);
    };
  }, [screenSize]);

  const handleClick = (e) => {
    setCurrent('');
  };

  return (
    <Menu
      mode={screenSize.dWidth < 1008 ? 'vertical' : 'horizontal'}
      style={{ flex: '3 1 0' }}
      className={`${!hidden ? 'leftMenu' : ''}`}
      selectedKeys={[current]}
      onClick={handleClick}
    >
      <Menu.Item key='sanpham' style={{ padding: '0 1rem 0 0' }}>
        <Link className='hover-link' to='/product'>
          SẢN PHẨM
        </Link>
      </Menu.Item>
      {!loading &&
        menuItem.map((c, _id) => {
          if (c[1].length === 0) {
            return (
              <Menu.Item key={c[0]} style={{ padding: '0 1rem 0 0' }}>
                <Link to={`/category/${c[0]}`} className='hover-link'>
                  {c[0].toUpperCase()}
                </Link>
              </Menu.Item>
            );
          }

          return (
            <SubMenu
              key={c[0]}
              title={
                <Link className='hover-link' to={`/category/${c[0]}`}>
                  {c[0].toUpperCase()}
                </Link>
              }
              style={{ padding: '0 1rem 0 0' }}
            >
              {c[1].map((sub) => {
                return (
                  <Menu.Item key={sub._id}>
                    <Link to={`/sub/${sub.slug}`} className='hover-link'>
                      {sub.name.toUpperCase()}
                    </Link>
                  </Menu.Item>
                );
              })}
            </SubMenu>
          );
        })}
    </Menu>
  );
};

export default LeftMenu;
