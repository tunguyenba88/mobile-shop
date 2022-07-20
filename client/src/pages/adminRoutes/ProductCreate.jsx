import { Col,  Row } from 'antd';

import React from 'react';
import AdminNav from '../../components/AdminNav';
import ProductCreateForm from '../../components/ProductAdmin/ProductCreateForm';

const ProductCreate = () => {
  return (
    <Row
      style={{
        padding: '1.5rem 0',
        backgroundColor: 'rgb(245, 248, 253)',
        minHeight: '90vh',
      }}
    >
      <AdminNav selectedKey='products' />
      <Col
        sm={24}
        xs={24}
        md={20}
        style={{ padding: '0 24px', minHeight: 280 }}
      >
        <ProductCreateForm />
      </Col>
    </Row>
  );
};

export default ProductCreate;
