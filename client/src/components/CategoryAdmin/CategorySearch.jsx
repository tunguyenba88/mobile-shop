import { Input, Row } from 'antd';
import React from 'react';
import { SearchOutlined } from '@ant-design/icons';

const CategorySearch = ({ setKeyword }) => {
  const changeHandler = (e) => {
    console.log('hello');
    setKeyword(e.target.value.toLowerCase().trimEnd().trimStart());
  };
  return (
    <Row
      style={{
        flexDirection: 'row-reverse',
        marginTop: '-3.5rem',
      }}
    >
      <div className='col-md-4 col-sm-6 col-xs-6'>
        <Input
          placeholder='danh mục...'
          suffix={<SearchOutlined />}
          onChange={changeHandler}
        />
      </div>
    </Row>
  );
};

export default CategorySearch;
