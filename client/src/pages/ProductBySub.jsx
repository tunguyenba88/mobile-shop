import { Breadcrumb, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SelectByPrice from '../components/SelectByPrice';
import * as subApi from '../api/subCategoryApi';
import * as productApi from '../api/productApi';
import LoadingCard from '../components/Card/LoadingCard';
import ProductCard from '../components/Card/ProductCard';
import PaginationOfProductPage from '../components/PaginationOfProductPage';

const locTheoGia = (productArr, byPrice) => {
  let newProduct = productArr;

  if (byPrice === 'lth') {
    newProduct = newProduct.sort((a, b) => a.price - b.price);
  }
  if (byPrice === 'htl') {
    newProduct = newProduct.sort((a, b) => b.price - a.price);
  }
  console.log(newProduct);
  return newProduct;
};

const ProductBySub = () => {
  const params = useParams();
  const { Item } = Breadcrumb;

  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState({ name: '', slug: '' });
  const [current, setCurrent] = useState(1);
  const [products, setProducts] = useState({ total: '', items: [] });
  const [selectedByPrice, setSelectedByPrice] = useState('');

  const loadSub = async () => {
    try {
      const { data } = await subApi.getSubCategory(params.slug);
      setCategory({ name: data.parent.name, slug: data.parent.slug });
    } catch (error) {}
  };

  const loadProduct = async (current = 1, pageSize = 9) => {
    setLoading(true);
    try {
      const { data } = await productApi.getProductPerPage(current, pageSize);
      console.log(data);
      const total = locTheoGia(data.total, selectedByPrice).filter((p) => {
        return p.sub.some((subVal) => subVal.slug === params.slug);
      });
      const items = locTheoGia(data.products, selectedByPrice).filter((p) => {
        return p.sub.some((subVal) => subVal.slug === params.slug);
      });

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
    <div className='container py-2'>
      <Row>
        <Breadcrumb style={{ padding: '16px 0' }}>
          <Link to='/'>
            <Item>TRANG CHỦ</Item>
          </Link>
          <Link to='/product'>
            <Item>SẢN PHẨM</Item>
          </Link>
          <Link to={`/category/${category.slug}`}>
            <Item>{category.name.toUpperCase()}</Item>
          </Link>
          <Item>{params.slug.toUpperCase()}</Item>
        </Breadcrumb>
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
  );
};

export default ProductBySub;
