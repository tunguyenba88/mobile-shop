import { Breadcrumb, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as categoryApi from '../api/categoryApi';
import * as subApi from '../api/subCategoryApi';
import * as productApi from '../api/productApi';
import ProductCard from '../components/Card/ProductCard';
import LoadingCard from '../components/Card/LoadingCard';
import SelectByPrice from '../components/SelectByPrice';
import CategoryOrSubButtonGroup from '../components/CategoryOrSubButtonGroup';
import PaginationOfProductPage from '../components/PaginationOfProductPage';

const locTheoGia = (productArr, byPrice) => {
  let newProduct = productArr;

  if (byPrice === 'lth') {
    newProduct = newProduct.sort((a, b) => a.price - b.price);
  }
  if (byPrice === 'htl') {
    newProduct = newProduct.sort((a, b) => b.price - a.price);
  }
  return newProduct;
};

const ProductByCategory = () => {
  const { Item } = Breadcrumb;
  const params = useParams();
  const [sub, setSub] = useState([]);
  const [current, setCurrent] = useState(1);
  const [products, setProducts] = useState({ total: '', items: [] });
  const [loading, setLoading] = useState(true);
  const [selectedByPrice, setSelectedByPrice] = useState('');

  const loadSub = async () => {
    try {
      const categoryRes = await categoryApi.getCategory(params.slug);
      const subRes = await subApi.getSubsByCategoryId(categoryRes.data._id);
      setSub(subRes.data);
    } catch (error) {}
  };
  const loadProduct = async (current = 1, pageSize = 9) => {
    setLoading(true);
    try {
      const { data } = await productApi.getProductPerPage(current, pageSize);
      const total = locTheoGia(data.total, selectedByPrice).filter(
        (p) => p.category.slug === params.slug
      );
      const items = locTheoGia(data.products, selectedByPrice).filter(
        (p) => p.category.slug === params.slug
      );

      setProducts({ total: total.length, items });
      setTimeout(() => {
        setLoading(false);
      }, 100);
    } catch (error) {
      setLoading(false);
    }
  };

  const changePagination = (current, pageSize) => {
    setCurrent(current);
    loadProduct(current, pageSize);
  };

  useEffect(() => {
    loadSub();
    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, selectedByPrice]);

  return (
    <>
      <div className='container py-2'>
        <Row>
          <Breadcrumb style={{ padding: '16px 0' }}>
            <Link to='/'>
              <Item>TRANG CHỦ</Item>
            </Link>
            <Link to='/product'>
              <Item>SẢN PHẨM</Item>
            </Link>
            <Item>{params.slug.toUpperCase()}</Item>
          </Breadcrumb>
        </Row>
        <Row>
          {sub.length !== 0 &&
            sub.map((s) => {
              return <CategoryOrSubButtonGroup item={s} type='sub' />;
            })}
        </Row>
        <Row className='mt-3 align-items-center justify-content-end'>
          <SelectByPrice setSelectedByPrice={setSelectedByPrice} />
        </Row>

        {loading && (
          <div className='container mt-2' style={{ marginBottom: '2rem' }}>
            <Row justify='start' gutter={[16, 16]}>
              <LoadingCard count={6} />
            </Row>
          </div>
        )}
        {!loading && (
          <Row justify='start' gutter={[16, 16]} className='mt-2'>
            {products.items.map((item) => (
              <ProductCard product={item} key={item._id} />
            ))}
          </Row>
        )}
        <PaginationOfProductPage
          changePagination={changePagination}
          current={current}
          total={products.total}
        />
      </div>
    </>
  );
};

export default ProductByCategory;
