import React from 'react';
import OrderFormContainer from '../../components/OrderFormContainer';
import OrderList from '../../components/OrderList';

const Order = (props) => {
  console.log(props);
  return (
    <div>
      <h2>OrderScreen</h2>
      <OrderFormContainer />
      <OrderList />
    </div>
  );
};

export default Order;
