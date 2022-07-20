import { Col, Divider, notification, Row, Tag } from 'antd';
import { MDBIcon } from 'mdb-react-ui-kit';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  increaseItem,
  reduceItem,
  removeItemFromCart,
} from '../../redux/cart/cartAction';
import { formatPrice } from '../../utils/formatPrice';

const CartItem = ({ item, inPopup }) => {
  const dispatch = useDispatch();

  const removeItemHandler = (item) => {
    dispatch(removeItemFromCart(item));
  };

  const increaseItemHandler = (item) => {
    if (item.count === item.quantity) {
      return notification.error({
        message: 'Quá số lượng trong cửa hàng',
        duration: 2,
        placement: 'bottomRight',
      });
    }
    dispatch(increaseItem(item));
  };
  const reduceItemHandler = (item) => {
    dispatch(reduceItem(item));
  };

  return (
    <Row className='cart-item'>
      <Col
        lg={inPopup ? 4 : 3}
        md={inPopup ? 4 : 5}
        sm={inPopup ? 4 : 5}
        xs={inPopup ? 4 : 7}
        style={{ margin: 'auto' }}
      >
        <Link to={`/${item.slug}`}>
          <img
            src={item.images[0].url}
            alt={item.title}
            style={{ width: '90%' }}
          />
        </Link>
      </Col>
      <Col
        lg={{ span: inPopup ? 19 : 21 }}
        md={{ span: inPopup ? 19 : 19, offset: inPopup ? 1 : '' }}
        sm={{ span: 19, offset: inPopup ? 1 : '' }}
        xs={{ span: inPopup ? 19 : 17, offset: inPopup ? 1 : '' }}
      >
        <Row justify='space-between' align='middle'>
          <Col style={{ width: '80%' }}>
            <span style={{ fontSize: '0.8rem' }}>
              <Link className='custom-hover' to={`/${item.slug}`}>
                {item.title}
              </Link>
            </span>
          </Col>
        </Row>
        {!inPopup && (
          <span style={{ fontWeight: 'bold' }}>{formatPrice(item.price)}</span>
        )}
        <Row justify='space-between' align='middle' className='mt-2'>
          <Col>
            <MDBIcon
              fas
              icon='minus'
              style={{
                marginRight: '8px',
                cursor: 'pointer',
              }}
              onClick={() => {
                reduceItemHandler(item);
              }}
            />
            <Tag>{item.count}</Tag>
            <MDBIcon
              fas
              icon='plus'
              style={{ cursor: 'pointer' }}
              onClick={() => {
                increaseItemHandler(item);
              }}
            />
          </Col>
          <Col>
            <span style={{ fontWeight: 'bold' }}>
              {formatPrice(item.price * item.count)}
            </span>
          </Col>
          <MDBIcon
            style={{
              cursor: 'pointer',
              position: 'absolute',
              right: '1px',
              top: '1px',
            }}
            fas
            icon='times'
            onClick={() => {
              removeItemHandler(item);
            }}
          />
        </Row>
      </Col>
      <Divider />
    </Row>
  );
};

export default CartItem;
