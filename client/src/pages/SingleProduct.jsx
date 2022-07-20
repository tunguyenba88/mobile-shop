import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Card,
  Col,
  List,
  notification,
  Row,
  Tabs,
  Tooltip,
} from 'antd';
import * as productApi from '../api/productApi';
import * as userApi from '../api/userApi';
import Title from 'antd/lib/typography/Title';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Page404 from './Page404';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import RelatedProducts from '../components/RelatedProducts';
import ProductComment from '../components/ProductComment';
import { addToCart } from '../redux/cart/cartAction';
import { formatPrice } from '../utils/formatPrice';
import { useCookies } from 'react-cookie';

const SingleProduct = () => {
  const { Item } = Breadcrumb;
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(true);
  const { cart } = useSelector((state) => state.cart);
  const [cookie] = useCookies(['user']);
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    if (cart.length > 0) {
      const existedItem = cart.find((item) => item._id === product._id);
      if (existedItem && existedItem.count === product.quantity) {
        return notification.error({
          message: 'Quá số lượng trong cửa hàng',
          duration: 3,
        });
      }
    }
    notification.success({
      message: 'Đã thêm vào giỏ hàng',
      duration: 2,
      placement: 'bottomRight',
    });
    dispatch(addToCart(product));
  };

  const addToWishlist = async () => {
    try {
      await userApi.addToWishlist(cookie.user.token, product._id);
      notification.success({ message: 'Thêm thành công', duration: 4 });
    } catch (error) {
      notification({ message: error.response.data.message, duration: 4 });
    }
  };

  useEffect(() => {
    setLoading(true);
    productApi
      .getOne(params.slug)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
        setErr(false);
      })
      .catch((_err) => {
        setLoading(false);
        setErr(true);
      });
    productApi
      .getSanPhamLienQuan(params.slug)
      .then((res) => {
        setRelatedProduct(res.data);
      })
      .catch((err) => console.error(err.message));
  }, [params]);

  return (
    <div className='container py-2'>
      {loading && <Loader />}
      {!loading && !err && (
        <>
          <Breadcrumb style={{ padding: '16px 0' }}>
            <Link to='/'>
              <Item>TRANG CHỦ</Item>
            </Link>
            <Link to='/product'>
              <Item>SẢN PHẨM</Item>
            </Link>

            <Link to={`/category/${product.category?.slug}`}>
              <Item>{product.category.name.toUpperCase()}</Item>
            </Link>
            <Link to={`/sub/${product.sub[0].slug}`}>
              <Item>{product.sub[0].name.toUpperCase()}</Item>
            </Link>
            <Item>{`${product.title.toUpperCase().substring(0, 40)}...`}</Item>
          </Breadcrumb>
          <div className='d-flex flex-wrap justify-content-between align-items-center'>
            <Title level={4}> {product.title}</Title>
            <div className='text-center mx-2'>
              <Rating product={product} />
            </div>
          </div>
          <Row gutter={16}>
            <Col className='gutter-row' md={{ span: 12 }} xs={{ span: 24 }}>
              <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showArrows={false}
                showStatus={false}
              >
                {product?.images?.map((image, id) => {
                  return <img key={id} alt='' src={image.url} />;
                })}
              </Carousel>
            </Col>
            <Col className='gutter-row' md={{ span: 12 }} xs={{ span: 24 }}>
              <Card
                actions={[
                  <>
                    {product.quantity === 0 ? (
                      <p style={{ cursor: 'not-allowed' }}>Hết hàng</p>
                    ) : (
                      <Tooltip title='Thêm vào giỏ hàng'>
                        <ShoppingCartOutlined
                          onClick={addToCartHandler}
                          className='text-primary'
                        />
                      </Tooltip>
                    )}
                  </>,

                  <Tooltip title='Thêm sản phẩm vào danh sách yêu thích'>
                    <HeartOutlined
                      className='text-danger'
                      onClick={addToWishlist}
                    />
                  </Tooltip>,
                ]}
              >
                <List>
                  <List.Item>
                    <List.Item.Meta title='Giá tiền: ' />
                    <div style={{ fontWeight: 'bold' }}>
                      {formatPrice(product.price)}
                    </div>
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta title='Shipping: ' />
                    <div>{product.shipping}</div>
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta title='Màu sắc: ' />
                    <div>{product.color}</div>
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta title='Thương hiệu: ' />
                    <div>{product.brand}</div>
                  </List.Item>
                  {product.quantity !== 0 && (
                    <List.Item>
                      <List.Item.Meta title='Số lượng: ' />
                      <div>{product.quantity}</div>
                    </List.Item>
                  )}
                </List>
              </Card>
              <Tabs type='card' className='mt-2'>
                <Tabs.TabPane tab='Mô tả' key='1'>
                  {product?.description?.split('. ').map((str, id) => (
                    <p key={id} style={{ marginBottom: '0.4rem' }}>
                      {str.charAt(0).toUpperCase() + str.slice(1)}
                    </p>
                  ))}
                </Tabs.TabPane>
                <Tabs.TabPane tab='Thông tin thêm' key='2'>
                  Call us on xxxx xxx xxx to learn more about this product.
                </Tabs.TabPane>
              </Tabs>
            </Col>
          </Row>
          <RelatedProducts relatedProduct={relatedProduct} />
          <ProductComment
            params={params}
            product={product}
            user={cookie.user}
          />
        </>
      )}
      {!loading && err && <Page404 />}
    </div>
  );
};

export default SingleProduct;
