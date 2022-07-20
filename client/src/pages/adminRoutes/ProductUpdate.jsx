/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row, Skeleton, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminNav from '../../components/AdminNav';
import ProductUpdateForm from '../../components/ProductAdmin/ProductUpdateForm';
import * as api from '../../api/productApi';

const ProductUpdate = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState(null);
  useEffect(() => {
    setLoading(true);
    api
      .getOne(params.slug)
      .then((res) => {
        setProduct(res.data);
        setTimeout(() => {
          setLoading(false);
        }, 100);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  }, []);
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
        <Row justify='space-between' className='mb-2'>
          <Typography.Title level={2}>Cập nhật sản phẩm</Typography.Title>
        </Row>
        {loading && (
          <Row style={{ flexDirection: 'column', width: '80%' }}>
            <Skeleton active></Skeleton>
            <Skeleton active></Skeleton>
            <Skeleton active></Skeleton>
          </Row>
        )}
        {!loading && !error && (
          <ProductUpdateForm product={product} slug={params.slug} />
        )}
        {error && (
          <Row justify='center' className='mb-2'>
            <Typography.Title level={5}>Không có sản phẩn này</Typography.Title>
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default ProductUpdate;
