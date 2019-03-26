import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  FormLabel,
  FormControl,
  Col,
  Row,
  FormCheck,
} from 'react-bootstrap';

const OrderForm = (props) => {
  const {
    limit,
    quantity,
    margin,
    errors,
    handleChange,
  } = props;
  return (
    <div>
      <FormGroup as={Row}>
        <FormLabel column>Side</FormLabel>
        <Col>
          <FormCheck
            inline
            name="side"
            type="radio"
            label="Sell"
            value="sell"
            isInvalid={errors.side}
            onChange={handleChange}
          />
          <FormCheck
            inline
            name="side"
            type="radio"
            label="Buy"
            value="buy"
            isInvalid={errors.side}
            onChange={handleChange}
          />
          <span>{errors.side}</span>
        </Col>
      </FormGroup>
      <FormGroup as={Row}>
        <FormLabel column>Order type</FormLabel>
        <Col>
          <FormCheck
            inline
            name="orderType"
            type="radio"
            label="Market"
            value="market"
            isInvalid={errors.orderType}
            onChange={handleChange}
          />
          <FormCheck
            inline
            name="orderType"
            type="radio"
            label="Limit"
            value="limit"
            disabled={!margin}
            isInvalid={errors.orderType}
            onChange={handleChange}
          />
          <span>{errors.orderType}</span>
        </Col>
      </FormGroup>
      <FormGroup as={Row}>
        <FormLabel column>Limit</FormLabel>
        <Col>
          <FormControl
            name="limit"
            as="input"
            type="number"
            step="0.0001"
            disabled={!margin}
            isInvalid={errors.limit}
            value={limit}
            onChange={handleChange}
          />
          { <span>{errors.limit}</span> }
        </Col>
      </FormGroup>
      <FormGroup as={Row}>
        <FormLabel column>Quantity</FormLabel>
        <Col>
          <FormControl
            name="quantity"
            as="input"
            type="number"
            step="0.0001"
            isInvalid={errors.quantity}
            value={quantity}
            onChange={handleChange}
          />
          { <span>{errors.quantity}</span> }
        </Col>
      </FormGroup>
    </div>
  );
};

OrderForm.propTypes = {
  limit: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
  margin: PropTypes.bool,
  errors: PropTypes.shape({
    side: PropTypes.string,
    orderType: PropTypes.string,
    limit: PropTypes.string,
    quantity: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

OrderForm.defaultProps = {
  margin: true,
};

export default OrderForm;
