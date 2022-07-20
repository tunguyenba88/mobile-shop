import { Select, Typography } from 'antd';
import React from 'react';

const SelectByPrice = ({ setSelectedByPrice }) => {
  const onChange = (values) => {
    setSelectedByPrice(values);
  };
  return (
    <>
      <Typography.Text className='mx-2' style={{ color: '#1890ff' }}>
        Xếp theo giá:
      </Typography.Text>
      <Select placeholder='Vui lòng lựa chọn' onChange={onChange}>
        <Select.Option value='htl' key='htl'>
          Giá từ cao đến thấp
        </Select.Option>
        <Select.Option value='lth' key='lth'>
          Giá từ thấp đến cao
        </Select.Option>
      </Select>
    </>
  );
};

export default SelectByPrice;
