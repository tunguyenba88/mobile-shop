import { Row, Tag } from 'antd';
import React, { useState, useEffect } from 'react';
import * as productApi from '../api/productApi.js';
import * as subApi from '../api/subCategoryApi';
import ProductCard from '../components/Card/ProductCard.jsx';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Link } from 'react-router-dom';
import LoadingCard from '../components/Card/LoadingCard.jsx';

const HomePage = () => {
  const [products, setProducts] = useState({ total: '', items: [] });
  const [subCategory, setSubCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [showArrow, setShowArrow] = useState(false);
  const [showSeeAll, setShowSeeAll] = useState(false);
  console.log(process.env.REACT_APP_API);
  const loadAllProducts = async () => {
    setLoading(true);

    try {
      const productRes = await productApi.getProductPerPage();
      const subRes = await subApi.getAllSubCategories();
      const productObj = productRes.data.total.reduce((acc, obj) => {
        let key = obj['category']['slug'];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
      // {'ipad': [], 'iphone': []}
      const subObj = subRes.data.reduce((acc, obj) => {
        let key = obj['parent']['slug'];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});

      // {'ipad': [], 'iphone': []}

      setProducts(Object.entries(productObj));
      setSubCategory(subObj);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <div className='py-2'>
      {loading && (
        <div className='container' style={{ marginBottom: '2rem' }}>
          <Row justify='start' gutter={[16, 16]}>
            <LoadingCard count={6} />
          </Row>
        </div>
      )}

      {!loading &&
        products.map((product) => {
          return (
            <div
              key={product[0]}
              className='container'
              style={{ marginBottom: '2rem' }}
            >
              <div
                className='d-flex justify-content-between align-items-center'
                style={{ flexWrap: 'wrap' }}
                onMouseOver={() => {
                  setShowArrow(true);
                }}
                onMouseLeave={() => {
                  setShowArrow(false);
                }}
              >
                <Link to={`/category/${product[0]}`} style={{ color: 'black' }}>
                  <Row
                    className='row-title'
                    align='middle'
                    style={{ padding: '1rem 0' }}
                  >
                    <div
                      className='d-flex'
                      onMouseOver={() => {
                        setShowSeeAll(true);
                      }}
                      onMouseLeave={() => {
                        setShowSeeAll(false);
                      }}
                    >
                      <h3 style={{ margin: 'auto' }}>
                        {product[0].toUpperCase()}
                      </h3>
                      <p
                        className={`row-title__all ${
                          showSeeAll ? 'active' : ''
                        }`}
                      >
                        Xem tất cả
                      </p>
                    </div>
                    <i
                      className={`fas fa-angle-right fa-lg row-title__arrow ${
                        showArrow ? 'active' : ''
                      }`}
                    />
                  </Row>
                </Link>
                <div>
                  {subCategory[product[0]].slice(0, 6).map((sub, id) => {
                    return (
                      <Link to={`/sub/${sub.slug}`} key={id}>
                        <Tag
                          color='default'
                          style={{
                            color: '#1890ff',
                            borderRadius: '1rem',
                            padding: '0.1rem 1rem',
                          }}
                        >
                          {sub.name}
                        </Tag>
                      </Link>
                    );
                  })}
                  <Link to={`/category/${product[0]}`} key={Date.now()}>
                    <Tag
                      style={{
                        borderRadius: '1rem',
                        padding: '0.1rem 1rem',
                        color: '#1890ff',
                      }}
                      color='default'
                    >
                      Xem tất cả
                    </Tag>
                  </Link>
                </div>
              </div>
              <Row justify='start' gutter={[16, 16]}>
                {product[1].slice(0, 6).map((item) => (
                  <ProductCard product={item} key={item._id} />
                ))}
              </Row>
            </div>
          );
        })}
    </div>
  );
};

export default HomePage;
