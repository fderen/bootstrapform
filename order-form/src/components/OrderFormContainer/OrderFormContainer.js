import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Col,
  Row,
} from 'react-bootstrap';
// import OrderForm from '../OrderForm';

import response from '../../static/response_mock.json';

class OrderFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      selectedItemIndex: null,
      pair: '',
    };
  }

  componentDidMount() {
    // TODO: fetch from API
    this.setState({ items: response });
  }

  handleSelect = (e) => {
    const { items } = this.state;
    const selectedItemIndex = e.target.value;
    this.setState({
      selectedItemIndex,
      pair: items[selectedItemIndex].pair,
    });
  }

  render() {
    const {
      items,
      selectedItemIndex,
    } = this.state;
    console.log(`selectedItemIndex: ${selectedItemIndex}`);
    return (
      <div>
        <h3>OrderFormContainer</h3>
        <Form>
          <FormGroup as={Row}>
            <FormLabel column>Pair</FormLabel>
            <Col>
              <FormControl
                as="select"
                value={selectedItemIndex}
                onChange={this.handleSelect}
              >
                <option style={{ display: 'none' }}>Select...</option>
                {
                  items.map((item, index) => (
                    <option
                      key={`OrderFormPair${index.toString()}`}
                      value={index}
                    >
                      {item.pair}
                    </option>
                  ))
                }
              </FormControl>
            </Col>
          </FormGroup>
        </Form>
        {/* <OrderForm /> */}
      </div>
    );
  }
}

export default OrderFormContainer;
