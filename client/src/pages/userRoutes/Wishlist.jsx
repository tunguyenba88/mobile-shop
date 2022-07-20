import { Col, Row, notification, Card, Tooltip, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import * as userApi from '../../api/userApi';
import UserNav from '../../components/UserNav';
import { useCookies } from 'react-cookie';
import LoadingCard from '../../components/Card/LoadingCard';
import { Link } from 'react-router-dom';
import { MDBIcon } from 'mdb-react-ui-kit';
import image from '../../../src/images/laptop.jpg';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const Wishlist = () => {
  const { Meta } = Card;
  const [wishlist, setWishlist] = useState({ total: '', items: [] });
  const [loading, setLoading] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [cookies] = useCookies(['user']);

  const loadWishlist = async () => {
    try {
      setLoading(true);
      const { data } = await userApi.wishlist(cookies.user.token);
      setWishlist({ total: data.wishlist.length, items: data.wishlist });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notification.error({ message: error.response.data.message, duration: 4 });
    }
  };

  const deleteHandler = async (pId) => {
    try {
      await userApi.removeFromWishlist(cookies.user.token, pId);
      notification.success({
        message: 'Xóa sản phẩm thành công',
        duration: 2,
      });
      setDeleteVisible(false);
      loadWishlist();
    } catch (error) {
      notification.error({ message: error.response.data.message, duration: 4 });
    }
  };

  const showDeleteModal = (pId) => {
    Modal.confirm({
      title: 'Bạn có muốn xóa sản phẩm này?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Xóa',
      cancelText: 'Không',
      onOk: () => {
        deleteHandler(pId);
      },
      visible: deleteVisible,
      onCancel: () => {
        setDeleteVisible(false);
      },
    });
  };

  useEffect(() => {
    loadWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row
      style={{
        padding: '1.5rem 0',
        backgroundColor: 'rgb(245, 248, 253)',
        minHeight: '90vh',
      }}
    >
      <UserNav selectedKey='wishlist' />
      <Col
        sm={24}
        xs={24}
        md={20}
        style={{ padding: '0 24px', minHeight: 280 }}
      >
        <Row justify='start' gutter={[16, 16]}>
          {loading && <LoadingCard count={6} />}
          {!loading &&
            wishlist.items.map((product) => {
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
                      <Link to={`/${product.slug}`}>
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
                      <DeleteOutlined
                        onClick={() => {
                          setDeleteVisible(true);
                          showDeleteModal(product._id);
                        }}
                      />,
                    ]}
                  >
                    <Meta
                      title={
                        <Tooltip title={product.title}>
                          <Link
                            className='custom-hover'
                            to={`/${product.slug}`}
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
        {wishlist.items.length === 0 && (
          <div className='d-flex justify-content-center align-items-center mt-2'>
            <MDBIcon fas icon='exclamation-circle' className='mx-2' />
            <span>Không có sản phẩm nào</span>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default Wishlist;
