import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Col,
  Row,
  Button,
} from 'react-bootstrap';
import OrderForm from '../OrderForm';

class OrderFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItemIndex: undefined,
      margin: true,
      pair: null,
      side: null,
      orderType: null,
      minLimit: '',
      limit: '',
      minQuantity: '',
      maxQuantity: '',
      quantity: '',
      errors: {},
    };
  }

  /**
   * Sets required values to state,
   * according to selected pair.
   */
  handleSelect = (e) => {
    const { items } = this.props;
    const selectedItemIndex = e.target.value;
    this.setState({
      selectedItemIndex,
      pair: items[selectedItemIndex].pair,
      side: null,
      orderType: null,
      minLimit: items[selectedItemIndex].minimum_margin,
      margin: items[selectedItemIndex].margin,
      limit: items[selectedItemIndex].margin ? items[selectedItemIndex].initial_margin : '',
      minQuantity: items[selectedItemIndex].minimum_order_size,
      quantity: items[selectedItemIndex].minimum_order_size,
      maxQuantity: items[selectedItemIndex].maximum_order_size,
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    const {
      pair,
      side,
      orderType,
      limit,
      quantity,
    } = this.state;
    const { onSubmit } = this.props;
    e.preventDefault();
    if (this.validate()) {
      onSubmit({
        pair,
        side,
        orderType,
        limit,
        quantity,
      });
    }
  }

  validate = () => {
    const {
      pair,
      side,
      orderType,
      minLimit,
      limit,
      minQuantity,
      quantity,
      maxQuantity,
      errors,
    } = this.state;
    const nErrors = { ...errors };
    let isCorrect = true;

    if (!pair) {
      nErrors.pair = 'Please select a pair';
      isCorrect = false;
    } else nErrors.pair = null;

    if (!side) {
      nErrors.side = 'Please select a side';
      isCorrect = false;
    } else nErrors.side = null;

    if (!orderType) {
      nErrors.orderType = 'Please select order type';
      isCorrect = false;
    } else nErrors.orderType = null;

    if (orderType === 'limit' && !limit) {
      nErrors.limit = 'Please enter limit';
      isCorrect = false;
    } else if (limit
              && minLimit
              && parseFloat(limit) < parseFloat(minLimit)) {
      nErrors.limit = `Minimal allowed limit is: ${minLimit}`;
      isCorrect = false;
    } else if (limit
              && orderType
              && orderType === 'limit'
              && quantity
              && parseFloat(limit) > parseFloat(quantity)) {
      nErrors.limit = 'Limit cannot extend quantity';
      isCorrect = false;
    } else if (limit
              && quantity
              && maxQuantity
              && parseFloat(limit) > parseFloat(maxQuantity) + parseFloat(quantity)) {
      nErrors.limit = `Maximum allowed order is (${maxQuantity})`;
      nErrors.quantity = `Maximum allowed order is (${maxQuantity})`;
      isCorrect = false;
    } else nErrors.limit = null;

    if (!quantity) {
      nErrors.quantity = 'Please enter quantity';
      isCorrect = false;
    } else if (quantity
              && minQuantity
              && parseFloat(quantity) < parseFloat(minQuantity)) {
      nErrors.quantity = `Minimal allowed quantity is: ${minQuantity}`;
      isCorrect = false;
    } else if (quantity
              && maxQuantity
              && parseFloat(quantity) > parseFloat(maxQuantity)) {
      nErrors.quantity = `Maximum allowed quantity is: ${maxQuantity}`;
      isCorrect = false;
    } else nErrors.quantity = null;

    this.setState({ errors: nErrors });
    return isCorrect;
  }

  render() {
    const { items } = this.props;
    const {
      selectedItemIndex,
      margin,
      limit,
      quantity,
      errors,
    } = this.state;
    return (
      <div>
        <Form>
          <FormGroup as={Row}>
            <FormLabel column>Pair</FormLabel>
            <Col>
              <FormControl
                as="select"
                name="pair"
                isInvalid={errors.pair}
                value={selectedItemIndex}
                onChange={this.handleSelect}
              >
                <option style={{ display: 'none' }}>Select...</option>
                {
                  items.map((item, index) => (
                    <option
                      value={index}
                      key={`OrderFormPair${index.toString()}`}
                    >
                      {item.pair}
                    </option>
                  ))
                }
              </FormControl>
              { <span>{errors.pair}</span> }
            </Col>
          </FormGroup>
          <OrderForm
            limit={limit}
            quantity={quantity}
            margin={margin}
            handleChange={this.handleChange}
            errors={errors}
          />
          <Button
            type="submit"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

OrderFormContainer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    pair: PropTypes.string,
    initial_margin: PropTypes.string,
    minimum_margin: PropTypes.string,
    maximum_order_size: PropTypes.string,
    minimum_order_size: PropTypes.string,
    margin: PropTypes.bool,
  })).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default OrderFormContainer;
