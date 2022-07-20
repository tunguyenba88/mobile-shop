import React from 'react';

const Loader = () => {
  return (
    <div className='wrap'>
      <div className='spinner'>
        <div className='spinner-item'></div>
        <div className='spinner-item'></div>
        <div className='spinner-item'></div>
        <div className='spinner-item'></div>
        <div className='spinner-item'></div>
      </div>
    </div>
  );
};

export default Loader;
