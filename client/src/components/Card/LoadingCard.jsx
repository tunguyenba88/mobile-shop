import { Card, Col, Skeleton } from 'antd';
import React from 'react';

const LoadingCard = ({ count }) => {
  const cards = () => {
    let totalCards = [];
    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Col xs={24} sm={12} md={8} lg={8} className='gutter-row' key={i}>
          <Card hoverable style={{ height: 400 }}>
            <Skeleton active></Skeleton>
          </Card>
        </Col>
      );
    }
    return totalCards;
  };
  return cards();
};

export default LoadingCard;
