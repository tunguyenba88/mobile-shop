import { Card, Col, Tooltip, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import image from '../../images/laptop.jpg';
import Rating from '../Rating';
import { formatPrice } from '../../utils/formatPrice';

const ProductCard = ({ product }) => {
  const { Meta } = Card;
  return (
    <Col
      xs={24}
      sm={12}
      md={8}
      lg={8}
      style={{ flexShrink: 1 }}
      className='gutter-row'
      key={product._id}
    >
      <Card
        style={{ cursor: 'default' }}
        hoverable
        className='bg-image hover-zoom'
        cover={
          <Link to={`/${product.slug}`}>
            <img
              alt='example'
              src={product.images.length !== 0 ? product.images[0].url : image}
              style={{
                objectFit: 'contain',
                height: '15rem',
                width: '100%',
              }}
            />
          </Link>
        }
      >
        <Meta
          title={
            <Tooltip title={product.title}>
              <Link className='custom-hover' to={`/${product.slug}`}>
                {product.title}
              </Link>
            </Tooltip>
          }
          description={`${product.description.substring(0, 100)}...`}
        />
        <Typography.Paragraph
          type='danger'
          style={{ marginTop: '1rem', fontWeight: 'bold' }}
        >
          {formatPrice(product.price)}
        </Typography.Paragraph>
        <Rating product={product} small={true} />
      </Card>
    </Col>
  );
};

export default ProductCard;
