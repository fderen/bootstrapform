import React, { Component } from 'react';
import Order from './screens/Order';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>App</h1>
        <Order />
      </div>
    );
  }
}

export default App;
