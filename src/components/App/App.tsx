import React, { Component } from 'react';
import './App.css';
import Login from '../Login/Login';
import Home from '../Home/Home';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
        </div>
      </Router>
    );
  }
}

export default observer(App);
