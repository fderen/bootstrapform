import React from 'react';
import PropTypes from 'prop-types';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';


import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

const columns = [{
  dataField: 'id',
  text: 'ID',
}, {
  dataField: 'pair',
  text: 'Pair',
}, {
  dataField: 'side',
  text: 'Side',
}, {
  dataField: 'orderType',
  text: 'Order type',
}, {
  dataField: 'limit',
  text: 'Limit',
}, {
  dataField: 'quantity',
  text: 'Quantity',
}];

const OrderList = ({ orders }) => {
  return (
    <div className="order-list-wrapper">
      <BootstrapTable
        keyField="id"
        data={orders}
        columns={columns}
        pagination={paginationFactory({
          hideSizePerPage: true,
          hidePageListOnlyOnePage: true,
          paginationSize: 5,
        })}
      />
    </div>
  );
};

OrderList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    pair: PropTypes.string,
    side: PropTypes.string,
    orderType: PropTypes.string,
    limit: PropTypes.string,
    quantity: PropTypes.string,
  })),
};

OrderList.defaultProps = {
  orders: [],
};

export default OrderList;
