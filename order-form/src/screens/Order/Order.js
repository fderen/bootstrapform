import React from 'react';
import OrderFormContainer from '../../components/OrderFormContainer';
import OrderList from '../../components/OrderList';

const Order = (props) => {
  return (
    <div>
      <OrderFormContainer />
      <OrderList />
    </div>
  );
};

export default Order;
