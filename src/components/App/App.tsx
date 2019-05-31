import React, { Component } from 'react';
import './App.css';
import Login from '../Login/Login';
import Home from '../Home/Home';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";
import Projects from '../Projects/Projects';
import Chat from '../Chat/Chat';

class App extends Component {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter basename="/bioviz-adv-web">
      <Router>
        <div className="App">
          <Route exact path="/bioviz-adv-web" component={Login} />
          <Route exact path="bioviz-adv-web/home" component={Home} />
          <Route exact path="bioviz-adv-web/projects" component={Projects} />
          <Route exact path="bioviz-adv-web/chat" component={Chat} />

        </div>
      </Router>
      </BrowserRouter>
    );
  }
}

export default observer(App);
