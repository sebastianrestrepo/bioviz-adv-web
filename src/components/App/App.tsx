import React, { Component } from 'react';
import './App.css';
import Login from '../Login/Login';
import { observer } from 'mobx-react';

class App extends Component {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return (
      <div className="App">
          <Login />
      </div>
    );
  }
}

export default observer(App);
