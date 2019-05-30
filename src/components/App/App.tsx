import React, { Component } from 'react';
import './App.css';
import Login from '../Login/Login';
import Home from '../Home/Home';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Projects from '../Projects/Projects';
import Chat from '../Chat/Chat';

class App extends Component {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/projects" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={Projects} />
          <Route exact path="/chat" component={Chat} />

        </div>
      </Router>
    );
  }
}

export default observer(App);
