import { Button, Col } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryOrSubButtonGroup = ({ item, type }) => {
  return (
    <Col lg={{ span: 4 }} md={{ span: 6 }} sm={{ span: 12 }} key={item._id}>
      <Button className='hover-fill' style={{ width: '100%' }}>
        <Link
          to={
            type === 'category' ? `/category/${item.slug}` : `/sub/${item.slug}`
          }
        >
          {item.name.toUpperCase()}
        </Link>
      </Button>
    </Col>
  );
};

export default CategoryOrSubButtonGroup;
