import React, { useEffect, useState } from 'react';
import { Row, Breadcrumb } from 'antd';
import { Link, useSearchParams } from 'react-router-dom';
import * as categoryApi from '../api/categoryApi';
import * as productApi from '../api/productApi';
import CategoryOrSubButtonGroup from '../components/CategoryOrSubButtonGroup';
import SelectByPrice from '../components/SelectByPrice';
import LoadingCard from '../components/Card/LoadingCard';
import ProductCard from '../components/Card/ProductCard';
import PaginationOfProductPage from '../components/PaginationOfProductPage';

const formatStringForSearchHandler = (str) => {
  return str.replaceAll(' ', '').toLowerCase();
};

const locTheoGiaVaTitle = (productArr, title, byPrice) => {
  let newProduct = productArr;
  if (title) {
    newProduct = productArr.filter((p) => {
      return formatStringForSearchHandler(p.title).includes(
        formatStringForSearchHandler(title)
      );
    });
  }
  if (byPrice === 'lth') {
    newProduct = newProduct.sort((a, b) => a.price - b.price);
  }
  if (byPrice === 'htl') {
    newProduct = newProduct.sort((a, b) => b.price - a.price);
  }
  return newProduct;
};

const AllProduct = () => {
  const { Item } = Breadcrumb;
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(1);
  const [products, setProducts] = useState({ total: '', items: [] });
  const [selectedByPrice, setSelectedByPrice] = useState('');
  const [searchParams] = useSearchParams();

  const loadCategory = () => {
    categoryApi.getAllCategories().then((res) => {
      setCategory(res.data);
    });
  };

  const loadProduct = async (current = 1, pageSize = 9) => {
    setLoading(true);
    try {
      const { data } = await productApi.getProductPerPage(current, pageSize);

      setProducts({
        total: locTheoGiaVaTitle(
          data.total,
          searchParams.get('title'),
          selectedByPrice
        ).length,
        items: locTheoGiaVaTitle(
          data.products,
          searchParams.get('title'),
          selectedByPrice
        ),
      });
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
    loadCategory();
    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, selectedByPrice]);

  return (
    <div className='container py-2'>
      <Row>
        <Breadcrumb style={{ padding: '16px 0' }}>
          <Link to='/'>
            <Item>TRANG CHỦ</Item>
          </Link>
          <Item>SẢN PHẨM</Item>
        </Breadcrumb>
      </Row>
      <Row>
        {category.length !== 0 &&
          category.map((c, id) => {
            return (
              <CategoryOrSubButtonGroup key={id} item={c} type='category' />
            );
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
  );
};

export default AllProduct;
