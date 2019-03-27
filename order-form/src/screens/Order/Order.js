import React, { Component } from 'react';
import ls from 'local-storage';
import OrderFormContainer from '../../components/OrderFormContainer';
import OrderList from '../../components/OrderList';

import './Order.css';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      orders: [],
    };
  }

  /**
   * Fetches orders from proxy server
   * and gets orders from local storage.
   */
  componentDidMount() {
    fetch('http://localhost:1337/symbols_details', {
      method: 'GET',
    }).then(resp => resp.json())
      .then(items => this.setState({ items }))
      .catch(error => console.log(error));
    this.setState({ orders: ls.get('orders') || [] });
  }

  /**
   * Adds valiated order at beggining of list
   * and saves orders to local storage.
   */
  addOrder = (order) => {
    const {
      orders,
    } = this.state;
    const nOrder = { ...order };
    const nOrders = [...orders];

    nOrder.id = orders.length;
    nOrders.unshift(nOrder);
    this.setState({ orders: nOrders });
    ls.set('orders', nOrders);
  };

  render() {
    const {
      items,
      orders,
    } = this.state;
    return (
      <div className="order-wrapper">
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
