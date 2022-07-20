import {
  Button,
  Card,
  Col,
  Modal,
  notification,
  Pagination,
  Row,
  Typography,
  Tooltip,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';

import AdminNav from '../../components/AdminNav';
import * as api from '../../api/productApi';
import LoadingCard from '../../components/Card/LoadingCard';
import { Link } from 'react-router-dom';
import image from '../../../src/images/laptop.jpg';
import { useCookies } from 'react-cookie';

const ProductList = () => {
  const { Meta } = Card;
  const [products, setProducts] = useState({ total: '', items: [] });
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [cookie] = useCookies();

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = (current = 1, pageSize = 6) => {
    setLoading(true);
    api
      .getProductPerPage(current, pageSize)
      .then((res) => {
        setProducts({ total: res.data.total.length, items: res.data.products });
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  };

  const changePagination = (current, pageSize) => {
    setCurrent(current);
    loadProduct(current, pageSize);
  };

  const deleteHandler = (slug) => {
    api
      .deleteProduct(slug, cookie.user.token)
      .then((res) => {
        notification.success({
          message: 'Xóa sản phẩm thành công',
          duration: 2,
        });
        setDeleteVisible(false);
        loadProduct();
      })
      .catch((err) => {
        notification.error({ message: err.response.data.message, duration: 2 });
        setDeleteVisible(false);
      });
  };

  const showDeleteModal = (slug) => {
    Modal.confirm({
      title: 'Bạn có muốn xóa sản phẩm này?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Xóa',
      cancelText: 'Không',
      onOk: () => {
        deleteHandler(slug);
      },
      visible: deleteVisible,
      onCancel: () => {
        setDeleteVisible(false);
      },
    });
  };

  return (
    <Row
      style={{
        padding: '1.5rem 0',
        backgroundColor: 'rgb(245, 248, 253)',
        flexDirection: 'row',
        minHeight: '90vh',
      }}
    >
      <AdminNav selectedKey='products' />
      <Col style={{ padding: '0 24px', minHeight: 280 }} md={{ span: 20 }}>
        <Row justify='space-between'>
          <Typography.Title level={2}>Tất cả sản phẩm</Typography.Title>
          <Link to='/admin/product/create'>
            <Button type='primary'>Tạo sản phẩm</Button>
          </Link>
        </Row>
        <Row justify='start' gutter={[16, 16]}>
          {loading && <LoadingCard count={6} />}
          {!loading &&
            products.items.map((product) => {
              return (
                <Col
                  xs={24}
                  sm={12}
                  md={12}
                  lg={8}
                  className='gutter-row'
                  key={product._id}
                >
                  <Card
                    className='bg-image hover-zoom'
                    cover={
                      <Link to={`/admin/product/${product.slug}`}>
                        <img
                          alt='example'
                          src={
                            product.images.length !== 0
                              ? product.images[0].url
                              : image
                          }
                          style={{
                            objectFit: 'contain',
                            height: '15rem',
                            width: '100%',
                          }}
                        />
                      </Link>
                    }
                    actions={[
                      <Link to={`/admin/product/${product.slug}`}>
                        <EditOutlined />
                      </Link>,
                      <DeleteOutlined
                        onClick={() => {
                          setDeleteVisible(true);
                          showDeleteModal(product.slug);
                        }}
                      />,
                    ]}
                  >
                    <Meta
                      title={
                        <Tooltip title={product.title}>
                          <Link
                            className='custom-hover'
                            to={`/admin/product/${product.slug}`}
                          >
                            {product.title}
                          </Link>
                        </Tooltip>
                      }
                      description={`${product.description.substring(
                        0,
                        100
                      )}...`}
                    />
                  </Card>
                </Col>
              );
            })}
        </Row>
        <Pagination
          total={products.total}
          current={current}
          pageSize={6}
          responsive
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem',
          }}
          onChange={changePagination}
        />
      </Col>
    </Row>
  );
};

export default ProductList;
