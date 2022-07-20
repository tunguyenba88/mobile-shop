import { Divider, Row } from 'antd';
import React from 'react';
import ProductCard from './Card/ProductCard';

const RelatedProducts = ({ relatedProduct }) => {
  return (
    <>
      <Divider plain>
        <h4>Sản phẩm liên quan</h4>
      </Divider>
      <Row justify='start' gutter={[16, 16]} className='mt-2'>
        {relatedProduct.map((item) => (
          <ProductCard product={item} key={item._id} />
        ))}
      </Row>
    </>
  );
};

export default RelatedProducts;
