import React from 'react';
import { Col, Row } from 'antd';
import AdminNav from '../../components/AdminNav';
import * as api from '../../api/categoryApi';
import { useState } from 'react';
import { useEffect } from 'react';
import CategoryCreateForm from '../../components/CategoryAdmin/CategoryCreateForm';
import CategorySearch from '../../components/CategoryAdmin/CategorySearch';
import CategoryList from '../../components/CategoryAdmin/CategoryList';
import { useCookies } from 'react-cookie';

const Category = () => {
  const [cookies] = useCookies(['user']);
  const [loading, setLoading] = useState(false);
  const [loadingCat, setLoadingCat] = useState(null);

  const [categories, setCategories] = useState([]);
  const [updateName, setUpdateName] = useState('');
  const [updateSlug, setUpdateSlug] = useState('');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (loading === false && loadingCat !== null) {
      api.getAllCategories().then((res) => {
        setCategories(
          res.data.map((category) => {
            return { ...category, key: category._id };
          })
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  useEffect(() => {
    setLoadingCat(true);
    api.getAllCategories().then((res) => {
      setLoadingCat(false);
      setCategories(
        res.data.map((category) => {
          return { ...category, key: category._id };
        })
      );
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
      <AdminNav selectedKey='categories' />
      <Col
        sm={24}
        xs={24}
        md={20}
        style={{ padding: '0 24px', minHeight: 280 }}
      >
        <div className='container'>
          <div className='row' style={{ justifyContent: 'center' }}>
            <div className='col-lg-8 col-md-10 col-sm-12'>
              <CategoryCreateForm
                setKeyword={setKeyword}
                userToken={cookies.user.token}
                setLoading={setLoading}
                loading={loading}
              />
              <CategorySearch setKeyword={setKeyword} />
              <hr />
              <CategoryList
                loadingCat={loadingCat}
                categories={categories}
                keyword={keyword}
                setUpdateName={setUpdateName}
                setUpdateSlug={setUpdateSlug}
                userToken={cookies.user.token}
                setCategories={setCategories}
                updateName={updateName}
                updateSlug={updateSlug}
              />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Category;
