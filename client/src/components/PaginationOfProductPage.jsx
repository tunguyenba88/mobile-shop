import { Pagination } from 'antd';
import { MDBIcon } from 'mdb-react-ui-kit';
import React from 'react';

const PaginationOfProductPage = ({ total, current, changePagination }) => {
  return total !== 0 ? (
    <Pagination
      total={total}
      current={current}
      pageSize={9}
      responsive
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2rem',
      }}
      onChange={changePagination}
    />
  ) : (
    <div className='d-flex justify-content-center align-items-center mt-2'>
      <MDBIcon fas icon='exclamation-circle' className='mx-2' />
      <span>Không có sản phẩm nào</span>
    </div>
  );
};

export default PaginationOfProductPage;
