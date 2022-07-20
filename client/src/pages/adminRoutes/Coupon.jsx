import { Col, Row } from 'antd';
import React, { useState } from 'react';
import AdminNav from '../../components/AdminNav';
import CouponCreateForm from '../../components/Coupon/CouponCreateForm';
import CouponList from '../../components/Coupon/CouponList';

const Coupon = () => {
  const [createLoading, setCreateLoading] = useState(false);

  return (
    <Row
      style={{
        padding: '1.5rem 0',
        backgroundColor: 'rgb(245, 248, 253)',
        minHeight: '90vh',
      }}
    >
      <AdminNav selectedKey='coupon' />
      <Col
        sm={24}
        xs={24}
        md={20}
        style={{ padding: '0 24px', minHeight: 280 }}
      >
        <CouponCreateForm
          createLoading={createLoading}
          setCreateLoading={setCreateLoading}
        />
        <CouponList createLoading={createLoading} />
      </Col>
    </Row>
  );
};

export default Coupon;
