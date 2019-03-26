import React, { Component } from 'react';
import ls from 'local-storage';
import OrderFormContainer from '../../components/OrderFormContainer';
import OrderList from '../../components/OrderList';

import response from '../../static/response_mock.json';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      orders: [],
    };
  }

  componentDidMount() {
    // TODO: fetch from api
    this.setState({
      items: response,
      orders: ls.get('orders') || [],
    });
  }

  addOrder = (order) => {
    const {
      orders,
    } = this.state;
    const nOrder = { ...order };
    const nOrders = [...orders];

    nOrder.id = orders.length;
    nOrders.unshift(nOrder);
    this.setState({ orders: nOrders });
  };

  render() {
    const {
      items,
      orders,
    } = this.state;
    return (
      <div>
        <OrderFormContainer
          items={items}
          onSubmit={order => this.addOrder(order)}
        />
        <OrderList orders={orders} />
      </div>
    );
  }
}

export default Order;
