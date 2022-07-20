import React from 'react';
import { notification, Rate } from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import * as productApi from '../api/productApi';
import { useCookies } from 'react-cookie';

const customIcons = [
  <FrownOutlined />,
  <FrownOutlined />,
  <MehOutlined />,
  <SmileOutlined />,
  <SmileOutlined />,
];

const Rating = ({ product, small }) => {
  const [cookie] = useCookies(['user']);

  const danhGiaSp = (value) => {
    if (!cookie.user) {
      notification.warning({
        message: 'Vui lòng đăng nhập trước khi đánh giá',
        duration: 2,
      });
      return;
    }
    productApi
      .danhGiaSp(product._id, value, cookie.user.token)
      .then((res) => {
        notification.success({
          message:
            'Cảm ơn đã đánh giá sản phẩm. Đánh giá của bạn sẽ xuất hiện sau chốc lát',
          duration: 2,
        });
      })
      .catch((err) => {
        notification.error({ message: err.response.date.message, duration: 2 });
      });
  };
  return (
    <div className={small && 'rate-small'}>
      <Rate
        defaultValue={
          product.ratings.length !== 0
            ? product.ratings.map((r) => r.star).reduce((a, b) => a + b) /
              product.ratings.length
            : 0
        }
        tooltips={cookie.user && ['rất kém', 'kém', 'tạm được', 'ổn', 'tốt']}
        allowHalf
        character={({ index }) => customIcons[index]}
        onChange={danhGiaSp}
      />{' '}
      <span>
        {product.ratings.length === 0
          ? 'Không có đánh giá'
          : `${product.ratings.length} đánh giá`}
      </span>
    </div>
  );
};

export default Rating;
